type AddressResponse = {
  address: string
  publicKey: string
  error?: string
}

const jsonify = async <T>(r: Response): Promise<T & { status: number }> => ({
  status: r.status,
  ...(await r.json()),
})

export const makePostRequest = (endpoint = "", body: { [k: string]: any }) => {
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then(jsonify<AddressResponse>)
}

export const getPublicKey = (address: string) =>
  fetch(`/api/pubkey/${address}`).then(jsonify<AddressResponse>)

export const setPublicKey = (ecsig: string) =>
  makePostRequest("/api/pubkey", {
    ecsig,
  })

export default {
  getPublicKey,
  setPublicKey,
} as const
