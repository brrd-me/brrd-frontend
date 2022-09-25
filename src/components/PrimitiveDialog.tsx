import { Fragment, PropsWithChildren } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { noOp } from "@/lib/helpers"

export type DialogProps = PropsWithChildren<{
  show?: boolean
  onClose?(): void
}>

function PrimitiveDialog({
  children,
  show = false,
  onClose = noOp,
}: DialogProps) {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>
        <div tabIndex={0} className="opacity-0" />
        {children}
      </Dialog>
    </Transition>
  )
}

export default PrimitiveDialog
