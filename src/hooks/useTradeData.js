import { useState, useEffect, useMemo } from 'react';
import { asyncStorage, parseCSV, guessMarket, formatSymbol } from '../utils/helpers';
import { DEFAULT_CSV, STOCK_MAPPING, CURRENCY_SYMBOLS } from '../utils/constants';

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

  const processedData = useMemo(() => {
    const agg = {};
    [...rawData].sort((a,b) => new Date(a['日期']) - new Date(b['日期'])).forEach(r => {
      const sym = formatSymbol(r['代號'], r['市場'] || guessMarket(r['代號']));
      if(!agg[sym]) agg[sym] = { symbol: sym, market: r['市場'] || guessMarket(r['代號']), holdingQty: 0, totalCost: 0, realizedPnl: 0, totalSellRevenue: 0, totalSoldQty: 0, history: [] };
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
      const apiData = liveData[s.symbol];
      const manual = manualStockData[s.symbol];
      const price = manual?.price !== undefined ? manual.price : (apiData?.price || STOCK_MAPPING[s.symbol]?.price || 0);
      const currency = apiData?.currency || (s.market === '美股' ? 'USD' : s.market === '台股' ? 'TWD' : s.market === '港股' ? 'HKD' : s.market === '日股' ? 'JPY' : 'CNY');
      const currencySymbol = CURRENCY_SYMBOLS[currency] || currency;
      const rate = getExchangeRate(currency, baseCurrency);
      const valOrig = s.holdingQty * price;
      const pnlUnreal = valOrig > 0 ? valOrig - s.totalCost : 0;
      const realizedCost = s.totalSellRevenue - s.realizedPnl;
      
      return { 
        ...s, 
        name: manual?.name || apiData?.name || STOCK_MAPPING[s.symbol]?.name || `未知代號 (${s.symbol})`,
        currentPrice: price, currency, currencySymbol,
        currentValueBase: valOrig * rate, unrealizedPnlBase: pnlUnreal * rate, realizedPnlBase: s.realizedPnl * rate, realizedCostBase: realizedCost * rate, totalCostBase: s.totalCost * rate, ifSoldTodayPnlBase: (s.totalSoldQty * price - realizedCost) * rate,
        unrealizedPnlOriginal: pnlUnreal, realizedPnlOriginal: s.realizedPnl, ifSoldTodayPnlOriginal: (s.totalSoldQty * price - realizedCost), currentValueOriginal: valOrig,
        unrealizedPnlPercent: s.totalCost > 0 ? (pnlUnreal / s.totalCost) * 100 : 0,
        realizedPnlPercent: realizedCost > 0 ? (s.realizedPnl / realizedCost) * 100 : 0
      };
    }).sort((a,b) => b.realizedPnlBase - a.realizedPnlBase);
  }, [rawData, liveData, manualStockData, baseCurrency]);

  const summary = useMemo(() => processedData.reduce((a, c) => ({
    totalRealizedPnl: a.totalRealizedPnl + c.realizedPnlBase,
    totalRealizedCost: a.totalRealizedCost + c.realizedCostBase,
    totalUnrealizedPnl: a.totalUnrealizedPnl + c.unrealizedPnlBase,
    totalHoldingCost: a.totalHoldingCost + c.totalCostBase,
    totalValue: a.totalValue + c.currentValueBase
  }), { totalRealizedPnl: 0, totalRealizedCost: 0, totalUnrealizedPnl: 0, totalHoldingCost: 0, totalValue: 0 }), [processedData]);

  const trendData = useMemo(() => {
    if (rawData.length === 0) return [];
    const sorted = [...rawData].sort((a, b) => new Date(a['日期']) - new Date(b['日期']));
    let curCost = 0, curPnl = 0;
    const stats = {};
    return sorted.map(r => {
      const sym = formatSymbol(r['代號'], r['市場'] || guessMarket(r['代號']));
      const amt = parseFloat(String(r['總金額']).replace(/[^0-9.-]+/g, "")) || 0;
      const cur = r['市場']==='美股'?'USD':r['市場']==='台股'?'TWD':'USD';
      const rate = getExchangeRate(cur, baseCurrency);
      if(!stats[sym]) stats[sym] = { qty: 0, cost: 0 };
      if(r['類型']==='買入'){ stats[sym].qty += parseFloat(r['數量']); stats[sym].cost += amt; curCost += amt * rate; }
      else {
        curPnl += (parseFloat(String(r['損益']).replace(/[^0-9.-]+/g, "")) || 0) * rate;
        if(stats[sym].qty > 0) curCost -= (stats[sym].cost / stats[sym].qty) * parseFloat(r['數量']) * rate;
        stats[sym].qty -= parseFloat(r['數量']);
      }
      return { date: r['日期'], displayDate: r['日期'].substring(5), costBase: curCost, realizedPnlBase: curPnl };
    });
  }, [rawData, baseCurrency, exchangeRates]);

  return {
    isAppLoaded, rawData, isDemo, apiKey, baseCurrency, lastUpdate, isLoadingPrices, processedData, summary, trendData,
    trendTimeRange, setTrendTimeRange, fetchLivePrices, setApiKey, setRawData, setBaseCurrency, setManualStockData
  };
}
