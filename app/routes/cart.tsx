import { ActionArgs } from "@shopify/remix-oxygen"

export const action = async ({request, context}: ActionArgs) => {
   const {session, storefront} = context
   const headers = new Headers()

   const [formData, storeCartId, customerAccessToken] = await Promise.all([
      request.formData(),
      session.get("cartId"),
      session.get("customerAccessToken")
   ])

   console.log({formData, storeCartId, customerAccessToken})
   return null
}