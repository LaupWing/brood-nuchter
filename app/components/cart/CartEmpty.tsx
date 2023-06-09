import clsx from "clsx"
import { FC } from "react"
import { CartLayoutsType } from "./Cart"
import { FeaturedProducts } from "../sections"

export const CartEmpty:FC<{
   layout?: CartLayoutsType
   onClose?: () => void
}> = ({
   layout = "drawer",
   onClose
}) => {
   const container:Record<CartLayoutsType, string> = {
      drawer: "content-start flex flex-col gap-4 px-6 pb-8 transition overflow-y-scroll md:gap-12 md:px-12 md:pb-12",
      page: "pb-12 w-full md:items-start gap-4 md:gap-8 lg:gap-12"
   }

   return (
      <div className={container[layout]}>
         <section className="grid gap-6">
            <span>Looks like you haven’t added anything yet, let’s get you started!</span>
            <button className="bg-accent-fire capitalize px-4 py-1 mt-4 shadow font-bold rounded tracking-tight text-main-dark">Continue shopping</button>
         </section>
         <section className="grid gap-8 pt-16">
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