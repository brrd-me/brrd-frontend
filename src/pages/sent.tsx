import type { NextPage } from "next"

import MessageItem from "@/components/MessageItem"
import Layout from "@/components/Layout"
import useReadEmails from "@/contracts/useReadEmails"

const SentPage: NextPage = () => {
  const { emails, isEmpty } = useReadEmails("emailsSent")
  return (
    <Layout>
      <strong>Sent</strong>
      <div className="flex flex-col">
        {isEmpty && <p>Empty :{"("}</p>}
        {emails.map((email) => {
          return (
            <MessageItem
              address={email.receiver}
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

export default SentPage
