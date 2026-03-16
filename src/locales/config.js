export const DEFAULT_LOCALE = 'zh-TW';

export const SUPPORTED_LOCALES = [
  { code: 'zh-TW', nativeLabel: '繁體中文 (台灣)', dir: 'ltr' },
  { code: 'zh-HK', nativeLabel: '繁體中文 (香港)', dir: 'ltr' },
  { code: 'zh-CN', nativeLabel: '简体中文 (中国)', dir: 'ltr' },
  { code: 'zh-SG', nativeLabel: '简体中文 (新加坡)', dir: 'ltr' },
  { code: 'en-US', nativeLabel: 'English (US)', dir: 'ltr' },
  { code: 'en-GB', nativeLabel: 'English (UK)', dir: 'ltr' },
  { code: 'ja-JP', nativeLabel: '日本語', dir: 'ltr' },
  { code: 'ko-KR', nativeLabel: '한국어', dir: 'ltr' },
  { code: 'ms-MY', nativeLabel: 'Bahasa Melayu', dir: 'ltr' },
  { code: 'vi-VN', nativeLabel: 'Tiếng Việt', dir: 'ltr' },
  { code: 'th-TH', nativeLabel: 'ไทย', dir: 'ltr' },
  { code: 'ar-SA', nativeLabel: 'العربية', dir: 'rtl' }
];

export const BASE_CURRENCY_OPTIONS = ['TWD', 'CNY', 'HKD', 'USD', 'JPY'];

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
  'en-gb': 'en-GB',
  'en-uk': 'en-GB',
  'en-us': 'en-US',
  ja: 'ja-JP',
  'ja-jp': 'ja-JP',
  ko: 'ko-KR',
  'ko-kr': 'ko-KR',
  ms: 'ms-MY',
  'ms-my': 'ms-MY',
  th: 'th-TH',
  'th-th': 'th-TH',
  vi: 'vi-VN',
  'vi-vn': 'vi-VN',
  zh: 'zh-TW',
  'zh-cn': 'zh-CN',
  'zh-hans': 'zh-CN',
  'zh-hans-cn': 'zh-CN',
  'zh-hans-sg': 'zh-SG',
  'zh-hant': 'zh-TW',
  'zh-hant-hk': 'zh-HK',
  'zh-hk': 'zh-HK',
  'zh-sg': 'zh-SG',
  'zh-tw': 'zh-TW'
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

export const getLocaleMeta = (value) => {
  const localeCode = normalizeLocale(value);
  return SUPPORTED_LOCALES.find(({ code }) => code === localeCode) || SUPPORTED_LOCALES[0];
};

export const getLocaleDirection = (value) => getLocaleMeta(value).dir;

export const isRtlLocale = (value) => getLocaleDirection(value) === 'rtl';

export const getFormattingLocale = (value) => {
  return normalizeLocale(value);
};

export const usesDualCalendarDateDisplay = (value) => normalizeLocale(value) === 'th-TH';
