import { flattenConnection } from "@shopify/hydrogen"
import { ProductConnection } from "@shopify/hydrogen/storefront-api-types"
import { LoaderArgs, json } from "@shopify/remix-oxygen"
import invariant from "tiny-invariant"

export const loader = async ({request, context: { storefront }}: LoaderArgs) => {
   const url = new URL(request.url)
   const searchParams = new URLSearchParams(url.search)
   
   const sortKey = searchParams.get("sortKey") ?? "BEST_SELLING"
   const query = searchParams.get("query") ?? ""
   let reverse = false
   let count = 4

   try {
      const _reverse = searchParams.get("reverse")
      if(_reverse === "true"){
         reverse = true
      }
   }catch(_){}

   try {
      const _count = searchParams.get("count")
      if(typeof _count === "string"){
         count = parseInt(_count) 
      }
   }catch(_){}

   const { products } = await storefront.query<{
      products: ProductConnection
   }>(PRODUCTS_QUERY, {
      variables: {
         count,
         query,
         reverse,
         sortKey
      }
   })

   invariant(products, "No data returned from top products query")

   return json({
      products: flattenConnection(products)
   })
}

const PRODUCTS_QUERY = `#graphql
   query(
      $query: String
      $count: Int
      $reverse: Boolean
      $sortKey: ProductSortKeys
   ){
      products(first: $count, sortKey: $sortKey, reverse: $reverse, query: $query){
         nodes {
            id
            title
            publishedAt
            handle
            variants(first: 1){
               nodes {
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
                  selectedOptions {
                     name
                     value
                  }
                  product {
                     handle
                     title
                  }
               }
            }
         }
      }
   }
`