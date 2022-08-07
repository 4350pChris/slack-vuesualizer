import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  css: ["assets/css/tailwind.css"],
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
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  router: {
    options: {
      linkExactActiveClass: "active",
    },
  },
});
