import { Menu, MenuItem } from "@shopify/hydrogen/storefront-api-types"

interface BreadType {
   id: number
   name: string 
   description: string 
   price: number
   image: string 
   weight: number 
   ingredients: string[] 
}

export interface EnhancedMenu extends Menu {
   items: EnhancedMenuItem[] 
}

export interface EnhancedMenuItem extends MenuItem {
   to: string
   target: string
   isExternal?: boolean
   items: EnhancedMenuItem[]
}