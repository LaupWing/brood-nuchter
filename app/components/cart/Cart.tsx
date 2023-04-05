import type { FC } from "react"
import type { Cart as CartType } from "@shopify/hydrogen/storefront-api-types"
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
   const linesCount = Boolean(cart?.lines?.edges?.length || 0)

   return (
      <>
         
      </>
   )
}