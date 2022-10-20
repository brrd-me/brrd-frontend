import { useEffect, useMemo, useState } from "react"
import { useSigner } from "wagmi"
import { utils } from "ethers"
import { decryptWithPrivateKey } from "eth-crypto"

import fetcher from "@/root/api/fetcher"
import { useApplicationContext } from "@/lib/sharedState/ApplicationContext"
import { createSharedWallet } from "@/lib/wallet"
import { EVENT_ON_SEARCH } from "@/components/Layout"
import useBRRDContract, { type Email } from "./useBRRDContract"

type SerializedEmail = Email & { serialized: string }
type SerializedEmailWithPreview = SerializedEmail & {
  setAsPreviewEmail(): void
}

const DEFAULT_MESSAGE_STATE = '{"body":"","subject":"","timestamp":1}'
const decryptEmailMessage = async (
  message: string,
  address: string,
  userProxyWallet: { privateKey: string },
  isSentMail: boolean
) => {
  let decryptedMessage = DEFAULT_MESSAGE_STATE
  try {
    const { content, secret } = JSON.parse(message)
    if (isSentMail) {
      const { publicKey } = await fetcher.getPublicKey(address)
      const sharedWallet = createSharedWallet(
        userProxyWallet.privateKey,
        publicKey
      )
      decryptedMessage = await decryptWithPrivateKey(
        sharedWallet.privateKey,
        content
      )
    } else {
      // sender encrypts a shared secret so we can decrypt our message
      // Only receiver can decrypt with his private.
      const sharePrivate = await decryptWithPrivateKey(
        userProxyWallet.privateKey,
        secret
      )
      // Now we continue to decrypt content
      decryptedMessage = await decryptWithPrivateKey(sharePrivate, content)
    }
  } catch (_) {}
  return JSON.parse(decryptedMessage)
}

function useReadEmails(functionName: "emailsReceived" | "emailsSent") {
  const { userProxyWallet } = useApplicationContext()
  const { data: signer } = useSigner()
  const [list, setList] = useState([] as SerializedEmailWithPreview[])
  const [previewEmail, setPreviewEmail] = useState({} as SerializedEmail)
  const [filter, setFilter] = useState("")
  const BRRDContract = useBRRDContract()

  useEffect(() => {
    if (signer && userProxyWallet) {
      const isSentMail = functionName === "emailsSent"
      const formatEmailList = async (list: Email[]) => {
        setList(
          await Promise.all(
            list.map(async (item) => {
              const email = await decryptEmailMessage(
                item.message,
                item.receiver,
                userProxyWallet,
                isSentMail
              )
              const serializedItem = {
                ...item,
                ...email,
                message: email.body,
                serialized: utils.keccak256(utils.toUtf8Bytes(item.message)),
              }
              return {
                ...serializedItem,
                setAsPreviewEmail() {
                  setPreviewEmail(serializedItem)
                },
              }
            })
          )
        )
      }
      BRRDContract.connect(signer)[functionName]().then(formatEmailList)
    }
  }, [signer, userProxyWallet?.address])

  useEffect(() => {
    function handleFilter(e: { detail: string }) {
      setFilter(e.detail)
    }
    addEventListener(EVENT_ON_SEARCH, handleFilter as any)
    return () => removeEventListener(EVENT_ON_SEARCH, handleFilter as any)
  }, [])

  const emails = useMemo(() => {
    if (list.length <= 0) return list
    return list.filter((item) => item.serialized.includes(filter))
  }, [filter, list.length])

  const clearPreviewEmail = () => setPreviewEmail({} as SerializedEmail)

  return {
    emails,
    isEmpty: emails.length <= 0,
    showPreview: !!previewEmail.serialized,
    previewEmail,
    clearPreviewEmail,
  }
}

export default useReadEmails
