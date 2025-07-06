import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import tailwindTypography from '@tailwindcss/typography'
import daisyui from 'daisyui'
import headlessui from '@headlessui/tailwindcss'

export default <Partial<Config>> {
  darkMode: ['class', '[data-theme=\'business\']'],
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    'app.vue',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  safelist: ['active'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Mulish', ...defaultTheme.fontFamily.sans],
        mono: ['\'Red Hat Mono\'', ...defaultTheme.fontFamily.mono],
      },
      animation: {
        blink: 'blink 2s cubic-bezier(0.4, 0, 0.6, 1)',
      },
      keyframes: {
        blink: {
          '50%': {
            opacity: '0.5',
          },
        },
      },
    },
  },
  plugins: [
    tailwindTypography,
    daisyui,
    headlessui,
  ],
  daisyui: {
    themes: ['fantasy', 'business'],
    darkTheme: 'business',
  },
}
