import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  normalizeLocale,
  resolveLocaleFromUrlLang,
  syncLocaleToUrl
} from './locales/config';
import { resources } from './locales/resources';

const supportedLngs = SUPPORTED_LOCALES.map(({ code }) => code);
const defaultNamespace = 'translation';

export const i18nReady = i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
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

void i18nReady.then(() => {
  const resolvedLocale = normalizeLocale(i18n.resolvedLanguage || i18n.language);
  syncLocaleToUrl(resolvedLocale);
  if (resolvedLocale !== i18n.language) {
    return i18n.changeLanguage(resolvedLocale);
  }

  return null;
});

export default i18n;
