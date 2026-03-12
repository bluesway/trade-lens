import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
  PieChart, Pie
} from 'recharts';
import { Upload, Download, TrendingUp, TrendingDown, DollarSign, PieChart as PieChartIcon, Activity, Layers, RefreshCw, Clock, Trash2, Edit2, Plus, Database, X, Key, Info, HelpCircle, ChevronDown, ChevronUp, Save, ArrowUpDown, ArrowUp, ArrowDown, Moon, Sun, Camera, FileText, Settings, ShieldCheck } from 'lucide-react';
import { toPng } from 'html-to-image';

// 股票資料對應表 (當 API 抓不到名稱或價格時的備援)
const STOCK_MAPPING = {
  "002245.SZ": { name: "江蘇蔚藍鋰芯", price: 17.83 },
  "603186.SS": { name: "華正新材", price: 70.80 },
  "002230.SZ": { name: "科大訊飛", price: 53.70 },
  "002074.SZ": { name: "國軒高科", price: 38.06 },
  "000962.SZ": { name: "東方鉭業", price: 55.63 },
  "000090.SZ": { name: "天健集團", price: 3.92 },
  "000166.SZ": { name: "申萬宏源", price: 4.88 },
  "000630.SZ": { name: "銅陵有色", price: 7.32 },
  "000670.SZ": { name: "盈方微電子", price: 8.22 },
  "000725.SZ": { name: "京東方", price: 4.35 },
  "000816.SZ": { name: "智慧農業", price: 3.77 },
  "000878.SZ": { name: "雲南銅業", price: 23.36 },
  "002251.SZ": { name: "步步高", price: 4.61 },
  "002456.SZ": { name: "歐菲光集團", price: 9.59 },
  "002475.SZ": { name: "立訊精密", price: 49.39 },
  "002594.SZ": { name: "比亞迪", price: 96.60 },
  "600006.SS": { name: "東風汽車", price: 6.88 },
  "600028.SS": { name: "中國石化", price: 6.56 },
  "600198.SS": { name: "大唐電信", price: 9.23 },
  "600221.SS": { name: "海南航空", price: 1.55 },
  "600301.SS": { name: "廣西華錫", price: 64.20 },
  "600808.SS": { name: "馬鞍山鋼鐵", price: 4.22 },
  "601988.SS": { name: "中國銀行", price: 5.33 },
  "AAPL": { name: "Apple Inc.", price: 180.00 },
  "2330.TW": { name: "台積電", price: 800.00 },
  "0700.HK": { name: "騰訊控股", price: 300.00 }
};

// 圓餅圖顏色集
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8B5CF6', '#EC4899', '#14B8A6', '#F59E0B'];

// 預設示範資料
const DEFAULT_CSV = `日期,類型,代號,市場,數量,單價,總金額,損益,獲利率/虧損率,投資天數
5/28/2025,賣出,002594,陸股,100,362.89,36289.00,+8596.00,31.04%,124
1/24/2025,買入,002594,陸股,100,276.93,27693.00,,
10/31/2025,買入,603186,陸股,200,48.24,9648.00,,
12/1/2025,買入,AAPL,美股,10,180.00,1800.00,,
12/2/2025,買入,2330,台股,1000,800.00,800000.00,,
12/3/2025,買入,0700,港股,100,300.00,30000.00,`;

const CURRENCY_SYMBOLS = {
  USD: '$',
  TWD: 'NT$',
  HKD: 'HK$',
  CNY: '¥',
  JPY: '¥'
};

const DB_NAME = 'TrDashboardDB';
const STORE_NAME = 'store';
const DB_VERSION = 1;

const initDB = () => {
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

const asyncStorage = {
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

// 智慧型 CSV 解析器：支援不同券商的欄位對應

const parseCSV = (text) => {

  const lines = text.split('\n').filter(line => line.trim() !== '');

  if (lines.length === 0) return [];



  // 嘗試找到包含關鍵字的 Header 列

  let headerIdx = lines.findIndex(l => 

    (l.includes('代號') || l.includes('代碼') || l.includes('Symbol')) && 

    (l.includes('類型') || l.includes('動作') || l.includes('Type'))

  );

  if (headerIdx === -1) headerIdx = 0; 



  const rawHeaders = lines[headerIdx].replace(/^\uFEFF/, '').split(',').map(h => h.trim());

  

  // 定義欄位映射規則 (常見券商關鍵字 -> 標準欄位)

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



  // 建立索引映射

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

      // 根據映射填入標準欄位

      Object.keys(mapping).forEach(standard => {

        const idx = headerMap[standard];

        obj[standard] = (idx !== undefined) ? row[idx] || "" : "";

      });

      

      // 智慧型類型轉換 (例如：Buy -> 買入)

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

// 自動推測市場 (給舊版 CSV 或是缺少市場欄位的資料使用)
const guessMarket = (code) => {
  if (!code) return '未知';
  const c = code.trim().toUpperCase();
  if (c.length === 6 && (c.startsWith('6') || c.startsWith('0'))) return '陸股';
  if (c.includes('.TW')) return '台股';
  if (c.includes('.HK')) return '港股';
  if (c.includes('.T')) return '日股';
  if (c.includes('.') && (c.includes('.SS') || c.includes('.SZ'))) return '陸股';
  if (/^[A-Z]+$/.test(c)) return '美股'; // 純英文預設猜美股
  return '未知';
};

// 根據市場自動補齊後綴
const formatSymbol = (code, market) => {
  code = code.trim().toUpperCase();
  if (code.includes('.')) return code; // 已經有後綴 (代號.市場) 就不處理
  
  // 老闆指令：如果代號是 6 位數且 6 或 0 開頭，就當作陸股
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

export default function App() {
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [rawData, setRawData] = useState([]);
  const [isDemo, setIsDemo] = useState(true);
  const [liveData, setLiveData] = useState({});
  const [manualStockData, setManualStockData] = useState({});
  const [exchangeRates, setExchangeRates] = useState({});
  const [apiKey, setApiKey] = useState('');
  const [baseCurrency, setBaseCurrency] = useState('TWD');
  const [marketFilter, setMarketFilter] = useState('全部');
  const [historySortConfig, setHistorySortConfig] = useState({ key: '日期', direction: 'desc' });
  const [darkMode, setDarkMode] = useState(false);
  
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('tr_dark_mode') === 'true';
    if (savedDarkMode) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('tr_dark_mode', newMode);
    if (newMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  const exportChartAsImage = async (ref, fileName) => {
    if (!ref.current) return;
    try {
      showToast('正在產生圖片...');
      const dataUrl = await toPng(ref.current, { 
        backgroundColor: darkMode ? '#0f172a' : '#ffffff',
        style: {
          borderRadius: '16px'
        }
      });
      const link = document.createElement('a');
      link.download = `${fileName}.png`;
      link.href = dataUrl;
      link.click();
      showToast('圖片匯出成功！');
    } catch (e) {
      console.error(e);
      showToast('圖片匯出失敗');
    }
  };

  const [isLoadingPrices, setIsLoadingPrices] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  const [showManager, setShowManager] = useState(false);
  const [showCsvHelp, setShowCsvHelp] = useState(false);
  const [hideZeroHolding, setHideZeroHolding] = useState(false);
  const [expandedStock, setExpandedStock] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingStockSymbol, setEditingStockSymbol] = useState(null);
  const [tempStockEdit, setTempStockEdit] = useState({ name: '', price: '' });
  const [newRec, setNewRec] = useState({ date: '', type: '買入', code: '', market: '陸股', qty: '', amount: '', pnl: '' });

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const savedKey = await asyncStorage.get('yfapi_net_key');
        if (savedKey) setApiKey(savedKey);

        const savedCurrency = await asyncStorage.get('tr_base_currency');
        if (savedCurrency) setBaseCurrency(savedCurrency);

        const savedCache = await asyncStorage.get('tr_dashboard_cache');
        if (savedCache) setLiveData(JSON.parse(savedCache));

        const savedManual = await asyncStorage.get('tr_manual_stock_data');
        if (savedManual) setManualStockData(JSON.parse(savedManual));
        
        const savedRates = await asyncStorage.get('tr_exchange_rates');
        if (savedRates) setExchangeRates(JSON.parse(savedRates));

        const savedData = await asyncStorage.get('tr_dashboard_data');
        if (savedData) {
          const parsed = JSON.parse(savedData);
          if (parsed && parsed.length > 0) {
            setRawData(parsed);
            setIsDemo(false);
          } else {
            setRawData(parseCSV(DEFAULT_CSV));
          }
        } else {
          setRawData(parseCSV(DEFAULT_CSV));
        }
      } catch (e) {
        console.error("從 IndexedDB 載入資料失敗:", e);
        setRawData(parseCSV(DEFAULT_CSV));
      } finally {
        setIsAppLoaded(true);
      }
    };
    loadInitialData();
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 6000);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
  };

  const handleSaveApiKey = () => {
    asyncStorage.set('yfapi_net_key', apiKey);
    showToast('API 金鑰已更新並儲存！');
  };

  const handleSaveManualStock = (symbol) => {
    const newData = { ...manualStockData, [symbol]: { name: tempStockEdit.name, price: parseFloat(tempStockEdit.price) || 0, timestamp: Date.now() } };
    setManualStockData(newData);
    asyncStorage.set('tr_manual_stock_data', JSON.stringify(newData));
    setEditingStockSymbol(null);
    showToast(`已手動更新 ${symbol} 的資訊`);
  };

  const handleSaveBaseCurrency = (currency) => {
    setBaseCurrency(currency);
    asyncStorage.set('tr_base_currency', currency);
    showToast(`基礎計價幣別已更改為 ${currency}，正在更新匯率...`);
    // 傳入 true 強制刷新，或透過 fetchLivePrices 內的邏輯抓取缺失的匯率
    // 這裡我們稍微延遲一下，確保 state 有更新的機會，或者直接呼叫 fetchLivePrices
    setTimeout(() => {
        fetchLivePrices(false, currency); 
    }, 100);
  };

  const fetchLivePrices = async (isForce = false, targetBaseCurrency = baseCurrency) => {
    if (!apiKey) {
      setShowManager(true);
      showToast('請先於管理面板輸入 yfapi.net 金鑰才能更新股價');
      return;
    }

    const uniqueSymbols = Array.from(new Set(rawData.map(row => {
      const code = String(row['代號'] || '').trim();
      let market = row['市場'] || '未知';
      if (market === '未知' || !market) market = guessMarket(code);
      return formatSymbol(code, market);
    }).filter(c => c && c !== '000000' && c !== '未知')));
    
    if (uniqueSymbols.length === 0) return;

    setIsLoadingPrices(true);
    
    try {
      const now = Date.now();
      const ONE_DAY = 24 * 60 * 60 * 1000;
      
      const codesToFetch = uniqueSymbols.filter(symbol => {
        if (isForce) return true;
        const cached = liveData[symbol];
        if (!cached) return true;
        if (now - cached.timestamp > ONE_DAY) return true;
        return false;
      });

      // 檢查匯率是否需要更新 (需要轉換成 targetBaseCurrency)
      const currenciesToFetch = new Set();
      uniqueSymbols.forEach(symbol => {
          const cached = liveData[symbol];
          if(cached && cached.currency && cached.currency !== targetBaseCurrency) {
             const rateKey = `${cached.currency}${targetBaseCurrency}=X`;
             const cachedRate = exchangeRates[rateKey];
             if(isForce || !cachedRate || (now - cachedRate.timestamp > ONE_DAY)) {
                 currenciesToFetch.add(rateKey);
             }
          }
      });
      // 加上目前這批新抓的股票可能的匯率 (保守起見常抓的先加)
      if(codesToFetch.length > 0) {
          ['USD', 'HKD', 'CNY', 'JPY'].forEach(c => {
             if(c !== targetBaseCurrency) currenciesToFetch.add(`${c}${targetBaseCurrency}=X`);
          });
      }


      if (codesToFetch.length === 0 && currenciesToFetch.size === 0) {
        setLastUpdate(new Date());
        setIsLoadingPrices(false);
        showToast('所有股價與匯率均在 24 小時內更新過，自動使用本機快取以節省額度！');
        return;
      }

      const newData = { ...liveData };
      const newRates = { ...exchangeRates };
      let fetchedCount = 0;
      const fetchedSymbols = new Set();

      // 1. 抓股價
      for (let i = 0; i < codesToFetch.length; i += 10) {
        const chunk = codesToFetch.slice(i, i + 10);
        const symbolsStr = chunk.join(',');
        
        const res = await fetch(`https://yfapi.net/v6/finance/quote?region=HK&lang=zh&symbols=${symbolsStr}`, {
          headers: { 'x-api-key': apiKey, 'accept': 'application/json' }
        });

        if (!res.ok) throw new Error(res.status === 429 ? 'API 額度已耗盡 (429)' : res.status === 403 ? 'API Key 無效 (403)' : `伺服器錯誤: ${res.status}`);

        const json = await res.json();
        if (json?.quoteResponse?.result) {
          json.quoteResponse.result.forEach(item => {
            newData[item.symbol] = {
              price: item.regularMarketPrice,
              name: item.longName || item.shortName || STOCK_MAPPING[item.symbol]?.name,
              currency: item.currency || 'USD',
              timestamp: now
            };
            fetchedCount++;
            fetchedSymbols.add(item.symbol);
            
            // 順便把需要的匯率加進去
            if(item.currency && item.currency !== targetBaseCurrency) {
                 currenciesToFetch.add(`${item.currency}${targetBaseCurrency}=X`);
            }
          });
        }
        if (i + 10 < codesToFetch.length) await new Promise(r => setTimeout(r, 1000));
      }
      
      // API 抓成功了，清除我們曾經手動輸入過的覆蓋值 (相信 API)
      if (fetchedCount > 0) {
        const newManual = { ...manualStockData };
        let manualChanged = false;
        fetchedSymbols.forEach(sym => {
           if (newManual[sym]) {
               delete newManual[sym];
               manualChanged = true;
           }
        });
        if (manualChanged) {
            setManualStockData(newManual);
            asyncStorage.set('tr_manual_stock_data', JSON.stringify(newManual));
        }
      }

      // 2. 抓匯率
      const rateSymbols = Array.from(currenciesToFetch);
      for (let i = 0; i < rateSymbols.length; i += 10) {
          const chunk = rateSymbols.slice(i, i + 10);
          const symbolsStr = chunk.join(',');
          const res = await fetch(`https://yfapi.net/v6/finance/quote?region=HK&lang=en&symbols=${symbolsStr}`, {
              headers: { 'x-api-key': apiKey, 'accept': 'application/json' }
          });
          if(res.ok) {
              const json = await res.json();
              if (json?.quoteResponse?.result) {
                  json.quoteResponse.result.forEach(item => {
                      newRates[item.symbol] = { rate: item.regularMarketPrice, timestamp: now };
                  });
              }
          }
          if (i + 10 < rateSymbols.length) await new Promise(r => setTimeout(r, 1000));
      }

      setLiveData(newData);
      setExchangeRates(newRates);
      asyncStorage.set('tr_dashboard_cache', JSON.stringify(newData));
      asyncStorage.set('tr_exchange_rates', JSON.stringify(newRates));
      setLastUpdate(new Date());
      showToast(`成功更新 ${fetchedCount} 檔股票與匯率資訊！`);

    } catch (error) {
      showToast(`抓取失敗: ${error.message}`);
    } finally {
      setIsLoadingPrices(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const text = evt.target.result;
        const parsedData = parseCSV(text);
        setRawData(parsedData);
        setIsDemo(false);
        asyncStorage.set('tr_dashboard_data', JSON.stringify(parsedData));
        setShowCsvHelp(false);
      };
      reader.readAsText(file);
    }
  };

  const handleExportCSV = () => {
    if (rawData.length === 0) {
      showToast('目前沒有資料可匯出！');
      return;
    }

    const headers = ['日期', '類型', '代號', '市場', '數量', '單價', '總金額', '損益'];
    const csvContent = [
      headers.join(','),
      ...rawData.map(row => 
        headers.map(header => {
          let val = row[header] || '';
          if (String(val).includes(',')) {
            val = `"${val}"`;
          }
          return val;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `trade_records_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddRecord = () => {
    if (!newRec.code || !newRec.qty || !newRec.amount || !newRec.date) return; 
    const row = {
      '日期': newRec.date,
      '類型': newRec.type,
      '代號': newRec.code.trim(),
      '市場': newRec.market,
      '數量': newRec.qty,
      '單價': (parseFloat(newRec.amount) / parseFloat(newRec.qty)).toFixed(4),
      '總金額': newRec.amount,
      '損益': newRec.pnl || ''
    };
    
    let newData;
    if (editingIndex !== null) {
      // 編輯模式
      newData = [...rawData];
      newData[editingIndex] = row;
      setEditingIndex(null);
      showToast('交易紀錄已更新！');
    } else {
      // 新增模式
      newData = [...rawData, row];
    }
    
    setRawData(newData);
    asyncStorage.set('tr_dashboard_data', JSON.stringify(newData));
    setNewRec({ ...newRec, date: '', code: '', qty: '', amount: '', pnl: '' });
  };

  const handleDeleteRecord = (idx) => {
    const newData = rawData.filter((_, i) => i !== idx);
    setRawData(newData);
    asyncStorage.set('tr_dashboard_data', JSON.stringify(newData));
    if (newData.length === 0) setIsDemo(true);
    if (editingIndex === idx) {
      setEditingIndex(null);
      setNewRec({ ...newRec, date: '', code: '', qty: '', amount: '', pnl: '' });
    }
  };

  const handleEditRecord = (idx) => {
    const row = rawData[idx];
    
    // 如果日期格式是 D/M/YYYY，轉換為 YYYY-MM-DD 以便 <input type="date"> 顯示
    let dateVal = row['日期'];
    const d = new Date(dateVal);
    if (!isNaN(d.getTime())) {
       dateVal = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }

    setNewRec({
      date: dateVal,
      type: row['類型'],
      code: row['代號'],
      market: row['市場'] || guessMarket(row['代號']),
      qty: row['數量'],
      amount: row['總金額'],
      pnl: row['損益'] || ''
    });
    setEditingIndex(idx);
    
    // 平滑滾動到最上方表單
    document.querySelector('.bg-slate-50 dark:bg-slate-900/50.border-slate-200 dark:border-slate-700.p-4')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClearData = () => {
    asyncStorage.remove('tr_dashboard_data');
    setRawData(parseCSV(DEFAULT_CSV));
    setIsDemo(true);
    setShowManager(false);
  };
  
  // 取得匯率輔助函數
  const getExchangeRate = (fromCurrency, toCurrency) => {
      if (fromCurrency === toCurrency) return 1;
      const rateKey = `${fromCurrency}${toCurrency}=X`;
      return exchangeRates[rateKey]?.rate || 1; // 找不到預設為 1 (可能會有誤差，但避免報錯)
  };

  // 處理與聚合資料
  const processedData = useMemo(() => {
    if (!isAppLoaded) return [];
    
    const agg = {};
    const sortedData = [...rawData].sort((a, b) => new Date(a['日期'] || 0) - new Date(b['日期'] || 0));

    sortedData.forEach(row => {
      let rawCode = String(row['代號'] || '').trim();
      let type = row['類型'];
      if (!rawCode || !type) return;
      
      let market = row['市場'] || '未知';
      if (market === '未知' || !market) market = guessMarket(rawCode);
      let symbol = formatSymbol(rawCode, market);
      
      let qty = parseFloat(row['數量']) || 0;
      let amountStr = row['總金額'] || "0";
      let amount = parseFloat(amountStr.replace(/[^0-9.-]+/g, "")) || 0;
      let pnlStr = row['損益'] || "0";
      let pnl = parseFloat(pnlStr.replace(/[^0-9.-]+/g, "")) || 0;

      if (!agg[symbol]) {
        agg[symbol] = {
          symbol,
          rawCode,
          market,
          name: STOCK_MAPPING[symbol]?.name || `未知代號 (${symbol})`,
          currentPrice: STOCK_MAPPING[symbol]?.price || 0,
          currency: 'CNY', // 預設，稍後會被 API 覆蓋
          holdingQty: 0,
          realizedPnl: 0,
          totalCost: 0, 
          totalSellRevenue: 0, 
          totalSoldQty: 0, 
          tradeCount: 0,
          history: []
        };
      }

      agg[symbol].tradeCount += 1;
      agg[symbol].history.push(row);
      
      if (type === '買入') {
        agg[symbol].holdingQty += qty;
        agg[symbol].totalCost += amount; // 這是原幣別成本
      } else if (type === '賣出') {
        agg[symbol].realizedPnl += pnl; // 原幣別損益
        agg[symbol].totalSellRevenue += amount;
        agg[symbol].totalSoldQty += qty;

        if (agg[symbol].holdingQty > 0) {
          let avgCost = agg[symbol].totalCost / agg[symbol].holdingQty;
          agg[symbol].totalCost -= avgCost * qty;
        }
        agg[symbol].holdingQty -= qty;

        // 避免浮點數誤差導致的極小殘留
        if (agg[symbol].holdingQty <= 0.01) {
          agg[symbol].holdingQty = 0;
          agg[symbol].totalCost = 0;
        }
      }
    });

    return Object.values(agg).map(stock => {
      const apiData = liveData[stock.symbol];
      const manualData = manualStockData[stock.symbol];
      const currentPrice = manualData?.price || apiData?.price || stock.currentPrice; 
      const currentName = manualData?.name || apiData?.name || stock.name;
      const currency = apiData?.currency || (stock.market === '美股' ? 'USD' : stock.market === '台股' ? 'TWD' : stock.market === '港股' ? 'HKD' : stock.market === '日股' ? 'JPY' : 'CNY');
      const rate = getExchangeRate(currency, baseCurrency);

      // 原幣別計算
      const currentValueOriginal = stock.holdingQty * currentPrice;
      const unrealizedPnlOriginal = currentValueOriginal > 0 ? currentValueOriginal - stock.totalCost : 0;
      const unrealizedPnlPercent = stock.totalCost > 0 ? (unrealizedPnlOriginal / stock.totalCost) * 100 : 0;
      const realizedCostOriginal = stock.totalSellRevenue - stock.realizedPnl;
      const realizedPnlPercent = realizedCostOriginal > 0 ? (stock.realizedPnl / realizedCostOriginal) * 100 : 0;
      const ifSoldTodayPnlOriginal = (stock.totalSoldQty * currentPrice) - realizedCostOriginal;
      const ifSoldTodayPnlPercent = realizedCostOriginal > 0 ? (ifSoldTodayPnlOriginal / realizedCostOriginal) * 100 : 0;

      // 轉換成 Base Currency (用於總計)
      const currentValueBase = currentValueOriginal * rate;
      const totalCostBase = stock.totalCost * rate;
      const unrealizedPnlBase = unrealizedPnlOriginal * rate;
      const realizedPnlBase = stock.realizedPnl * rate;
      const realizedCostBase = realizedCostOriginal * rate;
      const ifSoldTodayPnlBase = ifSoldTodayPnlOriginal * rate;

      return {
        ...stock,
        name: currentName,
        currentPrice,
        currency,
        currencySymbol: CURRENCY_SYMBOLS[currency] || currency,
        exchangeRate: rate,
        // 原幣別欄位 (UI 顯示用)
        currentValueOriginal,
        unrealizedPnlOriginal,
        unrealizedPnlPercent,
        realizedPnlOriginal: stock.realizedPnl,
        realizedCostOriginal,
        realizedPnlPercent,
        ifSoldTodayPnlOriginal,
        ifSoldTodayPnlPercent,
        // 基準幣別欄位 (加總計算用)
        currentValueBase,
        totalCostBase,
        unrealizedPnlBase,
        realizedPnlBase,
        realizedCostBase,
        ifSoldTodayPnlBase
      };
    }).sort((a, b) => b.realizedPnlBase - a.realizedPnlBase);
  }, [rawData, liveData, manualStockData, exchangeRates, baseCurrency, isAppLoaded]);

  const chartData = useMemo(() => {
    let holdingData = [];
    const sorted = processedData.filter(d => d.currentValueBase > 0).sort((a, b) => b.currentValueBase - a.currentValueBase);
    if (sorted.length <= 10) {
      holdingData = sorted;
    } else {
      const top = sorted.slice(0, 10);
      const othersValue = sorted.slice(10).reduce((sum, s) => sum + s.currentValueBase, 0);
      top.push({ name: '其它', currentValueBase: othersValue, symbol: 'OTHERS' });
      holdingData = top;
    }
    const pnlData = processedData.filter(d => d.realizedPnlBase !== 0);
    return { holdingData, pnlData };
  }, [processedData]);

  const requestSort = (key) => {
    let direction = 'desc';
    if (historySortConfig.key === key && historySortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setHistorySortConfig({ key, direction });
  };

  const displayData = useMemo(() => {
    let filtered = processedData;
    if (hideZeroHolding) {
      filtered = filtered.filter(stock => stock.holdingQty > 0);
    }
    if (marketFilter !== '全部') {
      filtered = filtered.filter(stock => stock.market === marketFilter);
    }
    
    if (historySortConfig) {
      filtered.sort((a, b) => {
        let valA, valB;
        if (historySortConfig.key === '市值') { valA = a.currentValueBase; valB = b.currentValueBase; }
        else if (historySortConfig.key === '持股數') { valA = a.holdingQty; valB = b.holdingQty; }
        else if (historySortConfig.key === '未實現') { valA = a.unrealizedPnlBase; valB = b.unrealizedPnlBase; }
        else if (historySortConfig.key === '已實現') { valA = a.realizedPnlBase; valB = b.realizedPnlBase; }
        else if (historySortConfig.key === '代號') { valA = a.symbol; valB = b.symbol; }
        else { valA = a.realizedPnlBase; valB = b.realizedPnlBase; }

        if (valA < valB) return historySortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return historySortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [processedData, hideZeroHolding, marketFilter, historySortConfig]);

  const summary = useMemo(() => {
    return processedData.reduce((acc, curr) => ({
      totalRealizedPnl: acc.totalRealizedPnl + curr.realizedPnlBase,
      totalRealizedCost: acc.totalRealizedCost + curr.realizedCostBase,
      totalUnrealizedPnl: acc.totalUnrealizedPnl + curr.unrealizedPnlBase,
      totalHoldingCost: acc.totalHoldingCost + curr.totalCostBase,
      totalValue: acc.totalValue + curr.currentValueBase
    }), { 
      totalRealizedPnl: 0, totalRealizedCost: 0, 
      totalUnrealizedPnl: 0, totalHoldingCost: 0, 
      totalValue: 0 
    });
  }, [processedData]);

  const overallRealizedPercent = summary.totalRealizedCost > 0 
    ? (summary.totalRealizedPnl / summary.totalRealizedCost) * 100 : 0;
  const overallUnrealizedPercent = summary.totalHoldingCost > 0 
    ? (summary.totalUnrealizedPnl / summary.totalHoldingCost) * 100 : 0;

  const formatBaseCurrency = (val) => `${CURRENCY_SYMBOLS[baseCurrency] || baseCurrency} ${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formatOriginalCurrency = (val, sym) => `${sym}${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formatPercent = (val) => `${val > 0 ? '+' : ''}${val.toFixed(2)}%`;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-900 p-3 border border-slate-200 dark:border-slate-700 shadow-lg rounded-lg z-50">
          <p className="font-bold text-slate-800 dark:text-slate-200 mb-2 border-b pb-1">{label}</p>
          {payload.map((entry, idx) => (
            <p key={idx} className="text-sm flex justify-between gap-4 font-medium" style={{ color: entry.color || entry.fill }}>
              <span>{entry.name}:</span>
              <span>{formatBaseCurrency(entry.value)}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderCustomLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="flex justify-center gap-6 pt-4">
        {payload.map((entry, index) => {
          const isIfSold = entry.dataKey === 'ifSoldTodayPnlBase';
          return (
            <li key={`item-${index}`} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
              {isIfSold ? (
                <div className="w-4 h-4 rounded-[2px] border-2 border-dashed border-slate-400 bg-slate-200/50"></div>
              ) : (
                <div className="w-4 h-4 rounded-[2px] bg-slate-50 dark:bg-slate-900/500"></div>
              )}
              <span>{entry.value} (換算後)</span>
            </li>
          );
        })}
      </ul>
    );
  };

  if (!isAppLoaded) {
    return (
      <div className="min-h-screen transition-colors duration-300 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400">
          <RefreshCw size={24} className="animate-spin text-blue-500" />
          <p className="font-medium">載入本機 IndexedDB 資料中...</p>
        </div>
      </div>
    );
  }

  return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-slate-950 text-slate-200' : 'bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200'} transition-colors duration-300 p-4 md:p-8 font-sans`}>
          {toastMsg && (
            <div className="fixed bottom-6 right-6 bg-slate-800 dark:bg-blue-600 text-white px-5 py-3 rounded-xl shadow-2xl z-50 animate-fade-in-up border border-white/10 flex items-center gap-2">
              <ShieldCheck size={18} /> {toastMsg}
            </div>
          )}
    
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white dark:text-white flex items-center gap-2">
                  <Activity className="text-blue-600" />
                  全球交易組合視覺化儀表板
                </h1>
                <div className="flex flex-col gap-2 md:flex-row md:items-center mt-2">
                  <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-400">
                    {isDemo ? "目前顯示為部分預設範例資料。請上傳完整 CSV 以查看全貌。" : `已成功載入並分析 ${rawData.length} 筆交易紀錄`}
                  </p>
                  {lastUpdate && (
                    <span className="text-xs bg-slate-100 dark:bg-slate-800 dark:bg-slate-800 text-slate-500 dark:text-slate-400 dark:text-slate-400 px-2 py-1 rounded-md flex items-center gap-1 w-fit">
                      <Clock size={12} />
                      快取: {lastUpdate.toLocaleTimeString()}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={toggleDarkMode}
                  className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:bg-slate-900/50 dark:hover:bg-slate-700 transition-colors shadow-sm"
                  title={darkMode ? "切換至淺色模式" : "切換至深色模式"}
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button 
                  onClick={() => setShowManager(!showManager)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm ${showManager ? 'bg-slate-800 text-white' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:bg-slate-900/50 dark:hover:bg-slate-700'}`}
                >
                  <Database size={18} />
                  <span className="hidden md:inline">設定與紀錄</span>
                </button>
            <button 
              onClick={() => fetchLivePrices(false)}
              disabled={isLoadingPrices || rawData.length === 0}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 ${apiKey ? 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300' : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100'}`}
              title={apiKey ? "手動更新即時股價 (使用快取)" : "請先設定 API Key"}
            >
              <RefreshCw size={18} className={isLoadingPrices ? "animate-spin" : ""} />
              <span className="hidden md:inline">{apiKey ? '更新股價' : '需設定金鑰'}</span>
            </button>
            <button 
              onClick={() => {
                if (window.confirm('確定要強制刷新嗎？這將會忽略 24 小時快取並實際消耗 API 額度。')) {
                  fetchLivePrices(true);
                }
              }}
              disabled={isLoadingPrices || rawData.length === 0}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 ${apiKey ? 'bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-400' : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100'}`}
              title={apiKey ? "強制更新並消耗額度" : "請先設定 API Key"}
            >
              <Activity size={18} className={isLoadingPrices ? "animate-pulse" : ""} />
              <span className="hidden md:inline">強制刷新</span>
            </button>
            
            <div className="relative flex items-center gap-2">
              <div className="relative group">
                <input 
                  type="file" 
                  accept=".csv" 
                  onChange={handleFileUpload} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm whitespace-nowrap relative">
                  <Upload size={18} />
                  匯入 CSV
                </button>
              </div>
              <button 
                onClick={handleExportCSV}
                className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm whitespace-nowrap"
              >
                <Download size={18} />
                匯出 CSV
              </button>
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowCsvHelp(!showCsvHelp)}
                className="flex items-center justify-center w-10 h-[44px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-blue-600 hover:border-blue-300 rounded-lg transition-colors"
                title="CSV 格式說明"
              >
                <HelpCircle size={20} />
              </button>
              {showCsvHelp && (
                <div className="absolute right-0 top-14 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl shadow-xl z-50 text-sm text-slate-600 dark:text-slate-400">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2 border-b pb-1">CSV 欄位格式說明</h4>
                  <p className="mb-2 text-xs">請確保您的 CSV 包含以下標題列 (順序不拘)：</p>
                  <ul className="list-disc pl-5 space-y-1 text-xs font-mono bg-slate-50 dark:bg-slate-900/50 p-2 rounded">
                    <li>日期 <span className="text-slate-400">(如: 2025/01/01)</span></li>
                    <li>類型 <span className="text-slate-400">(買入/賣出)</span></li>
                    <li>代號 <span className="text-slate-400">(如: 2330.TW, AAPL)</span></li>
                    <li>市場 <span className="text-slate-400">(選填, 供手動新增參考)</span></li>
                    <li>數量</li>
                    <li>單價 <span className="text-slate-400">(原幣別)</span></li>
                    <li>總金額 <span className="text-slate-400">(原幣別)</span></li>
                    <li>損益 <span className="text-slate-400">(賣出必填, 原幣別)</span></li>
                  </ul>
                  <p className="mt-2 text-xs text-blue-600 font-medium">* 註 1：代號若為 6 位數且以 6 或 0 開頭，系統會自動判定為陸股 (.SS / .SZ)。</p>
                  <p className="text-xs text-blue-600 font-medium">* 註 2：其餘市場請直接在代號後加上後綴 (如: .TW, .HK)。</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Manager Section (Toggleable) */}
        {showManager && (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800/10">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Database className="text-blue-600" />
                設定與紀錄管理
              </h2>
              <div className="flex gap-2">
                <button 
                  onClick={handleClearData}
                  className="px-3 py-1.5 text-sm bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-md font-medium transition-colors"
                >
                  清除並載入範例
                </button>
                <button onClick={() => setShowManager(false)} className="text-slate-400 hover:text-slate-600 dark:text-slate-400">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Global Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-xl">
                  <div className="flex justify-between items-start mb-3">
                    <label className="flex items-center gap-2 text-sm font-bold text-blue-900">
                      <Key size={16} />
                      yfapi.net API 金鑰設定
                    </label>
                    <a 
                      href="https://financeapi.net/dashboard" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-xs font-semibold flex items-center gap-1 bg-white border border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors px-2.5 py-1 rounded-md"
                    >
                      <Info size={14} />
                      免費註冊取得
                    </a>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="password" 
                      placeholder="請貼上您的 x-api-key (例如: A2sD8...)" 
                      value={apiKey} 
                      onChange={e => setApiKey(e.target.value)} 
                      className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-mono bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                    />
                    <button
                      onClick={handleSaveApiKey}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm whitespace-nowrap"
                    >
                      儲存金鑰
                    </button>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
                    <DollarSign size={16} />
                    總計面板基礎幣別 (Base Currency)
                  </label>
                  <div className="flex gap-3">
                    <select 
                      value={baseCurrency} 
                      onChange={e => handleSaveBaseCurrency(e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="TWD">新台幣 (TWD)</option>
                      <option value="CNY">人民幣 (CNY)</option>
                      <option value="HKD">港幣 (HKD)</option>
                      <option value="USD">美金 (USD)</option>
                      <option value="JPY">日圓 (JPY)</option>
                    </select>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    * 所有的外幣資產都會透過即時匯率轉換成此幣別，以便在上方總計看板中進行加總計算。
                  </p>
                </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-xl mb-6 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">隱藏目前無持股的交易紀錄</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={hideZeroHolding} onChange={() => setHideZeroHolding(!hideZeroHolding)} />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* 新增紀錄表單 */}
            <div className="bg-slate-50 dark:bg-slate-800 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-xl mb-6">
                <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
                  <Plus size={16} /> 手動新增單筆紀錄
                </h4>
                <div className="flex flex-wrap gap-4 items-end">
                  <div className="w-[130px]">
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">日期</label>
                    <input type="date" value={newRec.date} onChange={e => setNewRec({...newRec, date: e.target.value})} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="w-[80px]">
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">類型</label>
                    <select value={newRec.type} onChange={e => setNewRec({...newRec, type: e.target.value})} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                      <option>買入</option>
                      <option>賣出</option>
                    </select>
                  </div>
                  <div className="w-[100px]">
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">市場</label>
                    <select value={newRec.market} onChange={e => setNewRec({...newRec, market: e.target.value})} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-blue-700">
                      <option>陸股</option>
                      <option>港股</option>
                      <option>台股</option>
                      <option>日股</option>
                      <option>美股</option>
                      <option>其他</option>
                    </select>
                  </div>
                  <div className="flex-1 min-w-[100px]">
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">代號</label>
                    <input type="text" placeholder="如: AAPL" value={newRec.code} onChange={e => setNewRec({...newRec, code: e.target.value})} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="flex-1 min-w-[100px]">
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">數量</label>
                    <input type="number" placeholder="股數" value={newRec.qty} onChange={e => setNewRec({...newRec, qty: e.target.value})} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="flex-1 min-w-[120px]">
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">總金額 (原幣)</label>
                    <input type="number" placeholder="依該市場幣別" value={newRec.amount} onChange={e => setNewRec({...newRec, amount: e.target.value})} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="flex-1 min-w-[120px]">
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">損益 (賣出填,原幣)</label>
                    <input type="number" placeholder="選填" value={newRec.pnl} onChange={e => setNewRec({...newRec, pnl: e.target.value})} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="flex gap-2">
                    {editingIndex !== null && (
                      <button 
                        onClick={() => {
                          setEditingIndex(null);
                          setNewRec({ ...newRec, date: '', code: '', qty: '', amount: '', pnl: '' });
                        }}
                        className="flex items-center justify-center bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors h-[38px] w-[80px]"
                      >
                        取消
                      </button>
                    )}
                    <button 
                      onClick={handleAddRecord}
                      disabled={!newRec.date || !newRec.code || !newRec.qty || !newRec.amount}
                      className="flex items-center justify-center bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed h-[38px] min-w-[80px]"
                    >
                      {editingIndex !== null ? '儲存變更' : '加入'}
                    </button>
                  </div>
                </div>
            </div>

            {/* 現有紀錄列表 */}
            <div className="max-h-[350px] overflow-y-auto border border-slate-100 dark:border-slate-800 rounded-xl">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-100 dark:bg-slate-800 dark:bg-slate-800 text-slate-600 dark:text-slate-400 sticky top-0 shadow-sm z-10">
                  <tr>
                    <th className="px-4 py-3 font-semibold">日期</th>
                    <th className="px-4 py-3 font-semibold">類型</th>
                    <th className="px-4 py-3 font-semibold">代號 / 股名 (市場)</th>
                    <th className="px-4 py-3 font-semibold text-right">數量</th>
                    <th className="px-4 py-3 font-semibold text-right">單價(原幣)</th>
                    <th className="px-4 py-3 font-semibold text-right">總金額(原幣)</th>
                    <th className="px-4 py-3 font-semibold text-right">損益(原幣)</th>
                    <th className="px-4 py-3 font-semibold text-center w-16">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rawData
                    .map((row, originalIndex) => ({ ...row, originalIndex }))
                    .sort((a, b) => new Date(b['日期'] || 0) - new Date(a['日期'] || 0))
                    .map((row) => {
                      let market = row['市場'] || '未知';
                      if (market === '未知' || !market) market = guessMarket(row['代號']);
                      const symbol = formatSymbol(row['代號'], market);
                      const resolvedName = liveData[symbol]?.name || STOCK_MAPPING[symbol]?.name || '未知';
                      return (
                        <tr key={row.originalIndex} className="hover:bg-slate-50 dark:bg-slate-900/50 transition-colors">
                          <td className="px-4 py-2 text-slate-600 dark:text-slate-400">{formatDate(row['日期'])}</td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${row['類型'] === '買入' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                              {row['類型']}
                            </span>
                          </td>
                          <td className="px-4 py-2">
                            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                              {symbol}
                              <span className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded">{market}</span>
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{resolvedName}</div>
                          </td>
                          <td className="px-4 py-2 text-right">{row['數量']}</td>
                          <td className="px-4 py-2 text-right text-slate-500 dark:text-slate-400">{row['單價']}</td>
                          <td className="px-4 py-2 text-right font-medium">{row['總金額']}</td>
                          <td className="px-4 py-2 text-right text-slate-500 dark:text-slate-400">{row['損益'] || '-'}</td>
                          <td className="px-4 py-2 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button 
                                onClick={() => handleEditRecord(row.originalIndex)}
                                className="text-slate-400 hover:text-blue-500 transition-colors p-1"
                                title="編輯"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button 
                                onClick={() => handleDeleteRecord(row.originalIndex)}
                                className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                                title="刪除"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                  })}
                  {rawData.length === 0 && (
                    <tr>
                      <td colSpan="8" className="px-4 py-8 text-center text-slate-400">目前沒有任何紀錄</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Top KPI Cards (顯示 Base Currency) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-center gap-2 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-slate-50 opacity-50"><TrendingUp size={100} /></div>
            <div className="flex items-center gap-3 relative z-10">
              <div className={`p-3 rounded-full ${summary.totalRealizedPnl >= 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                {summary.totalRealizedPnl >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
              </div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">總已實現損益 (換算)</p>
            </div>
            <div className="flex items-baseline gap-2 mt-2 relative z-10">
              <h3 className={`text-2xl font-bold ${summary.totalRealizedPnl >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {summary.totalRealizedPnl > 0 ? '+' : ''}{formatBaseCurrency(summary.totalRealizedPnl)}
              </h3>
              <span className={`text-sm font-semibold px-2 py-0.5 rounded-md ${summary.totalRealizedPnl >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {formatPercent(overallRealizedPercent)}
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-center gap-2 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-slate-50 opacity-50"><Activity size={100} /></div>
            <div className="flex items-center gap-3 relative z-10">
              <div className={`p-3 rounded-full ${summary.totalUnrealizedPnl >= 0 ? 'bg-blue-100 text-blue-600' : 'bg-rose-100 text-rose-600'}`}>
                {summary.totalUnrealizedPnl >= 0 ? <Activity size={20} /> : <TrendingDown size={20} />}
              </div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">總未實現損益 (換算)</p>
            </div>
            <div className="flex items-baseline gap-2 mt-2 relative z-10">
              <h3 className={`text-2xl font-bold ${summary.totalUnrealizedPnl >= 0 ? 'text-blue-600' : 'text-rose-600'}`}>
                {summary.totalUnrealizedPnl > 0 ? '+' : ''}{formatBaseCurrency(summary.totalUnrealizedPnl)}
              </h3>
              <span className={`text-sm font-semibold px-2 py-0.5 rounded-md ${summary.totalUnrealizedPnl >= 0 ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-600'}`}>
                {formatPercent(overallUnrealizedPercent)}
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-center gap-2">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                <DollarSign size={20} />
              </div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">目前持股總市值 (換算)</p>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-2">
              {formatBaseCurrency(summary.totalValue)}
            </h3>
          </div>

                      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-center gap-2">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                            <Layers size={20} />
                          </div>
                          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">持倉檔數</p>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-2">
                          {processedData.filter(stock => stock.holdingQty > 0).length} <span className="text-base font-normal text-slate-500 dark:text-slate-400">檔股票</span>
                        </h3>
                      </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Bar Chart: PnL (Base Currency) */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800" ref={barChartRef}>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 dark:text-white mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                各股已實現損益
                <button onClick={() => exportChartAsImage(barChartRef, 'realized_pnl_chart')} className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-md transition-all" title="將圖表存為圖片">
                  <Camera size={16} />
                </button>
              </div>
              <span className="text-xs font-normal text-slate-400 dark:text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 dark:bg-slate-800 px-2 py-1 rounded">統一換算為 {baseCurrency} 繪製</span>
            </h3>
            <div className="h-80">
              {chartData.pnlData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData.pnlData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#334155" : "#E2E8F0"} />
                    <XAxis xAxisId={0} dataKey="name" tick={{fontSize: 12, fill: darkMode ? '#94a3b8' : '#64748b'}} tickFormatter={(val) => val.length > 4 ? val.substring(0,4)+'..' : val} />
                    <XAxis xAxisId={1} dataKey="name" hide />
                    <YAxis tickFormatter={(val) => `${val>1000? (val/1000).toFixed(0)+'k' : val}`} tick={{fontSize: 12, fill: darkMode ? '#94a3b8' : '#64748b'}} />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: darkMode ? '#1e293b' : '#f1f5f9'}} />
                    <Legend content={renderCustomLegend} verticalAlign="top" wrapperStyle={{ paddingBottom: '20px' }} />
                    <Bar xAxisId={1} dataKey="ifSoldTodayPnlBase" name="若今天才賣" radius={[4, 4, 0, 0]}>
                      {chartData.pnlData.map((entry, index) => (
                        <Cell key={`cell-if-${index}`} fill={entry.ifSoldTodayPnlBase >= 0 ? '#10B981' : '#EF4444'} fillOpacity={0.25} stroke={entry.ifSoldTodayPnlBase >= 0 ? '#10B981' : '#EF4444'} strokeDasharray="4 4" strokeWidth={1.5} />
                      ))}
                    </Bar>
                    <Bar xAxisId={0} dataKey="realizedPnlBase" name="實際已實現" radius={[4, 4, 0, 0]}>
                      {chartData.pnlData.map((entry, index) => (
                        <Cell key={`cell-actual-${index}`} fill={entry.realizedPnlBase >= 0 ? '#10B981' : '#EF4444'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-slate-400">目前無損益資料</div>
              )}
            </div>
          </div>

          {/* Pie Chart: Holdings (Base Currency) */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800" ref={pieChartRef}>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 dark:text-white mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                持股市值分佈 (Top 10)
                <button onClick={() => exportChartAsImage(pieChartRef, 'portfolio_distribution')} className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-md transition-all" title="將圖表存為圖片">
                  <Camera size={16} />
                </button>
              </div>
              <span className="text-xs font-normal text-slate-400 dark:text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 dark:bg-slate-800 px-2 py-1 rounded">統一換算為 {baseCurrency} 繪製</span>
            </h3>
            <div className="h-80">
              {chartData.holdingData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData.holdingData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="currentValueBase"
                      nameKey="name"
                      labelLine={true}
                      label={({name, percent}) => `${name.substring(0,4)} ${(percent * 100).toFixed(0)}%`}
                    >
                      {chartData.holdingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-slate-400">目前空手無持股</div>
              )}
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                各股歷史交易記錄
              </h3>
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded w-fit">點擊列可查看買賣明細，金額皆為該市場原幣別</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {['全部', ...Array.from(new Set(processedData.map(s => s.market))).filter(Boolean)].map(m => (
                <button
                  key={m}
                  onClick={() => setMarketFilter(m)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    marketFilter === m
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-auto max-h-[calc(100vh-100px)] custom-scrollbar">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 z-30 shadow-sm">
                <tr>
                  <th className="w-10 sticky top-0 bg-slate-50 dark:bg-slate-800 z-30"></th>
                  <th className="px-6 py-4 font-semibold cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors sticky top-0 bg-slate-50 dark:bg-slate-800 z-30" onClick={() => requestSort('代號')}>
                    <div className="flex items-center gap-1">代號 / 股名 (市場·幣別) {historySortConfig?.key === '代號' ? (historySortConfig.direction === 'asc' ? <ArrowUp size={14}/> : <ArrowDown size={14}/>) : <ArrowUpDown size={14} className="opacity-50"/>}</div>
                  </th>
                  <th className="px-6 py-4 font-semibold text-right cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors sticky top-0 bg-slate-50 dark:bg-slate-800 z-30" onClick={() => requestSort('持股數')}>
                    <div className="flex items-center justify-end gap-1">當前持股數 {historySortConfig?.key === '持股數' ? (historySortConfig.direction === 'asc' ? <ArrowUp size={14}/> : <ArrowDown size={14}/>) : <ArrowUpDown size={14} className="opacity-50"/>}</div>
                  </th>
                  <th className="px-6 py-4 font-semibold text-right cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors sticky top-0 bg-slate-50 dark:bg-slate-800 z-30" onClick={() => requestSort('市值')}>
                    <div className="flex items-center justify-end gap-1">目前股價 / 市值(原幣) {historySortConfig?.key === '市值' ? (historySortConfig.direction === 'asc' ? <ArrowUp size={14}/> : <ArrowDown size={14}/>) : <ArrowUpDown size={14} className="opacity-50"/>}</div>
                  </th>
                  <th className="px-6 py-4 font-semibold text-right cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors sticky top-0 bg-slate-50 dark:bg-slate-800 z-30" onClick={() => requestSort('未實現')}>
                    <div className="flex items-center justify-end gap-1">未實現損益(原幣) {historySortConfig?.key === '未實現' ? (historySortConfig.direction === 'asc' ? <ArrowUp size={14}/> : <ArrowDown size={14}/>) : <ArrowUpDown size={14} className="opacity-50"/>}</div>
                  </th>
                  <th className="px-6 py-4 font-semibold text-right cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors sticky top-0 bg-slate-50 dark:bg-slate-800 z-30" onClick={() => requestSort('已實現')}>
                    <div className="flex items-center justify-end gap-1">實際已實現(原幣) {historySortConfig?.key === '已實現' ? (historySortConfig.direction === 'asc' ? <ArrowUp size={14}/> : <ArrowDown size={14}/>) : <ArrowUpDown size={14} className="opacity-50"/>}</div>
                  </th>
                  <th className="px-6 py-4 font-semibold text-right border-l border-slate-200 dark:border-slate-700 sticky top-0 bg-slate-50 dark:bg-slate-800 z-30">若今天才賣(原幣)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayData.map((stock) => {
                  const percentDiff = stock.realizedPnlPercent - stock.ifSoldTodayPnlPercent;
                  const hasSold = stock.totalSoldQty > 0;
                  const sym = stock.currencySymbol;
                  const isExpanded = expandedStock === stock.symbol;
                  
                  return (
                    <React.Fragment key={stock.symbol}>
                      <tr 
                        className={`hover:bg-slate-50 dark:bg-slate-900/50 transition-colors cursor-pointer ${isExpanded ? 'bg-slate-50 dark:bg-slate-900/50' : ''}`}
                        onClick={() => setExpandedStock(isExpanded ? null : stock.symbol)}
                      >
                        <td className="pl-4 text-slate-400">
                          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2" onClick={e=>e.stopPropagation()}>
                            {editingStockSymbol === stock.symbol ? (
                              <div className="flex flex-col gap-1">
                                <input 
                                  type="text" 
                                  value={tempStockEdit.name} 
                                  onChange={e=>setTempStockEdit({...tempStockEdit, name: e.target.value})} 
                                  className="px-2 py-1 border border-slate-300 dark:border-slate-600 rounded text-xs w-28 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                                  placeholder="手動股名"
                                />
                                <div className="flex gap-1">
                                  <button onClick={() => handleSaveManualStock(stock.symbol)} className="bg-blue-600 text-white p-1 rounded hover:bg-blue-700"><Save size={14}/></button>
                                  <button onClick={() => setEditingStockSymbol(null)} className="bg-slate-200 text-slate-600 dark:text-slate-400 p-1 rounded hover:bg-slate-300"><X size={14}/></button>
                                </div>
                              </div>
                            ) : (
                              <>
                                {stock.symbol}
                                <span className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded">
                                  {stock.market} &middot; {stock.currency}
                                </span>
                                <button 
                                  onClick={(e) => { 
                                    e.stopPropagation(); 
                                    setEditingStockSymbol(stock.symbol); 
                                    setTempStockEdit({ name: stock.name, price: stock.currentPrice }); 
                                  }} 
                                  className="text-slate-300 hover:text-blue-500 ml-1"
                                >
                                  <Edit2 size={12} />
                                </button>
                              </>
                            )}
                          </div>
                          {editingStockSymbol !== stock.symbol && <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{stock.name}</div>}
                        </td>
                        <td className="px-6 py-4 text-right font-medium">{stock.holdingQty.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="font-medium text-slate-800 dark:text-slate-200">
                            {stock.currentValueOriginal > 0 ? formatOriginalCurrency(stock.currentValueOriginal, sym) : '-'}
                          </div>
                          <div className="text-xs text-slate-400 mt-1 flex items-center justify-end gap-1" onClick={e=>e.stopPropagation()}>
                            {editingStockSymbol === stock.symbol ? (
                              <input 
                                type="number" 
                                value={tempStockEdit.price} 
                                onChange={e=>setTempStockEdit({...tempStockEdit, price: e.target.value})} 
                                className="px-1 py-1 border border-slate-300 dark:border-slate-600 rounded w-20 text-right text-xs bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                                placeholder="現價"
                              />
                            ) : (
                              <span>{stock.currentPrice > 0 ? `@ ${sym}${stock.currentPrice.toFixed(2)}` : '-'}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {stock.holdingQty > 0 ? (
                            <div className={`flex flex-col items-end ${stock.unrealizedPnlOriginal > 0 ? 'text-blue-600' : stock.unrealizedPnlOriginal < 0 ? 'text-rose-600' : 'text-slate-500 dark:text-slate-400'}`}>
                              <span className="font-bold">{stock.unrealizedPnlOriginal > 0 ? '+' : ''}{formatOriginalCurrency(stock.unrealizedPnlOriginal, sym)}</span>
                              <span className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded mt-1">{formatPercent(stock.unrealizedPnlPercent)}</span>
                            </div>
                          ) : '-'}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {(stock.realizedPnlOriginal !== 0 || stock.tradeCount > 0) ? (
                            <div className={`flex flex-col items-end ${stock.realizedPnlOriginal > 0 ? 'text-emerald-600' : stock.realizedPnlOriginal < 0 ? 'text-rose-600' : 'text-slate-500 dark:text-slate-400'}`}>
                              <span className="font-bold">{stock.realizedPnlOriginal > 0 ? '+' : ''}{stock.realizedPnlOriginal !== 0 ? formatOriginalCurrency(stock.realizedPnlOriginal, sym) : '-'}</span>
                              {stock.realizedPnlPercent !== 0 && (
                                <span className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded mt-1">{formatPercent(stock.realizedPnlPercent)}</span>
                              )}
                            </div>
                          ) : '-'}
                        </td>
                        <td className="px-6 py-4 text-right border-l border-slate-200 dark:border-slate-700">
                          {hasSold ? (
                            <div className={`flex flex-col items-end ${stock.ifSoldTodayPnlOriginal > 0 ? 'text-emerald-600' : stock.ifSoldTodayPnlOriginal < 0 ? 'text-rose-600' : 'text-slate-500 dark:text-slate-400'}`}>
                              <span className="font-bold opacity-75">{stock.ifSoldTodayPnlOriginal > 0 ? '+' : ''}{formatOriginalCurrency(stock.ifSoldTodayPnlOriginal, sym)}</span>
                              <div className="mt-1 flex items-center gap-1">
                                {percentDiff > 7 ? (
                                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-medium whitespace-nowrap">成功避險 (+{percentDiff.toFixed(2)}%)</span>
                                ) : percentDiff < -7 ? (
                                  <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded font-medium whitespace-nowrap">少賺賣飛 ({percentDiff.toFixed(2)}%)</span>
                                ) : null}
                              </div>
                            </div>
                          ) : '-'}
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr className="bg-slate-50 dark:bg-slate-800/50">
                          <td colSpan="8" className="px-6 py-4 p-0 border-b border-slate-200 dark:border-slate-700">
                            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden shadow-sm m-2">
                              <table className="w-full text-xs text-left">
                                <thead className="bg-slate-100 dark:bg-slate-800 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                  <tr>
                                    <th className="px-4 py-2 font-semibold">日期</th>
                                    <th className="px-4 py-2 font-semibold">類型</th>
                                    <th className="px-4 py-2 font-semibold text-right">數量</th>
                                    <th className="px-4 py-2 font-semibold text-right">單價</th>
                                    <th className="px-4 py-2 font-semibold text-right">總金額</th>
                                    <th className="px-4 py-2 font-semibold text-right">損益</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                  {stock.history.map((hRow, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 dark:bg-slate-900/50">
                                      <td className="px-4 py-2 text-slate-600 dark:text-slate-400">{formatDate(hRow['日期'])}</td>
                                      <td className="px-4 py-2">
                                        <span className={`px-1.5 py-0.5 rounded font-medium ${hRow['類型'] === '買入' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                                          {hRow['類型']}
                                        </span>
                                      </td>
                                      <td className="px-4 py-2 text-right">{hRow['數量']}</td>
                                      <td className="px-4 py-2 text-right">{hRow['單價']}</td>
                                      <td className="px-4 py-2 text-right font-medium">{hRow['總金額']}</td>
                                      <td className="px-4 py-2 text-right text-slate-500 dark:text-slate-400">{hRow['損益'] || '-'}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View for Main Data */}
          <div className="md:hidden flex flex-col bg-slate-50 dark:bg-slate-900/50 p-3 gap-3">
             {displayData.map((stock) => {
                const percentDiff = stock.realizedPnlPercent - stock.ifSoldTodayPnlPercent;
                const hasSold = stock.totalSoldQty > 0;
                const sym = stock.currencySymbol;
                const isExpanded = expandedStock === stock.symbol;

                return (
                  <div key={stock.symbol} className="bg-white dark:bg-slate-900 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden">
                    <div 
                      className="p-4 flex flex-col gap-3 cursor-pointer hover:bg-slate-50 dark:bg-slate-900/50 transition-colors"
                      onClick={() => setExpandedStock(isExpanded ? null : stock.symbol)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-slate-800 dark:text-slate-200 text-lg flex items-center gap-2">
                            {stock.symbol}
                            <span className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded">
                              {stock.market} &middot; {stock.currency}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{stock.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-slate-800 dark:text-slate-200 text-lg">
                            {stock.currentValueOriginal > 0 ? formatOriginalCurrency(stock.currentValueOriginal, sym) : '-'}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5">
                            {stock.currentPrice > 0 ? `@ ${sym}${stock.currentPrice.toFixed(2)}` : '-'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-sm pt-3 border-t border-slate-50">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider">持股數</span>
                          <span className="font-medium text-slate-700 mt-0.5">{stock.holdingQty.toLocaleString()}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider">未實現損益</span>
                          {stock.holdingQty > 0 ? (
                            <div className={`flex flex-col items-end mt-0.5 ${stock.unrealizedPnlOriginal > 0 ? 'text-blue-600' : stock.unrealizedPnlOriginal < 0 ? 'text-rose-600' : 'text-slate-500 dark:text-slate-400'}`}>
                              <span className="font-bold text-xs">{stock.unrealizedPnlOriginal > 0 ? '+' : ''}{formatOriginalCurrency(stock.unrealizedPnlOriginal, sym)}</span>
                              <span className="text-[10px] leading-none mt-1">{formatPercent(stock.unrealizedPnlPercent)}</span>
                            </div>
                          ) : <span className="mt-0.5 text-slate-400">-</span>}
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider">已實現損益</span>
                          {(stock.realizedPnlOriginal !== 0 || stock.tradeCount > 0) ? (
                            <div className={`flex flex-col items-end mt-0.5 ${stock.realizedPnlOriginal > 0 ? 'text-emerald-600' : stock.realizedPnlOriginal < 0 ? 'text-rose-600' : 'text-slate-500 dark:text-slate-400'}`}>
                              <span className="font-bold text-xs">{stock.realizedPnlOriginal > 0 ? '+' : ''}{stock.realizedPnlOriginal !== 0 ? formatOriginalCurrency(stock.realizedPnlOriginal, sym) : '-'}</span>
                              {stock.realizedPnlPercent !== 0 && (
                                <span className="text-[10px] leading-none mt-1">{formatPercent(stock.realizedPnlPercent)}</span>
                              )}
                            </div>
                          ) : <span className="mt-0.5 text-slate-400">-</span>}
                        </div>
                      </div>
                      
                      <div className="flex justify-center mt-1 text-slate-300">
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                    
                    {/* Expanded History for Mobile */}
                    {isExpanded && (
                      <div className="bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 p-3">
                         <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">交易明細</div>
                         <div className="flex flex-col gap-2">
                           {stock.history.map((hRow, idx) => (
                             <div key={idx} className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs flex justify-between items-center shadow-sm">
                               <div className="flex flex-col gap-1">
                                 <div className="flex items-center gap-2">
                                    <span className={`px-1.5 py-0.5 text-[10px] rounded font-medium ${hRow['類型'] === '買入' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                                      {hRow['類型']}
                                    </span>
                                    <span className="text-slate-500 dark:text-slate-400 dark:text-slate-400">{formatDate(hRow['日期'])}</span>
                                 </div>
                                 <div className="text-slate-600 dark:text-slate-400 dark:text-slate-400">
                                   <span className="font-medium">{hRow['數量']}</span> 股 @ <span>{hRow['單價']}</span>
                                 </div>
                               </div>
                               <div className="flex flex-col items-end gap-1">
                                 <span className="font-bold text-slate-700">{hRow['總金額']}</span>
                                 {hRow['類型'] === '賣出' && hRow['損益'] && (
                                   <span className={`font-medium ${parseFloat(hRow['損益']) > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                      {parseFloat(hRow['損益']) > 0 ? '+' : ''}{hRow['損益']}
                                   </span>
                                 )}
                               </div>
                             </div>
                           ))}
                         </div>
                      </div>
                    )}
                  </div>
                );
             })}
          </div>

        </div>

      </div>
    </div>
  );
}
