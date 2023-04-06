import { useFetcher } from "@remix-run/react"
import { ProductSortKeys } from "@shopify/hydrogen/storefront-api-types"
import { FC, useMemo } from "react"

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
            .join("")
   , [count, sortKey, query, reverse])
   console.log(queryString)

   return (
      <div>FeaturedProducts</div>
   )
}