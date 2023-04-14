import type { Cart as CartType } from "@shopify/hydrogen/storefront-api-types"
import type { FC } from "react"
import { CartLines } from "./CartLines"

export const CartDetails:FC<{
   layout: "drawer" | "page"
   cart: CartType
}> = ({
   layout,
   cart
}) => {
   const isZeroCost = !cart || cart?.cost.subtotalAmount?.amount === "0.0"

   const container: Record<"drawer"|"page", string> = {
      drawer: "grid grid-cols-1 h-screen-no-nav grid-rows-[1fr_auto]",
      page: "w-full pb-12 grid md:grid-cols-2 md:items-start gap-8 md:gap-8 lg:gap-12"
   }

   return (
      <div className={container[layout]}>
         <CartLines 
            lines={cart?.lines} 
            layout={layout} 
         />
      </div>
   )
}