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
         <div className="min-h-screen relative w-full inset-0">
            <div className="absolute inset-0 bg-main-dark/60"/>
            <img className="w-full h-full ml-auto" src={image} alt="" />
         </div>
      </>
   )
}
