import en from './locales/en.json';
import de from './locales/de.json';

export default defineI18nConfig(() => ({
  legacy: false,
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

  messages: {
    en,
    de
  }
}))
