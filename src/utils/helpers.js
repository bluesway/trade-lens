import { DB_NAME, DB_VERSION, STORE_NAME } from './constants';

const MARKET_CURRENCY_MAP = {
  美股: 'USD',
  台股: 'TWD',
  港股: 'HKD',
  陸股: 'CNY',
  日股: 'JPY'
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

  let headerIdx = lines.findIndex(l => 
    (l.includes('代號') || l.includes('代碼') || l.includes('Symbol')) && 
    (l.includes('類型') || l.includes('動作') || l.includes('Type'))
  );
  if (headerIdx === -1) headerIdx = 0; 

  const rawHeaders = lines[headerIdx].replace(/^\uFEFF/, '').split(',').map(h => h.trim());
  const mapping = {
    '日期': ['日期', '交易日期', '成交日期', 'Date', 'Trade Date'],
    '類型': ['類型', '交易類別', '動作', 'Type', 'Action', 'Side'],
    '代號': ['代號', '股票代號', '代碼', 'Symbol', 'Ticker', 'Stock Code'],
    '市場': ['市場', '交易所', 'Market', 'Exchange'],
    '數量': ['數量', '成交股數', '股數', 'Quantity', 'Qty', 'Shares'],
    '單價': ['單價', '成交價', '成交單價', 'Price', 'Execution Price'],
    '總金額': ['總金額', '成交金額', '淨額', 'Amount', 'Total Amount', 'Net Amount'],
    '損益': ['損益', '實現損益', 'PnL', 'Realized PnL', 'Profit']
  };

  const headerMap = {};
  rawHeaders.forEach((h, idx) => {
    for (const [standard, keywords] of Object.entries(mapping)) {
      if (keywords.some(k => h.includes(standard) || standard.includes(h) || h.toLowerCase() === k.toLowerCase())) {
        if (!headerMap[standard]) headerMap[standard] = idx;
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
        const t = obj['類型'].toLowerCase();
        if (t.includes('買') || t.includes('buy') || t.includes('bot')) obj['類型'] = '買入';
        else if (t.includes('賣') || t.includes('sell') || t.includes('sld')) obj['類型'] = '賣出';
      }
      result.push(obj);
    }
  }
  return result;
};

export const guessMarket = (code) => {
  if (!code) return '未知';
  const c = code.trim().toUpperCase();
  if (c.length === 6 && (c.startsWith('6') || c.startsWith('0'))) return '陸股';
  if (c.includes('.TW')) return '台股';
  if (c.includes('.HK')) return '港股';
  if (c.includes('.T')) return '日股';
  if (c.includes('.') && (c.includes('.SS') || c.includes('.SZ'))) return '陸股';
  if (/^[A-Z]+$/.test(c)) return '美股';
  return '未知';
};

export const formatSymbol = (code, market) => {
  code = code.trim().toUpperCase();
  if (code.includes('.')) return code;
  if (code.length === 6 && (code.startsWith('6') || code.startsWith('0'))) {
    return code.startsWith('6') ? `${code}.SS` : `${code}.SZ`;
  }
  switch(market) {
    case '港股': return `${code}.HK`;
    case '台股': return `${code}.TW`;
    case '日股': return `${code}.T`;
    case '美股': return code; 
    default: return code;
  }
};

export const getCurrencyBySymbolOrMarket = (symbol, market) => {
  const normalizedSymbol = String(symbol || '').trim().toUpperCase();

  if (normalizedSymbol.endsWith('.TW')) return 'TWD';
  if (normalizedSymbol.endsWith('.HK')) return 'HKD';
  if (normalizedSymbol.endsWith('.SZ') || normalizedSymbol.endsWith('.SS')) return 'CNY';
  if (normalizedSymbol.endsWith('.T')) return 'JPY';

  return MARKET_CURRENCY_MAP[market] || 'CNY';
};

export const formatDate = (dateStr, locale = 'zh-TW', options = {}) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...options
  }).format(d);
};
