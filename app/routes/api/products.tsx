import { LoaderArgs } from "@shopify/remix-oxygen"

export const loader = async ({request, context: { storefront }}: LoaderArgs) => {
   const url = new URL(request.url)
   
}