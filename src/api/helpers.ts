import type { NextApiResponse } from "next"

export const getStoreForAddress = (address: string) => `BRRD.${address}`

export const makePkResolver =
  (address: string, res: NextApiResponse) => (publicKey: string | null) => {
    if (publicKey) {
      return res.status(200).json({
        address,
        publicKey,
      })
    }
    res.status(404).json({
      error: "No key was found for address",
      address,
      publicKey: "",
      // To keep a cosistent response we return a void stringand error key
    })
  }
