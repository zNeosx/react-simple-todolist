/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        black: "#1b1b1c",
        white: "#F4F2FF",
        primary: "#2B1887",
        purpleLight: "#D5CCFF",
      },
      fontFamily: {
        poppins: "Poppins, sans-serif",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
