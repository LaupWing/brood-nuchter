import { useFetcher } from "@remix-run/react"
import { Product, ProductSortKeys } from "@shopify/hydrogen/storefront-api-types"
import { FC, useEffect, useMemo, useId } from "react"
import { Skeleton } from "../elements"
import clsx from "clsx"
import { ProductCard } from "../cards"

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

   const styles = clsx([
      "grid grid-cols-2 gap-x-6 gap-y-8",
      layout === "page" ? "md:grid-cols-4 sm:grid-cols-4" : ""
   ])

   return (
      <>
         <h2 className="uppercase font-bold text-sm opacity-80">
            {heading}
         </h2>
         <div className={styles}>
            <FeaturedProductsContent 
               count={count}
               onClick={onClose}
               products={data?.products}
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
   console.log(products)
   if(!products){
      return (
         <>
            {[...new Array(count)].map((_, i) => (
               <div
                  key={`${id + i}`}
                  className="grid gap-2"
               >
                  <Skeleton className="aspect-[3/4]" />
                  <Skeleton className="w-32 h-4" />
               </div>
            ))}
         </>
      )
   }

   return (
      <>
         {products.map(product => (
            <ProductCard 
               product={product}
               key={product.id}
            />
         ))}
      </>
   )
}