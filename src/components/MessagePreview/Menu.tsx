import { Menu as HeadlessMenu } from "@headlessui/react"

import { BiMenu } from "react-icons/bi"
import { HiExternalLink } from "react-icons/hi"
import { TbTagOff } from "react-icons/tb"

const { Button, Items, Item } = HeadlessMenu
function Menu() {
  return (
    <HeadlessMenu as="div" className="relative">
      <Button className="border border-white hover:border-zinc-50 focus:border-zinc-50 p-2 rounded-full">
        <BiMenu className="text-2xl" />
      </Button>
      <Items className="top-full right-0 mt-2 flex flex-col overflow-hidden absolute bg-white shadow rounded-[12px]">
        <Item
          as="button"
          className="p-4 flex space-x-4 items-center justify-between text-left border-zinc-50 hover:bg-zinc-50 border-b last:border-b-0 whitespace-nowrap"
        >
          <span>View TX</span>
          <HiExternalLink className="text-xl text-black/80" />
        </Item>
        <Item
          as="button"
          className="p-4 flex space-x-4 items-center justify-between text-left border-zinc-50 hover:bg-zinc-50 border-b last:border-b-0 whitespace-nowrap"
        >
          <span>Mark as spam</span>
          <TbTagOff className="text-xl text-black/80" />
        </Item>
      </Items>
    </HeadlessMenu>
  )
}

export default Menu
