import image from "~/images/bread.png"

export const meta = () => {
   return {
      title: "Hydrogen",
      description: "A custom storefront powered by Hydrogen",
   }
}

export default function Index() {
   return (
      <>
         <img src={image} alt="" />
      </>
   )
}
