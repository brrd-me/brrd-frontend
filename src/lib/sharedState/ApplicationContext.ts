import { createContext, useContext } from "react"
import { type Identity } from "@/lib/hooks/useProxyWallet"

const applicationContext = createContext<{
  userProxyWallet: Identity | null
  requestUserSignature(): void
  userSignature: string
  validateForRemoteSig(): void
}>({
  userProxyWallet: null,
  requestUserSignature() {},
  validateForRemoteSig() {},
  userSignature: "",
})

export const useApplicationContext = () => useContext(applicationContext)

export default applicationContext
