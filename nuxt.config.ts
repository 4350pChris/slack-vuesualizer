import { defineNuxtConfig } from "nuxt";

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
  i18n: {
    locales: [
      {
        code: "en",
        iso: "en-US",
        file: "en.ts",
      },
      {
        code: "de",
        iso: "de-DE",
        file: "de.ts",
      },
    ],
    defaultLocale: "en",
  },
});
