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
  { code: 'en-IE', nativeLabel: 'English (Ireland)', dir: 'ltr' },
  { code: 'en-NZ', nativeLabel: 'English (New Zealand)', dir: 'ltr' },
  { code: 'en-SG', nativeLabel: 'English (Singapore)', dir: 'ltr' },
  { code: 'en-ZA', nativeLabel: 'English (South Africa)', dir: 'ltr' },
  { code: 'ja-JP', nativeLabel: '日本語', dir: 'ltr' },
  { code: 'ko-KR', nativeLabel: '한국어', dir: 'ltr' },
  { code: 'id-ID', nativeLabel: 'Bahasa Indonesia', dir: 'ltr' },
  { code: 'fr-FR', nativeLabel: 'Français', dir: 'ltr' },
  { code: 'fr-BE', nativeLabel: 'Français (Belgique)', dir: 'ltr' },
  { code: 'fr-CA', nativeLabel: 'Français (Canada)', dir: 'ltr' },
  { code: 'fr-CH', nativeLabel: 'Français (Suisse)', dir: 'ltr' },
  { code: 'de-DE', nativeLabel: 'Deutsch', dir: 'ltr' },
  { code: 'de-AT', nativeLabel: 'Deutsch (Österreich)', dir: 'ltr' },
  { code: 'de-CH', nativeLabel: 'Deutsch (Schweiz)', dir: 'ltr' },
  { code: 'it-IT', nativeLabel: 'Italiano', dir: 'ltr' },
  { code: 'it-CH', nativeLabel: 'Italiano (Svizzera)', dir: 'ltr' },
  { code: 'ms-MY', nativeLabel: 'Bahasa Melayu', dir: 'ltr' },
  { code: 'nl-NL', nativeLabel: 'Nederlands', dir: 'ltr' },
  { code: 'nl-BE', nativeLabel: 'Nederlands (België)', dir: 'ltr' },
  { code: 'fa-IR', nativeLabel: 'فارسی', dir: 'rtl' },
  { code: 'he-IL', nativeLabel: 'עברית', dir: 'rtl' },
  { code: 'es-419', nativeLabel: 'Español (Latinoamérica)', dir: 'ltr' },
  { code: 'es-AR', nativeLabel: 'Español (Argentina)', dir: 'ltr' },
  { code: 'es-CL', nativeLabel: 'Español (Chile)', dir: 'ltr' },
  { code: 'es-CO', nativeLabel: 'Español (Colombia)', dir: 'ltr' },
  { code: 'es-MX', nativeLabel: 'Español (México)', dir: 'ltr' },
  { code: 'es-PE', nativeLabel: 'Español (Perú)', dir: 'ltr' },
  { code: 'es-ES', nativeLabel: 'Español (España)', dir: 'ltr' },
  { code: 'es-VE', nativeLabel: 'Español (Venezuela)', dir: 'ltr' },
  { code: 'pt-BR', nativeLabel: 'Português (Brasil)', dir: 'ltr' },
  { code: 'pt-PT', nativeLabel: 'Português (Portugal)', dir: 'ltr' },
  { code: 'pl-PL', nativeLabel: 'Polski', dir: 'ltr' },
  { code: 'tr-TR', nativeLabel: 'Türkçe', dir: 'ltr' },
  { code: 'hi-IN', nativeLabel: 'हिन्दी', dir: 'ltr' },
  { code: 'ru-RU', nativeLabel: 'Русский', dir: 'ltr' },
  { code: 'sv-SE', nativeLabel: 'Svenska', dir: 'ltr' },
  { code: 'cs-CZ', nativeLabel: 'Čeština', dir: 'ltr' },
  { code: 'et-EE', nativeLabel: 'Eesti', dir: 'ltr' },
  { code: 'is-IS', nativeLabel: 'Íslenska', dir: 'ltr' },
  { code: 'ro-RO', nativeLabel: 'Română', dir: 'ltr' },
  { code: 'hu-HU', nativeLabel: 'Magyar', dir: 'ltr' },
  { code: 'da-DK', nativeLabel: 'Dansk', dir: 'ltr' },
  { code: 'el-GR', nativeLabel: 'Ελληνικά', dir: 'ltr' },
  { code: 'lv-LV', nativeLabel: 'Latviešu', dir: 'ltr' },
  { code: 'lt-LT', nativeLabel: 'Lietuvių', dir: 'ltr' },
  { code: 'nb-NO', nativeLabel: 'Norsk Bokmål', dir: 'ltr' },
  { code: 'fi-FI', nativeLabel: 'Suomi', dir: 'ltr' },
  { code: 'fil-PH', nativeLabel: 'Filipino', dir: 'ltr' },
  { code: 'vi-VN', nativeLabel: 'Tiếng Việt', dir: 'ltr' },
  { code: 'th-TH', nativeLabel: 'ไทย', dir: 'ltr' },
  { code: 'ar-SA', nativeLabel: 'العربية', dir: 'rtl' },
  { code: 'ar-EG', nativeLabel: 'العربية (مصر)', dir: 'rtl' },
  { code: 'ar-AE', nativeLabel: 'العربية (الإمارات)', dir: 'rtl' },
  { code: 'ar-KW', nativeLabel: 'العربية (الكويت)', dir: 'rtl' },
  { code: 'ar-QA', nativeLabel: 'العربية (قطر)', dir: 'rtl' },
  { code: 'ur-PK', nativeLabel: 'اردو', dir: 'rtl' }
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
  'NZD',
  'NOK',
  'SGD',
  'KRW',
  'IRR',
  'ILS',
  'EGP',
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
  'PKR',
  'AED',
  'QAR',
  'KWF',
  'MXN',
  'BRL',
  'ARS',
  'CLP',
  'COP',
  'RUB',
  'PHP',
  'VND',
  'THB',
  'ISK',
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
  賣出: 'tradeTypes.sell',
  拆股: 'tradeTypes.split',
  反向拆股: 'tradeTypes.reverseSplit'
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
  'ar-eg': 'ar-EG',
  'ar-sa': 'ar-SA',
  en: 'en-US',
  'en-au': 'en-AU',
  'en-ca': 'en-CA',
  'en-gb': 'en-GB',
  'en-ie': 'en-IE',
  'en-nz': 'en-NZ',
  'en-sg': 'en-SG',
  'en-uk': 'en-GB',
  'en-us': 'en-US',
  'en-za': 'en-ZA',
  es: 'es-419',
  'es-419': 'es-419',
  'es-ar': 'es-AR',
  'es-cl': 'es-CL',
  'es-co': 'es-CO',
  'es-es': 'es-ES',
  'es-mx': 'es-MX',
  'es-pe': 'es-PE',
  'es-us': 'es-419',
  'es-ve': 'es-VE',
  fa: 'fa-IR',
  'fa-ir': 'fa-IR',
  fr: 'fr-FR',
  'fr-be': 'fr-BE',
  'fr-ca': 'fr-CA',
  'fr-ch': 'fr-CH',
  'fr-fr': 'fr-FR',
  de: 'de-DE',
  'de-at': 'de-AT',
  'de-ch': 'de-CH',
  'de-de': 'de-DE',
  he: 'he-IL',
  'he-il': 'he-IL',
  hi: 'hi-IN',
  'hi-in': 'hi-IN',
  id: 'id-ID',
  'id-id': 'id-ID',
  it: 'it-IT',
  'it-ch': 'it-CH',
  'it-it': 'it-IT',
  ja: 'ja-JP',
  'ja-jp': 'ja-JP',
  ko: 'ko-KR',
  'ko-kr': 'ko-KR',
  ms: 'ms-MY',
  'ms-my': 'ms-MY',
  nl: 'nl-NL',
  'nl-be': 'nl-BE',
  'nl-nl': 'nl-NL',
  nb: 'nb-NO',
  'nb-no': 'nb-NO',
  no: 'nb-NO',
  'no-no': 'nb-NO',
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
  et: 'et-EE',
  'et-ee': 'et-EE',
  fi: 'fi-FI',
  'fi-fi': 'fi-FI',
  fil: 'fil-PH',
  'fil-ph': 'fil-PH',
  'tl-ph': 'fil-PH',
  ro: 'ro-RO',
  'ro-ro': 'ro-RO',
  hu: 'hu-HU',
  'hu-hu': 'hu-HU',
  is: 'is-IS',
  'is-is': 'is-IS',
  da: 'da-DK',
  'da-dk': 'da-DK',
  el: 'el-GR',
  'el-gr': 'el-GR',
  lt: 'lt-LT',
  'lt-lt': 'lt-LT',
  lv: 'lv-LV',
  'lv-lv': 'lv-LV',
  th: 'th-TH',
  'th-th': 'th-TH',
  tr: 'tr-TR',
  'tr-tr': 'tr-TR',
  ur: 'ur-PK',
  'ur-pk': 'ur-PK',
  vi: 'vi-VN',
  'vi-vn': 'vi-VN',
  'ar-ae': 'ar-AE',
  'ar-kw': 'ar-KW',
  'ar-qa': 'ar-QA',
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
  ae: 'ar-AE',
  eg: 'ar-EG',
  au: 'en-AU',
  at: 'de-AT',
  be: 'fr-BE',
  'be-nl': 'nl-BE',
  br: 'pt-BR',
  ca: 'en-CA',
  ch: 'de-CH',
  'ch-fr': 'fr-CH',
  'ch-it': 'it-CH',
  cl: 'es-CL',
  co: 'es-CO',
  cs: 'cs-CZ',
  cn: 'zh-CN',
  cz: 'cs-CZ',
  da: 'da-DK',
  de: 'de-DE',
  dk: 'da-DK',
  ee: 'et-EE',
  el: 'el-GR',
  'en-sg': 'en-SG',
  'es-ar': 'es-AR',
  'es-es': 'es-ES',
  pe: 'es-PE',
  fa: 'fa-IR',
  fi: 'fi-FI',
  'fr-be': 'fr-BE',
  'fr-ca': 'fr-CA',
  'fr-ch': 'fr-CH',
  fr: 'fr-FR',
  gb: 'en-GB',
  gr: 'el-GR',
  he: 'he-IL',
  hk: 'yue-Hant-HK',
  hu: 'hu-HU',
  id: 'id-ID',
  in: 'hi-IN',
  ir: 'fa-IR',
  ie: 'en-IE',
  il: 'he-IL',
  is: 'is-IS',
  it: 'it-IT',
  jp: 'ja-JP',
  kr: 'ko-KR',
  kw: 'ar-KW',
  lt: 'lt-LT',
  lv: 'lv-LV',
  mx: 'es-MX',
  my: 'ms-MY',
  nl: 'nl-NL',
  no: 'nb-NO',
  nz: 'en-NZ',
  ph: 'fil-PH',
  pl: 'pl-PL',
  pk: 'ur-PK',
  pt: 'pt-PT',
  qa: 'ar-QA',
  ro: 'ro-RO',
  ru: 'ru-RU',
  se: 'sv-SE',
  sv: 'sv-SE',
  th: 'th-TH',
  tr: 'tr-TR',
  tw: 'zh-TW',
  us: 'en-US',
  ve: 'es-VE',
  vi: 'vi-VN',
  za: 'en-ZA',
  arg: 'es-AR',
  'zh-sg': 'zh-SG'
};

const PREFERRED_URL_LANG_BY_LOCALE = {
  'ar-AE': 'ae',
  'ar-EG': 'eg',
  'ar-KW': 'kw',
  'ar-QA': 'qa',
  'de-AT': 'at',
  'de-CH': 'ch',
  'en-IE': 'ie',
  'en-NZ': 'nz',
  'en-ZA': 'za',
  'es-AR': 'arg',
  'es-CL': 'cl',
  'es-CO': 'co',
  'es-PE': 'pe',
  'es-VE': 've',
  'et-EE': 'ee',
  'fi-FI': 'fi',
  'fil-PH': 'ph',
  'fr-BE': 'be',
  'fr-CH': 'ch-fr',
  'is-IS': 'is',
  'it-CH': 'ch-it',
  'lt-LT': 'lt',
  'lv-LV': 'lv',
  'nb-NO': 'no',
  'nl-BE': 'be-nl',
  'ur-PK': 'pk'
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
  if (PREFERRED_URL_LANG_BY_LOCALE[localeCode]) {
    return PREFERRED_URL_LANG_BY_LOCALE[localeCode];
  }

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
