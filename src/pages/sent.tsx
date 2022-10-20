import type { NextPage } from "next"

import { classnames } from "@/lib/helpers"

import Layout from "@/components/Layout"
import MessageItem from "@/components/MessageItem"
import useReadEmails from "@/contracts/useReadEmails"
import MessagePreview from "@/components/MessagePreview"

const SentPage: NextPage = () => {
  const { emails, isEmpty, previewEmail, showPreview, clearPreviewEmail } =
    useReadEmails("emailsSent")

  return (
    <Layout showPreview={showPreview}>
      <div
        className={classnames(
          showPreview && "hidden lg:block",
          "py-4 border-b"
        )}
      >
        <strong>Sent</strong>
      </div>
      <div className="flex flex-grow">
        <section
          className={classnames(
            showPreview && "max-w-sm hidden lg:flex",
            "flex-col w-full"
          )}
        >
          {isEmpty && <p>Empty :{"("}</p>}
          {emails.map((item) => {
            return (
              <MessageItem
                {...item}
                address={item.receiver}
                previewEmail={previewEmail}
                onClick={item.setAsPreviewEmail}
                key={`email-item-${item.serialized}`}
              />
            )
          })}
        </section>
        <MessagePreview
          {...previewEmail}
          show={showPreview}
          onHidePreview={clearPreviewEmail}
          address={previewEmail.receiver}
        />
      </div>
    </Layout>
  )
}

export default SentPage
