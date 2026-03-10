import React, { useState, useEffect, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
  PieChart, Pie
} from 'recharts';
import { Upload, TrendingUp, TrendingDown, DollarSign, PieChart as PieChartIcon, Activity, Layers, RefreshCw, Clock, Trash2, Plus, Database, X, Key, Info } from 'lucide-react';

// 股票資料對應表 (當 API 抓不到名稱或價格時的備援)
const STOCK_MAPPING = {
  "002245": { name: "江蘇蔚藍鋰芯集團股份有限公司", price: 17.83 },
  "603186": { name: "華正新材", price: 70.80 },
  "002230": { name: "科大訊飛", price: 53.70 },
  "002074": { name: "國軒高科", price: 38.06 },
  "000962": { name: "東方鉭業", price: 55.63 },
  "000090": { name: "天健集團", price: 3.92 },
  "000166": { name: "申萬宏源", price: 4.88 },
  "000630": { name: "銅陵有色", price: 7.32 },
  "000670": { name: "盈方微電子", price: 8.22 },
  "000725": { name: "京東方", price: 4.35 },
  "000816": { name: "智慧農業", price: 3.77 },
  "000878": { name: "雲南銅業", price: 23.36 },
  "002251": { name: "步步高", price: 4.61 },
  "002456": { name: "歐菲光集團", price: 9.59 },
  "002475": { name: "立訊精密", price: 49.39 },
  "002594": { name: "比亞迪", price: 96.60 },
  "600006": { name: "東風汽車股份有限公司", price: 6.88 },
  "600028": { name: "中國石化", price: 6.56 },
  "600198": { name: "大唐電信", price: 9.23 },
  "600221": { name: "海南航空", price: 1.55 },
  "600301": { name: "廣西華錫有色金屬股份有限公司", price: 64.20 },
  "600808": { name: "馬鞍山鋼鐵股份", price: 4.22 },
  "601988": { name: "中國銀行", price: 5.33 }
};

// 圓餅圖顏色集
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8B5CF6', '#EC4899', '#14B8A6', '#F59E0B'];

// 預設示範資料
const DEFAULT_CSV = `日期,類型,代號,數量,單價,總金額,損益,獲利率/虧損率,投資天數
5/28/2025,賣出,002594,100,$362.89,"$36,289.00","+8,596.00",31.04%,124
1/24/2025,買入,002594,100,$276.93,"$27,693.00",,,
6/25/2025,買入,002245,1500,$12.41,"$18,615.00",,,
12/5/2024,買入,002074,700,$22.49,"$15,743.00",,,
1/24/2025,賣出,002074,700,$20.95,"$14,665.70","-1,077.30",6.84%,50
10/31/2025,買入,603186,200,$48.24,"$9,648.00",,,
3/10/2026,賣出,600301,100,$63.50,"$6,350.00","+1,310.00",25.99%,29
10/11/2024,賣出,600028,100,$6.89,$689.00,+251.00,57.31%,641
10/11/2024,賣出,600028,100,$6.89,$689.00,+13.00,1.92%,2257
8/7/2018,買入,600028,100,$6.76,$676.00,,,
8/7/2018,賣出,600028,100,$6.74,$674.00,-28,3.99%,75
6/8/2015,賣出,600808,100,$6.70,$670.00,+39.00,3.09%,4
6/8/2015,賣出,600808,100,$6.70,$670.00,+34.00,5.35%,7
6/8/2015,賣出,600221,100,$6.38,$638.00,+10.00,0.8%,42`;

// --- IndexedDB 非同步封裝引擎 ---
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

// 解析 CSV 函數
const parseCSV = (text) => {
  const lines = text.split('\n');
  let headerIdx = lines.findIndex(l => l.includes('代號') && l.includes('類型'));
  if (headerIdx === -1) headerIdx = 0; 

  const headers = lines[headerIdx].replace(/^\uFEFF/, '').split(',').map(h => h.trim());
  const result = [];

  for (let i = headerIdx + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    let row = [];
    let inQuotes = false;
    let currentVal = "";
    
    for (let char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        row.push(currentVal.trim());
        currentVal = "";
      } else {
        currentVal += char;
      }
    }
    row.push(currentVal.trim());

    if (row.length >= 3) {
      let obj = {};
      headers.forEach((h, idx) => {
        obj[h] = row[idx] || "";
      });
      result.push(obj);
    }
  }
  return result;
};

export default function App() {
  // 狀態宣告 (初始皆為空，等待 IndexedDB 載入)
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [rawData, setRawData] = useState([]);
  const [isDemo, setIsDemo] = useState(true);
  const [liveData, setLiveData] = useState({});
  const [apiKey, setApiKey] = useState('');
  
  const [isLoadingPrices, setIsLoadingPrices] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  // 管理介面狀態
  const [showManager, setShowManager] = useState(false);
  const [newRec, setNewRec] = useState({ date: '', type: '買入', code: '', qty: '', amount: '', pnl: '' });

  // 初始載入：從 IndexedDB 讀取資料
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const savedKey = await asyncStorage.get('yfapi_net_key');
        if (savedKey) setApiKey(savedKey);

        const savedCache = await asyncStorage.get('tr_dashboard_cache');
        if (savedCache) setLiveData(JSON.parse(savedCache));

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

  // 顯示訊息通知
  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 6000);
  };

  // 日期格式化函數
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}/${mm}/${dd}`;
  };

  // 儲存 API Key
  const handleSaveApiKey = (newKey) => {
    setApiKey(newKey);
    asyncStorage.set('yfapi_net_key', newKey);
  };

  // 手動觸發取得即時股價 (使用 yfapi.net)
  const fetchLivePrices = async () => {
    if (!apiKey) {
      setShowManager(true);
      showToast('請先於管理面板輸入 yfapi.net 金鑰才能更新股價');
      return;
    }

    const uniqueCodes = Array.from(new Set(rawData.map(row => String(row['代號'] || '').trim()).filter(c => c && c !== '000000')));
    if (uniqueCodes.length === 0) return;

    setIsLoadingPrices(true);
    
    try {
      const now = Date.now();
      const ONE_DAY = 24 * 60 * 60 * 1000;
      
      // 過濾出超過 24 小時未更新或沒有資料的股票代號
      const codesToFetch = uniqueCodes.filter(code => {
        const cached = liveData[code];
        if (!cached) return true;
        if (now - cached.timestamp > ONE_DAY) return true;
        return false;
      });

      if (codesToFetch.length === 0) {
        setLastUpdate(new Date());
        setIsLoadingPrices(false);
        showToast('所有股價均在 24 小時內更新過，自動使用本機快取以節省額度！');
        return;
      }

      const newData = { ...liveData };
      const chunkSize = 10; // 分批請求
      let fetchedCount = 0;

      for (let i = 0; i < codesToFetch.length; i += chunkSize) {
        const chunk = codesToFetch.slice(i, i + chunkSize);
        const symbols = chunk.map(code => code.startsWith('6') ? `${code}.SS` : `${code}.SZ`).join(',');
        
        const res = await fetch(`https://yfapi.net/v6/finance/quote?region=US&lang=zh&symbols=${symbols}`, {
          headers: {
            'x-api-key': apiKey,
            'accept': 'application/json'
          }
        });

        if (!res.ok) {
          if (res.status === 429) throw new Error('API 額度已耗盡或請求過於頻繁 (429)');
          if (res.status === 403) throw new Error('API Key 無效或驗證失敗 (403)');
          throw new Error(`伺服器錯誤: ${res.status}`);
        }

        const json = await res.json();
        if (json?.quoteResponse?.result) {
          json.quoteResponse.result.forEach(item => {
            const rawCode = item.symbol.replace('.SS', '').replace('.SZ', '');
            newData[rawCode] = {
              price: item.regularMarketPrice,
              name: item.shortName || item.longName || STOCK_MAPPING[rawCode]?.name,
              timestamp: now
            };
            fetchedCount++;
          });
        }
        
        if (i + chunkSize < codesToFetch.length) {
          await new Promise(r => setTimeout(r, 1000));
        }
      }

      setLiveData(newData);
      asyncStorage.set('tr_dashboard_cache', JSON.stringify(newData));
      setLastUpdate(new Date());
      showToast(`成功更新 ${fetchedCount} 檔股票資訊！其餘使用有效快取。`);

    } catch (error) {
      showToast(`抓取股價失敗: ${error.message}`);
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
      };
      reader.readAsText(file);
    }
  };

  // 管理交易紀錄功能
  const handleAddRecord = () => {
    if (!newRec.code || !newRec.qty || !newRec.amount || !newRec.date) return; 
    const row = {
      '日期': newRec.date,
      '類型': newRec.type,
      '代號': newRec.code.trim(),
      '數量': newRec.qty,
      '單價': (parseFloat(newRec.amount) / parseFloat(newRec.qty)).toFixed(2),
      '總金額': newRec.amount,
      '損益': newRec.pnl || ''
    };
    const newData = [...rawData, row];
    setRawData(newData);
    asyncStorage.set('tr_dashboard_data', JSON.stringify(newData));
    setNewRec({ date: '', type: '買入', code: '', qty: '', amount: '', pnl: '' });
  };

  const handleDeleteRecord = (idx) => {
    const newData = rawData.filter((_, i) => i !== idx);
    setRawData(newData);
    asyncStorage.set('tr_dashboard_data', JSON.stringify(newData));
    if (newData.length === 0) setIsDemo(true);
  };

  const handleClearData = () => {
    asyncStorage.remove('tr_dashboard_data');
    setRawData(parseCSV(DEFAULT_CSV));
    setIsDemo(true);
    setShowManager(false);
  };

  // 處理與聚合資料
  const processedData = useMemo(() => {
    if (!isAppLoaded) return [];
    
    const agg = {};
    const sortedData = [...rawData].sort((a, b) => new Date(a['日期'] || 0) - new Date(b['日期'] || 0));

    sortedData.forEach(row => {
      if (!row['代號'] || !row['類型']) return;
      
      let code = String(row['代號']).trim();
      let type = row['類型'];
      let qty = parseFloat(row['數量']) || 0;
      
      let amountStr = row['總金額'] || "0";
      let amount = parseFloat(amountStr.replace(/[^0-9.-]+/g, "")) || 0;

      let pnlStr = row['損益'] || "0";
      let pnl = parseFloat(pnlStr.replace(/[^0-9.-]+/g, "")) || 0;

      if (!agg[code]) {
        agg[code] = {
          code,
          name: STOCK_MAPPING[code]?.name || `未知代號 (${code})`,
          currentPrice: STOCK_MAPPING[code]?.price || 0,
          holdingQty: 0,
          realizedPnl: 0,
          totalCost: 0, 
          totalSellRevenue: 0, 
          totalSoldQty: 0, 
          tradeCount: 0
        };
      }

      agg[code].tradeCount += 1;
      
      if (type === '買入') {
        agg[code].holdingQty += qty;
        agg[code].totalCost += amount;
      } else if (type === '賣出') {
        agg[code].realizedPnl += pnl;
        agg[code].totalSellRevenue += amount;
        agg[code].totalSoldQty += qty;

        if (agg[code].holdingQty > 0) {
          let avgCost = agg[code].totalCost / agg[code].holdingQty;
          agg[code].totalCost -= avgCost * qty;
        }
        agg[code].holdingQty -= qty;

        if (agg[code].holdingQty <= 0.01) {
          agg[code].holdingQty = 0;
          agg[code].totalCost = 0;
        }
      }
    });

    return Object.values(agg).map(stock => {
      const apiData = liveData[stock.code];
      const currentPrice = apiData?.price || stock.currentPrice; 
      const currentName = apiData?.name || stock.name;
      const currentValue = stock.holdingQty * currentPrice;
      
      const unrealizedPnl = currentValue > 0 ? currentValue - stock.totalCost : 0;
      const unrealizedPnlPercent = stock.totalCost > 0 ? (unrealizedPnl / stock.totalCost) * 100 : 0;

      const realizedCost = stock.totalSellRevenue - stock.realizedPnl;
      const realizedPnlPercent = realizedCost > 0 ? (stock.realizedPnl / realizedCost) * 100 : 0;

      const ifSoldTodayPnl = (stock.totalSoldQty * currentPrice) - realizedCost;
      const ifSoldTodayPnlPercent = realizedCost > 0 ? (ifSoldTodayPnl / realizedCost) * 100 : 0;

      return {
        ...stock,
        name: currentName,
        currentPrice,
        currentValue,
        unrealizedPnl,
        unrealizedPnlPercent,
        realizedCost,
        realizedPnlPercent,
        ifSoldTodayPnl,
        ifSoldTodayPnlPercent
      };
    }).sort((a, b) => b.realizedPnl - a.realizedPnl);
  }, [rawData, liveData, isAppLoaded]);

  const chartData = useMemo(() => {
    const holdingData = processedData.filter(d => d.currentValue > 0).sort((a, b) => b.currentValue - a.currentValue);
    const pnlData = processedData.filter(d => d.realizedPnl !== 0);
    return { holdingData, pnlData };
  }, [processedData]);

  const summary = useMemo(() => {
    return processedData.reduce((acc, curr) => ({
      totalRealizedPnl: acc.totalRealizedPnl + curr.realizedPnl,
      totalRealizedCost: acc.totalRealizedCost + curr.realizedCost,
      totalUnrealizedPnl: acc.totalUnrealizedPnl + curr.unrealizedPnl,
      totalHoldingCost: acc.totalHoldingCost + curr.totalCost,
      totalValue: acc.totalValue + curr.currentValue
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

  const formatCurrency = (val) => `¥ ${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formatPercent = (val) => `${val > 0 ? '+' : ''}${val.toFixed(2)}%`;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-lg z-50">
          <p className="font-bold text-slate-800 mb-2 border-b pb-1">{label}</p>
          {payload.map((entry, idx) => (
            <p key={idx} className="text-sm flex justify-between gap-4 font-medium" style={{ color: entry.color || entry.fill }}>
              <span>{entry.name}:</span>
              <span>{formatCurrency(entry.value)}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // 客製化長條圖圖說 (Legend)
  const renderCustomLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="flex justify-center gap-6 pt-4">
        {payload.map((entry, index) => {
          const isIfSold = entry.dataKey === 'ifSoldTodayPnl';
          return (
            <li key={`item-${index}`} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
              {isIfSold ? (
                // 半透明 + 虛線邊框方塊
                <div className="w-4 h-4 rounded-[2px] border-2 border-dashed border-slate-400 bg-slate-200/50"></div>
              ) : (
                // 不透明實心方塊
                <div className="w-4 h-4 rounded-[2px] bg-slate-500"></div>
              )}
              <span>{entry.value}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  // 畫面載入中狀態
  if (!isAppLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <RefreshCw size={24} className="animate-spin text-blue-500" />
          <p className="font-medium">載入本機 IndexedDB 資料中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800 relative">
      
      {/* 吐司通知 */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 bg-slate-800 text-white px-5 py-3 rounded-xl shadow-2xl z-50 animate-fade-in-up flex items-center gap-3">
          <Activity size={18} className="text-blue-400" />
          <span className="text-sm font-medium">{toastMsg}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6"> 
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Activity className="text-blue-600" />
              交易組合視覺化儀表板
            </h1>
            <div className="flex flex-col gap-2 md:flex-row md:items-center mt-2">
              <p className="text-sm text-slate-500">
                {isDemo ? "目前顯示為部分預設範例資料。請上傳完整 CSV 以查看全貌。" : `已成功載入並分析 ${rawData.length} 筆交易紀錄`}
              </p>
              {lastUpdate && (
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-md flex items-center gap-1 w-fit">
                  <Clock size={12} />
                  快取更新時間: {lastUpdate.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => setShowManager(!showManager)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm ${showManager ? 'bg-slate-800 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}
            >
              <Database size={18} />
              <span className="hidden md:inline">管理紀錄</span>
            </button>
            <button 
              onClick={fetchLivePrices}
              disabled={isLoadingPrices || rawData.length === 0}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 ${apiKey ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-rose-50 text-rose-600 hover:bg-rose-100'}`}
              title={apiKey ? "手吐更新即時股價" : "請先設定 API Key"}
            >
              <RefreshCw size={18} className={isLoadingPrices ? "animate-spin" : ""} />
              <span className="hidden md:inline">{apiKey ? '更新股價' : '需設定金鑰'}</span>
            </button>
            <div className="relative">
              <input 
                type="file" 
                accept=".csv" 
                onChange={handleFileUpload} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm whitespace-nowrap">
                <Upload size={18} />
                上傳交易記錄 .csv 檔案
              </button>
            </div>
          </div>
        </div>

        {/* Manager Section (Toggleable) */}
        {showManager && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-800/10">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
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
                <button onClick={() => setShowManager(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* API Key 設定區塊 */}
            <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-xl mb-6">
              <div className="flex justify-between items-start mb-3">
                <label className="flex items-center gap-2 text-sm font-bold text-blue-900">
                  <Key size={16} />
                  yfapi.net API 金鑰設定
                </label>
                <a 
                  href="https://yfapi.net/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-xs font-semibold flex items-center gap-1 bg-white border border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors px-2.5 py-1 rounded-md"
                >
                  <Info size={14} />
                  沒有金鑰？點此前往免費註冊取得
                </a>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="password" 
                  placeholder="請貼上您的 x-api-key (例如: A2sD8...)" 
                  value={apiKey} 
                  onChange={e => handleSaveApiKey(e.target.value)} 
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                />
                <p className="text-xs text-blue-600/80 flex items-center">
                  *安全儲存於本機 IndexedDB，輸入後即可解鎖「更新股價」功能，支援 A 股與全球報價。
                </p>
              </div>
            </div>

            {/* 新增紀錄表單 */}
            <div className="bg-slate-50 p-4 rounded-xl mb-6 flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[120px]">
                <label className="block text-xs font-semibold text-slate-500 mb-1">日期</label>
                <input type="date" value={newRec.date} onChange={e => setNewRec({...newRec, date: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
              </div>
              <div className="w-[100px]">
                <label className="block text-xs font-semibold text-slate-500 mb-1">類型</label>
                <select value={newRec.type} onChange={e => setNewRec({...newRec, type: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white">
                  <option>買入</option>
                  <option>賣出</option>
                </select>
              </div>
              <div className="flex-1 min-w-[100px]">
                <label className="block text-xs font-semibold text-slate-500 mb-1">代號</label>
                <input type="text" placeholder="如: 2594" value={newRec.code} onChange={e => setNewRec({...newRec, code: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
              </div>
              <div className="flex-1 min-w-[100px]">
                <label className="block text-xs font-semibold text-slate-500 mb-1">數量</label>
                <input type="number" placeholder="股數" value={newRec.qty} onChange={e => setNewRec({...newRec, qty: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
              </div>
              <div className="flex-1 min-w-[120px]">
                <label className="block text-xs font-semibold text-slate-500 mb-1">總金額</label>
                <input type="number" placeholder="¥" value={newRec.amount} onChange={e => setNewRec({...newRec, amount: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
              </div>
              <div className="flex-1 min-w-[120px]">
                <label className="block text-xs font-semibold text-slate-500 mb-1">損益 (賣出用)</label>
                <input type="number" placeholder="¥ (選填)" value={newRec.pnl} onChange={e => setNewRec({...newRec, pnl: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
              </div>
              <button 
                onClick={handleAddRecord}
                disabled={!newRec.date || !newRec.code || !newRec.qty || !newRec.amount}
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed h-[38px]"
              >
                <Plus size={16} />
                新增
              </button>
            </div>

            {/* 現有紀錄列表 */}
            <div className="max-h-[350px] overflow-y-auto border border-slate-100 rounded-xl">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-100 text-slate-600 sticky top-0 shadow-sm z-10">
                  <tr>
                    <th className="px-4 py-3 font-semibold">日期</th>
                    <th className="px-4 py-3 font-semibold">類型</th>
                    <th className="px-4 py-3 font-semibold">代號 / 股名</th>
                    <th className="px-4 py-3 font-semibold text-right">數量</th>
                    <th className="px-4 py-3 font-semibold text-right">單價</th>
                    <th className="px-4 py-3 font-semibold text-right">總金額</th>
                    <th className="px-4 py-3 font-semibold text-right">損益</th>
                    <th className="px-4 py-3 font-semibold text-center w-16">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rawData
                    .map((row, originalIndex) => ({ ...row, originalIndex }))
                    .sort((a, b) => new Date(b['日期'] || 0) - new Date(a['日期'] || 0))
                    .map((row) => {
                      const resolvedName = liveData[row['代號']]?.name || STOCK_MAPPING[row['代號']]?.name || '未知';
                      return (
                        <tr key={row.originalIndex} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-2 text-slate-600">{formatDate(row['日期'])}</td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${row['類型'] === '買入' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                              {row['類型']}
                            </span>
                          </td>
                          <td className="px-4 py-2">
                            <div className="font-bold text-slate-800">{row['代號']}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{resolvedName}</div>
                          </td>
                          <td className="px-4 py-2 text-right">{row['數量']}</td>
                          <td className="px-4 py-2 text-right text-slate-500">{row['單價']}</td>
                          <td className="px-4 py-2 text-right font-medium">{row['總金額']}</td>
                          <td className="px-4 py-2 text-right text-slate-500">{row['損益'] || '-'}</td>
                          <td className="px-4 py-2 text-center">
                            <button 
                              onClick={() => handleDeleteRecord(row.originalIndex)}
                              className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                              title="刪除"
                            >
                              <Trash2 size={16} />
                            </button>
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

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center gap-2">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full ${summary.totalRealizedPnl >= 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                {summary.totalRealizedPnl >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
              </div>
              <p className="text-sm font-medium text-slate-500">總已實現損益</p>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <h3 className={`text-2xl font-bold ${summary.totalRealizedPnl >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {summary.totalRealizedPnl > 0 ? '+' : ''}{formatCurrency(summary.totalRealizedPnl)}
              </h3>
              <span className={`text-sm font-semibold px-2 py-0.5 rounded-md ${summary.totalRealizedPnl >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {formatPercent(overallRealizedPercent)}
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center gap-2">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full ${summary.totalUnrealizedPnl >= 0 ? 'bg-blue-100 text-blue-600' : 'bg-rose-100 text-rose-600'}`}>
                {summary.totalUnrealizedPnl >= 0 ? <Activity size={20} /> : <TrendingDown size={20} />}
              </div>
              <p className="text-sm font-medium text-slate-500">總未實現損益</p>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <h3 className={`text-2xl font-bold ${summary.totalUnrealizedPnl >= 0 ? 'text-blue-600' : 'text-rose-600'}`}>
                {summary.totalUnrealizedPnl > 0 ? '+' : ''}{formatCurrency(summary.totalUnrealizedPnl)}
              </h3>
              <span className={`text-sm font-semibold px-2 py-0.5 rounded-md ${summary.totalUnrealizedPnl >= 0 ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-600'}`}>
                {formatPercent(overallUnrealizedPercent)}
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center gap-2">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-slate-100 text-slate-600">
                <DollarSign size={20} />
              </div>
              <p className="text-sm font-medium text-slate-500">目前持股總價值</p>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mt-2">
              {formatCurrency(summary.totalValue)}
            </h3>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center gap-2">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <Layers size={20} />
              </div>
              <p className="text-sm font-medium text-slate-500">持倉檔數</p>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mt-2">
              {chartData.holdingData.length} <span className="text-base font-normal text-slate-500">檔股票</span>
            </h3>
          </div>

        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Bar Chart: PnL */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6">各股已實現損益</h3>
            <div className="h-80">
              {chartData.pnlData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData.pnlData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis xAxisId={0} dataKey="name" tick={{fontSize: 12}} tickFormatter={(val) => val.length > 4 ? val.substring(0,4)+'..' : val} />
                    <XAxis xAxisId={1} dataKey="name" hide />
                    <YAxis tickFormatter={(val) => `¥${val}`} tick={{fontSize: 12}} />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: '#f1f5f9'}} />
                    
                    {/* 自訂圖說 (Legend) */}
                    <Legend content={renderCustomLegend} verticalAlign="top" wrapperStyle={{ paddingBottom: '20px' }} />
                    
                    {/* 半透明背景：假設今天才賣的損益 */}
                    <Bar xAxisId={1} dataKey="ifSoldTodayPnl" name="若今天才賣" radius={[4, 4, 0, 0]}>
                      {chartData.pnlData.map((entry, index) => (
                        <Cell key={`cell-if-${index}`} 
                              fill={entry.ifSoldTodayPnl >= 0 ? '#10B981' : '#EF4444'} 
                              fillOpacity={0.25} 
                              stroke={entry.ifSoldTodayPnl >= 0 ? '#10B981' : '#EF4444'} 
                              strokeDasharray="4 4"
                              strokeWidth={1.5} />
                      ))}
                    </Bar>

                    {/* 實心前景：實際已實現損益 */}
                    <Bar xAxisId={0} dataKey="realizedPnl" name="實際已實現" radius={[4, 4, 0, 0]}>
                      {chartData.pnlData.map((entry, index) => (
                        <Cell key={`cell-actual-${index}`} fill={entry.realizedPnl >= 0 ? '#10B981' : '#EF4444'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-slate-400">目前無損益資料</div>
              )}
            </div>
          </div>

          {/* Pie Chart: Holdings */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6">目前持股價值分佈</h3>
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
                      dataKey="currentValue"
                      nameKey="name"
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
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800">各股詳細數據表</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-6 py-4 font-semibold">代號 / 股名</th>
                  <th className="px-6 py-4 font-semibold text-right">當前持股數</th>
                  <th className="px-6 py-4 font-semibold text-right">目前股價</th>
                  <th className="px-6 py-4 font-semibold text-right">目前價值</th>
                  <th className="px-6 py-4 font-semibold text-right">未實現損益</th>
                  <th className="px-6 py-4 font-semibold text-right">實際已實現</th>
                  <th className="px-6 py-4 font-semibold text-right border-l border-slate-200">若今天才賣</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {processedData.map((stock) => {
                  const percentDiff = stock.realizedPnlPercent - stock.ifSoldTodayPnlPercent;
                  const hasSold = stock.totalSoldQty > 0;
                  return (
                    <tr key={stock.code} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800">{stock.code}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{stock.name}</div>
                      </td>
                      <td className="px-6 py-4 text-right">{stock.holdingQty.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right">
                        {stock.currentPrice > 0 ? `¥${stock.currentPrice.toFixed(2)}` : '-'}
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-slate-800">
                        {stock.currentValue > 0 ? formatCurrency(stock.currentValue) : '-'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {stock.holdingQty > 0 ? (
                          <div className={`flex flex-col items-end ${stock.unrealizedPnl > 0 ? 'text-blue-600' : stock.unrealizedPnl < 0 ? 'text-rose-600' : 'text-slate-500'}`}>
                            <span className="font-bold">{stock.unrealizedPnl > 0 ? '+' : ''}{formatCurrency(stock.unrealizedPnl)}</span>
                            <span className="text-xs bg-slate-100 px-1.5 py-0.5 rounded mt-1">{formatPercent(stock.unrealizedPnlPercent)}</span>
                          </div>
                        ) : '-'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {(stock.realizedPnl !== 0 || stock.tradeCount > 0) ? (
                          <div className={`flex flex-col items-end ${stock.realizedPnl > 0 ? 'text-emerald-600' : stock.realizedPnl < 0 ? 'text-rose-600' : 'text-slate-500'}`}>
                            <span className="font-bold">{stock.realizedPnl > 0 ? '+' : ''}{stock.realizedPnl !== 0 ? formatCurrency(stock.realizedPnl) : '-'}</span>
                            {stock.realizedPnlPercent !== 0 && (
                              <span className="text-xs bg-slate-100 px-1.5 py-0.5 rounded mt-1">{formatPercent(stock.realizedPnlPercent)}</span>
                            )}
                          </div>
                        ) : '-'} 
                      </td>
                      <td className="px-6 py-4 text-right border-l border-slate-200">
                        {hasSold ? (
                          <div className={`flex flex-col items-end ${stock.ifSoldTodayPnl > 0 ? 'text-emerald-600' : stock.ifSoldTodayPnl < 0 ? 'text-rose-600' : 'text-slate-500'}`}>
                            <span className="font-bold opacity-75">{stock.ifSoldTodayPnl > 0 ? '+' : ''}{formatCurrency(stock.ifSoldTodayPnl)}</span>
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
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
