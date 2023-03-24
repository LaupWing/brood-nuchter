import { AiFillFacebook, AiFillInstagram, AiOutlineFieldTime, AiOutlineInfoCircle } from "react-icons/ai"
import image from "~/images/bread.jpg"
import tosti from "~/images/tosti.png"
import data from "../dummy/data.json"


export const meta = () => {
   return {
      title: "Hydrogen",
      description: "A custom storefront powered by Hydrogen",
   }
}

export default function Index() {
   return (
      <>
         <div className="h-screen relative w-full inset-0 flex flex-col">
            <div className="absolute inset-0 bg-main-dark/60 z-50"/>
            <div className="z-50 my-auto container mx-auto flex justify-between">
               <div className="font-serif max-w-xs flex flex-col">
                  <h2 className="text-3xl text-white">Lorem ipsum dolor sit, amet consectetur</h2>
                  <p className="text-white text-sm my-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis fugiat eveniet obcaecati corporis asperiores molestias eos dignissimos assumenda dolore et explicabo molestiae expedita.</p>
                  <button className="bg-accent-fire capitalize px-4 py-1 mt-4 shadow font-bold rounded tracking-tight text-main-dark mr-auto">
                     Shop now
                  </button>
               </div>
               <div className="flex flex-col text-main-light mb-auto space-y-4">
                  <AiFillInstagram size={24} />
                  <AiFillFacebook size={24} />
               </div>
            </div>
            <img 
               className="w-full h-full ml-auto object-cover absolute inset-0" 
               src={image} 
               alt="" 
            />
            <div className="h-[30%] bg-gradient-to-b from-main-dark/0 to-main-dark absolute w-full bottom-0 left-0"/>
         </div>
         <div className="container py-10">
            <div className="flex justify-between mb-10 items-center text-accent-fire">
               <h2 className="text-2xl font-serif">Klant favorietes</h2>
               <div className="text-xs flex items-center text-accent-bread">
                  <AiOutlineFieldTime size={34} className="mr-2" />
                  <p className="max-w-[10rem] leading-4">Alle orders kunnen worden opgehaald op woensdag en zaterdag</p>
               </div>
            </div>
            <section className="grid grid-cols-4 gap-4 py-10 auto-rows-auto">
               {data.map(x => (
                  <div 
                     key={x.id}
                     className="aspect-[4/5] bg-main-gray shadow-main-gray shadow rounded hover:bg-accent-fire/30 auto-rows-fr duration-200 p-4 text-main-light flex flex-col"
                  >
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
               ))}
            </section>
         </div>
      </>
   )
}
