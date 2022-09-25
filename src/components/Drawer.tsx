import { Fragment } from "react"
import { Transition, Dialog } from "@headlessui/react"
import PrimitiveDialog, { DialogProps } from "./PrimitiveDialog"

function Drawer({ children, ...props }: DialogProps) {
  return (
    <PrimitiveDialog {...props}>
      <div className="fixed inset-0 flex items-center justify-end">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-75"
          enterTo="opacity-100"
          leave="ease-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Panel className="max-w-lg w-full min-h-screen transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all">
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </PrimitiveDialog>
  )
}

export default Drawer
