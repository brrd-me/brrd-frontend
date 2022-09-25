import { GrInbox } from "react-icons/gr"
import { RiMailSendLine } from "react-icons/ri"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { PropsWithChildren } from "react"
import Link from "next/link"
import { classnames } from "@/lib/helpers"
import { useRouter } from "next/router"
import RainbowInput from "./RainbowInput"
import SendMessage from "./SendMessage"

function NavButton({ children, href }: PropsWithChildren<{ href?: any }>) {
  const router = useRouter()
  const isActive = router.route === href
  return (
    <Link href={href}>
      <a
        className={classnames(
          isActive && "bg-zinc-50",
          "w-12 h-12 hover:bg-zinc-50 hover:ring-2 rounded-full flex items-center justify-center"
        )}
      >
        {children}
      </a>
    </Link>
  )
}

function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="flex p-4 max-w-4xl mx-auto min-h-screen">
      <div className="flex px-4 flex-col space-y-4 mb-4">
        <div className="w-12 h-12 bg-black rounded-full"></div>
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
          <RainbowInput placeholder="Search for an email" isPlain />
          <ConnectButton showBalance={false} />
        </div>
        {children}
      </div>
    </div>
  )
}

export default Layout