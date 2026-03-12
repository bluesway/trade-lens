import React, { useState, useEffect, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
  PieChart, Pie
} from 'recharts';
import {
  Upload, Download, TrendingUp, TrendingDown, DollarSign, Activity, Layers, RefreshCw, Clock, Trash2, Edit2, Plus, Database, X, Key, Info, HelpCircle, ChevronDown, ChevronUp, Save
} from 'lucide-react';

const STOCK_MAPPING = {
  "002245.SZ": { name: "江蘇蔚藍鋰芯", price: 17.83 },
  "603186.SS": { name: "華正新材", price: 70.80 },
  "AAPL": { name: "Apple Inc.", price: 180.00 },
  "2330.TW": { name: "台積電", price: 800.00 }
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8B5CF6', '#EC4899', '#14B8A6', '#F59E0B', '#6366F1', '#10B981', '#94A3B8'];

const DEFAULT_CSV = `日期,類型,代號,市場,數量,單價,總金額,損益
2025/05/28,賣出,002594,陸股,100,362.89,36289.00,+8596.00
2025/01/24,買入,002594,陸股,100,276.93,27693.00,,,
2025/10/31,買入,603186,陸股,200,48.24,9648.00,,,
2025/12/01,買入,AAPL,美股,10,180.00,1800.00,,,
2025/12/02,買入,2330.TW,台股,1000,800.00,800000.00,,,
2025/12/03,買入,0700.HK,港股,100,300.00,30000.00,,,`;

const CURRENCY_SYMBOLS = { USD: '$', TWD: 'NT$', HKD: 'HK$', CNY: '¥', JPY: '¥' };
const DB_NAME = 'TrDashboardDB';
const STORE_NAME = 'store';
const DB_VERSION = 1;

const initDB = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return;
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const asyncStorage = {
  get: async (key) => {
    const db = await initDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    });
  },
  set: async (key, value) => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(value, key);
  },
  remove: async (key) => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(key);
  }
};

const parseCSV = (text) => {
  const lines = text.split('\n');
  let headerIdx = lines.findIndex(l => l.includes('代號') && l.includes('類型'));
  if (headerIdx === -1) headerIdx = 0; 
  const headers = lines[headerIdx].replace(/^\uFEFF/, '').split(',').map(h => h.trim());
  const result = [];
  for (let i = headerIdx + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    let row = [], inQuotes = false, currentVal = "";
    for (let char of line) {
      if (char === '"') inQuotes = !inQuotes;
      else if (char === ',' && !inQuotes) { row.push(currentVal.trim()); currentVal = ""; }
      else currentVal += char;
    }
    row.push(currentVal.trim());
    if (row.length >= 3) {
      let obj = {};
      headers.forEach((h, idx) => { obj[h] = row[idx] || ""; });
      result.push(obj);
    }
  }
  return result;
};

const guessMarket = (code) => {
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

const formatSymbol = (code, market) => {
  code = code.trim().toUpperCase();
  if (code.includes('.')) return code;
  if (code.length === 6 && (code.startsWith('6') || code.startsWith('0'))) {
    return code.startsWith('6') ? `${code}.SS` : `${code}.SZ`;
  }
  switch(market) {
    case '港股': return `${code}.HK`;
    case '台股': return `${code}.TW`;
    case '日股': return `${code}.T`;
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
  const [newRec, setNewRec] = useState({ date: '', type: '買入', code: '', market: '陸股', qty: '', price: '', amount: '', pnl: '' });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [k, c, cache, m, r, d] = await Promise.all([
          asyncStorage.get('yfapi_net_key'),
          asyncStorage.get('tr_base_currency'),
          asyncStorage.get('tr_dashboard_cache'),
          asyncStorage.get('tr_manual_stock_data'),
          asyncStorage.get('tr_exchange_rates'),
          asyncStorage.get('tr_dashboard_data')
        ]);
        if (k) setApiKey(k);
        if (c) setBaseCurrency(c);
        if (cache) setLiveData(JSON.parse(cache));
        if (m) setManualStockData(JSON.parse(m));
        if (r) setExchangeRates(JSON.parse(r));
        if (d) { const p = JSON.parse(d); if (p?.length > 0) { setRawData(p); setIsDemo(false); } else setRawData(parseCSV(DEFAULT_CSV)); }
        else setRawData(parseCSV(DEFAULT_CSV));
      } catch (e) { setRawData(parseCSV(DEFAULT_CSV)); }
      finally { setIsAppLoaded(true); }
    };
    loadData();
  }, []);

  const showToast = (msg) => { setToastMsg(msg); setTimeout(() => setToastMsg(''), 6000); };
  const formatDate = (s) => { if (!s) return ''; const d = new Date(s); return isNaN(d.getTime()) ? s : `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}`; };

  const handleSaveManualStock = (symbol) => {
    const newData = { ...manualStockData, [symbol]: { name: tempStockEdit.name, price: parseFloat(tempStockEdit.price) || 0, timestamp: Date.now() } };
    setManualStockData(newData);
    asyncStorage.set('tr_manual_stock_data', JSON.stringify(newData));
    setEditingStockSymbol(null);
    showToast(`已更新 ${symbol}`);
  };

  const fetchLivePrices = async (force = false, targetBase = baseCurrency) => {
    if (!apiKey) { setShowManager(true); showToast('請先輸入 API 金鑰'); return; }
    const symbols = Array.from(new Set(rawData.map(r => { const c = String(r['代號']||'').trim(); let m = r['市場']||'未知'; if (m==='未知') m = guessMarket(c); return formatSymbol(c, m); }).filter(s => s && s!=='000000' && s!=='未知')));
    if (symbols.length === 0) return;
    setIsLoadingPrices(true);
    try {
      const now = Date.now(), ONE_DAY = 86400000;
      const toFetch = symbols.filter(s => force || !liveData[s] || (now - liveData[s].timestamp > ONE_DAY));
      const ratesToFetch = new Set();
      symbols.forEach(s => { const d = liveData[s]; if (d?.currency && d.currency !== targetBase) { const k = `${d.currency}${targetBase}=X`; if (force || !exchangeRates[k] || (now - exchangeRates[k].timestamp > ONE_DAY)) ratesToFetch.add(k); } });
      if (toFetch.length === 0 && ratesToFetch.size === 0) { setIsLoadingPrices(false); showToast('已是最新資料'); return; }
      const newData = { ...liveData }, newRates = { ...exchangeRates };
      for (let i = 0; i < toFetch.length; i += 10) {
        const res = await fetch(`https://yfapi.net/v6/finance/quote?region=HK&lang=zh&symbols=${toFetch.slice(i, i+10).join(',')}`, { headers: { 'x-api-key': apiKey, 'accept': 'application/json' } });
        const json = await res.json();
        json?.quoteResponse?.result?.forEach(item => {
          newData[item.symbol] = { price: item.regularMarketPrice, name: item.longName || item.shortName || STOCK_MAPPING[item.symbol]?.name, currency: item.currency || 'USD', timestamp: now };
        });
        if (i+10 < toFetch.length) await new Promise(r => setTimeout(r, 1000));
      }
      const ratesArr = Array.from(ratesToFetch);
      for (let i = 0; i < ratesArr.length; i += 10) {
        const res = await fetch(`https://yfapi.net/v6/finance/quote?region=HK&lang=en&symbols=${ratesArr.slice(i, i+10).join(',')}`, { headers: { 'x-api-key': apiKey, 'accept': 'application/json' } });
        const json = await res.json();
        json?.quoteResponse?.result?.forEach(item => { newRates[item.symbol] = { rate: item.regularMarketPrice, timestamp: now }; });
        if (i+10 < ratesArr.length) await new Promise(r => setTimeout(r, 1000));
      }
      setLiveData(newData); setExchangeRates(newRates);
      asyncStorage.set('tr_dashboard_cache', JSON.stringify(newData));
      asyncStorage.set('tr_exchange_rates', JSON.stringify(newRates));
      setLastUpdate(new Date()); showToast('更新完畢');
    } catch (e) { showToast('抓取失敗'); } finally { setIsLoadingPrices(false); }
  };

  const handleExportCSV = () => {
    const h = ['日期','類型','代號','市場','數量','單價','總金額','損益'];
    const content = [h.join(','), ...rawData.map(r => h.map(key => { let v = r[key]||''; return String(v).includes(',') ? `"${v}"` : v; }).join(','))].join('\n');
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' }));
    link.download = `trade_records_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
  };

  const handleAddRecord = () => {
    if (!newRec.code || !newRec.qty || !newRec.amount || !newRec.date) return;
    const row = { '日期': newRec.date, '類型': newRec.type, '代號': newRec.code.trim(), '市場': newRec.market, '數量': newRec.qty, '單價': (parseFloat(newRec.amount)/parseFloat(newRec.qty)).toFixed(4), '總金額': newRec.amount, '損益': newRec.pnl || '' };
    let newData = (editingIndex !== null) ? [...rawData] : [...rawData, row];
    if (editingIndex !== null) { newData[editingIndex] = row; setEditingIndex(null); }
    setRawData(newData); asyncStorage.set('tr_dashboard_data', JSON.stringify(newData));
    setNewRec({ ...newRec, date: '', code: '', qty: '', price: '', amount: '', pnl: '' });
  };

  const processedData = useMemo(() => {
    if (!isAppLoaded) return [];
    const agg = {};
    rawData.forEach(row => {
      const c = String(row['代號']||'').trim(), t = row['類型']; if (!c || !t) return;
      let m = row['市場'] || guessMarket(c);
      const s = formatSymbol(c, m), q = parseFloat(row['數量'])||0, a = parseFloat(String(row['總金額']).replace(/[^0-9.-]/g,""))||0, p = parseFloat(String(row['損益']).replace(/[^0-9.-]+/g,""))||0;
      if (!agg[s]) agg[s] = { symbol: s, rawCode: c, market: m, name: STOCK_MAPPING[s]?.name || `未知 (${s})`, currentPrice: STOCK_MAPPING[s]?.price || 0, currency: 'CNY', holdingQty: 0, realizedPnl: 0, totalCost: 0, totalSellRevenue: 0, totalSoldQty: 0, history: [] };
      agg[s].history.push(row);
      if (t === '買入') { agg[s].holdingQty += q; agg[s].totalCost += a; }
      else { 
        agg[s].realizedPnl += p; agg[s].totalSellRevenue += a; agg[s].totalSoldQty += q;
        if (agg[s].holdingQty > 0) agg[s].totalCost -= (agg[s].totalCost / agg[s].holdingQty) * q;
        agg[s].holdingQty -= q;
        if (agg[s].holdingQty <= 0.01) { agg[s].holdingQty = 0; agg[s].totalCost = 0; }
      }
    });
    return Object.values(agg).map(stock => {
      const api = liveData[stock.symbol], man = manualStockData[stock.symbol];
      const prc = man?.price || api?.price || stock.currentPrice, nm = man?.name || api?.name || stock.name;
      const cur = api?.currency || (stock.market === '美股' ? 'USD' : stock.market === '台股' ? 'TWD' : 'CNY');
      const rate = (cur === baseCurrency) ? 1 : (exchangeRates[`${cur}${baseCurrency}=X`]?.rate || 1);
      const valO = stock.holdingQty * prc, unPnlO = valO > 0 ? valO - stock.totalCost : 0;
      return { ...stock, name: nm, currentPrice: prc, currency: cur, sym: CURRENCY_SYMBOLS[cur]||cur, valBase: valO * rate, unPnlBase: unPnlO * rate, relPnlBase: stock.realizedPnl * rate, valO, unPnlO, unPnlPct: stock.totalCost > 0 ? (unPnlO/stock.totalCost)*100 : 0, relPnlO: stock.realizedPnl, relPnlPct: (stock.totalSellRevenue - stock.realizedPnl) > 0 ? (stock.realizedPnl / (stock.totalSellRevenue - stock.realizedPnl))*100 : 0 };
    }).sort((a, b) => b.relPnlBase - a.relPnlBase);
  }, [rawData, liveData, manualStockData, exchangeRates, baseCurrency, isAppLoaded]);

  const chartData = useMemo(() => {
    const sorted = processedData.filter(d => d.valBase > 0).sort((a,b) => b.valBase - a.valBase);
    if (sorted.length <= 10) return sorted;
    const top = sorted.slice(0, 10);
    top.push({ name: '其它', valBase: sorted.slice(10).reduce((sum, s) => sum + s.valBase, 0), symbol: 'OTHERS' });
    return top;
  }, [processedData]);

  const displayData = useMemo(() => {
    let f = processedData;
    if (hideZeroHolding) f = f.filter(s => s.holdingQty > 0);
    if (marketFilter !== '全部') f = f.filter(s => s.market === marketFilter);
    return f;
  }, [processedData, hideZeroHolding, marketFilter]);

  const summary = useMemo(() => processedData.reduce((acc, c) => ({ rel: acc.rel + c.relPnlBase, un: acc.un + c.unPnlBase, val: acc.val + c.valBase }), { rel: 0, un: 0, val: 0 }), [processedData]);
  const formatBaseCurrency = (v) => `${CURRENCY_SYMBOLS[baseCurrency] || baseCurrency} ${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formatO = (v, s) => `${s}${v.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

  if (!isAppLoaded) return <div className="min-h-screen flex items-center justify-center">載入中...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      {toastMsg && <div className="fixed bottom-6 right-6 bg-slate-800 text-white px-5 py-3 rounded-xl shadow-2xl z-50 animate-fade-in-up"> {toastMsg} </div>}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold flex items-center gap-2"><Activity className="text-blue-600"/> Trade Lens</h1>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setShowManager(!showManager)} className="px-4 py-2 border rounded-lg hover:bg-slate-50 flex items-center gap-2 text-sm font-medium"><Database size={18}/>設定與紀錄</button>
            <button onClick={() => fetchLivePrices(false)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm font-medium"><RefreshCw size={18}/>更新</button>
            <button onClick={handleExportCSV} className="px-4 py-2 border rounded-lg hover:bg-slate-50 flex items-center gap-2 text-sm font-medium"><Download size={18}/>匯出</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border shadow-sm"><p className="text-sm text-slate-500">總市值 ({baseCurrency})</p><h3 className="text-2xl font-bold mt-1">{formatBaseCurrency(summary.val)}</h3></div>
          <div className="bg-white p-6 rounded-2xl border shadow-sm"><p className="text-sm text-slate-500">已實現損益</p><h3 className={`text-2xl font-bold mt-1 ${summary.rel >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{formatBaseCurrency(summary.rel)}</h3></div>
          <div className="bg-white p-6 rounded-2xl border shadow-sm"><p className="text-sm text-slate-500">未實現損益</p><h3 className={`text-2xl font-bold mt-1 ${summary.un >= 0 ? 'text-blue-600' : 'text-rose-600'}`}>{formatBaseCurrency(summary.un)}</h3></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border shadow-sm h-80">
            <h3 className="font-bold mb-4">市值分佈 (Top 10)</h3>
            <ResponsiveContainer><PieChart><Pie data={chartData} dataKey="valBase" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>{chartData.map((e,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer>
          </div>
          <div className="bg-white p-6 rounded-2xl border shadow-sm h-80">
            <h3 className="font-bold mb-4">已實現損益排行 (Top 10)</h3>
            <ResponsiveContainer><BarChart data={processedData.filter(d=>d.relPnlBase!==0).slice(0,10)}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="name" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/><Tooltip/><Bar dataKey="relPnlBase" fill="#6366F1" radius={[4,4,0,0]}>{processedData.map((e,i)=><Cell key={i} fill={e.relPnlBase >= 0 ? '#10B981' : '#EF4444'}/>)}</Bar></BarChart></ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="p-6 border-b flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="font-bold text-lg">各股概覽與歷史</h3>
            <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
              {['全部', '陸股', '港股', '台股', '美股'].map(m => <button key={m} onClick={() => setMarketFilter(m)} className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${marketFilter === m ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>{m}</button>)}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-500">
                <tr><th className="w-10"></th><th className="px-6 py-4">代號 / 股名</th><th className="text-right">持股</th><th className="text-right">目前股價 / 市值</th><th className="text-right">未實現</th><th className="text-right">已實現</th></tr>
              </thead>
              <tbody className="divide-y">
                {displayData.map(s => {
                  const isExp = expandedStock === s.symbol, isEdt = editingStockSymbol === s.symbol;
                  return (
                    <React.Fragment key={s.symbol}>
                      <tr className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setExpandedStock(isExp?null:s.symbol)}>
                        <td className="pl-4">{isExp ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2" onClick={e=>e.stopPropagation()}>
                            {isEdt ? <div className="flex gap-1"><input value={tempStockEdit.name} onChange={e=>setTempStockEdit({...tempStockEdit, name: e.target.value})} className="border rounded px-2 py-1 text-xs w-24"/><button onClick={()=>handleSaveManualStock(s.symbol)} className="bg-blue-600 text-white p-1 rounded hover:bg-blue-700"><Save size={14}/></button></div> : <><span className="font-bold">{s.symbol}</span><Edit2 size={12} className="text-slate-300 hover:text-blue-500 cursor-pointer" onClick={()=> {setEditingStockSymbol(s.symbol); setTempStockEdit({name: s.name, price: s.currentPrice}); }}/></>}
                          </div>
                          {!isEdt && <div className="text-xs text-slate-400">{s.name}</div>}
                        </td>
                        <td className="text-right px-6 font-medium">{s.holdingQty.toLocaleString()}</td>
                        <td className="text-right px-6" onClick={e=>e.stopPropagation()}>
                          <div className="font-bold">{formatO(s.valO, s.sym)}</div>
                          {isEdt ? <input type="number" value={tempStockEdit.price} onChange={e=>setTempStockEdit({...tempStockEdit, price: e.target.value})} className="border rounded w-16 text-right text-[10px] mt-1"/> : <div className="text-[10px] text-slate-400">@ {s.sym}{s.currentPrice.toFixed(2)}</div>}
                        </td>
                        <td className="text-right px-6"><div className={s.unPnlO>=0?'text-blue-600':'text-rose-600'}><div className="font-bold">{formatO(s.unPnlO, s.sym)}</div><div className="text-[10px] font-medium px-1 rounded bg-slate-100 inline-block mt-1">{s.unPnlPct.toFixed(2)}%</div></div></td>
                        <td className="text-right px-6"><div className={s.relPnlO>=0?'text-emerald-600':'text-rose-600'}><div className="font-bold">{formatO(s.relPnlO, s.sym)}</div><div className="text-[10px] font-medium px-1 rounded bg-slate-100 inline-block mt-1">{s.relPnlPct.toFixed(2)}%</div></div></td>
                      </tr>
                      {isExp && <tr className="bg-slate-50"><td colSpan="6" className="p-4"><div className="bg-white border rounded-xl overflow-hidden shadow-inner"><table className="w-full text-xs text-left"><thead className="bg-slate-50 text-slate-400"><tr><th className="p-3">日期</th><th>類型</th><th className="text-right">數量</th><th className="text-right">單價</th><th className="text-right pr-6">總額</th></tr></thead><tbody className="divide-y">{s.history.map((h,i)=><tr key={i} className="hover:bg-slate-50 transition-colors"> <td className="p-3 text-slate-500">{formatDate(h['日期'])}</td><td><span className={`px-1.5 py-0.5 rounded font-medium ${h['類型']==='買入'?'bg-blue-50 text-blue-600':'bg-purple-50 text-purple-600'}`}>{h['類型']}</span></td><td className="text-right">{h['數量']}</td><td className="text-right text-slate-500">{h['單價']}</td><td className="text-right pr-6 font-bold text-slate-700">{h['總金額']}</td></tr>)}</tbody></table></div></td></tr>}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {showManager && (
          <div className="bg-white p-6 rounded-2xl border shadow-lg space-y-6">
            <div className="flex justify-between items-center"><h2 className="font-bold">設定管理</h2><X className="cursor-pointer" onClick={()=>setShowManager(false)}/></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl"><label className="block text-xs font-bold mb-2">API Key</label><input type="password" value={apiKey} onChange={e=>setApiKey(e.target.value)} onBlur={handleSaveApiKey} className="w-full p-2 border rounded-lg text-sm font-mono"/></div>
              <div className="p-4 bg-slate-50 rounded-xl"><label className="block text-xs font-bold mb-2">基準幣別</label><select value={baseCurrency} onChange={e => handleSaveBaseCurrency(e.target.value)} className="w-full p-2 border rounded-lg text-sm bg-white">{['TWD','CNY','HKD','USD','JPY'].map(c=><option key={c}>{c}</option>)}</select></div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl flex items-center justify-between"><span className="text-sm font-bold">隱藏無持股紀錄</span><input type="checkbox" checked={hideZeroHolding} onChange={()=>setHideZeroHolding(!hideZeroHolding)}/></div>
            <div className="border-t pt-4"><h4 className="text-sm font-bold mb-3">紀錄列表</h4>
              <div className="max-h-60 overflow-y-auto border rounded-xl text-xs"><table className="w-full text-left"><thead className="bg-slate-50 sticky top-0"><tr><th className="p-3">日期</th><th>代號</th><th className="text-right">數量</th><th className="text-right pr-6">操作</th></tr></thead><tbody className="divide-y">{rawData.map((r,i)=><tr key={i}><td className="p-3 text-slate-500">{formatDate(r['日期'])}</td><td className="font-bold">{r['代號']}</td><td className="text-right">{r['數量']}</td><td className="p-3 flex justify-end gap-3"><Edit2 size={14} className="cursor-pointer hover:text-blue-600" onClick={()=>handleEditRecord(i)}/><Trash2 size={14} className="cursor-pointer hover:text-rose-600" onClick={()=>handleDeleteRecord(i)}/></td></tr>)}</tbody></table></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
