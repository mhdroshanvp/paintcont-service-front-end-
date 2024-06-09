/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
        // Add more font families here
      },
    },
  },
  plugins: [],
};
