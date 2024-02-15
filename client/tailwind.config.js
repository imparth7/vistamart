// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#B99750",
          "100": "#B99750",
          "200": "#B99750",
          "300": "#B99750",
          "400": "#B99750",
          "500": "#B99750",
          "600": "#B99750",
          "700": "#B99750",
          "800": "#B99750",
          "900": "#B99750",
          "950": "#B99750",
          // "50":"#fffbeb","100":"#fef3c7","200":"#fde68a","300":"#fcd34d","400":"#fbbf24","500":"#f59e0b","600":"#d97706","700":"#b45309","800":"#92400e","900":"#78350f","950":"#451a03"
        }
      },
      scale: {
        '115': '1.15',
      }
    },
  },
  darkMode: "class",
  plugins: [
    nextui()
  ]
}