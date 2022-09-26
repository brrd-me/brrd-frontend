import { PropsWithChildren, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useAccount } from "wagmi"

import {
  ConnectButton,
  useAccountModal,
  useConnectModal,
} from "@rainbow-me/rainbowkit"
import { GrInbox } from "react-icons/gr"
import { RiMailSendLine } from "react-icons/ri"

import emojiAvatarForAddress from "@/lib/emojiAvatarForAddress"
import { classnames, noOp } from "@/lib/helpers"
import RainbowInput from "./RainbowInput"
import SendMessage from "./SendMessage"

function NavButton({
  children,
  href,
  onClick,
  style,
  className,
}: PropsWithChildren<{
  href?: any
  onClick?(): void
  style?: {}
  className?: string
}>) {
  const router = useRouter()
  const isActive = router.route === href
  return (
    <Link href={href}>
      <a
        onClick={onClick}
        style={style}
        className={classnames(
          className,
          isActive && "bg-zinc-50",
          "w-12 h-12 hover:bg-zinc-50 rounded-full flex items-center justify-center",
          "transition-transform ring-blue-500 duration-150 hover:ring-2 hover:scale-105 active:scale-95"
        )}
      >
        {children}
      </a>
    </Link>
  )
}

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
        <div className="flex-grow" />
        <SendMessage />
      </div>
      <div className="flex flex-col flex-grow space-y-4">
        <div className="flex items-center justify-between">
          <RainbowInput
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
