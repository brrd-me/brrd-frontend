import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import PrimitiveDialog, { DialogProps } from "./PrimitiveDialog"

function Modal({ children, ...props }: DialogProps) {
  return (
    <PrimitiveDialog
      className="items-center justify-center p-4 mb-12"
      {...props}
    >
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-95 scale-95"
        leaveTo="opacity-0 scale-90"
      >
        <Dialog.Panel className="w-screen max-w-xl transform rounded-[24px] bg-white py-6 px-8 text-left align-middle shadow-xl transition-all">
          {children}
        </Dialog.Panel>
      </Transition.Child>
    </PrimitiveDialog>
  )
}

export default Modal
