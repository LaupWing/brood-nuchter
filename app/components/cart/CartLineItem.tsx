import { Link, useFetcher } from "@remix-run/react"
import { Image, Money } from "@shopify/hydrogen"
import { CartLine, CartLineUpdateInput } from "@shopify/hydrogen/storefront-api-types"
import { FC, ReactNode } from "react"
import { CartAction } from "~/lib/type"
import { IconTrashcan } from "../elements"

export const CartLineItem:FC<{
   line: CartLine
}> = ({
   line
}) => {
   if(!line?.id){
      return null
   }
   const {
      id,
      quantity,
      merchandise  
   } = line

   if(typeof quantity === "undefined" || !merchandise?.product) {
      return null
   }

   return (
      <li
         key={id}
         className="flex gap-4"
      >
         <div className="flex-shrink">
            {merchandise.image && (
               <Image 
                  width={220}
                  height={220}
                  data={merchandise.image}
                  className="object-cover object-center w-24 h-24 border rounded md:w-28 md:h-28"
                  alt={merchandise.title}
               />
            )}
         </div>

         <div className="flex justify-between flex-grow">
            <div className="flex flex-col justify-between">
               <h3>
                  {merchandise?.product?.handle ? (
                     <Link to={`/products/${merchandise.product.handle}`}>
                        {merchandise?.product.title || ""}
                     </Link>
                  ) : merchandise?.product.title || ""}
               </h3>
               <div className="flex items-center gap-2">
                  <div className="flex justify-start">
                     <CartLineQuantityAdjust line={line} />
                  </div>
                  <ItemRemoveButton lineIds={[id]} />
               </div>
            </div>
            <CartLinePrice line={line} as="span" />
         </div>
      </li>
   )
}

const CartLineQuantityAdjust:FC<{line: CartLine}> = ({
   line
}) => {
   if(!line || typeof line?.quantity === "undefined") {
      return null
   }
   const {
      id: lineId,
      quantity
   } = line
   const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0))
   const nextQuantity = Number((quantity + 1).toFixed(0))

   return (
      <>
         <label 
            htmlFor={`quantity-${lineId}`}
            className="sr-only"
         >
            Quantity, {quantity}
         </label>
         <div className="flex items-center border rounded">
            <UpdateCartButton lines={[{id: lineId, quantity: prevQuantity}]}>
               <button
                  name="decrease-quantity"
                  aria-label="Decrease quantity"
                  className="w-10 h-10 transition disabled:bg-gray-300 bg-accent-fire"
                  disabled={quantity <= 1}
                  value={prevQuantity}
               >
                  <span>&#8722;</span>
               </button>
            </UpdateCartButton>

            <div className="px-4 text-center" data-test="item-quantity">
               {quantity}
            </div>

            <UpdateCartButton lines={[{id: lineId, quantity: nextQuantity}]}>
               <button
                  className="w-10 h-10 transition disabled:bg-gray-300 bg-accent-fire"
                  name="increase-quantity"
                  value={nextQuantity}
                  aria-label="Increase quantity"
               >
                  <span>&#43;</span>
               </button>
            </UpdateCartButton>
         </div>
      </>
   )
}

const UpdateCartButton:FC<{
   children: ReactNode
   lines: CartLineUpdateInput[]
}> = ({
   children,
   lines
}) => {
   const fetcher = useFetcher()

   return (
      <fetcher.Form action="/cart" method="post">
         <input 
            type="hidden" 
            name="cartAction" 
            value={CartAction.UPDATE_CART}
         />
         <input 
            type="hidden" 
            name="lines" 
            value={JSON.stringify(lines)}
         />
         {children}
      </fetcher.Form>
   )
}

const ItemRemoveButton:FC<{
   lineIds: CartLine["id"][]
}> = ({ lineIds }) => {
   const fetcher = useFetcher()

   return (
      <fetcher.Form
         action="/cart"
         method="post"
      >
         <input 
            type="hidden" 
            name="cartAction"
            value={CartAction.REMOVE_FROM_CART}
         />
         <input 
            type="hidden" 
            name="lineIds"
            value={JSON.stringify(lineIds)}
         />
         <button 
            className="flex items-center justify-center w-10 h-10 border rounded"
            type="submit"
         >
            <span className="sr-only">remove</span>
            <IconTrashcan aria-hidden />
         </button>
      </fetcher.Form>
   )
}

const CartLinePrice:FC<{
   line: CartLine
   priceType?: "regular" | "compareAt"
   [key: string]: any
}> = ({
   line,
   priceType = "regular",
   ...props
}) => {
   if(!line.cost?.amountPerQuantity || !line?.cost?.totalAmount) {
      return null
   }

   const moneyV2 = priceType === "regular"
      ? line.cost.totalAmount
      : line.cost.compareAtAmountPerQuantity

   if (moneyV2 == null) {
      return null
   }

   return (
      <Money
         className="font-serif text-2xl"
         withoutTrailingZeros
         data={moneyV2}
         {...props}
      />
   )
}