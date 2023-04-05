import {
   type LinksFunction,
   type MetaFunction,
   type LoaderArgs,
   defer,
   AppLoadContext,
} from "@shopify/remix-oxygen"
import {
   Links,
   Meta,
   Outlet,
   Scripts,
   ScrollRestoration,
   useLoaderData,
} from "@remix-run/react"
import type { Shop, Menu, Cart } from "@shopify/hydrogen/storefront-api-types"
import favicon from "../public/favicon.svg"
import tailwind from "./styles/tailwind-build.css"
import { Layout } from "~/components/global"
import invariant from "tiny-invariant"

export const links: LinksFunction = () => {
   return [
      { rel: "stylesheet", href: tailwind },
      {
         rel: "preconnect",
         href: "https://cdn.shopify.com",
      },
      {
         rel: "preconnect",
         href: "https://shop.app",
      },
      { rel: "icon", type: "image/svg+xml", href: favicon },
   ]
}

export const meta: MetaFunction = () => ({
   charset: "utf-8",
   viewport: "width=device-width,initial-scale=1",
})

export interface LayoutData {
   headerMenu: Menu
   footerMenu: Menu
   shop: Shop
}

export async function loader({ context }: LoaderArgs) {
   const data = await context.storefront.query<LayoutData>(LAYOUT_QUERY, {
      variables: {
         headerMenuHandle: "main-menu",
         footerMenuHandle: "footer"
      }
   })
   
   return defer({ layout: {
      shop: data.shop!,
      headerMenu: data.headerMenu!,
      footerMenu: data.footerMenu!
   } })
}

export default function App() {
   const data = useLoaderData<typeof loader>()

   return (
      <html lang="en">
         <head>
            <Meta />
            <Links />
         </head>
         <body className="flex flex-col overflow-y-auto bg-main-dark">
            <Layout layout={data.layout as LayoutData}>
               <Outlet />
            </Layout>
            <ScrollRestoration />
            <Scripts />
         </body>
      </html>
   )
}

const LAYOUT_QUERY = `#graphql
   query layoutMenus(
      $headerMenuHandle: String!
      $footerMenuHandle: String!
   ) {
      shop {
         name
         id
         description
      }
      headerMenu: menu(handle: $headerMenuHandle) {
         id
         items {
            ...MenuItem
            items {
               ...MenuItem
            }
         }
      }
      footerMenu: menu(handle: $footerMenuHandle) {
         id
         items {
            ...MenuItem
            items {
               ...MenuItem
            }
         }
      }
   }

   fragment MenuItem on MenuItem {
      id
      resourceId
      tags
      title
      type
      url
   }
`


export const getCart = async ({ storefront }: AppLoadContext, cartId: string) => {
   invariant(storefront, "Missing storefront client in cart query")
   const { cart } = await storefront.query<{cart?: Cart}>(CART_QUERY, {
      variables: {
         cartId
      },
      cache: storefront.CacheNone()
   })

   return cart
}

export const CART_QUERY = `#graphql
   query CartQuery($cartId: ID!){
      cart(id: $cartId){
         ...CartFragment
      }
   }

   fragment CartFragment on Cart {
      id
      checkoutUrl
      totalQuantity
      buyerIdentity {
         countryCode
         customer {
            id
            email
            firstName
            lastName
            displayName
         }
         email
         phone
      }
      lines(first: 100){
         edges {
            node {
               id
               quantity
               attributes {
                  key
                  value
               }
               cost {
                  totalAmount {
                     amount
                     currencyCode
                  }
                  amountPerQuantity {
                     amount
                     currencyCode
                  }
                  compareAtAmountPerQuantity {
                     amount
                     currencyCode
                  }
               }
               merchandise {
                  ... on ProductVariant {
                     id
                     availableForSale
                     compareAtPrice {
                        ...MoneyFragment
                     }
                     price {
                        ...MoneyFragment
                     }
                     requiresShipping
                     title
                     image {
                        ...ImageFragment
                     }
                     product {
                        handle
                        title
                        id
                     }
                     selectedOptions {
                        name
                        value
                     }
                  }
               }
            }
         }
      }
      cost {
         subtotalAmount {
            ...MoneyFragment
         }
         totalAmount {
            ...MoneyFragment
         }
         totalDutyAmount {
            ...MoneyFragment
         }
         totalTaxAmount {
            ...MoneyFragment
         }
      }
      note
      attributes {
         key
         value
      }
      discountCodes {
         code
      }
   }

   fragment MoneyFragment on MoneyV2 {
      currencyCode
      amount
   }

   fragment ImageFragment on Image {
      id
      url
      altText
      width
      height
   }
`