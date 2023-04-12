import type { CartInput, CartLineInput, Cart as CartType, CartUserError, UserError } from "@shopify/hydrogen/storefront-api-types"
import { ActionArgs, AppLoadContext, json } from "@shopify/remix-oxygen"
import invariant from "tiny-invariant"
import { CartAction } from "~/lib/type"

export const action = async ({request, context}: ActionArgs) => {
   const {session, storefront} = context
   const headers = new Headers()

   const [formData, storeCartId, customerAccessToken] = await Promise.all([
      request.formData(),
      session.get("cartId"),
      session.get("customerAccessToken")
   ])
   let cartId = storeCartId
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
            result = await cartCreate({
               input: {
                  lines
               },
               storefront
            })
         } else {
            result = await cartAdd({
               cartId,
               lines,
               storefront
            })
         }
         cartId = result.cart.id
         break
      default:
         invariant(false, `${cartAction} cart action is not defined`)
   }
   
   session.set("cartId", cartId)
   headers.set("Set-Cookie", await session.commit())

   const redirectTo = formData.get("redirectTo") ?? null

   if(typeof redirectTo === "string") {
      status = 303
      headers.set("Location", redirectTo)
   }

   const {cart, errors} = result
   
   return json(
      {
         cart,
         errors,
         analytics: {
            cartId
         }
      },
      {
         status,
         headers
      }
   )
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
   const {
      cartCreate
   } = await storefront.mutate<{
      cartCreate: {
         cart: CartType
         errors: CartUserError[]
      }
      errors: UserError[]
   }>(CREATE_CART_MUTATION, {
      variables: {
         input
      }
   })
   invariant(cartCreate, "No data returned from the cartCreate mutation")

   return cartCreate
}

const ADD_LINES_MUTATION = `#graphql
   mutation($cartId: ID!, $lines: [CartLineInput!]!){
      cartLinesAdd(cartId: $cartId, lines: $lines){
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
const cartAdd = async ({
   cartId,
   lines,
   storefront
}: {
   cartId: string
   lines: CartLineInput[]
   storefront: AppLoadContext["storefront"]
}) => {
   const { cartLinesAdd } = await storefront.mutate<{
      cartLinesAdd: {
         cart: CartType
         errors: CartUserError[]
      }
   }>(ADD_LINES_MUTATION, {
      variables: {
         cartId,
         lines
      }
   })

   return cartLinesAdd
}