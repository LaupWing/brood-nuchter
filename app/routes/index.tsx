import { 
   AiFillFacebook, 
   AiFillInstagram, 
   AiOutlineFieldTime 
} from "react-icons/ai"
import image from "~/images/bread.jpg"
import { BiFilter, BiSortDown } from "react-icons/bi"
import { ProductCard } from "~/components/cards"
import { LoaderArgs, defer } from "@shopify/remix-oxygen"
import { ProductConnection } from "@shopify/hydrogen/storefront-api-types"
import { Await, useLoaderData } from "@remix-run/react"
import { Suspense } from "react"

export const meta = () => {
   return {
      title: "Hydrogen",
      description: "A custom storefront powered by Hydrogen",
   }
}

export const loader = ({ context }: LoaderArgs) => {
   return defer({
      featuredProducts: context.storefront.query<{
         products: ProductConnection
      }>(HOME_PAGE_FEATURED_PRODUCTS_QUERY)
   })
}

export default function Index() {
   const { featuredProducts } = useLoaderData<typeof loader>()

   return (
      <>
         <div className="h-screen relative px-6 w-full inset-0 flex flex-col">
            <div className="absolute inset-0 bg-main-dark/60 z-50"/>
            <div className="z-50 my-auto container mx-auto flex justify-between">
               <div className="font-serif max-w-xs flex flex-col">
                  <h2 className="text-3xl text-white">Lorem ipsum dolor sit, amet consectetur</h2>
                  <p className="text-white text-sm my-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis fugiat eveniet obcaecati corporis asperiores molestias eos dignissimos assumenda dolore et explicabo molestiae expedita.</p>
                  <button className="bg-accent-fire capitalize px-4 py-1 mt-4 shadow font-bold rounded tracking-tight text-main-dark mr-auto">
                     Shop now
                  </button>
               </div>
               <div className="flex flex-col text-main-light mb-auto space-y-4">
                  <AiFillInstagram size={24} />
                  <AiFillFacebook size={24} />
               </div>
            </div>
            <img 
               className="w-full h-full ml-auto object-cover absolute inset-0" 
               src={image} 
               alt="" 
            />
            <div className="h-[30%] bg-gradient-to-b from-main-dark/0 to-main-dark absolute w-full bottom-0 left-0"/>
         </div>
         {/* <div className="container py-10">
            <div className="flex justify-between mb-10 items-center text-accent-fire">
               <h2 className="text-2xl font-serif">Klant favorietes</h2>
               <div className="text-xs flex items-center text-accent-bread">
                  <AiOutlineFieldTime size={34} className="mr-2" />
                  <p className="max-w-[10rem] leading-4">Alle orders kunnen worden opgehaald op woensdag en zaterdag</p>
               </div>
            </div>
            <div className="flex space-x-4">
               <button className="text-accent-fire font-bold text-sm tracking-wider border-2 border-accent-fire rounded px-2 py-1 flex items-center justify-center w-24">
                  <BiFilter className="mr-1" size={22} /> Filter</button>
               <button className="text-accent-fire font-bold text-sm tracking-wider border-2 border-accent-fire rounded px-2 py-1 flex items-center justify-center w-24">
                  <BiSortDown className="mr-1" size={22} />
                  Sort
               </button>
            </div>
            {featuredProducts && <Suspense>
               <Await resolve={featuredProducts}>
                  {({ products }) => {
                     return (
                        <section className="grid grid-cols-4 gap-4 py-10 auto-rows-auto">
                           {products.nodes.map(product => (
                              <ProductCard 
                                 product={product}
                                 key={product.id}
                              />   
                           ))}
                        </section>
                     )
                  }}
               </Await>
            </Suspense>}
         </div> */}
      </>
   )
}

export const HOME_PAGE_FEATURED_PRODUCTS_QUERY = `#graphql
   query FeaturedProducts {
      products(first: 8) {
         nodes {
            id
            title
            handle
            variants(first: 1){
               nodes {
                  weight
                  id
                  image {
                     url
                     altText
                     width
                     height
                  }
                  price {
                     amount
                     currencyCode
                  }
                  compareAtPrice {
                     amount
                     currencyCode
                  }
               }
            }
         }
      }
   }
`