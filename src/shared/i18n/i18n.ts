import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import { DEBUG } from 'config/constants';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from 'locales/en/translation.json';
import uk from 'locales/uk/translation.json';

const resources = {
  en: {
    translation: en,
  },
  uk: {
    translation: uk,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'uk',
    // debug: DEBUG,
    interpolation: {
      escapeValue: false,
    },
  })
  .catch(() => {});

export default i18n;
