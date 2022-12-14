import { Fragment, useEffect, useState } from "react"
import { useProvider } from "wagmi"
import { RiSendPlaneFill } from "react-icons/ri"

import { MOCK_USER_LIST } from "@/root/mockData/users"
import useSendEmail from "@/contracts/useSendEmail"
import useOnOffMachine from "@/lib/hooks/useOnOffMachine"
import useAccountPublics from "@/lib/hooks/useAccuntPublics"
import useAsyncState from "@/lib/hooks/useAsyncState"
import { createSharedWallet } from "@/lib/wallet"
import { generateEncryptedEmail } from "@/lib/email"
import { noOp } from "@/lib/helpers"

import RainbowButton from "@/components/RainbowButton"
import ExternalLink from "@/components/ExternalLink"
import Modal from "@/components/Modal"
import { useApplicationContext } from "@/sharedState/ApplicationContext"

import { useSendMessageContext } from "./SendMessageContext"
import ActionButton from "./ActionButton"

function SendMessage({ showPreview }: { showPreview?: boolean }) {
  // We asume signature is existent at user login
  const provider = useProvider()
  const { userProxyWallet, validateForRemoteSig } = useApplicationContext()
  const context = useSendMessageContext()
  const emailModal = useOnOffMachine()
  const [email, setEmail, resetEmailState] = useAsyncState({
    body: "",
    subject: "",
    reply: "",
  })
  const [sendingTo, setSendingTo, resetSendingToState] = useAsyncState({
    addressOrUsername: "",
    isUserAlias: false,
  })
  const { addressOrUsername } = sendingTo

  const recipientPublics = useAccountPublics(addressOrUsername)
  // Contract Mail Services
  const mailService = useSendEmail()
  async function handleSendEmail() {
    if (!recipientPublics) {
      return console.log("NO RECEPIENT")
    }
    /// Mock to encrypt
    if (userProxyWallet) {
      const { timestamp } = await provider.getBlock("latest")
      const sharedWallet = createSharedWallet(
        userProxyWallet.privateKey,
        recipientPublics.publicKey
      )
      const encryptedEmail = await generateEncryptedEmail({
        ...email,
        timestamp,
        sharedWallet,
        receiverPublicKey: recipientPublics.publicKey,
      })
      mailService.send(sendingTo.addressOrUsername, encryptedEmail).catch(noOp)
    } else {
      validateForRemoteSig()
    }
  }

  useEffect(() => {
    const username = cleanUpUsername(addressOrUsername)
    const userFound = MOCK_USER_LIST.find((item) => item === username)
    setSendingTo({ isUserAlias: !!userFound })
  }, [addressOrUsername])

  useEffect(() => {
    if (emailModal.isOff) {
      resetSendingToState()
      resetEmailState()
      // Reset state only when user closes modal
    }
  }, [emailModal.isOff])

  function onExternalSendMessageRequest(props: {
    body: string
    subject: string
    sendingTo: string
    reply: string
  }) {
    const { sendingTo: addressOrUsername, body, subject, reply } = props
    emailModal.turnOn()
    setSendingTo({ addressOrUsername })
    setEmail({
      body,
      subject,
      reply,
    })
  }

  context.__defineOpenMessageWithContent(onExternalSendMessageRequest)

  const isReply = email.reply.length > 0
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
                readOnly={isReply}
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
            readOnly={isReply}
            onChange={({ target: { value: subject } }) => setEmail({ subject })}
            className="w-full border-b py-3 outline-none"
            type="text"
            placeholder="Subject"
          />
          <div
            hidden={!isReply}
            className="text-gray-400 mt-4 max-h-[4rem] overflow-hidden flex items-end"
          >
            {email.reply}
          </div>
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
      <ActionButton showPreview={showPreview} onClick={emailModal.turnOn} />
    </Fragment>
  )
}

function cleanUpUsername(rawUsername: string) {
  return rawUsername.replace(/@/g, "")
}

export default SendMessage
