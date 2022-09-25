import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import PrimitiveDialog, { DialogProps } from "./PrimitiveDialog"

function Modal({ children, ...props }: DialogProps) {
  return (
    <PrimitiveDialog {...props}>
      <div className="fixed inset-0 flex items-center justify-center p-4 mb-12">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-95 scale-95"
          leaveTo="opacity-0 scale-90"
        >
          <Dialog.Panel className="max-w-lg w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </PrimitiveDialog>
  )
}

export default Modal
