/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'sm': '640px',  // Small screens
        'md': '768px',  // Medium screens
        'xm': '900px',  // screen between medium and large
        'lg': '1025px', // Large screens
        'xl': '1281px', // Extra-large screens
      },
    },
  },
  plugins: [],
};
