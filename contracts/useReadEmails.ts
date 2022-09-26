import { useEffect, useState } from "react"
import { useSigner } from "wagmi"
import useBRRDContract, { type Email } from "./useBRRDContract"

function useReadEmails(functionName: "emailsReceived" | "emailsSent") {
  const { data: signer } = useSigner()
  const [emails, setList] = useState([] as Email[])
  const BRRDContract = useBRRDContract()

  useEffect(() => {
    if (signer) {
      BRRDContract.connect(signer)[functionName]().then(setList)
    }
  }, [signer])

  return { emails, isEmpty: emails.length <= 0 }
}

export default useReadEmails
