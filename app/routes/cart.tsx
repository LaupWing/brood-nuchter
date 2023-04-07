import type { CartInput, CartLineInput, Cart as CartType, CartUserError, UserError } from "@shopify/hydrogen/storefront-api-types"
import { ActionArgs, AppLoadContext } from "@shopify/remix-oxygen"
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

   switch (cartAction){
      case CartAction.ADD_TO_CART:
         const lines = formData.get("lines")
            ? (JSON.parse(String(formData.get("lines"))) as CartLineInput[])
            : ([] as CartLineInput[])
         
         invariant(lines.length, "No lines added")

         if(!cartId){
            // result = await cartCreate
         } else {

         }
   }
   
   return null
}

const CREATE_CART_MUTATION = `#graphql
   mutation($input: CartInput!) {
      cartCreate(input: $input){
         cart {
            id,
            totalQuantity
         }
         errors: userErrors {
            message
            field
            code
         }
      }
   }
`

const cartCreate = async ({
   input,
   storefront
}:{
   input: CartInput
   storefront: AppLoadContext["storefront"]
}) => {
   const {} = await storefront.mutate<{
      cartCreate: {
         cart: CartType
         errors: CartUserError[]
      }
      errors: UserError[]
   }>("")
}