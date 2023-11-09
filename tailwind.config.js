/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'ErrorBg': 'url(../../src/assets/404-page.jpg)'
      }
    },
   
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ['corporate','business'],
  },
}
