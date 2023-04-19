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
      drawer: "grid gap-3 p-4 border-t"
   }
   return (
      <section
         aria-labelledby="summary-heading"
         className={containers.drawer}
      >
         <h2 className="sr-only" id="summary-heading">Order Summary</h2>
      </section>
   )
}