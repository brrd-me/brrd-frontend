import { Redis } from "@upstash/redis"
import type { NextApiRequest, NextApiResponse } from "next"
import { getStoreForAddress, makePkResolver } from "@/root/api/helpers"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const redis = Redis.fromEnv()
  // Always defined due to vercel file based routing
  const { address } = req.query as { address: string }
  const store = getStoreForAddress(address)
  const resolveWithPk = makePkResolver(address, res)

  /**
   * Data fresh for 120sec
   * Validate after 240sec
   */
  res.setHeader(
    "Cache-Control",
    "max-age=120, s-maxage=240, stale-while-revalidate"
  )

  if (req.method === "GET") {
    return resolveWithPk(await redis.get<string>(store))
  }

  res.status(404).send({ error: "Route not found" })
}
