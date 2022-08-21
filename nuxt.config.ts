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
});
