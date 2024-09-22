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
    extend: {
      colors: {
        luogoColor: '#92CDDE',
        itinerarioColor: '#7FCBAE',
        stakeholderColor: '#EEE3A8',
        residenzeColor: '#F69679',
        bannerColor: '#F69679',
        'luogoColor-scuro': '#4d7985',
        'itinerarioColor-scuro': '#2c5948',
        'stakeholderColor-scuro': '#3e7a63',
        'residenzeColor-scuro': '#754637',
        'bannerColor-scuro': '#754637',
      },
    },
  },
  plugins: [],
  modules: ['@nuxt/ui', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
}
