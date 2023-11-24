/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'sechs': '60%',
        'sieben': '70%',
        'acht': '80%',
      },
    },
  },
  plugins: [],
}

