import { Product } from "@shopify/hydrogen/storefront-api-types"
import { SerializeFrom } from "@shopify/remix-oxygen"
import { FC } from "react"
import { AiOutlineInfoCircle } from "react-icons/ai"
import tosti from "~/images/products/tosti.png"

interface ProductCardProps {
   product: SerializeFrom<Product> 
}

export const ProductCard:FC<ProductCardProps> = ({ product }) => {
   console.log(product)
   

   return (
      <div className="bg-main-gray shadow-main-gray shadow rounded hover:bg-accent-fire/30 auto-rows-fr duration-200 p-4 text-main-light flex flex-col">
         <div className="aspect-[6/5] relative mb-2">
            <img 
               src={tosti}
               alt="" 
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
               {/* <p>$ {product.}</p> */}
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
