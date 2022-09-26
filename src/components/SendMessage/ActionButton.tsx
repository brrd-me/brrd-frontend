import { IoMdCreate } from "react-icons/io"

import { classnames } from "@/lib/helpers"

function ActionButton({ onClick }: { onClick(): void }) {
  return (
    <button
      onClick={onClick}
      className={classnames(
        "transition-transform ring-blue-500 duration-150 hover:ring-2 hover:scale-105 active:scale-95",
        "cursor-pointer w-12 h-12 bg-[#00FFC2] shadow-md rounded-full flex items-center justify-center"
      )}
    >
      <IoMdCreate className="text-black text-2xl" />
    </button>
  )
}

export default ActionButton
