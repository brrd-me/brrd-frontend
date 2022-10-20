import Link from "next/link"

import { relativeFormat } from "@/lib/time"
import { beautifyAddress, getGoerliAddressURL } from "@/lib/helpers"
import emojiAvatarForAddress from "@/lib/emojiAvatarForAddress"

import { GoReply } from "react-icons/go"
import { HiExternalLink } from "react-icons/hi"
import { IoArrowBack } from "react-icons/io5"
import { RiShareForwardFill } from "react-icons/ri"

import RainbowButton from "@/components/RainbowButton"
import { useSendMessageContext } from "@/components/SendMessage"
import Menu from "./Menu"

function MessagePreview({
  address,
  message,
  subject,
  show,
  timestamp,
  onHidePreview,
}: IEmail & { show: boolean; onHidePreview(): void }) {
  const sendMessageContext = useSendMessageContext()
  const avatar = emojiAvatarForAddress(address)

  function handleReply() {
    sendMessageContext.openMessageWithContent({
      body: "",
      sendingTo: address,
      subject: subject,
      reply: `${message} ...Your reply:`,
    })
  }

  function handleForward() {
    sendMessageContext.openMessageWithContent({
      body: `ADDRESS: ${address}\n\n________\n\n${message}`,
      sendingTo: "",
      reply: "",
      subject: `FORWARD | ${subject}`,
    })
  }
  if (!show) return null
  return (
    <section className="flex flex-col p-4 lg:border-l flex-grow">
      <div className="flex items-center space-x-2">
        <button
          onClick={onHidePreview}
          className="py-2 group flex items-center space-x-2"
        >
          <IoArrowBack className="text-xl group-hover:-translate-x-px" />
          <span>Back</span>
        </button>
        <div className="flex-grow" />
        <Link href={getGoerliAddressURL(address)}>
          <a
            target="_blank"
            className="flex border border-zinc-50 p-2 space-x-1 rounded-full items-center font-bold pr-3"
          >
            <div
              className="flex items-center justify-center w-6 h-6 rounded-full"
              style={{ background: avatar.color }}
            >
              {avatar.emoji}
            </div>
            <span className="text-sm">{beautifyAddress(address)}</span>
            <HiExternalLink className="text-xl text-black/80" />
          </a>
        </Link>
        <Menu />
      </div>
      <h2 className="text-2xl font-bold mt-2">{subject}</h2>
      <span className="text-xs">{relativeFormat(timestamp)}</span>
      <p className="mt-2">{message}</p>
      <div className="flex-grow" />
      <div className="flex items-center space-x-4">
        <RainbowButton
          onClick={handleReply}
          className="flex items-center space-x-2"
          isPlain
        >
          <GoReply />
          <span>REPLY</span>
        </RainbowButton>
        <RainbowButton
          onClick={handleForward}
          className="flex items-center space-x-2"
          isPlain
        >
          <RiShareForwardFill />
          <span>FORWARD</span>
        </RainbowButton>
      </div>
    </section>
  )
}

export default MessagePreview
