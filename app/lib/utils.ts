import { Menu, MenuItem } from "@shopify/hydrogen/storefront-api-types"
import { EnhancedMenu, EnhancedMenuItem } from "typings"

const parseItem = () => {
   return (item:MenuItem): EnhancedMenuItem => {
      return {
         ...item,
         
      }
   }
}

export const parseMenu = (menu: Menu):(EnhancedMenu|Menu) => {
   if(!menu.items){
      console.warn("Invalid menu passed to parseMenu function")
      return menu
   }
   return {
      ...menu
   }
}