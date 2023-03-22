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
         }
      },
      fontFamily: {
         sans: ["Open Sans","sans-serif"],
         serif: ["Playfair Display","sans-serif"]
      }
   },
   plugins: [],
}
