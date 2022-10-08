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
          {emails.map((item) => {
            return (
              <MessageItem
                {...item}
                address={item.sender}
                previewEmail={previewEmail}
                onClick={item.setAsPreviewEmail}
                time={item.time.toNumber()}
                key={`email-item-${item.time}`}
              />
            )
          })}
        </div>
        <MessagePreview
          {...previewEmail}
          show={showPreview}
          address={previewEmail.sender}
        />
      </div>
    </Layout>
  )
}

export default HomePage
