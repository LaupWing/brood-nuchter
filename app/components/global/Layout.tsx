import { FC, PropsWithChildren } from "react"
import { GiSlicedBread } from "react-icons/gi"
import { AiOutlineShop } from "react-icons/ai"
import { useWindowScroll } from "react-use"
import clsx from "clsx"
import { LayoutData } from "~/root"
import { MenuItem } from "@shopify/hydrogen/storefront-api-types"

const nav_links = [
   {
      name: "Home",
      to: "/home"
   },
   {
      name: "About",
      to: "/about"
   },
   {
      name: "Products",
      to: "/products"
   },
   {
      name: "Contact",
      to: "/contact"
   },
]

interface LayoutProps extends PropsWithChildren {
   layout: LayoutData
}

export const Layout:FC<LayoutProps> = ({
   children,
   layout
}) => {
   return (
      <div className="flex flex-col items-center">
         {/* <Header menu={layout.headerMenu} /> */}
         { children }
         {/* <div className="mx-auto w-full max-w-5xl">
         </div> */}
      </div>
   )
}

interface HeaderProps {
   menu: MenuItem[]
}
const Header:FC<HeaderProps> = ({
   menu
}) => {
   const { y } = useWindowScroll()
   
   return (
      <div className={clsx(
         "w-full flex flex-1 fixed top-0 z-[1000] duration-500",
         y > 50 && "backdrop-blur bg-main-dark/40"
      )}>
         <header className="container flex items-center justify-between mx-auto text-white py-4">
            <div className="flex items-center">
               <GiSlicedBread size={40} className="mr-1" />
               <div className="flex flex-col font-serif leading-4 text-lg">
                  <h1>Brood</h1>
                  <h1>Nuchter</h1>
               </div>
            </div>

            <nav className="flex space-x-10 items-center">
               <ul className="flex space-x-10">
                  {/* {menu.map((link, i) =>(
                     <li 
                        key={i}
                        className="tracking-tight"
                     >{link.title}</li>
                  ))} */}
               </ul>
               <AiOutlineShop size={30}/>
            </nav>
         </header>
      </div>
   )
}