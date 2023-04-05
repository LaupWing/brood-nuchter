import { ProductSortKeys } from "@shopify/hydrogen/storefront-api-types"
import { FC } from "react"

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
   return (
      <div>FeaturedProducts</div>
   )
}