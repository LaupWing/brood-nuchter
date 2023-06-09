/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./app/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            main: {
               dark: "#141313",
               gray: "#1D1D1D",
               light: "#EFEFEF" 
            },
            accent: {
               fire: "#F3A446",
               bread: "#A06235"
            }
         },
         spacing: {
            nav: "var(--height-nav)"
         },
         height: {
            "minus-nav": "calc(100vh - var(--height-nav))",
            "screen-dynamic": "var(--screen-height-dynamic, 100vh)"
         }
      },
      fontFamily: {
         sans: ["Open Sans","sans-serif"],
         serif: ["Playfair Display","sans-serif"]
      }
   },
   plugins: [
      require("@tailwindcss/forms")
   ],
}
