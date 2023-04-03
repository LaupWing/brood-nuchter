import { Image, Money, flattenConnection } from "@shopify/hydrogen"
import { Product } from "@shopify/hydrogen/storefront-api-types"
import { SerializeFrom } from "@shopify/remix-oxygen"
import { FC } from "react"
import { AiOutlineInfoCircle } from "react-icons/ai"
import tosti from "~/images/products/tosti.png"

interface ProductCardProps {
   product: SerializeFrom<Product> 
}

export const ProductCard:FC<ProductCardProps> = ({ product }) => {
   if(!product.variants.nodes.length){
      return null
   }
   
   const firstVariant = flattenConnection(product.variants)[0]
   console.log(firstVariant)

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
               <AiOutlineInfoCircle
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
               <p>50 gram</p>
            </div>
            <div className="flex flex-col justify-between flex-1">
               <h2 className="font-bold font-serif tracking-wider text-xl">{product.title}</h2>
               <button className="bg-accent-fire ml-auto mt-2 text-xs text-main-dark font-bold rounded px-2 py-1">Toevoegen</button>
            </div>
         </div>
      </div>
   )
}
