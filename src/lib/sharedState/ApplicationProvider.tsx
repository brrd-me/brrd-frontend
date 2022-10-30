import { useEffect, useState, type PropsWithChildren } from "react"
import { useAccount, useSignMessage } from "wagmi"
import { encryptWithPublicKey, cipher } from "eth-crypto"

import fetcher from "@/root/api/fetcher"
import { recoverAddressFromSig, waitForClearStack } from "@/lib/helpers"
import useProxyWallet from "@/lib/hooks/useProxyWallet"
import useStorageState from "@/lib/hooks/useStorateState"
import { SIG_MESSAGES } from "@/lib/constants"

import ApplicationContext from "./ApplicationContext"

const SERVER_PUBLIC = process.env.NEXT_PUBLIC_SERVER_PUBLIC
const STORAGE_KEY = "BRRD-DHX.sig"
function ApplicationProvider({ children }: PropsWithChildren) {
  const { connector } = useAccount()
  // context shared state
  const [userSignature, setUserSignature] = useState("")

  // localStorage state
  const [{ signature: cachedSignature }, setCachedSignature] = useStorageState<{
    signature: string
  }>(
    STORAGE_KEY,
    {},
    {
      mockState: {
        signature: "",
      },
    }
  )

  // data holds signature value when user first time `signs`
  // to use the platform
  const { signMessage: requestUserSignature, data: freshSignature } =
    useSignMessage({
      message: SIG_MESSAGES.signin,
    })

  const signature = cachedSignature || freshSignature
  const userProxyWallet = useProxyWallet(signature)
  const validateForRemoteSig = useStoreRemotePK(requestUserSignature, signature)

  useEffect(() => {
    const storageIsNull =
      signature === undefined || localStorage.getItem(STORAGE_KEY) === null
    if (signature) {
      setCachedSignature({ signature })
      setUserSignature(signature)
    } else if (connector && storageIsNull) {
      // request for sig if user connected
      requestUserSignature()
    }
  }, [signature, connector?.ready])

  useEffect(() => {
    if (connector?.ready) {
      connector.on("change", () => {
        localStorage.removeItem(STORAGE_KEY)
        waitForClearStack(() => location.reload())
        // reset app state on chain or account change
      })
    }
  }, [connector?.ready])

  return (
    <ApplicationContext.Provider
      value={{
        requestUserSignature,
        validateForRemoteSig,
        userSignature,
        userProxyWallet,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  )
}

function useStoreRemotePK(
  requestUserSignature: () => void,
  signature?: string
) {
  const [reset, setReset] = useState({})
  useEffect(() => {
    async function storeRemotePk() {
      const address = recoverAddressFromSig(SIG_MESSAGES.signin, signature!)
      // Ephimeral client signature
      const ecsig = cipher.stringify(
        await encryptWithPublicKey(SERVER_PUBLIC, signature!)
      )
      // Verify key is existent in remote
      const { status } = await fetcher.getPublicKey(address)
      if (status === 404) fetcher.setPublicKey(ecsig)
      // If not existent, try set remote pubkey from encrypted sig
    }

    if (signature) {
      storeRemotePk().catch(console.error)
    }
  }, [reset, signature])

  return function validateRemote() {
    if (signature) setReset({})
    else requestUserSignature()
  }
}

export default ApplicationProvider
