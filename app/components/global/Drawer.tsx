import { Transition, Dialog } from "@headlessui/react"
import { FC, ReactNode, Fragment } from "react"

interface DrawerProps {
   heading?: string
   open: boolean
   onClose: () => void
   openFrom: "right" | "left"
   children: ReactNode
}

export const Drawer:FC<DrawerProps> = ({
   heading,
   open,
   openFrom = "right",
   onClose,
   children
}) => {
   const offscreen = {
      right: "translate-x-full",
      left: "-translate-x-full",
   }

   return (
      <Transition 
         appear 
         show={open} 
         as={Fragment}
      >
         <Dialog 
            as="div" 
            className={"relative z-50"} 
            onClose={onClose}
         >
            <Transition.Child
               as={Fragment}
               enter="ease-out duration-300"
               enterFrom="opacity-0 left-0"
               enterTo="opacity-100"
               leave="ease-in duration-200"
               leaveFrom="opacity-100"
               leaveTo="opacity-0"
            >
               <div className="fixed inset bg-black/25"/>
            </Transition.Child>
         </Dialog>
      </Transition>
   )
}