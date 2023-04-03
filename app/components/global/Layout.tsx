import { FC, PropsWithChildren } from "react"
import { GiSlicedBread } from "react-icons/gi"
import { AiOutlineShop } from "react-icons/ai"
import { useWindowScroll } from "react-use"
import clsx from "clsx"
import { LayoutData } from "~/root"
import { MenuItem } from "@shopify/hydrogen/storefront-api-types"

interface LayoutProps extends PropsWithChildren {
   layout: LayoutData
}

export const Layout:FC<LayoutProps> = ({
   children,
   layout
}) => {
   return (
      <div className="flex flex-col items-center">
         <Header menu={layout.headerMenu.items} />
         { children }
         <Footer />
      </div>
   )
}

const Footer = () =>{
   return (
      <footer className="flex w-full py-14">
         <div className="flex container mx-auto justify-between items-start">
            <div className="flex space-x-16">
               <div className="text-white">
                  <h3 className="font-serif text-xl">Follow</h3>
                  <ul className="text-xs mt-4 tracking-wider gap-1 flex flex-col">
                     <li>Instagram</li>
                     <li>Facebook</li>
                  </ul>
               </div>
               <div className="text-white">
                  <h3 className="font-serif text-xl">Contact</h3>
                  <ul className="text-xs mt-4 tracking-wider gap-1 flex flex-col">
                     <li>06123456</li>
                     <li>hanyo@denhoed.com</li>
                  </ul>
               </div>
            </div>

            <div className="flex items-center text-white">
               <GiSlicedBread size={50} className="mr-2" />
               <div className="flex flex-col font-serif leading-5 text-2xl">
                  <h1>Brood</h1>
                  <h1>Nuchter</h1>
               </div>
            </div>

            <div className="flex space-x-16">
               <div className="text-white">
                  <h3 className="font-serif text-xl">BroodNuchter</h3>
                  <ul className="text-xs mt-4 tracking-wider gap-1 flex flex-col">
                     <li>1852XX, Heiloo</li>
                     <li>Vrieswijk 32</li>
                     <li>KVK: 12345676</li>
                  </ul>
               </div>
               <div className="text-white">
                  <h3 className="font-serif text-xl">Locations</h3>
                  <ul className="text-xs mt-4 tracking-wider gap-1 flex flex-col">
                     <li>Find locations</li>
                  </ul>
               </div>
            </div>
         </div>
      </footer>
   )
}


const Header:FC<{
   menu: MenuItem[]
}> = ({
   menu
}) => {
   const { y } = useWindowScroll()
   
   return (
      <header className={clsx(
         "w-full flex flex-1 fixed top-0 z-[1000] duration-500",
         y > 50 && "backdrop-blur bg-main-dark/40"
      )}>
         <div className="container flex items-center justify-between mx-auto text-white py-4">
            <div className="flex items-center">
               <GiSlicedBread size={40} className="mr-1" />
               <div className="flex flex-col font-serif leading-4 text-lg">
                  <h1>Brood</h1>
                  <h1>Nuchter</h1>
               </div>
            </div>

            <nav className="flex space-x-10 items-center">
               <ul className="flex space-x-10">
                  {menu.map((link, i) =>(
                     <li 
                        key={i}
                        className="tracking-tight"
                     >{link.title}</li>
                  ))}
               </ul>
               <AiOutlineShop size={30}/>
            </nav>
         </div>
      </header>
   )
}