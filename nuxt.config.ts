// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  css: ["assets/css/index.css"],
  runtimeConfig: {
    mongodbUri: "",
  },
  modules: [
    [
      "unplugin-icons/nuxt",
      {
        autoInstall: true,
      },
    ],
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@intlify/nuxt3",
    "nuxt-schema-org",
  ],
  colorMode: {
    preference: "system",
    dataValue: "theme",
    classSuffix: "",
  },
  router: {
    options: {
      linkExactActiveClass: "active",
    },
  },
  schemaOrg: {
    canonicalHost: process.env.NUXT_CANONICAL_HOST,
  },
  intlify: {
    vueI18n: {
      locale: "en",
      fallbackLocale: "de",
      datetimeFormats: {
        de: {
          short: {
            year: "numeric",
            month: "short",
            day: "numeric",
          },
          long: {
            year: "numeric",
            month: "short",
            day: "numeric",
            weekday: "short",
            hour: "numeric",
            minute: "numeric",
          },
          timeOfDay: {
            hour: "numeric",
            minute: "numeric",
          },
        },
        en: {
          short: {
            year: "numeric",
            month: "short",
            day: "numeric",
          },
          long: {
            year: "numeric",
            month: "short",
            day: "numeric",
            weekday: "short",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          },
          timeOfDay: {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          },
        },
      },
    },
  },
});
