import { type PropsWithChildren, useMemo } from "react"
import { useAccount } from "wagmi"

import {
  ConnectButton,
  useAccountModal,
  useConnectModal,
} from "@rainbow-me/rainbowkit"
import { GrInbox } from "react-icons/gr"
import { RiMailSendLine } from "react-icons/ri"

import emojiAvatarForAddress from "@/lib/emojiAvatarForAddress"
import { noOp } from "@/lib/helpers"
import RainbowInput from "@/components/RainbowInput"
import SendMessage from "@/components/SendMessage"
import NavButton from "./NavButton"

export const EVENT_ON_SEARCH = "EVENT_ON_SEARCH"
function Layout({ children }: PropsWithChildren<{}>) {
  const { address } = useAccount()
  const { openAccountModal } = useAccountModal()
  const { openConnectModal = noOp } = useConnectModal()
  const userMeta = useMemo(() => {
    if (address) return emojiAvatarForAddress(address)
    return {
      color: "#FFE8E8",
      emoji: "👻",
    }
  }, [address])

  const onAccountPress = openAccountModal || openConnectModal
  return (
    <div className="flex p-4 max-w-4xl flex-col md:flex-row mx-auto min-h-screen">
      <div className="flex md:flex-col md:px-4 gap-4 mb-4">
        <NavButton
          onClick={onAccountPress}
          style={{
            background: userMeta.color,
          }}
          href="#"
          className="md:hidden"
        >
          {userMeta.emoji}
        </NavButton>
        <NavButton href="/">
          <GrInbox />
        </NavButton>
        <NavButton href="/sent">
          <RiMailSendLine />
        </NavButton>
        <div className="py-2" />
        <SendMessage />
      </div>
      <div className="flex flex-col flex-grow space-y-4">
        <div className="flex items-center justify-between">
          <RainbowInput
            onText={(detail) =>
              window.dispatchEvent(
                new CustomEvent(EVENT_ON_SEARCH, {
                  detail,
                })
              )
            }
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

export default Layout
