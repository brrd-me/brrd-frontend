import { relativeFormat } from "@/lib/time"
import { beautifyAddress, getGoerliAddressURL } from "@/lib/helpers"

import ExternalLink from "@/components/ExternalLink"
import RainbowButton from "@/components/RainbowButton"
import emojiAvatarForAddress from "@/lib/emojiAvatarForAddress"

import { GoReply } from "react-icons/go"
import { RiShareForwardFill } from "react-icons/ri"

type Props = IEmail & { show: boolean }
function MessagePreview({ address, message, subject, time, show }: Props) {
  const avatar = emojiAvatarForAddress(address)

  if (!show) return null
  return (
    <section className="flex flex-col p-4 border-l flex-grow">
      <div className="flex items-center space-x-4">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-full"
          style={{ background: avatar.color }}
        >
          {avatar.emoji}
        </div>
        <ExternalLink href={getGoerliAddressURL(address)} className="h-8">
          {beautifyAddress(address)}
        </ExternalLink>
      </div>
      <div className="my-4 pt-4">
        <strong>{subject}</strong>
        <p>{message}</p>
      </div>
      <div className="flex-grow" />
      <div className="flex items-center justify-end space-x-4 overflow-hidden">
        <RainbowButton className="flex items-center space-x-2" isPlain>
          <GoReply />
          <span>REPLY</span>
        </RainbowButton>
        <RainbowButton className="flex items-center space-x-2" isPlain>
          <RiShareForwardFill />
          <span>FORWARD</span>
        </RainbowButton>
        <div className="flex-grow" />
        <p className="text-xs">Sent {relativeFormat(time)}</p>
      </div>
    </section>
  )
}

export default MessagePreview
