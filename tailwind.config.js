/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gptlogo: '#10a37f',
        gptdarkgrey: '#202123',
        gptgray: '#343541',
        gptlightgray: '#444654'
      }
    }
  },
  plugins: []
}
