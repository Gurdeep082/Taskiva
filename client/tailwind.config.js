/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        taskiva: {
          primary: "#123d3d",
          accent: "#2ac7a6",
          dark: "#0f2725",
          surface: "#f0f8f6",
        },
      },
    },
  },

  plugins: [],
};