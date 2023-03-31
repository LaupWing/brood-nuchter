import {
   type LinksFunction,
   type MetaFunction,
   type LoaderArgs,
} from "@shopify/remix-oxygen"
import {
   Links,
   Meta,
   Outlet,
   Scripts,
   ScrollRestoration,
   useLoaderData,
} from "@remix-run/react"
import type { MenuItem, Shop } from "@shopify/hydrogen/storefront-api-types"
import favicon from "../public/favicon.svg"
import tailwind from "./styles/tailwind-build.css"
import { Layout } from "~/components/global"

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
   headerMenu: MenuItem[]
   footerMenu: MenuItem[]
   shop: Shop
}

export async function loader({ context }: LoaderArgs) {
   const layout = await context.storefront.query<LayoutData>(LAYOUT_QUERY, {
      variables: {
         headerMenuHandle: "main-menu",
         footerMenuHandle: "footer"
      }
   })
   return { layout }
}

export default function App() {
   const data = useLoaderData<typeof loader>()

   console.log(data)

   return (
      <html lang="en">
         <head>
            <Meta />
            <Links />
         </head>
         <body className="flex flex-col overflow-y-auto bg-main-dark">
            <Layout>
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
