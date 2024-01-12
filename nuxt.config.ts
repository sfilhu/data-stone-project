// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { 
    enabled: true 
  },
  css: [
    '@/assets/scss/main.scss'
  ],
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Poppins' }
  ],
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt'
  ],
  pinia: {
    storesDirs: ['./store/**'],
  },
  googleFonts: {
    families: {
      Inter: '200..900'
    }
  },
  colorMode: {
    preference: 'bg-dark-primary'
  },
  theme: {
    dark: true
  }
})
