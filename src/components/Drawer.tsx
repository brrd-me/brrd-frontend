import { Fragment } from "react"
import { Transition, Dialog } from "@headlessui/react"
import PrimitiveDialog, { DialogProps } from "./PrimitiveDialog"

function Drawer({ children, ...props }: DialogProps) {
  return (
    <PrimitiveDialog className="items-center justify-end" {...props}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-75"
        enterTo="opacity-100"
        leave="ease-out duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog.Panel className="w-screen flex flex-col max-w-lg min-h-screen overflow-hidden bg-white p-6 text-left align-middle shadow-xl">
          {children}
        </Dialog.Panel>
      </Transition.Child>
    </PrimitiveDialog>
  )
}

export default Drawer
