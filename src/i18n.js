import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  normalizeLocale,
  resolveLocaleFromUrlLang,
  syncLocaleToUrl
} from './locales/config';

const supportedLngs = SUPPORTED_LOCALES.map(({ code }) => code);
const defaultNamespace = 'translation';

export const i18nReady = i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/translation.json'
    },
    ns: [defaultNamespace],
    defaultNS: defaultNamespace,
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs,
    load: 'currentOnly',
    initImmediate: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['querystring'],
      lookupQuerystring: 'lang',
      convertDetectedLanguage: (locale) => resolveLocaleFromUrlLang(locale)
    },
    react: {
      useSuspense: false
    }
  });

// Release the previous locale's resource bundle from memory when the user
// switches languages, so only one locale lives in memory at a time.
let previousLocale = null;

i18n.on('languageChanged', (lng) => {
  if (previousLocale && previousLocale !== lng) {
    i18n.removeResourceBundle(previousLocale, defaultNamespace);
  }
  previousLocale = lng;
});

void i18nReady.then(() => {
  const resolvedLocale = normalizeLocale(i18n.resolvedLanguage || i18n.language);
  previousLocale = resolvedLocale;
  syncLocaleToUrl(resolvedLocale);
  if (resolvedLocale !== i18n.language) {
    return i18n.changeLanguage(resolvedLocale);
  }
  return null;
});

export default i18n;
