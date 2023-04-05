import { FC, ReactNode } from "react"

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
      <div>Drawer</div>
   )
}