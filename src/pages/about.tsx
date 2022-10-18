import type { NextPage } from "next"
import ExternalLink from "../components/ExternalLink"

const SentPage: NextPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-7xl font-bold">BRRd</h1>
      <p className="text-lg my-1">BRRd is an Ethereum powered Mail service.</p>
      <p className="text-lg my-1">
        Read more about it on our
        <ExternalLink>Litepaper</ExternalLink>
      </p>
    </div>
  )
}

export default SentPage
