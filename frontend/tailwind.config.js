/** @type {import('tailwindcss').Config} */
const flowbite = require('./node_modules/flowbite/plugin');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite],
};
