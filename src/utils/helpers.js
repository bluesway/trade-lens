import { BASE_CURRENCY_OPTIONS, getFormattingLocale } from '../locales/config';
import { DB_NAME, DB_VERSION, STORE_NAME } from './constants';

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
    aliases: ['陸股', '中国', '中國', '中国a股', '中國a股', 'china', 'chinaa', 'ashare', 'sse', 'szse', 'shanghai', 'shenzhen'],
    currency: 'CNY',
    suffixes: ['.SS', '.SZ'],
    translationKey: 'markets.chinaA'
  },
  港股: {
    aliases: ['港股', '香港', 'hongkong', 'hk', 'hkex'],
    currency: 'HKD',
    suffixes: ['.HK'],
    translationKey: 'markets.hongKong'
  },
  台股: {
    aliases: ['台股', '臺股', '台灣', '臺灣', 'taiwan', 'tw', 'twse', 'tpex'],
    currency: 'TWD',
    defaultSuffix: '.TW',
    suffixes: ['.TW'],
    translationKey: 'markets.taiwan'
  },
  日股: {
    aliases: ['日股', '日本', 'japan', 'jp', 'tse', 'tokyo'],
    currency: 'JPY',
    defaultSuffix: '.T',
    suffixes: ['.T'],
    translationKey: 'markets.japan'
  },
  美股: {
    aliases: ['美股', '美國', '美国', 'usa', 'us', 'unitedstates', 'nyse', 'nasdaq', 'amex'],
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
    suffixes: ['.AX']
  },
  英股: {
    aliases: ['英股', '英國', '英国', 'uk', 'gb', 'greatbritain', 'unitedkingdom', 'lse', 'london'],
    currency: 'GBP',
    defaultSuffix: '.L',
    regionCode: 'GB',
    suffixes: ['.L']
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
    suffixes: ['.SR']
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
  愛爾蘭股: {
    aliases: ['愛爾蘭股', '爱尔兰股', '愛爾蘭', '爱尔兰', 'ireland', 'ie', 'dublin', 'ise'],
    currency: 'EUR',
    defaultSuffix: '.IR',
    regionCode: 'IE',
    suffixes: ['.IR']
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
  '愛爾蘭股',
  '南非股',
  '阿根廷股',
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
  愛爾蘭股: 'RYA', // Ryanair
  南非股: 'NPN', // Naspers
  阿根廷股: 'GGAL', // Grupo Financiero Galicia
  越股: 'FPT', // FPT Corporation
  泰股: 'PTT', // PTT
  沙股: '2222', // Saudi Aramco
  虛擬幣: 'BTC' // Bitcoin
};

const BUY_TYPE_TERMS = [
  '買',
  '买',
  'buy',
  'bot',
  'bid',
  'long',
  'achat',
  'beli',
  'acquisto',
  'compra',
  'comprar',
  'kauf',
  'kopen',
  'koop',
  'mua',
  'purchase',
  'ซื้อ',
  '매수',
  '매입',
  '買付',
  '買い',
  'شراء'
];

const SELL_TYPE_TERMS = [
  '賣',
  '卖',
  'sell',
  'sld',
  'ask',
  'short',
  'vente',
  'jual',
  'vendita',
  'vendere',
  'venda',
  'vender',
  'venta',
  'verkopen',
  'verkauf',
  'verkoop',
  'bán',
  'ขาย',
  '매도',
  '매각',
  '沽',
  '売',
  'بيع'
];

const SORTED_BUY_TYPE_TERMS = [...BUY_TYPE_TERMS].sort((a, b) => b.length - a.length);
const SORTED_SELL_TYPE_TERMS = [...SELL_TYPE_TERMS].sort((a, b) => b.length - a.length);

const CSV_SYMBOL_HEADER_TERMS = [
  '代號',
  '代碼',
  'Symbol',
  'Simbol',
  'Símbolo',
  'Código',
  'Código bursátil',
  'Symbole',
  'Symbool',
  'Simbolo',
  'Codice',
  'Mã',
  'Mã CK',
  'Ticker',
  'Code valeur',
  'Wertpapier',
  'Ticker-Symbol',
  'สัญลักษณ์',
  'ชื่อย่อ',
  '종목코드',
  '티커'
];

const CSV_TYPE_HEADER_TERMS = [
  '類型',
  '動作',
  'Type',
  'Type d\'ordre',
  'Jenis',
  'Tipo',
  'Tipo de orden',
  'Tipo de operação',
  'Operación',
  'Ordertype',
  'Auftragstyp',
  'Ordine',
  'Loại',
  'ประเภท',
  'ฝั่ง',
  '구분',
  '유형'
];

const normalizeHeaderLabel = (value) => String(value || '')
  .trim()
  .toLowerCase()
  .replace(/[\s_()[\]{}:：/\\.-]+/g, '');

const matchesHeaderLabel = (rawHeader, keyword) => {
  const normalizedHeader = normalizeHeaderLabel(rawHeader);
  const normalizedKeyword = normalizeHeaderLabel(keyword);

  if (!normalizedHeader || !normalizedKeyword) {
    return false;
  }

  return normalizedHeader === normalizedKeyword
    || normalizedHeader.includes(normalizedKeyword)
    || normalizedKeyword.includes(normalizedHeader);
};

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
    } catch (e) {}
  }
};

export const parseCSV = (text) => {
  const lines = text.split('\n').filter(line => line.trim() !== '');
  if (lines.length === 0) return [];

  let headerIdx = lines.findIndex((line) => {
    const cells = line.replace(/^\uFEFF/, '').split(',').map((cell) => cell.trim());

    return cells.some((cell) => CSV_SYMBOL_HEADER_TERMS.some((keyword) => matchesHeaderLabel(cell, keyword)))
      && cells.some((cell) => CSV_TYPE_HEADER_TERMS.some((keyword) => matchesHeaderLabel(cell, keyword)));
  });
  if (headerIdx === -1) headerIdx = 0; 

  const rawHeaders = lines[headerIdx].replace(/^\uFEFF/, '').split(',').map(h => h.trim());
  const mapping = {
    '日期': ['日期', '交易日期', '成交日期', 'Date', 'Trade Date', 'Tanggal', 'Tarikh', 'Ngày', 'Ngày giao dịch', 'Date opération', 'Date de transaction', 'Fecha', 'Fecha de operación', 'Fecha de transacción', 'Data', 'Data operação', 'Datum', 'Handelsdatum', 'Data di negoziazione', '日付', '取引日', 'التاريخ', 'วันที่', 'วันที่ซื้อขาย', '날짜', '거래일', '체결일'],
    '類型': ['類型', '交易類別', '動作', 'Type', 'Action', 'Side', 'Jenis', 'Loại', 'Giao dịch', 'Type d\'ordre', 'Ordre', 'Tipo', 'Tipo de orden', 'Operación', 'Transacción', 'Tipo de operação', 'Operação', 'Auftragstyp', 'Transaktionstyp', 'Art', 'Ordine', 'Operazione', 'Ordertype', 'Transactie', '区分', '種類', '売買区分', 'النوع', 'الإجراء', 'ประเภท', 'ฝั่ง', 'สถานะ', '구분', '유형', '매매구분'],
    '代號': ['代號', '股票代號', '代碼', 'Symbol', 'Ticker', 'Stock Code', 'Simbol', 'Kode', 'Kod', 'Símbolo', 'Código', 'Código bursátil', 'Mã', 'Mã CK', 'Mã chứng khoán', 'Symbole', 'Code valeur', 'Wertpapier', 'Ticker-Symbol', 'Simbolo', 'Codice', 'Codice titolo', 'Symbool', '銘柄コード', 'コード', 'ティッカー', 'الرمز', 'สัญลักษณ์', 'ชื่อย่อ', 'ticker', '종목코드', '종목', '티커'],
    '市場': ['市場', '交易所', 'Market', 'Exchange', 'Pasar', 'Pasaran', 'Thị trường', 'Marché', 'Place de marché', 'Mercado', 'Bolsa', 'Markt', 'Börse', 'Mercato', 'Beurs', '取引所', 'السوق', 'البورصة', 'ตลาด', '시장'],
    '數量': ['數量', '成交股數', '股數', 'Quantity', 'Qty', 'Shares', 'Kuantitas', 'Jumlah saham', 'Kuantiti', 'Bilangan unit', 'Bilangan saham', 'Số lượng', 'Khối lượng', 'Quantité', 'Cantidad', 'Acciones', 'Quantidade', 'Qtd', 'Stückzahl', 'Menge', 'Quantità', 'Aantal', '数量', '株数', 'الكمية', 'عدد الأسهم', 'จำนวน', 'จำนวนหุ้น', '수량', '주수'],
    '單價': ['單價', '成交價', '成交單價', 'Price', 'Execution Price', 'Harga', 'Harga per unit', 'Harga seunit', 'Giá', 'Giá khớp', 'Đơn giá', 'Prix', 'Prix unitaire', 'Precio', 'Precio unitario', 'Preço', 'Preço unitário', 'Preis', 'Kurs', 'Prezzo', 'Prijs', '単価', '価格', '約定価格', 'سعر الوحدة', 'السعر', 'ราคา', 'ราคาต่อหุ้น', 'ราคาต่อหน่วย', '단가', '체결가', '가격'],
    '總金額': ['總金額', '成交金額', '淨額', 'Amount', 'Total Amount', 'Net Amount', 'Nilai', 'Jumlah', 'Jumlah keseluruhan', 'Giá trị', 'Tổng giá trị', 'Montant', 'Montant total', 'Valeur totale', 'Importe', 'Importe total', 'Monto', 'Monto total', 'Valor total', 'Betrag', 'Gesamtbetrag', 'Importo', 'Totale', 'Bedrag', 'Totaalbedrag', '金額', '合計金額', '約定代金', 'إجمالي المبلغ', 'إجمالي القيمة', 'القيمة', 'มูลค่า', 'มูลค่ารวม', 'ยอดรวม', '금액', '총금액', '총액'],
    '損益': ['損益', '實現損益', 'PnL', 'Realized PnL', 'Profit', 'P&L', 'Untung/Rugi', 'Untung rugi', 'Laba/Rugi', 'Lãi/Lỗ', 'Lãi lỗ', 'Lãi/Lỗ đã chốt', 'Plus/moins-value', 'Plus-value', 'Moins-value', 'Gain/Perte', 'Ganancia/Pérdida', 'Ganancias/Pérdidas', 'Resultado', 'Lucro/Prejuízo', 'Lucro / Prejuízo', 'Gewinn/Verlust', 'G/V', 'Utile/Perdita', 'Profitto/Perdita', 'Winst/Verlies', '実現損益', 'الربح أو الخسارة', 'الربح/الخسارة', 'الأرباح والخسائر', 'กำไรขาดทุน', 'กำไร/ขาดทุน', '손익', '실현손익']
  };

  const headerMap = {};
  rawHeaders.forEach((h, idx) => {
    for (const [standard, keywords] of Object.entries(mapping)) {
      if (keywords.some((keyword) => matchesHeaderLabel(h, keyword))) {
        if (headerMap[standard] === undefined) headerMap[standard] = idx;
      }
    }
  });

  const result = [];
  for (let i = headerIdx + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    let row = [];
    let inQuotes = false;
    let currentVal = "";
    for (let char of line) {
      if (char === '"') inQuotes = !inQuotes;
      else if (char === ',' && !inQuotes) { row.push(currentVal.trim()); currentVal = ""; }
      else currentVal += char;
    }
    row.push(currentVal.trim());

    if (row.length >= 3) {
      let obj = {};
      Object.keys(mapping).forEach(standard => {
        const idx = headerMap[standard];
        obj[standard] = (idx !== undefined) ? row[idx] || "" : "";
      });
      if (obj['類型']) {
        const normalizedType = normalizeHeaderLabel(obj['類型']);
        if (SORTED_SELL_TYPE_TERMS.some((term) => normalizedType.includes(normalizeHeaderLabel(term)))) obj['類型'] = '賣出';
        else if (SORTED_BUY_TYPE_TERMS.some((term) => normalizedType.includes(normalizeHeaderLabel(term)))) obj['類型'] = '買入';
      }
      result.push(obj);
    }
  }
  return result;
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

  if (/^\d{6}$/.test(normalizedCode) && (normalizedCode.startsWith('6') || normalizedCode.startsWith('0'))) {
    return normalizedCode.startsWith('6') ? `${normalizedCode}.SS` : `${normalizedCode}.SZ`;
  }

  const normalizedMarket = normalizeMarket(market) || guessMarket(normalizedCode);
  const marketDefinition = getMarketDefinition(normalizedMarket);

  if (normalizedMarket === '虛擬幣') {
    return `${normalizedCode}-${marketDefinition?.defaultQuoteCurrency || CRYPTO_DEFAULT_QUOTE_CURRENCY}`;
  }

  if (marketDefinition?.defaultSuffix) {
    return `${normalizedCode}${marketDefinition.defaultSuffix}`;
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
