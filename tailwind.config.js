/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        outline: ['Outline', 'sans-serif'],
        anton: ['Anton', 'sans-serif'],
        oxanium: ['Oxanium', 'sans-serif'],
      },
    },
  },
  plugins: [],
}