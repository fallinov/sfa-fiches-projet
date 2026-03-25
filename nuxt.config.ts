// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true },
    '/cadrage': { prerender: true },
    '/card-sorting': { prerender: true },
    '/design': { prerender: true },
    '/maquettes': { prerender: true },
    '/checklist': { prerender: true }
  },

  compatibilityDate: '2025-03-25',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
