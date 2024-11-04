/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      transInstrumentSans: ['TransInstrumentSans', 'sans-serif'],
    },
    extend: {
      colors: {
        luogoColor: '#92CDDE',
        itinerarioColor: '#7FCBAE',
        stakeholderColor: '#EEE3A8',
        residenzeColor: '#F69679',
        bannerColor: '#F69679',
        luogoColorScuro: '#335963',
        itinerarioColorScuro: '#2c5948',
        stakeholderColorScuro: '#696136',
        residenzeColorScuro: '#754637',
        bannerColorScuro: '#754637',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  modules: ['@nuxt/ui', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
}
