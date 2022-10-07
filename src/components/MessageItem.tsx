import { useEmojiAvatar } from "@/lib/emojiAvatarForAddress"
import { relativeFormat } from "@/lib/time"

function MessageItem({
  time,
  message,
  subject,
  address,
  onClick,
}: IEmail & {
  onClick(): void
}) {
  const avatar = useEmojiAvatar(address)
  return (
    <section
      onClick={onClick}
      className="cursor-pointer border-b last:border-none max-w-xl flex items-center space-x-2 py-2"
    >
      <div
        style={{ background: avatar.color }}
        className="flex items-center justify-center w-12 min-w-[3rem] h-12 rounded-full"
      >
        {avatar.emoji}
      </div>
      <div className="flex flex-col">
        <strong>{subject}</strong>
        <p>{message}</p>
        <p className="text-xs">{relativeFormat(time)}</p>
      </div>
    </section>
  )
}

export default MessageItem
