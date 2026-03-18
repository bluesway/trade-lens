import { BASE_CURRENCY_OPTIONS, getFormattingLocale } from '../locales/config.js';
import { DB_NAME, DB_VERSION, STORE_NAME } from './constants.js';

const CRYPTO_DEFAULT_QUOTE_CURRENCY = 'USD';
const CRYPTO_PAIR_REGEX = /^[A-Z0-9]{2,15}-[A-Z]{3,5}$/;
const REGION_DISPLAY_NAME_CACHE = new Map();
const MARKET_DISPLAY_CURRENCIES = new Set([...BASE_CURRENCY_OPTIONS, 'BRL']);
const QUOTE_CURRENCY_NORMALIZERS = {
  GBp: { currency: 'GBP', priceFactor: 0.01 },
  ZAc: { currency: 'ZAR', priceFactor: 0.01 }
};

const MARKET_DEFINITIONS = {
  全部: {
    aliases: ['全部', 'all'],
    currency: 'USD',
    translationKey: 'markets.all'
  },
  陸股: {
    aliases: ['陸股', '中国', '中國', '中国a股', '中國a股', '中國股票', '中国股票', '中国株', '中国株式', '中國A股', '中国A股', 'china', 'chinaa', 'ashare', 'sse', 'szse', 'shanghai', 'shenzhen'],
    currency: 'CNY',
    suffixes: ['.SS', '.SZ'],
    translationKey: 'markets.chinaA'
  },
  港股: {
    aliases: ['港股', '香港', '香港股票', '香港株', '香港株式', 'hongkong', 'hk', 'hkex'],
    currency: 'HKD',
    defaultSuffix: '.HK',
    suffixes: ['.HK'],
    translationKey: 'markets.hongKong'
  },
  台股: {
    aliases: ['台股', '臺股', '台灣', '臺灣', '台灣股票', '臺灣股票', '台湾股票', '台灣股市', '臺灣股市', 'taiwan', 'tw', 'twse', 'tpex'],
    currency: 'TWD',
    defaultSuffix: '.TW',
    suffixes: ['.TW', '.TWO'],
    translationKey: 'markets.taiwan'
  },
  日股: {
    aliases: ['日股', '日本', '日本股票', '日本株', '日本株式', '国内株', '国内株式', 'japan', 'jp', 'tse', 'tokyo'],
    currency: 'JPY',
    defaultSuffix: '.T',
    suffixes: ['.T'],
    translationKey: 'markets.japan'
  },
  美股: {
    aliases: ['美股', '美國', '美国', '美國股票', '美国股票', '米国株', '米国株式', 'usa', 'us', 'unitedstates', 'nyse', 'nasdaq', 'amex'],
    currency: 'USD',
    translationKey: 'markets.us'
  },
  加拿大股: {
    aliases: ['加拿大股', '加拿大', 'canada', 'ca', 'tsx', 'tsxv', 'cse', 'neo', 'neoexchange'],
    currency: 'CAD',
    defaultSuffix: '.TO',
    regionCode: 'CA',
    suffixes: ['.TO', '.V', '.CN', '.NE']
  },
  澳股: {
    aliases: ['澳股', '澳洲', '澳大利亞', '澳大利亚', 'australia', 'au', 'asx'],
    currency: 'AUD',
    defaultSuffix: '.AX',
    regionCode: 'AU',
    suffixes: ['.AX', '.XA']
  },
  英股: {
    aliases: ['英股', '英國', '英国', 'uk', 'gb', 'greatbritain', 'unitedkingdom', 'lse', 'london'],
    currency: 'GBP',
    defaultSuffix: '.L',
    regionCode: 'GB',
    suffixes: ['.L', '.AQ', '.IL', '.XC']
  },
  新加坡股: {
    aliases: ['新加坡股', '新加坡', 'singapore', 'sg', 'sgx'],
    currency: 'SGD',
    defaultSuffix: '.SI',
    regionCode: 'SG',
    suffixes: ['.SI']
  },
  韓股: {
    aliases: ['韓股', '韩股', '韓國', '韩国', 'korea', 'southkorea', 'kr', 'krx', 'kospi', 'kosdaq'],
    currency: 'KRW',
    defaultSuffix: '.KS',
    regionCode: 'KR',
    suffixes: ['.KS', '.KQ']
  },
  印尼股: {
    aliases: ['印尼股', '印尼', '印度尼西亞', '印度尼西亚', 'indonesia', 'id', 'idx', 'jakarta'],
    currency: 'IDR',
    defaultSuffix: '.JK',
    regionCode: 'ID',
    suffixes: ['.JK']
  },
  法股: {
    aliases: ['法股', '法國', '法国', 'france', 'fr', 'paris', 'euronextparis'],
    currency: 'EUR',
    defaultSuffix: '.PA',
    regionCode: 'FR',
    suffixes: ['.PA']
  },
  德股: {
    aliases: ['德股', '德國', '德国', 'germany', 'de', 'xetra', 'frankfurt', 'berlin', 'bremen', 'dusseldorf', 'hamburg', 'hanover', 'munich', 'stuttgart'],
    currency: 'EUR',
    defaultSuffix: '.DE',
    regionCode: 'DE',
    suffixes: ['.DE', '.BE', '.BM', '.DU', '.F', '.HM', '.HA', '.MU', '.SG']
  },
  義股: {
    aliases: ['義股', '意股', '義大利', '意大利', 'italy', 'it', 'borsaitaliana', 'milan'],
    currency: 'EUR',
    defaultSuffix: '.MI',
    regionCode: 'IT',
    suffixes: ['.MI', '.TI']
  },
  馬股: {
    aliases: ['馬股', '马股', '馬來西亞', '马来西亚', 'malaysia', 'my', 'bursamalaysia', 'kualalumpur'],
    currency: 'MYR',
    defaultSuffix: '.KL',
    regionCode: 'MY',
    suffixes: ['.KL']
  },
  荷股: {
    aliases: ['荷股', '荷蘭', '荷兰', 'netherlands', 'nl', 'amsterdam', 'euronextamsterdam'],
    currency: 'EUR',
    defaultSuffix: '.AS',
    regionCode: 'NL',
    suffixes: ['.AS']
  },
  以色列股: {
    aliases: ['以色列股', '以色列', 'israel', 'il', 'tase', 'telaviv'],
    currency: 'ILS',
    defaultSuffix: '.TA',
    regionCode: 'IL',
    suffixes: ['.TA']
  },
  墨股: {
    aliases: ['墨股', '墨西哥', 'mexico', 'mx', 'bmv'],
    currency: 'MXN',
    defaultSuffix: '.MX',
    regionCode: 'MX',
    suffixes: ['.MX']
  },
  西班牙股: {
    aliases: ['西班牙股', '西股', '西班牙', 'spain', 'es', 'bme', 'madrid'],
    currency: 'EUR',
    defaultSuffix: '.MC',
    regionCode: 'ES',
    suffixes: ['.MC']
  },
  巴西股: {
    aliases: ['巴西股', '巴股', '巴西', 'brazil', 'br', 'b3', 'bovespa', 'saopaulo'],
    currency: 'BRL',
    defaultSuffix: '.SA',
    regionCode: 'BR',
    suffixes: ['.SA']
  },
  葡股: {
    aliases: ['葡股', '葡萄牙', 'portugal', 'pt', 'lisbon', 'euronextlisbon'],
    currency: 'EUR',
    defaultSuffix: '.LS',
    regionCode: 'PT',
    suffixes: ['.LS']
  },
  波股: {
    aliases: ['波股', '波蘭', '波兰', 'poland', 'pl', 'gpw', 'warsaw'],
    currency: 'PLN',
    defaultSuffix: '.WA',
    regionCode: 'PL',
    suffixes: ['.WA']
  },
  土股: {
    aliases: ['土股', '土耳其', 'turkey', 'tr', 'bist', 'borsaistanbul', 'istanbul'],
    currency: 'TRY',
    defaultSuffix: '.IS',
    regionCode: 'TR',
    suffixes: ['.IS']
  },
  印股: {
    aliases: ['印股', '印度', 'india', 'in', 'nse', 'bse', 'bombay'],
    currency: 'INR',
    defaultSuffix: '.NS',
    regionCode: 'IN',
    suffixes: ['.NS', '.BO']
  },
  俄股: {
    aliases: ['俄股', '俄羅斯', '俄罗斯', 'russia', 'ru', 'moex', 'moscow'],
    currency: 'RUB',
    defaultSuffix: '.ME',
    regionCode: 'RU',
    suffixes: ['.ME']
  },
  瑞典股: {
    aliases: ['瑞典股', '瑞典', 'sweden', 'se', 'stockholm', 'nasdaqstockholm'],
    currency: 'SEK',
    defaultSuffix: '.ST',
    regionCode: 'SE',
    suffixes: ['.ST']
  },
  捷克股: {
    aliases: ['捷克股', '捷克', 'czech', 'czechrepublic', 'cz', 'prague', 'pse'],
    currency: 'CZK',
    defaultSuffix: '.PR',
    regionCode: 'CZ',
    suffixes: ['.PR']
  },
  羅馬尼亞股: {
    aliases: ['羅馬尼亞股', '罗马尼亚股', '羅馬尼亞', '罗马尼亚', 'romania', 'ro', 'bucharest', 'bvb'],
    currency: 'RON',
    defaultSuffix: '.RO',
    regionCode: 'RO',
    suffixes: ['.RO']
  },
  匈牙利股: {
    aliases: ['匈牙利股', '匈牙利', 'hungary', 'hu', 'budapest', 'bsebudapest', 'budapeststockexchange'],
    currency: 'HUF',
    defaultSuffix: '.BD',
    regionCode: 'HU',
    suffixes: ['.BD']
  },
  丹麥股: {
    aliases: ['丹麥股', '丹麦股', '丹麥', '丹麦', 'denmark', 'dk', 'copenhagen', 'nasdaqcopenhagen'],
    currency: 'DKK',
    defaultSuffix: '.CO',
    regionCode: 'DK',
    suffixes: ['.CO']
  },
  希臘股: {
    aliases: ['希臘股', '希腊股', '希臘', '希腊', 'greece', 'gr', 'athens', 'athex'],
    currency: 'EUR',
    defaultSuffix: '.AT',
    regionCode: 'GR',
    suffixes: ['.AT']
  },
  越股: {
    aliases: ['越股', '越南股', '越南', 'vietnam', 'vn', 'hose', 'hnx', 'upcom'],
    currency: 'VND',
    defaultSuffix: '.VN',
    regionCode: 'VN',
    suffixes: ['.VN']
  },
  泰股: {
    aliases: ['泰股', '泰國股', '泰国股', '泰國', '泰国', 'thailand', 'th', 'set', 'bangkok'],
    currency: 'THB',
    defaultSuffix: '.BK',
    regionCode: 'TH',
    suffixes: ['.BK']
  },
  沙股: {
    aliases: ['沙股', '沙烏地股', '沙特股', '沙烏地', '沙特', '沙烏地阿拉伯', '沙特阿拉伯', 'saudi', 'saudiarabia', 'tadawul', 'sa'],
    currency: 'SAR',
    defaultSuffix: '.SR',
    regionCode: 'SA',
    suffixes: ['.SR', '.SAU']
  },
  瑞士股: {
    aliases: ['瑞士股', '瑞士', 'switzerland', 'ch', 'six', 'swiss'],
    currency: 'CHF',
    defaultSuffix: '.SW',
    regionCode: 'CH',
    suffixes: ['.SW']
  },
  奧地利股: {
    aliases: ['奧地利股', '奥地利股', '奧地利', '奥地利', 'austria', 'at', 'vienna', 'wienerborse'],
    currency: 'EUR',
    defaultSuffix: '.VI',
    regionCode: 'AT',
    suffixes: ['.VI']
  },
  挪威股: {
    aliases: ['挪威股', '挪威', 'norway', 'no', 'oslo', 'oslobors'],
    currency: 'NOK',
    defaultSuffix: '.OL',
    regionCode: 'NO',
    suffixes: ['.OL']
  },
  芬蘭股: {
    aliases: ['芬蘭股', '芬兰股', '芬蘭', '芬兰', 'finland', 'fi', 'helsinki', 'nasdaqhelsinki'],
    currency: 'EUR',
    defaultSuffix: '.HE',
    regionCode: 'FI',
    suffixes: ['.HE']
  },
  比利時股: {
    aliases: ['比利時股', '比利时股', '比利時', '比利时', 'belgium', 'be', 'brussels', 'euronextbrussels'],
    currency: 'EUR',
    defaultSuffix: '.BR',
    regionCode: 'BE',
    suffixes: ['.BR']
  },
  埃及股: {
    aliases: ['埃及股', '埃及', 'egypt', 'eg', 'egx', 'cairo'],
    currency: 'EGP',
    defaultSuffix: '.CA',
    regionCode: 'EG',
    suffixes: ['.CA']
  },
  愛爾蘭股: {
    aliases: ['愛爾蘭股', '爱尔兰股', '愛爾蘭', '爱尔兰', 'ireland', 'ie', 'dublin', 'ise'],
    currency: 'EUR',
    defaultSuffix: '.IR',
    regionCode: 'IE',
    suffixes: ['.IR']
  },
  巴基斯坦股: {
    aliases: ['巴基斯坦股', '巴基斯坦', 'pakistan', 'pk', 'psx', 'karachi'],
    currency: 'PKR',
    defaultSuffix: '.KA',
    regionCode: 'PK',
    suffixes: ['.KA']
  },
  南非股: {
    aliases: ['南非股', '南非', 'southafrica', 'za', 'jse', 'johannesburg'],
    currency: 'ZAR',
    defaultSuffix: '.JO',
    regionCode: 'ZA',
    suffixes: ['.JO']
  },
  阿根廷股: {
    aliases: ['阿根廷股', '阿根廷', 'argentina', 'ar', 'buenosaires', 'bcba'],
    currency: 'ARS',
    defaultSuffix: '.BA',
    regionCode: 'AR',
    suffixes: ['.BA']
  },
  智利股: {
    aliases: ['智利股', '智利', 'chile', 'cl', 'santiago', 'bcs', 'bolsadesantiago'],
    currency: 'CLP',
    defaultSuffix: '.SN',
    regionCode: 'CL',
    suffixes: ['.SN']
  },
  哥倫比亞股: {
    aliases: ['哥倫比亞股', '哥伦比亚股', '哥倫比亞', '哥伦比亚', 'colombia', 'co', 'bvc', 'bogota'],
    currency: 'COP',
    defaultSuffix: '.CL',
    regionCode: 'CO',
    suffixes: ['.CL']
  },
  秘魯股: {
    aliases: ['秘魯股', '秘鲁股', '秘魯', '秘鲁', 'peru', 'pe', 'bvl', 'lima'],
    currency: 'USD',
    defaultSuffix: '.LM',
    regionCode: 'PE',
    suffixes: ['.LM']
  },
  愛沙尼亞股: {
    aliases: ['愛沙尼亞股', '爱沙尼亚股', '愛沙尼亞', '爱沙尼亚', 'estonia', 'ee', 'nasdaqtallinn', 'tallinn'],
    currency: 'EUR',
    defaultSuffix: '.TL',
    regionCode: 'EE',
    suffixes: ['.TL']
  },
  冰島股: {
    aliases: ['冰島股', '冰岛股', '冰島', '冰岛', 'iceland', 'is', 'nasdaqiceland', 'reykjavik'],
    currency: 'ISK',
    defaultSuffix: '.IC',
    regionCode: 'IS',
    suffixes: ['.IC']
  },
  科威特股: {
    aliases: ['科威特股', '科威特', 'kuwait', 'kw', 'boursakuwait'],
    currency: 'KWF',
    defaultSuffix: '.KW',
    regionCode: 'KW',
    suffixes: ['.KW']
  },
  拉脫維亞股: {
    aliases: ['拉脫維亞股', '拉脱维亚股', '拉脫維亞', '拉脱维亚', 'latvia', 'lv', 'nasdaqriga', 'riga'],
    currency: 'EUR',
    defaultSuffix: '.RG',
    regionCode: 'LV',
    suffixes: ['.RG']
  },
  立陶宛股: {
    aliases: ['立陶宛股', '立陶宛', 'lithuania', 'lt', 'nasdaqvilnius', 'vilnius'],
    currency: 'EUR',
    defaultSuffix: '.VS',
    regionCode: 'LT',
    suffixes: ['.VS']
  },
  紐西蘭股: {
    aliases: ['紐西蘭股', '纽西兰股', '紐西蘭', '纽西兰', 'newzealand', 'nz', 'nzx', 'auckland'],
    currency: 'NZD',
    defaultSuffix: '.NZ',
    regionCode: 'NZ',
    suffixes: ['.NZ']
  },
  菲律賓股: {
    aliases: ['菲律賓股', '菲律宾股', '菲律賓', '菲律宾', 'philippines', 'ph', 'pse', 'manila'],
    currency: 'PHP',
    defaultSuffix: '.PS',
    regionCode: 'PH',
    suffixes: ['.PS']
  },
  卡達股: {
    aliases: ['卡達股', '卡塔尔股', '卡達', '卡塔尔', 'qatar', 'qa', 'qse', 'doha'],
    currency: 'QAR',
    defaultSuffix: '.QA',
    regionCode: 'QA',
    suffixes: ['.QA']
  },
  阿聯股: {
    aliases: ['阿聯股', '阿联股', '阿聯酋股', '阿联酋股', '阿聯酋', '阿联酋', '阿拉伯聯合大公國', '阿拉伯联合大公国', '阿拉伯聯合酋長國', '阿拉伯联合酋长国', 'uae', 'unitedarabemirates', 'abudhabi', 'dubai', 'adx', 'dfm'],
    currency: 'AED',
    defaultSuffix: '.AE',
    regionCode: 'AE',
    suffixes: ['.AE', '.AD']
  },
  委內瑞拉股: {
    aliases: ['委內瑞拉股', '委内瑞拉股', '委內瑞拉', '委内瑞拉', 'venezuela', 've', 'caracas', 'bvcaracas'],
    currency: 'USD',
    defaultSuffix: '.CR',
    regionCode: 'VE',
    suffixes: ['.CR']
  },
  虛擬幣: {
    aliases: ['虛擬幣', '虚拟币', '加密貨幣', '加密货币', 'crypto', 'cryptocurrency', 'digitalasset', 'digitalassets'],
    currency: CRYPTO_DEFAULT_QUOTE_CURRENCY,
    defaultQuoteCurrency: CRYPTO_DEFAULT_QUOTE_CURRENCY
  },
  其他: {
    aliases: ['其他', 'other', 'others'],
    currency: 'USD',
    translationKey: 'markets.other'
  },
  未知: {
    aliases: ['未知', 'unknown'],
    currency: 'USD',
    translationKey: 'markets.unknown'
  }
};

const CRYPTO_LABEL_BY_LOCALE_PREFIX = {
  ar: 'العملات الرقمية',
  cs: 'Krypto',
  da: 'Krypto',
  de: 'Krypto',
  el: 'Crypto',
  en: 'Crypto',
  es: 'Cripto',
  fa: 'کریپتو',
  fr: 'Crypto',
  he: 'קריפטו',
  hi: 'क्रिप्टो',
  hu: 'Kripto',
  id: 'Kripto',
  it: 'Cripto',
  ja: '暗号資産',
  ko: '가상자산',
  ms: 'Kripto',
  nl: 'Crypto',
  pl: 'Krypto',
  pt: 'Cripto',
  ro: 'Crypto',
  ru: 'Крипто',
  sv: 'Krypto',
  th: 'คริปโต',
  tr: 'Kripto',
  vi: 'Crypto',
  yue: '加密幣',
  zh: '加密貨幣',
  'zh-cn': '加密货币',
  'zh-sg': '加密货币',
  'zh-tw': '虛擬幣'
};

const normalizeMarketToken = (value) => String(value || '')
  .trim()
  .toLowerCase()
  .replace(/[\s_()[\]{}:：/\\.-]+/g, '');

const MARKET_ALIAS_MAP = Object.entries(MARKET_DEFINITIONS).reduce((map, [market, definition]) => {
  definition.aliases.forEach((alias) => {
    map.set(normalizeMarketToken(alias), market);
  });
  return map;
}, new Map());

export const MANUAL_MARKET_OPTIONS = [
  '陸股',
  '港股',
  '台股',
  '日股',
  '美股',
  '加拿大股',
  '澳股',
  '英股',
  '新加坡股',
  '韓股',
  '印尼股',
  '法股',
  '德股',
  '義股',
  '馬股',
  '荷股',
  '以色列股',
  '墨股',
  '西班牙股',
  '巴西股',
  '葡股',
  '波股',
  '土股',
  '印股',
  '俄股',
  '瑞典股',
  '捷克股',
  '羅馬尼亞股',
  '匈牙利股',
  '丹麥股',
  '希臘股',
  '瑞士股',
  '奧地利股',
  '挪威股',
  '芬蘭股',
  '比利時股',
  '埃及股',
  '愛爾蘭股',
  '巴基斯坦股',
  '南非股',
  '阿根廷股',
  '智利股',
  '哥倫比亞股',
  '秘魯股',
  '愛沙尼亞股',
  '冰島股',
  '科威特股',
  '拉脫維亞股',
  '立陶宛股',
  '紐西蘭股',
  '菲律賓股',
  '卡達股',
  '阿聯股',
  '委內瑞拉股',
  '越股',
  '泰股',
  '沙股',
  '虛擬幣',
  '其他'
];

const MARKET_EXAMPLE_SYMBOLS = {
  陸股: '600519', // Kweichow Moutai
  港股: '0700', // Tencent
  台股: '2330', // TSMC
  日股: '7203', // Toyota
  美股: 'AAPL', // Apple
  加拿大股: 'RY', // Royal Bank of Canada
  澳股: 'CBA', // Commonwealth Bank
  英股: 'SHEL', // Shell
  新加坡股: 'D05', // DBS
  韓股: '005930', // Samsung Electronics
  印尼股: 'BBCA', // Bank Central Asia
  法股: 'MC', // LVMH
  德股: 'SAP', // SAP
  義股: 'ENEL', // Enel
  馬股: '1295', // Public Bank
  荷股: 'ASML', // ASML
  以色列股: 'TEVA', // Teva
  墨股: 'WALMEX', // Walmart de Mexico
  西班牙股: 'SAN', // Santander
  巴西股: 'PETR4', // Petrobras
  葡股: 'EDP', // EDP
  波股: 'CDR', // CD Projekt
  土股: 'THYAO', // Turkish Airlines
  印股: 'RELIANCE', // Reliance Industries
  俄股: 'SBER', // Sberbank
  瑞典股: 'VOLV-B', // Volvo
  捷克股: 'CEZ', // CEZ Group
  羅馬尼亞股: 'SNP', // OMV Petrom
  匈牙利股: 'OTP', // OTP Bank
  丹麥股: 'NOVO-B', // Novo Nordisk
  希臘股: 'OTE', // Hellenic Telecommunications
  瑞士股: 'NESN', // Nestle
  奧地利股: 'OMV', // OMV
  挪威股: 'EQNR', // Equinor
  芬蘭股: 'KNEBV', // KONE
  比利時股: 'ABI', // AB InBev
  埃及股: 'COMI', // Commercial International Bank
  愛爾蘭股: 'RYA', // Ryanair
  巴基斯坦股: 'HBL', // Habib Bank
  南非股: 'NPN', // Naspers
  阿根廷股: 'GGAL', // Grupo Financiero Galicia
  智利股: 'BSANTANDER', // Banco Santander Chile
  哥倫比亞股: 'ECOPETROL', // Ecopetrol
  秘魯股: 'MINSURI1', // Minsur
  愛沙尼亞股: 'TAL1T', // Tallink Grupp
  冰島股: 'ICEAIR', // Icelandair Group
  科威特股: 'KFH', // Kuwait Finance House
  拉脫維亞股: 'SAF1R', // SAF Tehnika
  立陶宛股: 'KNF1L', // KN Energies
  紐西蘭股: 'FPH', // Fisher & Paykel Healthcare
  菲律賓股: 'JFC', // Jollibee Foods
  卡達股: 'QNBK', // Qatar National Bank
  阿聯股: 'EMAAR', // Emaar Properties
  委內瑞拉股: 'BVCC', // Bolsa de Valores de Caracas
  越股: 'FPT', // FPT Corporation
  泰股: 'PTT', // PTT
  沙股: '2222', // Saudi Aramco
  虛擬幣: 'BTC' // Bitcoin
};

export {
  CSV_IMPORT_PROFILE_OPTIONS,
  CSV_IMPORT_PROFILE_OPTION_GROUPS,
  parseCSV,
  parseCSVWithMeta
} from './csvImport.js';

export const initDB = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject('No window');
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const asyncStorage = {
  get: async (key) => {
    try {
      const db = await initDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const request = store.get(key);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (e) { return null; }
  },
  set: async (key, value) => {
    try {
      const db = await initDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const request = store.put(value, key);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (e) { console.warn('IndexedDB write failed', e); }
  },
  remove: async (key) => {
    try {
      const db = await initDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const request = store.delete(key);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (e) {
      return undefined;
    }
  }
};

const getMarketDefinition = (market) => MARKET_DEFINITIONS[market];

const getMarketBySymbol = (symbol) => {
  const normalizedSymbol = String(symbol || '').trim().toUpperCase();
  if (!normalizedSymbol) return '未知';

  if (CRYPTO_PAIR_REGEX.test(normalizedSymbol)) {
    return '虛擬幣';
  }

  if (/^\d{6}$/.test(normalizedSymbol) && (normalizedSymbol.startsWith('6') || normalizedSymbol.startsWith('0'))) {
    return '陸股';
  }

  const matchedMarket = Object.entries(MARKET_DEFINITIONS).find(([, definition]) => (
    definition.suffixes?.some((suffix) => normalizedSymbol.endsWith(suffix))
  ));

  if (matchedMarket) {
    return matchedMarket[0];
  }

  if (/^[A-Z][A-Z0-9-]*$/.test(normalizedSymbol)) {
    return '美股';
  }

  return '未知';
};

const getLocalizedRegionName = (regionCode, locale) => {
  if (!regionCode) return '';

  const formattingLocale = getFormattingLocale(locale);
  const cacheKey = `${formattingLocale}:${regionCode}`;
  if (REGION_DISPLAY_NAME_CACHE.has(cacheKey)) {
    return REGION_DISPLAY_NAME_CACHE.get(cacheKey);
  }

  let localizedName = regionCode;
  try {
    const displayNames = new Intl.DisplayNames([formattingLocale], { type: 'region' });
    localizedName = displayNames.of(regionCode) || regionCode;
  } catch (error) {
    localizedName = regionCode;
  }

  REGION_DISPLAY_NAME_CACHE.set(cacheKey, localizedName);
  return localizedName;
};

const getCryptoLabel = (locale) => {
  const formattingLocale = getFormattingLocale(locale).toLowerCase();

  if (CRYPTO_LABEL_BY_LOCALE_PREFIX[formattingLocale]) {
    return CRYPTO_LABEL_BY_LOCALE_PREFIX[formattingLocale];
  }

  const matchedPrefix = Object.entries(CRYPTO_LABEL_BY_LOCALE_PREFIX)
    .find(([prefix]) => formattingLocale.startsWith(prefix));

  return matchedPrefix?.[1] || 'Crypto';
};

export const normalizeMarket = (market) => {
  if (!market) return '';

  const rawMarket = String(market).trim();
  if (MARKET_DEFINITIONS[rawMarket]) {
    return rawMarket;
  }

  const normalizedToken = normalizeMarketToken(market);
  return MARKET_ALIAS_MAP.get(normalizedToken) || '';
};

export const guessMarket = (code) => {
  return getMarketBySymbol(code);
};

export const formatSymbol = (code, market) => {
  const normalizedCode = String(code || '').trim().toUpperCase();
  if (!normalizedCode) return '';

  if (normalizedCode.includes('.') || normalizedCode.includes('=X')) {
    return normalizedCode;
  }

  if (CRYPTO_PAIR_REGEX.test(normalizedCode)) {
    return normalizedCode;
  }

  const normalizedMarket = normalizeMarket(market) || guessMarket(normalizedCode);
  const marketDefinition = getMarketDefinition(normalizedMarket);

  if (normalizedMarket === '虛擬幣') {
    return `${normalizedCode}-${marketDefinition?.defaultQuoteCurrency || CRYPTO_DEFAULT_QUOTE_CURRENCY}`;
  }

  if (normalizedMarket === '陸股' && /^\d{6}$/.test(normalizedCode) && (normalizedCode.startsWith('6') || normalizedCode.startsWith('0'))) {
    return normalizedCode.startsWith('6') ? `${normalizedCode}.SS` : `${normalizedCode}.SZ`;
  }

  if (marketDefinition?.defaultSuffix) {
    return `${normalizedCode}${marketDefinition.defaultSuffix}`;
  }

  if (/^\d{6}$/.test(normalizedCode) && (normalizedCode.startsWith('6') || normalizedCode.startsWith('0'))) {
    return normalizedCode.startsWith('6') ? `${normalizedCode}.SS` : `${normalizedCode}.SZ`;
  }

  return normalizedCode;
};

export const getCurrencyBySymbolOrMarket = (symbol, market) => {
  const normalizedSymbol = String(symbol || '').trim().toUpperCase();
  const normalizedMarket = normalizeMarket(market) || getMarketBySymbol(normalizedSymbol);

  if (CRYPTO_PAIR_REGEX.test(normalizedSymbol)) {
    const [, quoteCurrency = ''] = normalizedSymbol.split('-');
    if (MARKET_DISPLAY_CURRENCIES.has(quoteCurrency)) {
      return quoteCurrency;
    }
  }

  const matchedMarket = getMarketBySymbol(normalizedSymbol);
  if (matchedMarket && matchedMarket !== '未知') {
    return getMarketDefinition(matchedMarket)?.currency || CRYPTO_DEFAULT_QUOTE_CURRENCY;
  }

  return getMarketDefinition(normalizedMarket)?.currency || 'USD';
};

export const getMarketLabel = (market, locale, t) => {
  const rawMarket = String(market || '').trim();
  const normalizedMarket = normalizeMarket(market) || '未知';
  const marketDefinition = getMarketDefinition(normalizedMarket);

  if (marketDefinition?.translationKey && typeof t === 'function') {
    return t(marketDefinition.translationKey);
  }

  if (normalizedMarket === '虛擬幣') {
    return getCryptoLabel(locale);
  }

  if (marketDefinition?.regionCode) {
    return getLocalizedRegionName(marketDefinition.regionCode, locale);
  }

  return rawMarket || normalizedMarket;
};

export const getMarketSymbolPlaceholder = (market) => {
  const normalizedMarket = normalizeMarket(market);
  return normalizedMarket ? MARKET_EXAMPLE_SYMBOLS[normalizedMarket] || '' : '';
};

export const normalizeQuoteCurrencyData = (currency, price) => {
  const rule = QUOTE_CURRENCY_NORMALIZERS[String(currency || '').trim()];
  const normalizedCurrency = rule?.currency || currency || '';
  const normalizedPrice = price === undefined || price === null
    ? price
    : Number(price) * (rule?.priceFactor || 1);

  return {
    currency: normalizedCurrency,
    price: Number.isFinite(normalizedPrice) ? normalizedPrice : price
  };
};

export const formatDate = (dateStr, locale = 'zh-TW', options = {}) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return new Intl.DateTimeFormat(getFormattingLocale(locale), {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...options
  }).format(d);
};
