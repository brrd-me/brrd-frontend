import type { NextPage } from "next"

import MessageItem from "@/components/MessageItem"
import Layout from "@/components/Layout"

const SentPage: NextPage = () => {
  return (
    <Layout>
      <strong>Sent</strong>
      <div className="flex flex-col">
        <MessageItem />
      </div>
    </Layout>
  )
}

export default SentPage
