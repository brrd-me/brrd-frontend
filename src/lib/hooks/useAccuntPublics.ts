import { useEffect, useState } from "react"
import { utils } from "ethers"

import fetcher from "@/root/api/fetcher"
import { noOp } from "@/lib/helpers"

function useAccountPublics(address: string) {
  const [publicKey, setPublicKey] = useState("")
  /**
   * We fetch for `address` public key in Contract logs
   */
  useEffect(() => {
    if (utils.isAddress(address)) {
      fetcher
        .getPublicKey(address)
        .then(({ publicKey }) => setPublicKey(publicKey))
        .catch(noOp)
    }
  }, [address])

  if (publicKey === "") return null

  return {
    address,
    publicKey,
  }
}

export default useAccountPublics
