import { Fragment } from "react"

import { RiShareForwardFill } from "react-icons/ri"
import { GoReply } from "react-icons/go"

import useOnOffMachine from "@/lib/hooks/useOnOffMachine"
import RainbowButton from "./RainbowButton"
import ExternalLink from "./ExternalLink"
import Drawer from "./Drawer"

function MessageItem() {
  const modal = useOnOffMachine()
  return (
    <Fragment>
      <Drawer show={modal.isOn} onClose={modal.turnOff}>
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-black"></div>
          <ExternalLink className="h-8">0x01a...df0</ExternalLink>
        </div>
        <div className="my-4 pt-4 border-t">
          <strong>Subject</strong>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
        <div className="flex-grow" />
        <div className="flex items-center justify-end space-x-4 overflow-hidden">
          <RainbowButton className="flex items-center space-x-2" isPlain>
            <GoReply />
            <span>REPLY</span>
          </RainbowButton>
          <RainbowButton className="flex items-center space-x-2" isPlain>
            <RiShareForwardFill />
            <span>FORWARD</span>
          </RainbowButton>
        </div>
      </Drawer>
      <div
        onClick={modal.turnOn}
        className="cursor-pointer border-t max-w-xl flex items-center space-x-2 py-2"
      >
        <div className="bg-black w-12 h-12 rounded-full"></div>
        <div className="flex flex-col">
          <strong>TITLE</strong>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
      </div>
    </Fragment>
  )
}

export default MessageItem
