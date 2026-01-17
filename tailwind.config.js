/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wolf: {
          green: '#8CC63F',
          dark: '#050a14',
          navy: '#0B162A',
        }
      }
    },
  },
  plugins: [],
}
