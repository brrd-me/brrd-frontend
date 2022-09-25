import type { PropsWithChildren } from "react"
import { classnames, noOp } from "@/lib/helpers"

function RainbowInput({
  value,
  onText = noOp as any,
  isPlain,
  className,
  placeholder,
  ...props
}: PropsWithChildren<
  Partial<HTMLInputElement> & {
    isPlain?: boolean
    onText?: (text: string) => void
    className?: string
  }
>) {
  return (
    <input
      {...(props as any)}
      value={value}
      placeholder={placeholder}
      onInput={({ currentTarget }) => onText(currentTarget.value)}
      className={classnames(
        className,
        isPlain ? "bg-zinc-50 border" : "shadow-lg",
        "rounded-[12px] transition-transform duration-150 hover:scale-105 active:scale-95 px-4 py-2"
      )}
      type="text"
    />
  )
}

export default RainbowInput
