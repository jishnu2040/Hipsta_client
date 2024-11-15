/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D3557', // Deep navy
        accent: '#457B9D',  // Light blue
        background: '#CE003D',
        textPrimary: '#333',
        auxilery: '#006e49' 
      },
    },
  },
  plugins: [],
}

