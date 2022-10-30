import rawABI from "./abi.json"

const {
  contracts: { BrrdEmailService: BRRD },
} = rawABI

export const ADDRESS = BRRD.address
export const ABI = BRRD.abi
export default BRRD
