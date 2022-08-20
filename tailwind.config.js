const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "nuxt.config.ts",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Mulish", ...defaultTheme.fontFamily.sans],
        mono: ["Overpass", ...defaultTheme.fontFamily.mono],
      },
      animation: {
        blink: "blink 2s cubic-bezier(0.4, 0, 0.6, 1)",
      },
      keyframes: {
        blink: {
          "50%": {
            opacity: 0.5,
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["fantasy"],
  },
};
