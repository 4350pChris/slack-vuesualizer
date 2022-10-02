const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme=\'business\']'],
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    'app.vue',
  ],
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
            opacity: 0.5,
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ['fantasy', 'business'],
    darkTheme: 'business',
  },
}
