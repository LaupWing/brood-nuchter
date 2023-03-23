import { FC, PropsWithChildren } from "react"
import { GiSlicedBread } from "react-icons/gi"

export const Layout:FC<PropsWithChildren> = ({
   children
}) => {
   return (
      <div className="min-h-screen w-screen flex flex-col bg-main-dark fixed inset-0 overflow-y-auto">
         <Header />
         { children }
         {/* <div className="mx-auto w-full max-w-5xl">
         </div> */}
      </div>
   )
}

const Header = () => {
   return (
      <header>
         <GiSlicedBread />
      </header>
   )
}