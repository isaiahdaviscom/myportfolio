/** @type {import('tailwindcss').Config} */
// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./layouts/**/*.html",
    "./content/**/*.md",
    "./themes/myPortfolio/layouts/**/*.html",
    "./themes/myPortfolio/content/**/*.md",
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}