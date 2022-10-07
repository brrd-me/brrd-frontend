import { useEffect, useMemo, useState } from "react"
import { useSigner } from "wagmi"

import { EVENT_ON_SEARCH } from "@/src/components/Layout"
import useBRRDContract, { type Email } from "./useBRRDContract"

type SerializedEmail = Email & { serialized: string }
type SerializedEmailWithPreview = SerializedEmail & {
  setAsPreviewEmail(): void
}

function useReadEmails(functionName: "emailsReceived" | "emailsSent") {
  const { data: signer } = useSigner()
  const [list, setList] = useState([] as SerializedEmailWithPreview[])
  const [previewEmail, setPreviewEmail] = useState({} as SerializedEmail)
  const [filter, setFilter] = useState("")
  const BRRDContract = useBRRDContract()

  useEffect(() => {
    if (signer) {
      const serializeData = (list: Email[]) => {
        setList(
          list.map((item) => {
            const { message, subject, receiver, sender } = item
            const serialized = [message, subject, receiver, sender].join("")
            const serializedItem = {
              ...item,
              serialized,
            }
            return {
              ...serializedItem,
              setAsPreviewEmail() {
                setPreviewEmail(serializedItem)
              },
            }
          })
        )
      }
      BRRDContract.connect(signer)[functionName]().then(serializeData)
    }
  }, [signer])

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

  return {
    emails,
    isEmpty: emails.length <= 0,
    showPreview: !!previewEmail.time,
    previewEmail,
  }
}

export default useReadEmails
