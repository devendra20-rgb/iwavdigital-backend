/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2C7FAF",
        primaryDark: "#3160A4",
        orange: "#E49624",
        gold: "#DDA329",
        gold2: "#E09D26",
        mint: "#CAF0DD",
      }
    },
  },
  plugins: [],
};
