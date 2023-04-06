import { ActionArgs } from "@shopify/remix-oxygen"

export const action = async ({request, context}: ActionArgs) => {
   const {session, storefront} = context
   const headers = new Headers
}