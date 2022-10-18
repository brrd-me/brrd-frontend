import { type PropsWithChildren } from "react"
import {
  ConnectButton,
  useAccountModal,
  useConnectModal,
} from "@rainbow-me/rainbowkit"

import { classnames, noOp } from "@/lib/helpers"
import { useEmojiAvatar } from "@/lib/emojiAvatarForAddress"

import { TbSend } from "react-icons/tb"
import { AiOutlineInbox } from "react-icons/ai"
import RainbowInput from "@/components/RainbowInput"
import SendMessage from "@/components/SendMessage"
import NavItem from "./NavItem"
import ExternalLink from "@/components/ExternalLink"

function Layout({
  children,
  showPreview,
}: PropsWithChildren<{ showPreview?: boolean }>) {
  const avatar = useEmojiAvatar()
  const { openAccountModal } = useAccountModal()
  const { openConnectModal = noOp } = useConnectModal()
  const onAccountPress = openAccountModal || openConnectModal

  return (
    <div className="flex flex-col mx-auto max-w-6xl">
      <main
        className={classnames(
          showPreview ? "lg:p-4 lg:pt-10" : "p-4 lg:pt-10",
          "flex flex-col md:flex-row min-h-screen"
        )}
      >
        <nav className="flex flex-col md:items-center">
          <section
            className={classnames(
              showPreview ? "hidden lg:flex" : "flex lg:flex-col",
              "md:flex-col md:px-4 gap-4 mb-4"
            )}
          >
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
              <AiOutlineInbox className="text-xl" />
            </NavItem>
            <NavItem href="/sent">
              <TbSend className="text-xl" />
            </NavItem>
            <div className="py-2" />
          </section>
          <SendMessage showPreview={showPreview} />
        </nav>
        <section className="flex flex-col flex-grow">
          <div
            className={classnames(
              showPreview ? "hidden lg:flex" : "flex",
              "items-center justify-between"
            )}
          >
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
        </section>
      </main>
      <footer
        className={classnames(
          showPreview ? "hidden lg:flex" : "flex",
          "text-sm text-zinc-600 items-center justify-between px-4 pt-4 pb-2"
        )}
      >
        <ExternalLink href="/about">About BRRd</ExternalLink>
        <span>
          Made with ❤️ by{" "}
          <ExternalLink
            href="https://rabani.to"
            className="italic hover:line-through"
            isPrimitive
          >
            Radish.
          </ExternalLink>
        </span>
      </footer>
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
