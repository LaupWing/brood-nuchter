import image from "~/images/bread.jpg"

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
         </div>
         <div className="container h-screen py-10">
            <h2 className="text-2xl text-accent-fire font-serif">Klant favorietes</h2>
         </div>
      </>
   )
}
