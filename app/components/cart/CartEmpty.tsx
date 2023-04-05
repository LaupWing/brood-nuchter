import clsx from "clsx"
import { FC, useRef } from "react"
import { CartLayoutsType } from "./Cart"

export const CartEmpty:FC<{
   hidden: boolean
   layout?: CartLayoutsType
   onClose?: () => void
}> = () => {
   return (
      <div>CartEmpty</div>
   )
}