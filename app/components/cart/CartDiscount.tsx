import type { FC } from "react"
import type { Cart as CartType } from "@shopify/hydrogen/storefront-api-types"

export const CartDiscount:FC<{
   discountCodes: CartType["discountCodes"]
}> = () => {
   return (
      <div>CartDiscount</div>
   )
}