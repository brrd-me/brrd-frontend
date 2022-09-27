import { Fragment } from "react"

import { RiShareForwardFill } from "react-icons/ri"
import { GoReply } from "react-icons/go"

import emojiAvatarForAddress from "@/lib/emojiAvatarForAddress"
import { relativeFormat } from "@/lib/time"
import useOnOffMachine from "@/lib/hooks/useOnOffMachine"
import RainbowButton from "./RainbowButton"
import ExternalLink from "./ExternalLink"
import Drawer from "./Drawer"

function MessageItem({
  time,
  message,
  subject,
  address,
}: {
  time: number
  message: string
  subject: string
  address: string
}) {
  console.log({ time })
  const modal = useOnOffMachine()
  const userMeta = emojiAvatarForAddress(address)
  return (
    <Fragment>
      <Drawer show={modal.isOn} onClose={modal.turnOff}>
        <div className="flex items-center space-x-4">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-full"
            style={{ background: userMeta.color }}
          >
            {userMeta.emoji}
          </div>
          <ExternalLink className="h-8">0x01a...df0</ExternalLink>
        </div>
        <div className="my-4 pt-4 border-t">
          <strong>{subject}</strong>
          <p>{message}</p>
        </div>
        <div className="flex-grow" />
        <div className="flex items-center justify-end space-x-4 overflow-hidden">
          <p className="text-xs">Sent {relativeFormat(time)}</p>
          <div className="flex-grow" />
          <RainbowButton className="flex items-center space-x-2" isPlain>
            <GoReply />
            <span>REPLY</span>
          </RainbowButton>
          <RainbowButton className="flex items-center space-x-2" isPlain>
            <RiShareForwardFill />
            <span>FORWARD</span>
          </RainbowButton>
        </div>
      </Drawer>
      <div
        onClick={modal.turnOn}
        className="cursor-pointer border-t max-w-xl flex items-center space-x-2 py-2"
      >
        <div
          style={{ background: userMeta.color }}
          className="flex items-center justify-center w-12 min-w-[3rem] h-12 rounded-full"
        >
          {userMeta.emoji}
        </div>
        <div className="flex flex-col">
          <strong>{subject}</strong>
          <p>{message}</p>
          <p className="text-xs">{relativeFormat(time)}</p>
        </div>
      </div>
    </Fragment>
  )
}

export default MessageItem
