/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        transinstrument: ['TransInstrumentSans', 'sans-serif'],
      },
      colors: {
        'luogoColor': '#92CDDE',
        'itinerarioColor' : '#7FCBAE',
        'stakeholderColor' : '#EEE3A8',
        'bannerColor' : 'F69679'
      },
    },
  },
  plugins: [],
}