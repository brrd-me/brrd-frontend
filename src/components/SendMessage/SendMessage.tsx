import { Fragment, useEffect } from "react"
import { utils } from "ethers"
import { RiSendPlaneFill } from "react-icons/ri"

import useSendEmail from "@/contracts/useSendEmail"
import useOnOffMachine from "@/lib/hooks/useOnOffMachine"
import useAsyncState from "@/lib/hooks/useAsyncState"
import { MOCK_USER_LIST } from "@/src/mockData/users"

import RainbowButton from "@/components/RainbowButton"
import ExternalLink from "@/components/ExternalLink"
import RainbowInput from "@/components/RainbowInput"
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
  const { addressOrUsername, isUserAlias } = sendingTo

  // Contract services
  const emailSender = useSendEmail()

  function handleSendEmail() {
    emailSender.send(sendingTo.addressOrUsername, email.subject, email.body)
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

  const showPositiveState = isUserAlias || utils.isAddress(addressOrUsername)
  return (
    <Fragment>
      <Modal
        closeOnBackdropClick={false}
        onClose={emailModal.turnOff}
        show={emailModal.isOn}
      >
        <div className="text-base flex flex-col h-full">
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <strong>Send To:</strong>
            <div className="flex space-x-2">
              <RainbowInput
                isPlain
                className={`w-full ${showPositiveState && "font-bold"}`}
                value={sendingTo.addressOrUsername}
                onText={(addressOrUsername) =>
                  setSendingTo({ addressOrUsername })
                }
                placeholder="@username"
              />
              {sendingTo.isUserAlias && (
                <ExternalLink className="px-4">0x01a...df0</ExternalLink>
              )}
            </div>
          </div>
          <div className="my-4 border-t">
            <input
              value={email.subject}
              onChange={({ target: { value: subject } }) =>
                setEmail({ subject })
              }
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
          </div>
          <div className="flex-grow" />
          <div className="flex justify-end">
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
