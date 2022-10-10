import { Fragment, useEffect } from "react"
import { RiSendPlaneFill } from "react-icons/ri"

import useSendEmail from "@/contracts/useSendEmail"
import useOnOffMachine from "@/lib/hooks/useOnOffMachine"
import useAsyncState from "@/lib/hooks/useAsyncState"
import { MOCK_USER_LIST } from "@/src/mockData/users"

import RainbowButton from "@/components/RainbowButton"
import ExternalLink from "@/components/ExternalLink"
import Modal from "@/components/Modal"
import ActionButton from "./ActionButton"

const cleanUpUsername = (rawUsername: string) => rawUsername.replace(/@/g, "")

function SendMessage() {
  const emailModal = useOnOffMachine()
  const [email, setEmail, resetEmailState] = useAsyncState({
    body: "",
    subject: "",
  })
  const [sendingTo, setSendingTo, resetSendingToState] = useAsyncState({
    addressOrUsername: "",
    isUserAlias: false,
  })
  const { addressOrUsername } = sendingTo

  // Contract services
  const emailSender = useSendEmail()

  function handleSendEmail() {
    emailSender.send(addressOrUsername, email.subject, email.body)
  }

  useEffect(() => {
    const username = cleanUpUsername(addressOrUsername)
    const userFound = MOCK_USER_LIST.find((item) => item === username)
    setSendingTo({ isUserAlias: !!userFound })
  }, [addressOrUsername])

  useEffect(() => {
    resetSendingToState()
    resetEmailState()
  }, [emailModal.isOn])

  return (
    <Fragment>
      <Modal
        closeOnBackdropClick={false}
        onClose={emailModal.turnOff}
        show={emailModal.isOn}
      >
        <div className="text-base flex flex-col h-full">
          <label
            htmlFor="sendingTo"
            className="flex cursor-text border-b items-center space-x-2"
          >
            <div className="whitespace-nowrap text-gray-400">To:</div>
            <div className="relative flex-grow">
              <div
                hidden={!sendingTo.isUserAlias}
                className="absolute bg-white z-[1] pointer-events-none left-0 h-full flex items-center"
              >
                <span className="pointer-events-none font-bold">
                  {sendingTo.addressOrUsername}
                </span>
                <span className="text-xs ml-1">
                  (
                  <ExternalLink className="pointer-events-auto">
                    0x0A2...401
                  </ExternalLink>
                  )
                </span>
              </div>
              <input
                id="sendingTo"
                value={sendingTo.addressOrUsername}
                onChange={({ target: { value: addressOrUsername } }) =>
                  setSendingTo({ addressOrUsername })
                }
                className="w-full py-3 outline-none"
                type="text"
                placeholder="@username"
              />
            </div>
          </label>
          <input
            value={email.subject}
            onChange={({ target: { value: subject } }) => setEmail({ subject })}
            className="w-full border-b py-3 outline-none"
            type="text"
            placeholder="Subject"
          />
          <textarea
            value={email.body}
            onChange={({ target: { value: body } }) => setEmail({ body })}
            className="w-full min-h-[10rem] border-b py-3 outline-none"
            placeholder="Body"
          />
          <div className="flex-grow" />
          <div className="flex justify-end mt-4">
            <RainbowButton
              onClick={handleSendEmail}
              className="flex items-center space-x-2 text-lg px-6 py-3"
              isPlain
            >
              <RiSendPlaneFill />
              <span>SEND</span>
            </RainbowButton>
          </div>
        </div>
      </Modal>
      <ActionButton onClick={emailModal.turnOn} />
    </Fragment>
  )
}

export default SendMessage
