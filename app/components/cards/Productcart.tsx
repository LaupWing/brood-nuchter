import { AiOutlineInfoCircle } from "react-icons/ai"
import tosti from "~/images/tosti.png"

export const Productcart = () => {
   return (
      <div className="aspect-[4/5] bg-main-gray shadow-main-gray shadow rounded hover:bg-accent-fire/30 auto-rows-fr duration-200 p-4 text-main-light flex flex-col">
         <div className="h-[65%] relative mb-2">
            <img 
               src={tosti}
               alt="" 
               className="h-full w-full object-cover absolute inset-0"
            />
            <div className="absolute bottom-0 right-0">
               <AiOutlineInfoCircle
                  size={30} 
               />
            </div>
         </div>
         <div className="flex flex-col flex-1 space-y-4">
            <div className="flex justify-between font-serif mb-auto">
               <p>$ {x.price}</p>
               <p>{x.weight} gram</p>
            </div>
            <div className="flex items-end justify-between">
               <h2 className="font-bold font-serif tracking-wider text-xl">{x.name}</h2>
               <button className="bg-accent-fire text-xs text-main-dark font-bold rounded px-2 py-1">Toevoegen</button>
            </div>
         </div>
      </div>
   )
}
