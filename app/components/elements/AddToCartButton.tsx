import { useFetcher } from "@remix-run/react"
import { CartLineInput } from "@shopify/hydrogen/storefront-api-types"
import { FC, ReactNode } from "react"

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