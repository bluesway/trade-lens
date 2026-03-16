import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, normalizeLocale } from './locales/config';
import { resources } from './locales/resources';

const supportedLngs = SUPPORTED_LOCALES.map(({ code }) => code);

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs,
    nonExplicitSupportedLngs: true,
    load: 'currentOnly',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'tr_locale',
      convertDetectedLanguage: (locale) => normalizeLocale(locale)
    },
    react: {
      useSuspense: false
    }
  });

const resolvedLocale = normalizeLocale(i18n.resolvedLanguage || i18n.language);
if (resolvedLocale !== i18n.language) {
  void i18n.changeLanguage(resolvedLocale);
}

export default i18n;
