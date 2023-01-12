/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
  plugins: [require('tailwind-scrollbar-hide')],
};
