import type { FC } from "react"
import type { Cart as CartType } from "@shopify/hydrogen/storefront-api-types"
import { CartEmpty } from "./CartEmpty"
import { CartLines } from "./CartLines"
import { CartDetails } from "./CartDetails"
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
   const notEmpty = Boolean(cart?.lines?.edges?.length || 0)

   return (
      <>
         {!notEmpty ? (
            <CartEmpty
               onClose={onClose}
               layout={layout}
            />
         ) : (
            <CartDetails 
               cart={cart!}
               layout={layout}
            />
         )}
      </>
   )
}