import type { Cart as CartType, CartUserError, UserError } from "@shopify/hydrogen/storefront-api-types"
import { ActionArgs } from "@shopify/remix-oxygen"
import invariant from "tiny-invariant"
import { CartAction } from "~/lib/type"

export const action = async ({request, context}: ActionArgs) => {
   const {session, storefront} = context
   const headers = new Headers()

   const [formData, cartId, customerAccessToken] = await Promise.all([
      request.formData(),
      session.get("cartId"),
      session.get("customerAccessToken")
   ])
   const cartAction = formData.get("cartAction") as CartAction
   invariant(cartAction, "No cartAction defined")
   
   let status = 200
   let result:{
      cart: CartType
      errors?: CartUserError[] | UserError[]
   }
   
   return null
}