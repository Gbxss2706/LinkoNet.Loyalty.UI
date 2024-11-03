/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: false,
  important: ':root',
  separator: ':',
  theme: {
    extend: {},
    screens: {
      sm: "375px",
      lg: "1440px",
      mdcustom: "850px",
      custom: "1050px"
    },
    colors: {
      "very-dark-grey": "hsl(0, 0%, 17%)",
      "dark-grey": "hsl(0, 0%, 59%)",
    },
    fontFamily: {
      sans: ["Rubik", "sans-serif"],
    },
  },
  corePlugins: {
    container: false
  },
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("autoprefixer"),  
    require('flowbite/plugin')({
      charts: true
    })
  ],
}

