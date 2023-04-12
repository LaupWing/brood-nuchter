import { FC, PropsWithChildren, Suspense, useEffect } from "react"
import { GiSlicedBread } from "react-icons/gi"
import { AiOutlineShop } from "react-icons/ai"
import { useWindowScroll } from "react-use"
import clsx from "clsx"
import { LayoutData } from "~/root"
import { MenuItem } from "@shopify/hydrogen/storefront-api-types"
import { BiMenuAltRight, BiSearchAlt } from "react-icons/bi"
import { Drawer, useDrawer } from "~/components/global"
import { Cart, CartLoading } from "~/components/cart"
import { Await, useMatches } from "@remix-run/react"
import { useCartFetchers } from "~/hooks/useCartFetchers"

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
   const {
      isOpen: isCartOpen,
      openDrawer: openCart,
      closeDrawer: closeCart
   } = useDrawer()

   const addToCartFetchers = useCartFetchers("ADD_TO_CART")

   useEffect(() => {
      console.log(addToCartFetchers)      
   }, [addToCartFetchers])

   return (
      <>
         <CartDrawer 
            isOpen={isCartOpen}
            onClose={closeCart}
         />
         <HeaderDesktop 
            menu={menu} 
            openCart={openCart}
         />
      </>
   )
}

const CartDrawer:FC<{
   isOpen: boolean
   onClose: () => void
}> = ({
   isOpen,
   onClose
}) => {
   const [root] = useMatches()

   return (
      <Drawer 
         open={isOpen}
         onClose={onClose}
         heading="Cart"
         openFrom="right"
      >
         <div className="flex-1 flex flex-col min-h-0">
            <Suspense fallback={<CartLoading />}>
               <Await resolve={root.data?.cart}>
                  {(cart) => (
                     <Cart 
                        layout="drawer"
                        onClose={onClose}
                        cart={cart}
                     />
                  )}
               </Await>
            </Suspense>
         </div>
      </Drawer>
   )
}

const HeaderDesktop:FC<{
   menu: MenuItem[]
   openCart: () => void
}> = ({
   menu,
   openCart
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
               <AiOutlineShop 
                  className="cursor-pointer" 
                  size={30}
                  onClick={openCart}
               />
            </nav>
         </div>
      </header>
   )
}

const HeaderMobile = () => {
   return (
      <header className="fixed top-0 text-white justify-between z-[1000] backdrop-blur bg-main-dark/40 w-full flex p-2">
         <BiMenuAltRight className="justify-start flex-1 mr-auto" size={30}/>
         <div className="flex flex-1 items-center flex-grow w-full self-stretch justify-center">
            <GiSlicedBread size={30} className="mr-1" />
            <div className="flex flex-col font-serif leading-4 text-base">
               <h1>Brood</h1>
               <h1>Nuchter</h1>
            </div>
         </div>
         <div className="flex flex-1 gap-1 items-center justify-end">
            <AiOutlineShop size={24}/>
            <BiSearchAlt size={24}/>
         </div>
      </header>
   )
}