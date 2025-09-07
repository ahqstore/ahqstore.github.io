/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./globals.css",
    "./theme/**/*.{mdx,css,ts,tsx}",
    "./docs/**/*.{mdx,md,ts,tsx,css}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  prefix: "tw-",
  plugins: [require("daisyui")],
  daisyui: {
    prefix: "dui-",
    logs: false,
  },
};
