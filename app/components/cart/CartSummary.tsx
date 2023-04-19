export const CartSummary = () => {
   const containers:Record<"drawer"|"page", string> = {
      page: "",
      drawer: "grid gap-3 p-4 border-t"
   }
   return (
      <section
         aria-labelledby="summary-heading"
      >
         CartSummary
      </section>
   )
}