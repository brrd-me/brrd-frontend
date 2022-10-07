import { useContract, useProvider, useSigner } from "wagmi"
import { Contract } from "ethers"
import { ABI, ADDRESS } from "./BRRD"

export type Email = IEmail & {
  receiver: string
  sender: string
  time: number & { toNumber(): number }
}

export interface API {
  sendEmail(
    address_receiver: string,
    subject: string,
    message: string
  ): Promise<void>
  emailsReceived(): Promise<Email[]>
  emailsSent(): Promise<Email[]>
}

function useBRRDContract(chain: "hardhat" | "goerli" = "hardhat") {
  const signerOrProvider = useProvider()
  return useContract({
    addressOrName: ADDRESS,
    contractInterface: ABI,
    signerOrProvider,
  }) as Contract & API
}

export default useBRRDContract
