import { useEffect, useMemo, useState } from 'react';
import { asyncStorage, formatSymbol, guessMarket, parseCSV } from '../utils/helpers';
import { CURRENCY_SYMBOLS, DEFAULT_CSV, STOCK_MAPPING } from '../utils/constants';

const DEFAULT_NEW_RECORD = {
  date: '',
  type: '買入',
  code: '',
  market: '陸股',
  qty: '',
  price: '',
  amount: '',
  pnl: ''
};

const ONE_DAY = 24 * 60 * 60 * 1000;

const MARKET_CURRENCY_MAP = {
  美股: 'USD',
  台股: 'TWD',
  港股: 'HKD',
  陸股: 'CNY',
  日股: 'JPY'
};

const getNumericValue = (value) => parseFloat(String(value || '0').replace(/[^0-9.-]+/g, '')) || 0;

const getResetRecord = (currentRecord, clearPrice = true) => ({
  ...currentRecord,
  date: '',
  code: '',
  qty: '',
  ...(clearPrice ? { price: '' } : {}),
  amount: '',
  pnl: ''
});

const getCurrencyBySymbolOrMarket = (symbol, market) => {
  const normalizedSymbol = String(symbol || '').trim().toUpperCase();

  if (normalizedSymbol.endsWith('.TW')) return 'TWD';
  if (normalizedSymbol.endsWith('.HK')) return 'HKD';
  if (normalizedSymbol.endsWith('.SZ') || normalizedSymbol.endsWith('.SS')) return 'CNY';
  if (normalizedSymbol.endsWith('.T')) return 'JPY';

  return MARKET_CURRENCY_MAP[market] || 'CNY';
};

export function useTradeData(showToast) {
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
  const [trendTimeRange, setTrendTimeRange] = useState('全部');
  const [showManager, setShowManager] = useState(false);
  const [hideZeroHolding, setHideZeroHolding] = useState(false);
  const [expandedStock, setExpandedStock] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingStockSymbol, setEditingStockSymbol] = useState(null);
  const [tempStockEdit, setTempStockEdit] = useState({ name: '', price: '' });
  const [newRec, setNewRec] = useState(DEFAULT_NEW_RECORD);
  const [isLoadingPrices, setIsLoadingPrices] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

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

          const timestamps = Object.values(parsedCache)
            .map((item) => item.timestamp)
            .filter(Boolean);

          if (timestamps.length > 0) {
            setLastUpdate(new Date(Math.max(...timestamps)));
          }
        }

        const savedManual = await asyncStorage.get('tr_manual_stock_data');
        if (savedManual) {
          setManualStockData(JSON.parse(savedManual));
        }

        const savedRates = await asyncStorage.get('tr_exchange_rates');
        if (savedRates) {
          setExchangeRates(JSON.parse(savedRates));
        }

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
      } catch (error) {
        console.error('從 IndexedDB 載入資料失敗:', error);
        setRawData(parseCSV(DEFAULT_CSV));
      } finally {
        setIsAppLoaded(true);
      }
    };

    loadInitialData();
  }, []);

  const getExchangeRate = (fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency) return 1;
    return exchangeRates[`${fromCurrency}${toCurrency}=X`]?.rate || 1;
  };

  const handleSaveApiKey = () => {
    asyncStorage.set('yfapi_net_key', apiKey);
    showToast('API 金鑰已更新並儲存！');
  };

  const handleSaveManualStock = (symbol) => {
    const updatedManualStockData = {
      ...manualStockData,
      [symbol]: {
        name: tempStockEdit.name,
        price: parseFloat(tempStockEdit.price) || 0,
        timestamp: Date.now()
      }
    };

    setManualStockData(updatedManualStockData);
    asyncStorage.set('tr_manual_stock_data', JSON.stringify(updatedManualStockData));
    setEditingStockSymbol(null);
    showToast(`已手動更新 ${symbol} 的資訊`);
  };

  const fetchLivePrices = async (isForce = false, targetBaseCurrency = baseCurrency) => {
    if (!apiKey) {
      setShowManager(true);
      showToast('請先於管理面板輸入 yfapi.net 金鑰才能更新股價');
      return;
    }

    const symbolEntries = rawData
      .map((row) => {
        const code = String(row['代號'] || '').trim();
        if (!code) return null;

        let market = row['市場'] || '未知';
        if (market === '未知' || !market) {
          market = guessMarket(code);
        }

        return {
          market,
          symbol: formatSymbol(code, market)
        };
      })
      .filter((entry) => entry && entry.symbol && entry.symbol !== '000000' && entry.symbol !== '未知');

    const uniqueSymbols = Array.from(new Set(symbolEntries.map((entry) => entry.symbol)));
    if (uniqueSymbols.length === 0) return;

    const marketBySymbol = new Map(symbolEntries.map((entry) => [entry.symbol, entry.market]));

    setIsLoadingPrices(true);

    try {
      const now = Date.now();

      const codesToFetch = uniqueSymbols.filter((symbol) => {
        if (isForce) return true;
        const cached = liveData[symbol];
        if (!cached) return true;
        if (now - cached.timestamp > ONE_DAY) return true;
        return false;
      });

      const currenciesToFetch = new Set();
      uniqueSymbols.forEach((symbol) => {
        const cached = liveData[symbol];
        const fallbackCurrency = getCurrencyBySymbolOrMarket(symbol, marketBySymbol.get(symbol));
        const currency = cached?.currency || fallbackCurrency;

        if (currency && currency !== targetBaseCurrency) {
          const rateKey = `${currency}${targetBaseCurrency}=X`;
          const cachedRate = exchangeRates[rateKey];
          if (isForce || !cachedRate || now - cachedRate.timestamp > ONE_DAY) {
            currenciesToFetch.add(rateKey);
          }
        }
      });

      if (codesToFetch.length > 0) {
        uniqueSymbols.forEach((symbol) => {
          const currency = getCurrencyBySymbolOrMarket(symbol, marketBySymbol.get(symbol));
          if (currency && currency !== targetBaseCurrency) {
            currenciesToFetch.add(`${currency}${targetBaseCurrency}=X`);
          }
        });
      }

      if (codesToFetch.length === 0 && currenciesToFetch.size === 0) {
        setLastUpdate(new Date());
        setIsLoadingPrices(false);
        showToast('所有股價與匯率均在 24 小時內更新過，自動使用本機快取以節省額度！');
        return;
      }

      const updatedLiveData = { ...liveData };
      const updatedExchangeRates = { ...exchangeRates };
      const fetchedSymbols = new Set();
      let fetchedCount = 0;

      for (let index = 0; index < codesToFetch.length; index += 10) {
        const chunk = codesToFetch.slice(index, index + 10);
        const symbolsParam = chunk.join(',');

        const response = await fetch(
          `https://yfapi.net/v6/finance/quote?region=HK&lang=zh&symbols=${symbolsParam}`,
          {
            headers: {
              accept: 'application/json',
              'x-api-key': apiKey
            }
          }
        );

        if (!response.ok) {
          throw new Error(
            response.status === 429
              ? 'API 額度已耗盡 (429)'
              : response.status === 403
                ? 'API Key 無效 (403)'
                : `伺服器錯誤: ${response.status}`
          );
        }

        const json = await response.json();
        if (json?.quoteResponse?.result) {
          json.quoteResponse.result.forEach((item) => {
            updatedLiveData[item.symbol] = {
              price: item.regularMarketPrice,
              name: item.longName || item.shortName || STOCK_MAPPING[item.symbol]?.name,
              currency: item.currency || getCurrencyBySymbolOrMarket(item.symbol, marketBySymbol.get(item.symbol)),
              timestamp: now
            };
            fetchedSymbols.add(item.symbol);
            fetchedCount += 1;

            const itemCurrency = item.currency || getCurrencyBySymbolOrMarket(item.symbol, marketBySymbol.get(item.symbol));
            if (itemCurrency && itemCurrency !== targetBaseCurrency) {
              currenciesToFetch.add(`${itemCurrency}${targetBaseCurrency}=X`);
            }
          });
        }

        if (index + 10 < codesToFetch.length) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      if (fetchedCount > 0) {
        const updatedManualStockData = { ...manualStockData };
        let isManualDataChanged = false;

        fetchedSymbols.forEach((symbol) => {
          if (updatedManualStockData[symbol]) {
            delete updatedManualStockData[symbol];
            isManualDataChanged = true;
          }
        });

        if (isManualDataChanged) {
          setManualStockData(updatedManualStockData);
          asyncStorage.set('tr_manual_stock_data', JSON.stringify(updatedManualStockData));
        }
      }

      const rateSymbols = Array.from(currenciesToFetch);
      for (let index = 0; index < rateSymbols.length; index += 10) {
        const chunk = rateSymbols.slice(index, index + 10);
        const symbolsParam = chunk.join(',');

        const response = await fetch(
          `https://yfapi.net/v6/finance/quote?region=HK&lang=en&symbols=${symbolsParam}`,
          {
            headers: {
              accept: 'application/json',
              'x-api-key': apiKey
            }
          }
        );

        if (response.ok) {
          const json = await response.json();
          if (json?.quoteResponse?.result) {
            json.quoteResponse.result.forEach((item) => {
              updatedExchangeRates[item.symbol] = {
                rate: item.regularMarketPrice,
                timestamp: now
              };
            });
          }
        }

        if (index + 10 < rateSymbols.length) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      setLiveData(updatedLiveData);
      setExchangeRates(updatedExchangeRates);
      asyncStorage.set('tr_dashboard_cache', JSON.stringify(updatedLiveData));
      asyncStorage.set('tr_exchange_rates', JSON.stringify(updatedExchangeRates));
      setLastUpdate(new Date());
      showToast(`成功更新 ${fetchedCount} 檔股票與匯率資訊！`);
    } catch (error) {
      showToast(`抓取失敗: ${error.message}`);
    } finally {
      setIsLoadingPrices(false);
    }
  };

  const handleSaveBaseCurrency = (currency) => {
    setBaseCurrency(currency);
    asyncStorage.set('tr_base_currency', currency);
    showToast(`基礎計價幣別已更改為 ${currency}，正在更新匯率...`);

    setTimeout(() => {
      fetchLivePrices(false, currency);
    }, 100);
  };

  const importCsvText = (text) => {
    const parsedData = parseCSV(text);
    setRawData(parsedData);
    setIsDemo(false);
    asyncStorage.set('tr_dashboard_data', JSON.stringify(parsedData));
  };

  const handleAddRecord = () => {
    if (!newRec.code || !newRec.qty || !newRec.amount || !newRec.date) return;

    const row = {
      日期: newRec.date,
      類型: newRec.type,
      代號: newRec.code.trim(),
      市場: newRec.market,
      數量: newRec.qty,
      單價: (parseFloat(newRec.amount) / parseFloat(newRec.qty)).toFixed(4),
      總金額: newRec.amount,
      損益: newRec.pnl || ''
    };

    let updatedRawData;
    if (editingIndex !== null) {
      updatedRawData = [...rawData];
      updatedRawData[editingIndex] = row;
      setEditingIndex(null);
      showToast('交易紀錄已更新！');
    } else {
      updatedRawData = [...rawData, row];
    }

    setRawData(updatedRawData);
    asyncStorage.set('tr_dashboard_data', JSON.stringify(updatedRawData));
    setNewRec((currentRecord) => getResetRecord(currentRecord));
  };

  const handleDeleteRecord = (index) => {
    const updatedRawData = rawData.filter((_, rowIndex) => rowIndex !== index);
    setRawData(updatedRawData);
    asyncStorage.set('tr_dashboard_data', JSON.stringify(updatedRawData));

    if (updatedRawData.length === 0) {
      setIsDemo(true);
    }

    if (editingIndex === index) {
      setEditingIndex(null);
      setNewRec((currentRecord) => getResetRecord(currentRecord, false));
    }
  };

  const handleEditRecord = (index) => {
    const row = rawData[index];

    let dateValue = row['日期'];
    const parsedDate = new Date(dateValue);
    if (!Number.isNaN(parsedDate.getTime())) {
      dateValue = `${parsedDate.getFullYear()}-${String(parsedDate.getMonth() + 1).padStart(2, '0')}-${String(parsedDate.getDate()).padStart(2, '0')}`;
    }

    setNewRec({
      date: dateValue,
      type: row['類型'],
      code: row['代號'],
      market: row['市場'] || guessMarket(row['代號']),
      qty: row['數量'],
      amount: row['總金額'],
      pnl: row['損益'] || ''
    });
    setEditingIndex(index);
  };

  const cancelEditingRecord = () => {
    setEditingIndex(null);
    setNewRec((currentRecord) => getResetRecord(currentRecord, false));
  };

  const handleClearData = (exportBackup) => {
    if (window.confirm('確定要清除所有資料並載入範例嗎？此動作無法復原！')) {
      if (rawData.length > 0 && !isDemo) {
        if (window.confirm('在清除之前，是否需要先將目前的資料匯出為 CSV 備份？')) {
          exportBackup?.();
        }
      }

      asyncStorage.remove('tr_dashboard_data');
      setRawData(parseCSV(DEFAULT_CSV));
      setIsDemo(true);
      setShowManager(false);
      showToast('已清除資料並載入範例');
    }
  };

  const updateNewRecField = (field, value) => {
    setNewRec((currentRecord) => ({
      ...currentRecord,
      [field]: value
    }));
  };

  const updateNewRecQuantity = (quantity) => {
    setNewRec((currentRecord) => {
      const price = currentRecord.price;
      return {
        ...currentRecord,
        qty: quantity,
        amount: quantity && price
          ? (parseFloat(quantity) * parseFloat(price)).toFixed(2)
          : currentRecord.amount
      };
    });
  };

  const updateNewRecPrice = (price) => {
    setNewRec((currentRecord) => {
      const quantity = currentRecord.qty;
      return {
        ...currentRecord,
        price,
        amount: quantity && price
          ? (parseFloat(quantity) * parseFloat(price)).toFixed(2)
          : currentRecord.amount
      };
    });
  };

  const updateNewRecAmount = (amount) => {
    setNewRec((currentRecord) => {
      const quantity = currentRecord.qty;
      return {
        ...currentRecord,
        amount,
        price: quantity && amount && parseFloat(quantity) !== 0
          ? (parseFloat(amount) / parseFloat(quantity)).toFixed(4)
          : currentRecord.price
      };
    });
  };

  const startEditingStock = (stock) => {
    setEditingStockSymbol(stock.symbol);
    setTempStockEdit({ name: stock.name, price: stock.currentPrice });
  };

  const cancelEditingStock = () => {
    setEditingStockSymbol(null);
  };

  const processedData = useMemo(() => {
    if (!isAppLoaded) return [];

    const aggregatedStocks = {};
    const sortedData = [...rawData].sort(
      (a, b) => new Date(a['日期'] || 0) - new Date(b['日期'] || 0)
    );

    sortedData.forEach((row) => {
      const rawCode = String(row['代號'] || '').trim();
      const type = row['類型'];
      if (!rawCode || !type) return;

      let market = row['市場'] || '未知';
      if (market === '未知' || !market) {
        market = guessMarket(rawCode);
      }

      const symbol = formatSymbol(rawCode, market);
      const quantity = parseFloat(row['數量']) || 0;
      const amount = getNumericValue(row['總金額']);
      const pnl = getNumericValue(row['損益']);

      if (!aggregatedStocks[symbol]) {
        aggregatedStocks[symbol] = {
          symbol,
          rawCode,
          market,
          name: STOCK_MAPPING[symbol]?.name || `未知代號 (${symbol})`,
          currentPrice: STOCK_MAPPING[symbol]?.price || 0,
          currency: getCurrencyBySymbolOrMarket(symbol, market),
          holdingQty: 0,
          realizedPnl: 0,
          totalCost: 0,
          totalSellRevenue: 0,
          totalSoldQty: 0,
          tradeCount: 0,
          history: []
        };
      }

      aggregatedStocks[symbol].tradeCount += 1;
      aggregatedStocks[symbol].history.push(row);

      if (type === '買入') {
        aggregatedStocks[symbol].holdingQty += quantity;
        aggregatedStocks[symbol].totalCost += amount;
      } else if (type === '賣出') {
        aggregatedStocks[symbol].realizedPnl += pnl;
        aggregatedStocks[symbol].totalSellRevenue += amount;
        aggregatedStocks[symbol].totalSoldQty += quantity;

        if (aggregatedStocks[symbol].holdingQty > 0) {
          const averageCost = aggregatedStocks[symbol].totalCost / aggregatedStocks[symbol].holdingQty;
          aggregatedStocks[symbol].totalCost -= averageCost * quantity;
        }

        aggregatedStocks[symbol].holdingQty -= quantity;
        if (aggregatedStocks[symbol].holdingQty <= 0.01) {
          aggregatedStocks[symbol].holdingQty = 0;
          aggregatedStocks[symbol].totalCost = 0;
        }
      }
    });

    return Object.values(aggregatedStocks)
      .map((stock) => {
        const apiData = liveData[stock.symbol];
        const manualData = manualStockData[stock.symbol];

        const isManualPrice = manualData?.price !== undefined;
        const isManualName = manualData?.name !== undefined && manualData?.name !== '';
        const currentPrice = isManualPrice ? manualData.price : apiData?.price || stock.currentPrice;
        const currentName = isManualName ? manualData.name : apiData?.name || stock.name;
        const lastUpdateTimestamp = isManualPrice ? manualData.timestamp : apiData?.timestamp || null;
        const currency = apiData?.currency || getCurrencyBySymbolOrMarket(stock.symbol, stock.market);
        const exchangeRate = getExchangeRate(currency, baseCurrency);

        const currentValueOriginal = stock.holdingQty * currentPrice;
        const unrealizedPnlOriginal = currentValueOriginal > 0 ? currentValueOriginal - stock.totalCost : 0;
        const unrealizedPnlPercent = stock.totalCost > 0
          ? (unrealizedPnlOriginal / stock.totalCost) * 100
          : 0;
        const realizedCostOriginal = stock.totalSellRevenue - stock.realizedPnl;
        const realizedPnlPercent = realizedCostOriginal > 0
          ? (stock.realizedPnl / realizedCostOriginal) * 100
          : 0;
        const ifSoldTodayPnlOriginal = stock.totalSoldQty * currentPrice - realizedCostOriginal;
        const ifSoldTodayPnlPercent = realizedCostOriginal > 0
          ? (ifSoldTodayPnlOriginal / realizedCostOriginal) * 100
          : 0;

        const currentValueBase = currentValueOriginal * exchangeRate;
        const totalCostBase = stock.totalCost * exchangeRate;
        const unrealizedPnlBase = unrealizedPnlOriginal * exchangeRate;
        const realizedPnlBase = stock.realizedPnl * exchangeRate;
        const realizedCostBase = realizedCostOriginal * exchangeRate;
        const ifSoldTodayPnlBase = ifSoldTodayPnlOriginal * exchangeRate;

        return {
          ...stock,
          name: currentName,
          currentPrice,
          isManualPrice,
          isManualName,
          lastUpdateTimestamp,
          currency,
          currencySymbol: CURRENCY_SYMBOLS[currency] || currency,
          exchangeRate,
          currentValueOriginal,
          unrealizedPnlOriginal,
          unrealizedPnlPercent,
          realizedPnlOriginal: stock.realizedPnl,
          realizedCostOriginal,
          realizedPnlPercent,
          ifSoldTodayPnlOriginal,
          ifSoldTodayPnlPercent,
          currentValueBase,
          totalCostBase,
          unrealizedPnlBase,
          realizedPnlBase,
          realizedCostBase,
          ifSoldTodayPnlBase
        };
      })
      .sort((a, b) => b.realizedPnlBase - a.realizedPnlBase);
  }, [baseCurrency, exchangeRates, isAppLoaded, liveData, manualStockData, rawData]);

  const chartData = useMemo(() => {
    let holdingData = [];
    const sortedHoldings = processedData
      .filter((item) => item.currentValueBase > 0)
      .sort((a, b) => b.currentValueBase - a.currentValueBase);

    if (sortedHoldings.length <= 10) {
      holdingData = sortedHoldings;
    } else {
      const topHoldings = sortedHoldings.slice(0, 10);
      const otherHoldingsValue = sortedHoldings
        .slice(10)
        .reduce((total, item) => total + item.currentValueBase, 0);

      topHoldings.push({
        name: '其它',
        currentValueBase: otherHoldingsValue,
        symbol: 'OTHERS'
      });
      holdingData = topHoldings;
    }

    const pnlData = processedData.filter((item) => item.realizedPnlBase !== 0);
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
    let filtered = [...processedData];

    if (hideZeroHolding) {
      filtered = filtered.filter((stock) => stock.holdingQty > 0);
    }

    if (marketFilter !== '全部') {
      filtered = filtered.filter((stock) => stock.market === marketFilter);
    }

    if (historySortConfig) {
      filtered.sort((a, b) => {
        let valueA;
        let valueB;

        if (historySortConfig.key === '市值') {
          valueA = a.currentValueBase;
          valueB = b.currentValueBase;
        } else if (historySortConfig.key === '持股數') {
          valueA = a.holdingQty;
          valueB = b.holdingQty;
        } else if (historySortConfig.key === '未實現') {
          valueA = a.unrealizedPnlBase;
          valueB = b.unrealizedPnlBase;
        } else if (historySortConfig.key === '已實現') {
          valueA = a.realizedPnlBase;
          valueB = b.realizedPnlBase;
        } else if (historySortConfig.key === '代號') {
          valueA = a.symbol;
          valueB = b.symbol;
        } else {
          valueA = a.realizedPnlBase;
          valueB = b.realizedPnlBase;
        }

        if (valueA < valueB) return historySortConfig.direction === 'asc' ? -1 : 1;
        if (valueA > valueB) return historySortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [hideZeroHolding, historySortConfig, marketFilter, processedData]);

  const summary = useMemo(() => processedData.reduce(
    (accumulator, currentStock) => ({
      totalRealizedPnl: accumulator.totalRealizedPnl + currentStock.realizedPnlBase,
      totalRealizedCost: accumulator.totalRealizedCost + currentStock.realizedCostBase,
      totalUnrealizedPnl: accumulator.totalUnrealizedPnl + currentStock.unrealizedPnlBase,
      totalHoldingCost: accumulator.totalHoldingCost + currentStock.totalCostBase,
      totalValue: accumulator.totalValue + currentStock.currentValueBase
    }),
    {
      totalRealizedPnl: 0,
      totalRealizedCost: 0,
      totalUnrealizedPnl: 0,
      totalHoldingCost: 0,
      totalValue: 0
    }
  ), [processedData]);

  const trendData = useMemo(() => {
    if (!isAppLoaded || rawData.length === 0) return [];

    const sortedData = [...rawData].sort(
      (a, b) => new Date(a['日期'] || 0) - new Date(b['日期'] || 0)
    );

    const stockStates = {};
    const dailySnapshots = [];
    let runningTotalCostBase = 0;
    let runningRealizedPnlBase = 0;

    sortedData.forEach((row) => {
      const rawCode = String(row['代號'] || '').trim();
      const type = row['類型'];
      if (!rawCode || !type) return;

      let market = row['市場'] || '未知';
      if (market === '未知' || !market) {
        market = guessMarket(rawCode);
      }

      const symbol = formatSymbol(rawCode, market);
      const date = row['日期'];
      const dateObject = new Date(date);
      if (Number.isNaN(dateObject.getTime())) return;

      const quantity = parseFloat(row['數量']) || 0;
      const amount = getNumericValue(row['總金額']);
      const pnl = getNumericValue(row['損益']);
      const currency = getCurrencyBySymbolOrMarket(symbol, market);
      const exchangeRate = getExchangeRate(currency, baseCurrency);

      if (!stockStates[symbol]) {
        stockStates[symbol] = {
          holdingQty: 0,
          totalCost: 0
        };
      }

      if (type === '買入') {
        stockStates[symbol].holdingQty += quantity;
        stockStates[symbol].totalCost += amount;
        runningTotalCostBase += amount * exchangeRate;
      } else if (type === '賣出') {
        runningRealizedPnlBase += pnl * exchangeRate;

        if (stockStates[symbol].holdingQty > 0) {
          const averageCost = stockStates[symbol].totalCost / stockStates[symbol].holdingQty;
          const costOfSold = averageCost * quantity;
          stockStates[symbol].totalCost -= costOfSold;
          runningTotalCostBase -= costOfSold * exchangeRate;
        }

        stockStates[symbol].holdingQty -= quantity;
        if (stockStates[symbol].holdingQty <= 0.01) {
          stockStates[symbol].holdingQty = 0;
          stockStates[symbol].totalCost = 0;
        }
      }

      dailySnapshots.push({
        date,
        timestamp: dateObject.getTime(),
        costBase: runningTotalCostBase,
        realizedPnlBase: runningRealizedPnlBase
      });
    });

    const aggregatedByDate = [];
    dailySnapshots.forEach((snapshot) => {
      const lastSnapshot = aggregatedByDate[aggregatedByDate.length - 1];
      if (lastSnapshot && lastSnapshot.date === snapshot.date) {
        lastSnapshot.costBase = snapshot.costBase;
        lastSnapshot.realizedPnlBase = snapshot.realizedPnlBase;
      } else {
        aggregatedByDate.push(snapshot);
      }
    });

    const now = Date.now();
    const rangeMsMap = {
      '1週': 7 * 24 * 60 * 60 * 1000,
      '1月': 30 * 24 * 60 * 60 * 1000,
      '3月': 90 * 24 * 60 * 60 * 1000,
      半年: 180 * 24 * 60 * 60 * 1000,
      '1年': 365 * 24 * 60 * 60 * 1000,
      '5年': 5 * 365 * 24 * 60 * 60 * 1000
    };

    let filtered = aggregatedByDate;
    if (trendTimeRange === 'YTD') {
      const yearToDate = new Date(new Date().getFullYear(), 0, 1).getTime();
      filtered = aggregatedByDate.filter((item) => item.timestamp >= yearToDate);
    } else if (rangeMsMap[trendTimeRange]) {
      const cutoff = now - rangeMsMap[trendTimeRange];
      filtered = aggregatedByDate.filter((item) => item.timestamp >= cutoff);
    }

    return filtered.map((item) => ({
      ...item,
      displayDate: item.date.substring(5)
    }));
  }, [baseCurrency, exchangeRates, isAppLoaded, rawData, trendTimeRange]);

  const availableMarkets = useMemo(
    () => Array.from(new Set(processedData.map((stock) => stock.market))).filter(Boolean),
    [processedData]
  );

  const holdingCount = useMemo(
    () => processedData.filter((stock) => stock.holdingQty > 0).length,
    [processedData]
  );

  const overallRealizedPercent = summary.totalRealizedCost > 0
    ? (summary.totalRealizedPnl / summary.totalRealizedCost) * 100
    : 0;

  const overallUnrealizedPercent = summary.totalHoldingCost > 0
    ? (summary.totalUnrealizedPnl / summary.totalHoldingCost) * 100
    : 0;

  const formatBaseCurrency = (value) => (
    `${CURRENCY_SYMBOLS[baseCurrency] || baseCurrency} ${Number(value || 0).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`
  );

  const formatOriginalCurrency = (value, symbol) => (
    `${symbol}${Number(value || 0).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`
  );

  const formatPercent = (value) => `${value > 0 ? '+' : ''}${Number(value || 0).toFixed(2)}%`;

  return {
    apiKey,
    availableMarkets,
    baseCurrency,
    cancelEditingRecord,
    cancelEditingStock,
    chartData,
    displayData,
    editingIndex,
    editingStockSymbol,
    expandedStock,
    fetchLivePrices,
    formatBaseCurrency,
    formatOriginalCurrency,
    formatPercent,
    handleAddRecord,
    handleClearData,
    handleDeleteRecord,
    handleEditRecord,
    handleSaveApiKey,
    handleSaveBaseCurrency,
    handleSaveManualStock,
    hideZeroHolding,
    historySortConfig,
    holdingCount,
    importCsvText,
    isAppLoaded,
    isDemo,
    isLoadingPrices,
    lastUpdate,
    liveData,
    marketFilter,
    newRec,
    overallRealizedPercent,
    overallUnrealizedPercent,
    processedData,
    rawData,
    requestSort,
    setApiKey,
    setExpandedStock,
    setHideZeroHolding,
    setMarketFilter,
    setShowManager,
    setTempStockEdit,
    showManager,
    startEditingStock,
    summary,
    tempStockEdit,
    trendData,
    trendTimeRange,
    updateNewRecAmount,
    updateNewRecField,
    updateNewRecPrice,
    updateNewRecQuantity,
    setTrendTimeRange
  };
}
