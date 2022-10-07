import { classnames } from "@/lib/helpers"
import { RiMailAddFill } from "react-icons/ri"

function ActionButton({ onClick }: { onClick(): void }) {
  return (
    <button
      onClick={onClick}
      className={classnames(
        "transition-transform ring-blue-500 duration-150 hover:ring-2 hover:scale-105 active:scale-95",
        "w-12 h-12 bg-black shadow-md rounded-full flex items-center justify-center",
        "fixed group md:relative bottom-0 right-0 m-4 md:m-0"
      )}
    >
      <RiMailAddFill className="text-white transform text-lg group-hover:-rotate-3" />
    </button>
  )
}

export default ActionButton
