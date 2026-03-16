export const DEFAULT_LOCALE = 'zh-TW';

export const SUPPORTED_LOCALES = [
  { code: 'zh-TW', nativeLabel: '繁體中文 (台灣)', dir: 'ltr' },
  { code: 'yue-Hant-HK', nativeLabel: '廣東話 (香港)', dir: 'ltr' },
  { code: 'zh-CN', nativeLabel: '简体中文 (中国)', dir: 'ltr' },
  { code: 'zh-SG', nativeLabel: '简体中文 (新加坡)', dir: 'ltr' },
  { code: 'en-US', nativeLabel: 'English (US)', dir: 'ltr' },
  { code: 'en-CA', nativeLabel: 'English (Canada)', dir: 'ltr' },
  { code: 'en-AU', nativeLabel: 'English (Australia)', dir: 'ltr' },
  { code: 'en-GB', nativeLabel: 'English (UK)', dir: 'ltr' },
  { code: 'en-SG', nativeLabel: 'English (Singapore)', dir: 'ltr' },
  { code: 'ja-JP', nativeLabel: '日本語', dir: 'ltr' },
  { code: 'ko-KR', nativeLabel: '한국어', dir: 'ltr' },
  { code: 'id-ID', nativeLabel: 'Bahasa Indonesia', dir: 'ltr' },
  { code: 'fr-FR', nativeLabel: 'Français', dir: 'ltr' },
  { code: 'fr-CA', nativeLabel: 'Français (Canada)', dir: 'ltr' },
  { code: 'de-DE', nativeLabel: 'Deutsch', dir: 'ltr' },
  { code: 'it-IT', nativeLabel: 'Italiano', dir: 'ltr' },
  { code: 'ms-MY', nativeLabel: 'Bahasa Melayu', dir: 'ltr' },
  { code: 'nl-NL', nativeLabel: 'Nederlands', dir: 'ltr' },
  { code: 'fa-IR', nativeLabel: 'فارسی', dir: 'rtl' },
  { code: 'he-IL', nativeLabel: 'עברית', dir: 'rtl' },
  { code: 'es-419', nativeLabel: 'Español (Latinoamérica)', dir: 'ltr' },
  { code: 'es-MX', nativeLabel: 'Español (México)', dir: 'ltr' },
  { code: 'es-ES', nativeLabel: 'Español (España)', dir: 'ltr' },
  { code: 'pt-BR', nativeLabel: 'Português (Brasil)', dir: 'ltr' },
  { code: 'pt-PT', nativeLabel: 'Português (Portugal)', dir: 'ltr' },
  { code: 'pl-PL', nativeLabel: 'Polski', dir: 'ltr' },
  { code: 'tr-TR', nativeLabel: 'Türkçe', dir: 'ltr' },
  { code: 'hi-IN', nativeLabel: 'हिन्दी', dir: 'ltr' },
  { code: 'ru-RU', nativeLabel: 'Русский', dir: 'ltr' },
  { code: 'sv-SE', nativeLabel: 'Svenska', dir: 'ltr' },
  { code: 'cs-CZ', nativeLabel: 'Čeština', dir: 'ltr' },
  { code: 'ro-RO', nativeLabel: 'Română', dir: 'ltr' },
  { code: 'hu-HU', nativeLabel: 'Magyar', dir: 'ltr' },
  { code: 'da-DK', nativeLabel: 'Dansk', dir: 'ltr' },
  { code: 'el-GR', nativeLabel: 'Ελληνικά', dir: 'ltr' },
  { code: 'vi-VN', nativeLabel: 'Tiếng Việt', dir: 'ltr' },
  { code: 'th-TH', nativeLabel: 'ไทย', dir: 'ltr' },
  { code: 'ar-SA', nativeLabel: 'العربية', dir: 'rtl' }
];

export const BASE_CURRENCY_OPTIONS = [
  'TWD',
  'CNY',
  'HKD',
  'USD',
  'JPY',
  'EUR',
  'GBP',
  'CHF',
  'CAD',
  'AUD',
  'NOK',
  'SGD',
  'KRW',
  'IRR',
  'ILS',
  'SEK',
  'CZK',
  'RON',
  'HUF',
  'DKK',
  'PLN',
  'TRY',
  'INR',
  'IDR',
  'MYR',
  'MXN',
  'BRL',
  'ARS',
  'RUB',
  'VND',
  'THB',
  'ZAR',
  'SAR'
];

export const MARKET_TRANSLATION_KEYS = {
  全部: 'markets.all',
  陸股: 'markets.chinaA',
  港股: 'markets.hongKong',
  台股: 'markets.taiwan',
  日股: 'markets.japan',
  美股: 'markets.us',
  其他: 'markets.other',
  未知: 'markets.unknown'
};

export const TRADE_TYPE_TRANSLATION_KEYS = {
  買入: 'tradeTypes.buy',
  賣出: 'tradeTypes.sell'
};

export const TREND_RANGE_TRANSLATION_KEYS = {
  '1週': 'timeRanges.oneWeek',
  '1月': 'timeRanges.oneMonth',
  '3月': 'timeRanges.threeMonths',
  半年: 'timeRanges.halfYear',
  YTD: 'timeRanges.ytd',
  '1年': 'timeRanges.oneYear',
  '5年': 'timeRanges.fiveYears',
  全部: 'timeRanges.all'
};

const LOCALE_ALIASES = {
  ar: 'ar-SA',
  'ar-sa': 'ar-SA',
  en: 'en-US',
  'en-au': 'en-AU',
  'en-ca': 'en-CA',
  'en-gb': 'en-GB',
  'en-sg': 'en-SG',
  'en-uk': 'en-GB',
  'en-us': 'en-US',
  es: 'es-419',
  'es-419': 'es-419',
  'es-ar': 'es-419',
  'es-cl': 'es-419',
  'es-co': 'es-419',
  'es-es': 'es-ES',
  'es-mx': 'es-MX',
  'es-pe': 'es-419',
  'es-us': 'es-419',
  fa: 'fa-IR',
  'fa-ir': 'fa-IR',
  fr: 'fr-FR',
  'fr-ca': 'fr-CA',
  'fr-fr': 'fr-FR',
  de: 'de-DE',
  'de-de': 'de-DE',
  he: 'he-IL',
  'he-il': 'he-IL',
  hi: 'hi-IN',
  'hi-in': 'hi-IN',
  id: 'id-ID',
  'id-id': 'id-ID',
  it: 'it-IT',
  'it-it': 'it-IT',
  ja: 'ja-JP',
  'ja-jp': 'ja-JP',
  ko: 'ko-KR',
  'ko-kr': 'ko-KR',
  ms: 'ms-MY',
  'ms-my': 'ms-MY',
  nl: 'nl-NL',
  'nl-nl': 'nl-NL',
  pl: 'pl-PL',
  'pl-pl': 'pl-PL',
  pt: 'pt-BR',
  'pt-br': 'pt-BR',
  'pt-pt': 'pt-PT',
  ru: 'ru-RU',
  'ru-ru': 'ru-RU',
  sv: 'sv-SE',
  'sv-se': 'sv-SE',
  cs: 'cs-CZ',
  'cs-cz': 'cs-CZ',
  ro: 'ro-RO',
  'ro-ro': 'ro-RO',
  hu: 'hu-HU',
  'hu-hu': 'hu-HU',
  da: 'da-DK',
  'da-dk': 'da-DK',
  el: 'el-GR',
  'el-gr': 'el-GR',
  th: 'th-TH',
  'th-th': 'th-TH',
  tr: 'tr-TR',
  'tr-tr': 'tr-TR',
  vi: 'vi-VN',
  'vi-vn': 'vi-VN',
  yue: 'yue-Hant-HK',
  'yue-hant': 'yue-Hant-HK',
  'yue-hant-hk': 'yue-Hant-HK',
  'yue-hk': 'yue-Hant-HK',
  zh: 'zh-TW',
  'zh-cn': 'zh-CN',
  'zh-hans': 'zh-CN',
  'zh-hans-cn': 'zh-CN',
  'zh-hans-sg': 'zh-SG',
  'zh-hant': 'zh-TW',
  'zh-hant-hk': 'yue-Hant-HK',
  'zh-hk': 'yue-Hant-HK',
  'zh-sg': 'zh-SG',
  'zh-tw': 'zh-TW'
};

const FORMATTING_LOCALE_OVERRIDES = {
  'yue-Hant-HK': 'zh-HK'
};

const URL_LANG_TO_LOCALE = {
  ar: 'ar-SA',
  au: 'en-AU',
  br: 'pt-BR',
  ca: 'en-CA',
  cs: 'cs-CZ',
  cn: 'zh-CN',
  cz: 'cs-CZ',
  da: 'da-DK',
  de: 'de-DE',
  dk: 'da-DK',
  el: 'el-GR',
  'en-sg': 'en-SG',
  'es-es': 'es-ES',
  fa: 'fa-IR',
  'fr-ca': 'fr-CA',
  fr: 'fr-FR',
  gb: 'en-GB',
  gr: 'el-GR',
  he: 'he-IL',
  hk: 'yue-Hant-HK',
  hu: 'hu-HU',
  id: 'id-ID',
  in: 'hi-IN',
  ir: 'fa-IR',
  il: 'he-IL',
  it: 'it-IT',
  jp: 'ja-JP',
  kr: 'ko-KR',
  mx: 'es-MX',
  my: 'ms-MY',
  nl: 'nl-NL',
  pl: 'pl-PL',
  pt: 'pt-PT',
  ro: 'ro-RO',
  ru: 'ru-RU',
  se: 'sv-SE',
  sv: 'sv-SE',
  th: 'th-TH',
  tr: 'tr-TR',
  tw: 'zh-TW',
  us: 'en-US',
  vi: 'vi-VN',
  'zh-sg': 'zh-SG'
};

const SUPPORTED_LOCALE_CODES = SUPPORTED_LOCALES.map((locale) => locale.code);

export const normalizeLocale = (value) => {
  if (!value) return DEFAULT_LOCALE;

  const normalizedValue = String(value).trim();
  if (SUPPORTED_LOCALE_CODES.includes(normalizedValue)) {
    return normalizedValue;
  }

  const lowerValue = normalizedValue.toLowerCase();
  if (LOCALE_ALIASES[lowerValue]) {
    return LOCALE_ALIASES[lowerValue];
  }

  const matchedLocale = SUPPORTED_LOCALES.find(({ code }) => lowerValue.startsWith(code.toLowerCase()));
  return matchedLocale?.code || DEFAULT_LOCALE;
};

export const resolveLocaleFromUrlLang = (value) => {
  if (!value) return DEFAULT_LOCALE;

  const normalizedValue = String(value).trim().toLowerCase();
  return URL_LANG_TO_LOCALE[normalizedValue] || normalizeLocale(value);
};

export const getUrlLangParam = (value) => {
  const localeCode = normalizeLocale(value);
  const matchedEntry = Object.entries(URL_LANG_TO_LOCALE)
    .find(([, locale]) => locale === localeCode);

  return matchedEntry?.[0] || localeCode.toLowerCase();
};

export const syncLocaleToUrl = (value) => {
  if (typeof window === 'undefined') return;

  const localeCode = normalizeLocale(value);
  const url = new URL(window.location.href);

  if (localeCode === DEFAULT_LOCALE) {
    url.searchParams.delete('lang');
  } else {
    url.searchParams.set('lang', getUrlLangParam(localeCode));
  }

  window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
};

export const getLocaleMeta = (value) => {
  const localeCode = normalizeLocale(value);
  return SUPPORTED_LOCALES.find(({ code }) => code === localeCode) || SUPPORTED_LOCALES[0];
};

export const getLocaleDirection = (value) => getLocaleMeta(value).dir;

export const isRtlLocale = (value) => getLocaleDirection(value) === 'rtl';

export const getFormattingLocale = (value) => {
  const localeCode = normalizeLocale(value);
  return FORMATTING_LOCALE_OVERRIDES[localeCode] || localeCode;
};

export const usesDualCalendarDateDisplay = (value) => normalizeLocale(value) === 'th-TH';
