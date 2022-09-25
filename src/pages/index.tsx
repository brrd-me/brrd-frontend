import type { NextPage } from "next"

import Layout from "@/components/Layout"
import MessageItem from "@/components/MessageItem"

const HomePage: NextPage = () => {
  return (
    <Layout>
      <strong>Inbox</strong>
      <div className="flex flex-col">
        <MessageItem />
      </div>
    </Layout>
  )
}

export default HomePage
