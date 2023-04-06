import { LoaderArgs } from "@shopify/remix-oxygen"

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
   
   return null
}