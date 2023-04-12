import type { FC } from "react"
import type { Cart as CartType } from "@shopify/hydrogen/storefront-api-types"
import { CartEmpty } from "./CartEmpty"
export type CartLayoutsType = "page" | "drawer"

export const Cart:FC<{
   layout: CartLayoutsType
   onClose?: () => void
   cart: CartType | null
}> = ({
   layout,
   onClose,
   cart
}) => {
   const isEmpty = Boolean(cart?.lines?.edges?.length || 0)

   return (
      <>
         {isEmpty && <CartEmpty
            onClose={onClose}
            layout={layout}
         />}
      </>
   )
}