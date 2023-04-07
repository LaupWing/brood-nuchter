import type { ReactNode } from "react"
import { Transition, Dialog } from "@headlessui/react"
import clsx from "clsx"
import { Fragment, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"

interface DrawerProps {
   heading?: string
   open: boolean
   onClose: () => void
   openFrom?: "right" | "left"
   children: ReactNode
}

export const Drawer = ({
   heading,
   open,
   openFrom = "right",
   onClose,
   children
}: DrawerProps) => {
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
            className={"relative z-[100000]"} 
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
               <div className="fixed inset-0 bg-black/25"/>
            </Transition.Child>
            <div className="fixed inset-0">
               <div className="absolute inset-0 overflow-hidden">
                  <div className={clsx(
                     "fixed inset-y-0 flex max-w-full",
                     openFrom === "right" ? "right-0" : ""
                  )}>
                     <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-300"
                        enterFrom={offscreen[openFrom]}
                        enterTo="translate-x-0"
                        leave="tranform transition ease-in-out duration-300"
                        leaveFrom="translate-x-0"
                        leaveTo={offscreen[openFrom]}
                     >
                        <Dialog.Panel className="w-screen max-w-lg text-left align-middle transition-all transform shadow-xl h-screen-dynamic bg-main-dark/80 backdrop-blur text-white flex flex-col min-h-0">
                           <header
                              className={clsx(
                                 "stick top-0 flex shrink-0 items-center h-20 px-6 sm:px-8 md:px-12",
                                 heading ? "justify-between" : "justify-end"
                              )}
                           >
                              {heading !== null && (
                                 <Dialog.Title>
                                    <span className="text-2xl font-serif">{heading}</span>
                                 </Dialog.Title>
                              )}
                              <button
                                 type="button"
                                 className=""
                                 onClick={onClose}
                              >
                                 <AiOutlineClose/>
                              </button>
                           </header>
                           {children}
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </div>
         </Dialog>
      </Transition>
   )
}

Drawer.Title = Dialog.Title

export const useDrawer = (openDefault = false) => {
   const [isOpen, setIsOpen] = useState(openDefault)

   function openDrawer(){
      setIsOpen(true)
   }

   function closeDrawer(){
      setIsOpen(false)
   }

   return {
      isOpen,
      openDrawer,
      closeDrawer
   }
}
