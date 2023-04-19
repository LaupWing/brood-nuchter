import type { FC, PropsWithChildren } from "react"
import type { Cart as CartType } from "@shopify/hydrogen/storefront-api-types"
import { useFetcher } from "@remix-run/react"
import { CartAction } from "~/lib/type"
import { IconTrashcan } from "../elements"

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
                  <UpdateDiscountForm>
                     <button>
                        <IconTrashcan
                           aria-hidden="true"
                           size={22}
                        />
                     </button>
                  </UpdateDiscountForm>
               </div>
            </div>
         </dl>
      </div>
   )
}

const UpdateDiscountForm:FC<PropsWithChildren> = ({
   children
}) => {
   const fetcher = useFetcher()

   return (
      <fetcher.Form 
         action="/cart"
         method="post"
      >
         <input 
            type="hidden" 
            name="cartAction" 
            value={CartAction.UPDATE_DISCOUNT}
         />
         { children }
      </fetcher.Form>
   )
}