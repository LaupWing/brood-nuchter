import { Money } from "@shopify/hydrogen"
import { CartCost } from "@shopify/hydrogen/storefront-api-types"
import { FC, ReactNode } from "react"

export const CartSummary:FC<{
   cost: CartCost
   layout: "drawer" | "page"
   children: ReactNode
}> = ({
   cost,
   layout,
   children
}) => {
   const containers:Record<"drawer"|"page", string> = {
      page: "",
      drawer: "grid gap-3 md:px-12 px-6 p-4 border-t"
   }
   return (
      <section
         aria-labelledby="summary-heading"
         className={containers[layout]}
      >
         <h2 
            className="sr-only" 
            id="summary-heading"
         >
            Order Summary
         </h2>
         <dl className="grid">
            <div className="flex items-center justify-between font-medium">
               <dt>Subtotal</dt>
               <dd>
                  { cost?.subtotalAmount?.amount ? (
                     <Money data={cost?.subtotalAmount} />
                  ): (
                     "-"
                  )}
               </dd>
            </div>
         </dl>
         { children }
      </section>
   )
}