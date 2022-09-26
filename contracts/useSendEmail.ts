import { useDeprecatedContractWrite } from "wagmi"
import useBRRDContract, { type API } from "./useBRRDContract"

function useSendEmail() {
  const BRRDContract = useBRRDContract()
  const writableContract = useDeprecatedContractWrite({
    addressOrName: BRRDContract.address,
    contractInterface: BRRDContract.interface,
    functionName: "sendEmail",
    overrides: {
      gasLimit: 1e7,
    },
  })

  return {
    ...writableContract,
    send(...args: Parameters<API["sendEmail"]>) {
      return writableContract.writeAsync({ args })
    },
  }
}

export default useSendEmail
