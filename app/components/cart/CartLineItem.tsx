import { Link } from "@remix-run/react"
import { Image } from "@shopify/hydrogen"
import { CartLine } from "@shopify/hydrogen/storefront-api-types"
import { FC } from "react"

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
            <div className="grid gap-2">
               <h3>
                  {merchandise?.product?.handle ? (
                     <Link to={`/products/${merchandise.product.handle}`}>
                        {merchandise?.product.title || ""}
                     </Link>
                  ) : merchandise?.product.title || ""}
               </h3>
               <div className="grid pb-2">
                  {(merchandise?.selectedOptions || []).map(option => (
                     <span key={option.name}>
                        {option.name}: {option.value}
                     </span>
                  ))}
               </div>
               <div className="flex items-center gap-2">
                  <div className="flex justify-start">
                     
                  </div>
               </div>
            </div>
         </div>
      </li>
   )
}