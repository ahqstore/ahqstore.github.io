/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./globals.css",
    "./theme/**/*.{mdx,css,ts,tsx}",
    "./docs/**/*.{mdx,md,ts,tsx,css}",
  ],
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
