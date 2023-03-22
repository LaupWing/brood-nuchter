import { FC, PropsWithChildren } from "react"

export const Layout:FC<PropsWithChildren> = ({
   children
}) => {
   return (
      <div className="min-h-screen w-screen flex flex-col bg-main-dark">
         <div className="mx-auto w-full max-w-5xl">
            { children }
         </div>
      </div>
   )
}
