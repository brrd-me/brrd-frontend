import { useEffect, useState } from "react"
import { createProxyWallet } from "@/lib/wallet"

export interface Identity {
  privateKey: string
  publicKey: string
  address: string
}

function useProxyWallet(signature?: string) {
  const [proxyEOA, setProxyEOA] = useState<Identity | null>(null)

  useEffect(() => {
    if (signature) {
      setProxyEOA(createProxyWallet(signature))
    }
  }, [signature])

  return proxyEOA
}

export default useProxyWallet
