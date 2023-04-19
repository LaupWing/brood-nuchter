import type { FC } from "react"
import type { Cart as CartType } from "@shopify/hydrogen/storefront-api-types"

export const CartDiscount:FC<{
   discountCodes: CartType["discountCodes"]
}> = ({ discountCodes }) => {
   const codes = discountCodes?.map(({ code }) => code).join(", ") || null

   return (
      <div>
         <dl className={codes ? "grid" : "hidden"}>
            <div className="flex items-center justify-between font-medium">
               <dt>Dicount(s)</dt>
               <div className="flex items-center justify-between">
                  
               </div>
            </div>
         </dl>
      </div>
   )
}