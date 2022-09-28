import { useEffect, useMemo, useState } from "react"
import { useSigner } from "wagmi"

import { EVENT_ON_SEARCH } from "@/src/components/Layout"
import useBRRDContract, { type Email } from "./useBRRDContract"

type SerializedEmail = Email & { serialized: string }
function useReadEmails(functionName: "emailsReceived" | "emailsSent") {
  const { data: signer } = useSigner()
  const [list, setList] = useState([] as SerializedEmail[])
  const [filter, setFilter] = useState("")
  const BRRDContract = useBRRDContract()

  useEffect(() => {
    if (signer) {
      const serializeData = (list: Email[]) => {
        setList(
          list.map((item) => {
            const { message, subject, receiver, sender } = item
            return {
              ...item,
              serialized: [message, subject, receiver, sender].join(""),
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

  return { emails, isEmpty: emails.length <= 0 }
}

export default useReadEmails
