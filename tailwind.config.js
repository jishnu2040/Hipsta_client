/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      olors: {
        primary: '#1D3557', // Deep navy
        accent: '#457B9D',  // Light blue
        background: '#F1FAEE', // Soft white
        textPrimary: '#333', // Dark text color
      },
    },
  },
  plugins: [],
}

