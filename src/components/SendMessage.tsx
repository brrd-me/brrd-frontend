import { Fragment, useState } from "react"
import { Drawer, SIZE } from "baseui/drawer"
import RainbowButton from "./RainbowButton"
import ExternalLink from "./ExternalLink"
import { RiShareForwardFill } from "react-icons/ri"
import { GoReply } from "react-icons/go"
import { IoMdCreate } from "react-icons/io"

function SendMessage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const toggleModalOpen = () => setIsModalOpen((open) => !open)
  return (
    <Fragment>
      <Drawer
        size={SIZE.auto}
        isOpen={isModalOpen}
        overrides={{
          DrawerBody: {
            style: {
              width: "100vw",
              maxWidth: "40rem",
            },
          },
        }}
        autoFocus
        onClose={toggleModalOpen}
      >
        <div tabIndex={0} />
        <div className="text-base flex flex-col h-full">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-black"></div>
            <ExternalLink>0x01a...df0</ExternalLink>
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
        </div>
      </Drawer>
      <div
        onClick={toggleModalOpen}
        className="w-12 cursor-pointer h-12 bg-indigo-500 shadow-md hover:ring-2 rounded-full flex items-center justify-center"
      >
        <IoMdCreate className="text-white text-xl" />
      </div>
    </Fragment>
  )
}

export default SendMessage
