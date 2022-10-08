import useStorageState from "@/lib/hooks/useStorateState"
import { useEmojiAvatar } from "@/lib/emojiAvatarForAddress"
import { relativeFormat } from "@/lib/time"
import { classnames } from "@/lib/helpers"

const STORAGE_KEY = "BRRD_USER_SEEN_MAILS"
function MessageItem({
  time,
  message,
  subject,
  address,
  onClick,
  serialized,
  previewEmail,
}: ISerializedEmail & {
  onClick(): void
  previewEmail: ISerializedEmail
}) {
  const avatar = useEmojiAvatar(address)
  const [storageState, updateStorageState] = useStorageState(
    STORAGE_KEY + address,
    {
      [serialized]: false,
    },
    {
      mockState: {
        [serialized]: true, // Render optimistic state to keep UI pure
      },
    }
  )

  function handleOnClick() {
    updateStorageState({ [serialized]: true })
    onClick()
  }

  const userAlreadyClickedMail = storageState[serialized]
  const isPreviewEmail = serialized === previewEmail.serialized
  return (
    <button
      onClick={handleOnClick}
      className={classnames(
        isPreviewEmail && "bg-zinc-50",
        "relative text-left border-b border-b-zinc-50 last:border-b-0 max-w-xl flex items-center space-x-2 pl-2 py-2 hover:bg-gradient-to-br from-white to-zinc-50"
      )}
    >
      <div
        className={classnames(
          "w-[4px] h-full absolute left-0 top-0 transition-colors",
          userAlreadyClickedMail || "bg-black"
        )}
      />
      <div
        style={{ background: avatar.color }}
        className="flex ml-2 items-center justify-center w-12 min-w-[3rem] h-12 rounded-full"
      >
        {avatar.emoji}
      </div>
      <div className="flex flex-col">
        <strong>{subject}</strong>
        <p>{message}</p>
        <p className="text-xs">{relativeFormat(time)}</p>
      </div>
    </button>
  )
}

export default MessageItem
