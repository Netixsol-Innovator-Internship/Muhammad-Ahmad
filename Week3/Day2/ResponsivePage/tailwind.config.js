/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.{html,js}"],
  darkMode:'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins"', "sans-serif"],
        montserrat: ['"Montserrat"', "sans-serif"],
        anton: ['"Anton"', "sans-serif"],
      },
       screens: {
        'xxl': '1728px',
      },
    },
  },
  plugins: [],
};
