import { AiOutlineInfoCircle } from "react-icons/ai"
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
            <div className="z-50 my-auto container mx-auto">
               <div className="font-serif max-w-xs flex flex-col">
                  <h2 className="text-3xl text-white">Lorem ipsum dolor sit, amet consectetur</h2>
                  <p className="text-white text-sm mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis fugiat eveniet obcaecati corporis asperiores molestias eos dignissimos assumenda dolore et explicabo molestiae expedita.</p>
               </div>
               <button className="bg-accent-fire capitalize px-4 py-1 mt-4 shadow font-bold rounded tracking-tight text-main-dark">
                  Shop now
               </button>
            </div>
            <img 
               className="w-full h-full ml-auto object-cover absolute inset-0" 
               src={image} 
               alt="" 
            />
            <div className="h-[30%] bg-gradient-to-b from-main-dark/0 to-main-dark absolute w-full bottom-0 left-0"/>
         </div>
         <div className="container h-screen py-10">
            <h2 className="text-2xl text-accent-fire font-serif mb-10">Klant favorietes</h2>
            <section className="grid grid-cols-4 gap-4 py-10">
               {data.map(x => (
                  <div 
                     key={x.id}
                     className="aspect-[4/5] bg-main-gray shadow-main-gray shadow rounded hover:bg-accent-fire/30 duration-200 p-4 text-main-light"
                  >
                     <div className="h-[80%] relative">
                        <img 
                           src={tosti}
                           alt="" 
                           className="h-full object-cover absolute inset-0"
                        />
                        <AiOutlineInfoCircle 
                           className="absolute bottom-0 right-0"
                           size={30} 
                        />
                     </div>
                  </div>
               ))}
            </section>
         </div>
      </>
   )
}
