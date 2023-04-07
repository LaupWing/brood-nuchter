import { useFetcher } from "@remix-run/react"
import { CartLineInput } from "@shopify/hydrogen/storefront-api-types"
import { FC, ReactNode } from "react"
import { CartAction } from "~/lib/type"

interface AddToCartButtonProps {
   children: ReactNode
   lines: CartLineInput[]
   className?: string
   analytics: unknown
   [key: string]: any
}

export const AddToCartButton:FC<AddToCartButtonProps> = ({
   children,
   lines,
   className,
   analytics,
   ...props
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
            value={CartAction.ADD_TO_CART}
         />
         <input 
            type="hidden" 
            name="lines" 
            value={JSON.stringify(lines)}
         />
         <input 
            type="hidden" 
            name="analytics" 
            value={JSON.stringify(analytics)}
         />
         <button
            type="submit"
            className={className}
            {...props}
         >
            {children}
         </button>
      </fetcher.Form>
   )
}