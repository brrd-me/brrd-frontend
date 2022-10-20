import { Redis } from "@upstash/redis"
import type { NextApiRequest, NextApiResponse } from "next"
import { cipher, decryptWithPrivateKey } from "eth-crypto"
import { getStoreForAddress, makePkResolver } from "@/root/api/helpers"
import { recoverAddressFromSig } from "@/lib/helpers"
import { SIG_MESSAGES } from "@/lib/constants"
import { createProxyWallet } from "@/lib/wallet"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const redis = Redis.fromEnv()
  // Encrypted sig
  const { ecsig } = req.body

  if (!ecsig) {
    res.status(400).send({ error: "Bad request" })
  }

  if (req.method === "POST") {
    const rawSignature = cipher.parse(ecsig)
    const serverProxyWallet = createProxyWallet(process.env.SERVER_PRIVATE)
    const signature = await decryptWithPrivateKey(
      serverProxyWallet.privateKey,
      rawSignature
    )
    const signatureOwnerAddr = recoverAddressFromSig(
      SIG_MESSAGES.signin,
      signature
    )
    const { publicKey: userPublicKey } = createProxyWallet(signature)
    const store = getStoreForAddress(signatureOwnerAddr)
    const resolveWithPk = makePkResolver(signatureOwnerAddr, res)

    // get stored value at redis store
    const storedPk = await redis.get<string>(store)
    // Once user signed in the platform it's signature can't change
    // Thus if endpoint is invoked again we resolve with `storedPk`
    const pkIsNull = storedPk === null
    if (userPublicKey && pkIsNull) {
      await redis.set(store, userPublicKey)
    }
    return resolveWithPk(storedPk || userPublicKey)
  }

  res.status(404).send({ error: "Route not found" })
}
