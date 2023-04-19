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
            <button className="w-full bg-accent-fire capitalize py-2 font-bold rounded tracking-tight text-main-dark">Continue to Checkout</button>
         </a>
      </div>
   )
}