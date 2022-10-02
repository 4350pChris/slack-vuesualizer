import presetUno from "@unocss/preset-uno";
import presetIcons from "@unocss/preset-icons";
import presetWebFonts from "@unocss/preset-web-fonts";
import transformerDirectives from "@unocss/transformer-directives";
import presetDaisy from "unocss-preset-daisy";
import type { UnocssNuxtOptions } from "@unocss/nuxt";

export default <UnocssNuxtOptions>{
  shortcuts: {
    "fancy-link":
      "transition text-blue-600 hover:text-sky-500 visited:text-purple-600 visited:hover:text-purple-800 dark:text-blue-300 dark:hover:text-blue-500 dark:visited:text-purple-400 dark:visited:hover:text-purple-500",
  },
  theme: {
    animation: {
      blink: "blink 2s cubic-bezier(0.4, 0, 0.6, 1)",
      shine: "shine 1s linear",
      keyframes: {
        blink: "{ 50% { opacity: 0.5; } }",
        shine: "{ to { background-position: 100% 0; } }",
      },
      counts: {
        shine: "infinite",
      },
    },
  },
  transformers: [transformerDirectives()],
  presets: [
    presetUno({
      dark: {
        dark: "[data-theme='business']",
      },
    }),
    presetDaisy(),
    presetWebFonts({
      provider: "bunny",
      fonts: {
        sans: "Mulish",
        mono: "Red Hat Mono",
      },
    }),
    presetIcons({
      autoInstall: true,
    }),
  ],
};
