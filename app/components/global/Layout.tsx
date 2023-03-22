import { FC, PropsWithChildren } from "react"

export const Layout:FC<PropsWithChildren> = ({
   children
}) => {
   return (
      <div className="min-h-screen bg-main-dark">
         { children }
      </div>
   )
}
