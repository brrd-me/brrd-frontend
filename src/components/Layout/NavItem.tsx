import type { PropsWithChildren } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

import { classnames } from "@/lib/helpers"

function NavItem({
  children,
  href,
  onClick,
  style,
  isButton,
  className,
}: PropsWithChildren<{
  href?: any
  onClick?(): void
  style?: {}
  isButton?: boolean
  className?: string
}>) {
  const router = useRouter()
  const isActive = router.route === href
  const mergedClassName = classnames(
    className,
    isActive && "bg-zinc-50",
    "w-12 h-12 hover:bg-zinc-50 rounded-full flex items-center justify-center",
    "transition-transform ring-blue-500 duration-150 hover:ring-2 hover:scale-105 active:scale-95"
  )

  if (isButton) {
    return (
      <button onClick={onClick} style={style} className={mergedClassName}>
        {children}
      </button>
    )
  }

  return (
    <Link href={href}>
      <a style={style} className={mergedClassName}>
        {children}
      </a>
    </Link>
  )
}

export default NavItem
