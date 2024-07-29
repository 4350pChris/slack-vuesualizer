// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  build: {
    transpile: ['@vuepic/vue-datepicker'],
  },

  css: ['assets/css/index.css'],

  runtimeConfig: {
    mongodbUri: '',
    public: {
      demoWorkspaceToken: '',
      siteUrl: '',
    },
  },

  plugins: [],

  modules: [
    [
      'unplugin-icons/nuxt',
      {
        autoInstall: true,
      },
    ],
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxtjs/robots',
  ],

  colorMode: {
    preference: 'system',
    dataValue: 'theme',
    classSuffix: '',
  },

  router: {
    options: {
      linkExactActiveClass: 'active',
    },
  },

  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en',
    strategy: 'prefix',
    vueI18n: './i18n.config.ts'
  },

  devtools: {
    enabled: true,
  },

  compatibilityDate: '2024-07-29',
})