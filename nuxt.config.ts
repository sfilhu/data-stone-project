// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { 
    enabled: true 
  },
  
  css: ['@/assets/scss/main.scss'],

  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    "@pinia-plugin-persistedstate/nuxt"
  ],
  
  pinia: {
    storesDirs: ['./stores/**'],
  },
  
  googleFonts: {
    families: {
      Inter: '200..900'
    }
  },
  
  colorMode: {
    preference: 'bg-dark-primary'
  }
})
