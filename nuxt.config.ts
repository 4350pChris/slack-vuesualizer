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
      version: 'latest',
      buildDate: 'today',
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
    bundle: {
      optimizeTranslationDirective: false,
    },
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'de', name: 'Deutsch', file: 'de.json' },
    ],
    defaultLocale: 'en',
    strategy: 'prefix',
  },

  devtools: {
    enabled: true,
  },

  compatibilityDate: '2024-07-29',
})