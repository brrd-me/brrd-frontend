import { type PropsWithChildren } from "react"

import {
  ConnectButton,
  useAccountModal,
  useConnectModal,
} from "@rainbow-me/rainbowkit"
import { GrInbox } from "react-icons/gr"
import { RiMailSendLine } from "react-icons/ri"

import { noOp } from "@/lib/helpers"
import { useEmojiAvatar } from "@/lib/emojiAvatarForAddress"
import RainbowInput from "@/components/RainbowInput"
import SendMessage from "@/components/SendMessage"
import NavItem from "./NavItem"

function Layout({ children }: PropsWithChildren<{}>) {
  const avatar = useEmojiAvatar()
  const { openAccountModal } = useAccountModal()
  const { openConnectModal = noOp } = useConnectModal()
  const onAccountPress = openAccountModal || openConnectModal

  return (
    <div className="flex p-4 max-w-4xl flex-col md:flex-row mx-auto min-h-screen">
      <div className="flex md:flex-col md:px-4 gap-4 mb-4">
        <NavItem
          isButton
          onClick={onAccountPress}
          style={{
            background: avatar.color,
          }}
          className="md:hidden"
        >
          {avatar.emoji}
        </NavItem>
        <NavItem href="/">
          <GrInbox />
        </NavItem>
        <NavItem href="/sent">
          <RiMailSendLine />
        </NavItem>
        <div className="py-2" />
        <SendMessage />
      </div>
      <div className="flex flex-col flex-grow space-y-4">
        <div className="flex items-center justify-between">
          <RainbowInput
            onText={dispatchInputEvent}
            className="w-full md:max-w-xs"
            placeholder="Search for an email"
            isPlain
          />
          <div className="hidden md:block">
            <ConnectButton showBalance={false} />
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export const EVENT_ON_SEARCH = "EVENT_ON_SEARCH"
function dispatchInputEvent(detail: string) {
  window.dispatchEvent(
    new CustomEvent(EVENT_ON_SEARCH, {
      detail,
    })
  )
}

export default Layout
