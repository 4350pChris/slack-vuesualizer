import type { NuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  build: {
    transpile: ['@vuepic/vue-datepicker'],
  },
  typescript: {
    shim: false,
  },
  css: ['assets/css/index.css'],
  runtimeConfig: {
    mongodbUri: '',
    public: {
      siteUrl: '',
    },
  },
  plugins: [{ src: '~/plugins/vercel.ts', mode: 'client' }],
  modules: [
    '@vue-macros/nuxt',
    [
      'unplugin-icons/nuxt',
      {
        autoInstall: true,
      },
    ],
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@intlify/nuxt3',
    'nuxt-schema-org',
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
  intlify: {
    vueI18n: {
      locale: 'en',
      fallbackLocale: 'de',
      datetimeFormats: {
        de: {
          short: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          },
          long: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            weekday: 'short',
            hour: 'numeric',
            minute: 'numeric',
          },
          timeOfDay: {
            hour: 'numeric',
            minute: 'numeric',
          },
        },
        en: {
          short: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          },
          long: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            weekday: 'short',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          },
          timeOfDay: {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          },
        },
      },
    },
  },
} as NuxtConfig)
