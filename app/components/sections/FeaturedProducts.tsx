import { useFetcher } from "@remix-run/react"
import { Product, ProductSortKeys } from "@shopify/hydrogen/storefront-api-types"
import { FC, useEffect, useMemo, useId } from "react"
import { Skeleton } from "../elements"

type LayoutType = "drawer" | "page"

interface FeaturedProductsProps {
   count: number
   heading: string
   layout?: LayoutType
   onClose?: () => void
   query?: string
   reverse?: boolean
   sortKey: ProductSortKeys
}

export const FeaturedProducts:FC<FeaturedProductsProps> = ({
   count = 4,
   heading =  "Shop Best Sellers",
   layout = "drawer",
   onClose,
   query,
   reverse,
   sortKey = "BEST_SELLING"
}) => {
   const { load, data } = useFetcher()
   const queryString = useMemo(
      () => 
         Object.entries({count, sortKey, query, reverse})
            .map(([key, val]) => (val ? `${key}=${val}` : null))
            .join("&")
   , [count, sortKey, query, reverse])
   
   useEffect(() => {
      load(`/api/products?${queryString}`)
   }, [load, queryString])

   console.log(data)
   return (
      <>
         FeaturedProducts
         <div>
            <FeaturedProductsContent 
               count={count}
               onClick={onClose}
               products={undefined}
            />
         </div>
      </>
   )
}

const FeaturedProductsContent:FC<{
   count: FeaturedProductsProps["count"]
   products: Product[] | undefined
   onClick?: () => void
}> = ({
   count,
   onClick,
   products
}) => {
   const id = useId()

   return (
      <>
         {[...new Array(count)].map((_, i) => (
            <div
               key={`${id + i}`}
               className="grid gap-2"
            >
               <Skeleton className="aspect-[3/4]" />
            </div>
         ))}
      </>
   )
}