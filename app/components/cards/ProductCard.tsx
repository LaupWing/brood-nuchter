import { Image, Money, ShopifyAnalyticsProduct, flattenConnection } from "@shopify/hydrogen"
import { Product } from "@shopify/hydrogen/storefront-api-types"
import { SerializeFrom } from "@shopify/remix-oxygen"
import { FC } from "react"
import { IconInfo } from "../elements/Icons"
import { AddToCartButton } from "../elements"

interface ProductCardProps {
   product: SerializeFrom<Product> 
}

export const ProductCard:FC<ProductCardProps> = ({ product }) => {
   if(!product.variants.nodes.length){
      return null
   }
   
   const firstVariant = flattenConnection(product.variants)[0]
   const productAnalytics: ShopifyAnalyticsProduct = {
      productGid: product.id,
      variantGid: firstVariant.id,
      name: product.title,
      variantName: firstVariant.title,
      brand: product.vendor,
      price: firstVariant.price.amount,
      quantity: 1
   }

   return (
      <div className="bg-main-gray shadow-main-gray shadow rounded hover:bg-accent-fire/30 auto-rows-fr duration-200 p-4 text-main-light flex flex-col">
         <div className="aspect-[6/5] relative mb-3">
            <Image 
               data={firstVariant.image!}
               widths={[320]}
               sizes="320px"
               loaderOptions={{
                  crop: "center",
                  scale: 2,
                  width: 320,
                  height: 400
               }}
               alt={firstVariant.image?.altText || "Product image"} 
               loading="eager"
               className="h-full w-full object-cover absolute inset-0"
            />
            <div className="absolute bottom-0 right-0">
               <IconInfo
                  size={30} 
               />
            </div>
         </div>
         <div className="flex flex-col flex-1 space-y-4">
            <div className="flex justify-between font-serif mb-auto">
               <Money 
                  className="text-2xl" 
                  withoutTrailingZeros 
                  data={firstVariant.price!} 
               />
               <p>{firstVariant.weight} gram</p>
            </div>
            <div className="flex flex-col justify-between flex-1">
               <h2 className="font-bold font-serif tracking-wider text-lg">{product.title}</h2>
               <AddToCartButton 
                  className="bg-accent-fire ml-auto mt-2 text-xs text-main-dark font-bold rounded px-2 py-1"
                  lines={[{
                     merchandiseId: firstVariant.id,
                     quantity: 1
                  }]}
                  analytics={{
                     product: [productAnalytics],
                     totalValue: parseFloat(productAnalytics.price)
                  }}
               >
                  Toevoegen
               </AddToCartButton>
            </div>
         </div>
      </div>
   )
}
