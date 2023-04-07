import { useFetchers } from "@remix-run/react"

export const useCartFetchers = (actionName:string) => {
   const fetchers = useFetchers()
   const cartFetchers = []

   console.log(fetchers)
}