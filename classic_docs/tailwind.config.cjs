/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,css,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  prefix: "",
  plugins: [require("daisyui")],
  daisyui: {
    prefix: "dui-",
    logs: false,
  },
};
