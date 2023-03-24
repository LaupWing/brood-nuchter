import { FC, PropsWithChildren } from "react"
import { GiSlicedBread } from "react-icons/gi"
import { AiOutlineShop } from "react-icons/ai"
import { useWindowScroll } from "react-use"

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

export const Layout:FC<PropsWithChildren> = ({
   children
}) => {
   return (
      <div className="flex flex-col items-center">
         <Header />
         { children }
         {/* <div className="mx-auto w-full max-w-5xl">
         </div> */}
      </div>
   )
}

const Header = () => {
   const { y } = useWindowScroll()

   return (
      <header 
         className={clsx
         "container flex items-center justify-between mx-auto text-white fixed top-0 z-[1000] py-4"
         }
      >
         <div className="flex items-center">
            <GiSlicedBread size={40} className="mr-1" />
            <div className="flex flex-col font-serif leading-4 text-lg">
               <h1>Brood</h1>
               <h1>Nuchter</h1>
            </div>
         </div>

         <nav className="flex space-x-10 items-center">
            <ul className="flex space-x-10">
               {nav_links.map((link, i) =>(
                  <li 
                     key={i}
                     className="tracking-tight"
                  >{link.name}</li>
               ))}
            </ul>
            <AiOutlineShop size={30}/>
         </nav>
      </header>
   )
}