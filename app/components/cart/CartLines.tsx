import { flattenConnection } from "@shopify/hydrogen"
import type { Cart as CartType } from "@shopify/hydrogen/storefront-api-types"
import type { FC } from "react"
import { CartLineItem } from "./CartLineItem"

export const CartLines:FC<{
   layout: "drawer" | "page"
   lines: CartType["lines"] | undefined
}> = ({
   layout,
   lines: cartLines
}) => {
   const currentLines = cartLines ? flattenConnection(cartLines) : []
   const containers:Record<"drawer"|"page", string> = {
      page: "flex-grow md:traslate-y-4",
      drawer: "px-6 pb-6 sm-mas:pt-2 overflow-auto transition md:px-12"
   }

   return (
      <section
         aria-aria-labelledby="cart-contents"
         className={containers[layout]}
      >
         <ul className="grid gap-6 md:gap-10">
            {currentLines.map((line) => (
               <CartLineItem 
                  key={line.id}
                  line={line}
               />
            ))}
         </ul>
      </section>
   )
}