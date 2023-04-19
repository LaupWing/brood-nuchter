import { FC } from "react"

export const CartCheckoutActions:FC<{
   checkoutUrl: string
}> = ({
   checkoutUrl
}) => {
   if(!checkoutUrl){
      return null
   }

   return (
      <div className="flex flex-col mt-2">
         <a href={checkoutUrl} target="_self">
            <button className="w-full">Continue to Checkout</button>
         </a>
      </div>
   )
}