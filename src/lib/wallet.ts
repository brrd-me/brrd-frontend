import { createIdentity } from "eth-crypto"

export const createProxyWallet = (entropy: string) =>
  createIdentity(Buffer.from(entropy, "utf-8"))

export const createSharedWallet = (
  senderPrivate: string,
  receiverPublic: string
) => createProxyWallet([senderPrivate, receiverPublic].join(""))
