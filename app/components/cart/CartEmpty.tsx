import clsx from "clsx"
import { FC } from "react"
import { CartLayoutsType } from "./Cart"
import { FeaturedProducts } from "../sections"

export const CartEmpty:FC<{
   hidden: boolean
   layout?: CartLayoutsType
   onClose?: () => void
}> = ({
   hidden,
   layout = "drawer",
   onClose
}) => {
   const container:Record<CartLayoutsType, string> = {
      drawer: "content-start gap-4 px-6 pb-8 transition overflow-y-scroll md:gap-12 md:px-12 h-screen-no-nav md:pb-12",
      page: clsx(
         hidden ? "" : "grid",
         "pb-12 w-full md:items-start gap-4 md:gap-8 lg:gap-12"
      )
   }

   return (
      <div
         hidden={hidden}
         className={container[layout]}
      >
         <section className="grid gap-6">
            Empty
         </section>
         <section className="grid gap-8">
            <FeaturedProducts 
               count={4}
               heading="Shop Best Sellers"
               layout={layout}
               onClose={onClose}
               sortKey="BEST_SELLING"
            />
         </section>
      </div>
   )
}