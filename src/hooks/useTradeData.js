import { useState, useEffect, useMemo } from 'react';
import { asyncStorage, parseCSV, guessMarket, formatSymbol } from '../utils/helpers';
import { DEFAULT_CSV, STOCK_MAPPING } from '../utils/constants';

export function useTradeData(showToast) {
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [rawData, setRawData] = useState([]);
  const [isDemo, setIsDemo] = useState(true);
  const [liveData, setLiveData] = useState({});
  const [manualStockData, setManualStockData] = useState({});
  const [exchangeRates, setExchangeRates] = useState({});
  const [apiKey, setApiKey] = useState('');
  const [baseCurrency, setBaseCurrency] = useState('TWD');
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isLoadingPrices, setIsLoadingPrices] = useState(false);
  const [trendTimeRange, setTrendTimeRange] = useState('全部');

  // 初始化與資料載入邏輯 (維持不變)
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const savedKey = await asyncStorage.get('yfapi_net_key');
        if (savedKey) setApiKey(savedKey);
        const savedCurrency = await asyncStorage.get('tr_base_currency');
        if (savedCurrency) setBaseCurrency(savedCurrency);
        const savedCache = await asyncStorage.get('tr_dashboard_cache');
        if (savedCache) {
          const parsedCache = JSON.parse(savedCache);
          setLiveData(parsedCache);
          const ts = Object.values(parsedCache).map(d => d.timestamp).filter(Boolean);
          if (ts.length > 0) setLastUpdate(new Date(Math.max(...ts)));
        }
        const savedManual = await asyncStorage.get('tr_manual_stock_data');
        if (savedManual) setManualStockData(JSON.parse(savedManual));
        const savedRates = await asyncStorage.get('tr_exchange_rates');
        if (savedRates) setExchangeRates(JSON.parse(savedRates));
        const savedData = await asyncStorage.get('tr_dashboard_data');
        if (savedData) {
          const parsed = JSON.parse(savedData);
          if (parsed && parsed.length > 0) { setRawData(parsed); setIsDemo(false); }
          else { setRawData(parseCSV(DEFAULT_CSV)); }
        } else { setRawData(parseCSV(DEFAULT_CSV)); }
      } catch (e) { setRawData(parseCSV(DEFAULT_CSV)); }
      finally { setIsAppLoaded(true); }
    };
    loadInitialData();
  }, []);

  const getExchangeRate = (from, to) => {
    if (from === to) return 1;
    return exchangeRates[`${from}${to}=X`]?.rate || 1;
  };

  // 即時股價抓取 (維持不變)
  const fetchLivePrices = async (isForce = false, targetBase = baseCurrency) => {
    if (!apiKey) { showToast('請先設定 API Key'); return; }
    const symbols = Array.from(new Set(rawData.map(r => formatSymbol(r['代號'], r['市場'] || guessMarket(r['代號']))).filter(s => s && s !== '未知')));
    if (symbols.length === 0) return;
    setIsLoadingPrices(true);
    try {
      const now = Date.now();
      const ONE_DAY = 24*60*60*1000;
      const toFetch = symbols.filter(s => isForce || !liveData[s] || (now - liveData[s].timestamp > ONE_DAY));
      if (toFetch.length === 0) { setLastUpdate(new Date()); setIsLoadingPrices(false); return; }
      const newData = { ...liveData };
      const newRates = { ...exchangeRates };
      for (let i = 0; i < toFetch.length; i += 10) {
        const res = await fetch(`https://yfapi.net/v6/finance/quote?symbols=${toFetch.slice(i, i+10).join(',')}`, { headers: { 'x-api-key': apiKey } });
        const json = await res.json();
        json?.quoteResponse?.result?.forEach(item => {
          newData[item.symbol] = { price: item.regularMarketPrice, name: item.longName || STOCK_MAPPING[item.symbol]?.name, currency: item.currency || 'USD', timestamp: now };
        });
      }
      setLiveData(newData);
      asyncStorage.set('tr_dashboard_cache', JSON.stringify(newData));
      setLastUpdate(new Date());
      showToast('股價更新成功');
    } catch (e) { showToast('更新失敗'); }
    finally { setIsLoadingPrices(false); }
  };

  // 聚合計算
  const processedData = useMemo(() => {
    const agg = {};
    [...rawData].sort((a,b) => new Date(a['日期']) - new Date(b['日期'])).forEach(r => {
      const sym = formatSymbol(r['代號'], r['市場'] || guessMarket(r['代號']));
      if(!agg[sym]) agg[sym] = { symbol: sym, holdingQty: 0, totalCost: 0, realizedPnl: 0, totalSellRevenue: 0, totalSoldQty: 0, history: [] };
      agg[sym].history.push(r);
      const qty = parseFloat(r['數量']) || 0;
      const amt = parseFloat(String(r['總金額']).replace(/[^0-9.-]+/g, "")) || 0;
      if(r['類型']==='買入'){ agg[sym].holdingQty += qty; agg[sym].totalCost += amt; }
      else { 
        agg[sym].realizedPnl += parseFloat(String(r['損益']).replace(/[^0-9.-]+/g, "")) || 0;
        agg[sym].totalSellRevenue += amt; agg[sym].totalSoldQty += qty;
        if(agg[sym].holdingQty > 0) agg[sym].totalCost -= (agg[sym].totalCost / agg[sym].holdingQty) * qty;
        agg[sym].holdingQty -= qty;
      }
    });
    return Object.values(agg).map(s => {
      const live = liveData[s.symbol];
      const manual = manualStockData[s.symbol];
      const price = manual?.price !== undefined ? manual.price : (live?.price || STOCK_MAPPING[s.symbol]?.price || 0);
      const rate = getExchangeRate(live?.currency || 'USD', baseCurrency);
      const valOrig = s.holdingQty * price;
      const pnlUnreal = valOrig > 0 ? valOrig - s.totalCost : 0;
      return { ...s, currentPrice: price, currentValueBase: valOrig * rate, unrealizedPnlBase: pnlUnreal * rate, realizedPnlBase: s.realizedPnl * rate, realizedCostBase: (s.totalSellRevenue - s.realizedPnl) * rate, totalCostBase: s.totalCost * rate, ifSoldTodayPnlBase: (s.totalSoldQty * price - (s.totalSellRevenue - s.realizedPnl)) * rate };
    });
  }, [rawData, liveData, manualStockData, baseCurrency]);

  const summary = useMemo(() => processedData.reduce((a, c) => ({
    totalRealizedPnl: a.totalRealizedPnl + c.realizedPnlBase,
    totalRealizedCost: a.totalRealizedCost + c.realizedCostBase,
    totalUnrealizedPnl: a.totalUnrealizedPnl + c.unrealizedPnlBase,
    totalHoldingCost: a.totalHoldingCost + c.totalCostBase,
    totalValue: a.totalValue + c.currentValueBase
  }), { totalRealizedPnl: 0, totalRealizedCost: 0, totalUnrealizedPnl: 0, totalHoldingCost: 0, totalValue: 0 }), [processedData]);

  // 趨勢計算 (補回靈魂)
  const trendData = useMemo(() => {
    if (rawData.length === 0) return [];
    const sorted = [...rawData].sort((a, b) => new Date(a['日期']) - new Date(b['日期']));
    let currentCost = 0, currentPnl = 0;
    const stockStats = {};
    const timeline = [];
    sorted.forEach(r => {
      const sym = formatSymbol(r['代號'], r['市場'] || guessMarket(r['代號']));
      const amt = parseFloat(String(r['總金額']).replace(/[^0-9.-]+/g, "")) || 0;
      const rate = getExchangeRate(r['市場']==='美股'?'USD':r['市場']==='台股'?'TWD':'USD', baseCurrency);
      if(!stockStats[sym]) stockStats[sym] = { qty: 0, cost: 0 };
      if(r['類型']==='買入'){ stockStats[sym].qty += parseFloat(r['數量']); stockStats[sym].cost += amt; currentCost += amt * rate; }
      else {
        const pnl = parseFloat(String(r['損益']).replace(/[^0-9.-]+/g, "")) || 0;
        currentPnl += pnl * rate;
        if(stockStats[sym].qty > 0) currentCost -= (stockStats[sym].cost / stockStats[sym].qty) * parseFloat(r['數量']) * rate;
        stockStats[sym].qty -= parseFloat(r['數量']);
      }
      timeline.push({ date: r['日期'], displayDate: r['日期'].substring(5), costBase: currentCost, realizedPnlBase: currentPnl });
    });
    return timeline;
  }, [rawData, baseCurrency, exchangeRates]);

  return {
    isAppLoaded, rawData, isDemo, apiKey, baseCurrency, lastUpdate, isLoadingPrices, processedData, summary, trendData,
    trendTimeRange, setTrendTimeRange, fetchLivePrices, setApiKey, setRawData, setBaseCurrency, setManualStockData
  };
}
