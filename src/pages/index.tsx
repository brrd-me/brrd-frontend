import type { NextPage } from "next"

import { classnames } from "@/lib/helpers"

import Layout from "@/components/Layout"
import MessageItem from "@/components/MessageItem"
import useReadEmails from "@/contracts/useReadEmails"
import MessagePreview from "@/components/MessagePreview"

const HomePage: NextPage = () => {
  const { emails, isEmpty, previewEmail, showPreview } =
    useReadEmails("emailsReceived")

  return (
    <Layout>
      <strong>Inbox</strong>
      <div className="flex border-t flex-grow">
        <div
          className={classnames(
            showPreview && "max-w-sm",
            "flex flex-col w-full"
          )}
        >
          {isEmpty && <p>Empty :{"("}</p>}
          {emails.map((email) => {
            return (
              <MessageItem
                onClick={email.setAsPreviewEmail}
                address={email.sender}
                time={email.time.toNumber()}
                message={email.message}
                subject={email.subject}
                key={`email-item-${email.time}`}
              />
            )
          })}
        </div>
        <MessagePreview
          show={showPreview}
          time={previewEmail.time}
          subject={previewEmail.subject}
          message={previewEmail.message}
          address={previewEmail.sender}
        />
      </div>
    </Layout>
  )
}

export default HomePage
