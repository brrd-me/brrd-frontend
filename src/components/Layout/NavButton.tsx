import type { PropsWithChildren } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

import { classnames } from "@/src/lib/helpers"

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
export default NavButton
