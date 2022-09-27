import type { NextPage } from "next"

import Layout from "@/components/Layout"
import MessageItem from "@/components/MessageItem"
import useReadEmails from "@/contracts/useReadEmails"

const HomePage: NextPage = () => {
  const { emails, isEmpty } = useReadEmails("emailsReceived")
  return (
    <Layout>
      <strong>Inbox</strong>
      <div className="flex flex-col">
        {isEmpty && <p>Empty :{"("}</p>}
        {emails.map((email) => {
          return (
            <MessageItem
              address={email.sender}
              time={email.time.toNumber()}
              message={email.message}
              subject={email.subject}
              key={`email-item-${email.time}`}
            />
          )
        })}
      </div>
    </Layout>
  )
}

export default HomePage
