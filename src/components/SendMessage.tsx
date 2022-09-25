import { Fragment } from "react"

import { RiSendPlaneFill } from "react-icons/ri"
import { IoMdCreate } from "react-icons/io"

import { classnames } from "@/lib/helpers"
import useOnOffMachine from "@/lib/hooks/useOnOffMachine"
import RainbowButton from "./RainbowButton"
import RainbowInput from "./RainbowInput"
import Modal from "./Modal"

function SendMessage() {
  const drawer = useOnOffMachine()
  return (
    <Fragment>
      <Modal
        closeOnBackdropClick={false}
        onClose={drawer.turnOff}
        show={drawer.isOn}
      >
        <div className="text-base flex flex-col h-full">
          <div className="flex items-center space-x-4">
            <strong>Send To:</strong>
            <RainbowInput isPlain placeholder="@username" />
          </div>
          <div className="my-4 border-t">
            <input
              className="w-full border-b py-3 outline-none"
              type="text"
              placeholder="Subject"
            />
            <textarea
              className="w-full min-h-[10rem] border-b py-3 outline-none"
              placeholder="Mail body"
            />
          </div>
          <div className="flex-grow" />
          <div className="flex justify-end">
            <RainbowButton
              className="flex items-center space-x-2 text-lg px-6 py-3"
              isPlain
            >
              <RiSendPlaneFill />
              <span>SEND</span>
            </RainbowButton>
          </div>
        </div>
      </Modal>
      <button
        onClick={drawer.turnOn}
        className={classnames(
          "transition-transform ring-blue-500 duration-150 hover:ring-2 hover:scale-105 active:scale-95",
          "cursor-pointer w-12 h-12 bg-[#00FFC2] shadow-md rounded-full flex items-center justify-center"
        )}
      >
        <IoMdCreate className="text-black text-2xl" />
      </button>
    </Fragment>
  )
}

export default SendMessage
