import { classnames, noOp } from "@/lib/helpers"

function RainbowInput({
  value,
  onText = noOp,
  isPlain,
  className,
  placeholder,
}) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onInput={({ target }) => onText(target.value)}
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
