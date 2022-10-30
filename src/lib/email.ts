import { cipher, encryptWithPublicKey } from "eth-crypto"

const stringEncryptionWithPublic = async (publicKey: string, content: string) =>
  cipher.stringify(await encryptWithPublicKey(publicKey, content))

export async function generateEncryptedEmail({
  body,
  subject,
  timestamp,
  receiverPublicKey,
  sharedWallet,
}: {
  body: string
  subject: string
  timestamp: number
  receiverPublicKey: string
  sharedWallet: { publicKey: string; privateKey: string }
}) {
  const emailData = JSON.stringify({
    body,
    subject,
    timestamp,
  })
  return JSON.stringify({
    content: await stringEncryptionWithPublic(
      sharedWallet.publicKey,
      emailData
    ),
    secret: await stringEncryptionWithPublic(
      receiverPublicKey,
      sharedWallet.privateKey
    ),
    // End user can decrypt `content` with the shared `secret`
    // Only it can re-create with is pubkey.
    // We call this PseudoDHX Key
  })
}
