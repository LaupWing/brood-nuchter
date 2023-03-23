import { FC, PropsWithChildren } from "react"

export const Layout:FC<PropsWithChildren> = ({
   children
}) => {
   return (
      <div className="min-h-screen w-screen flex flex-col bg-main-dark fixed inset-0 overflow-y-auto">
         { children }
         {/* <div className="mx-auto w-full max-w-5xl">
         </div> */}
      </div>
   )
}
