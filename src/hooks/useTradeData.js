import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { normalizeLocale } from '../locales/config';
import {
  formatLocalizedCurrency,
  formatLocalizedDate,
  formatLocalizedNumber,
  formatLocalizedPercent
} from '../utils/localization';
import {
  asyncStorage,
  formatSymbol,
  getCurrencyBySymbolOrMarket,
  guessMarket,
  normalizeQuoteCurrencyData,
  normalizeMarket,
  parseCSV,
  parseCSVWithMeta
} from '../utils/helpers';
import { DEFAULT_CSV, STOCK_MAPPING } from '../utils/constants';

const STORAGE_KEYS = {
  apiKey: 'yfapi_net_key',
  baseCurrency: 'tr_base_currency',
  dashboardCache: 'tr_dashboard_cache',
  dashboardData: 'tr_dashboard_data',
  exchangeRates: 'tr_exchange_rates',
  manualStockData: 'tr_manual_stock_data'
};

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
const FX_BRIDGE_CURRENCY = 'USD';
const DEMO_USD_RATES = {
  USD: 1,
  TWD: 0.03115,
  HKD: 0.1282,
  EUR: 1.088,
  CAD: 0.726,
  KRW: 0.000751,
  CHF: 1.134,
  JPY: 0.00667
};
const TREND_RANGE_MS_MAP = {
  '1週': 7 * ONE_DAY,
  '1月': 30 * ONE_DAY,
  '3月': 90 * ONE_DAY,
  半年: 180 * ONE_DAY,
  '1年': 365 * ONE_DAY,
  '5年': 5 * 365 * ONE_DAY
};

const CSV_REQUIRED_FIELD_LABELS = {
  日期: { key: 'manager.fields.date', defaultValue: 'Date' },
  類型: { key: 'manager.fields.type', defaultValue: 'Type' },
  代號: { key: 'manager.fields.symbol', defaultValue: 'Symbol' },
  數量: { key: 'manager.fields.quantity', defaultValue: 'Quantity' }
};

const getFxRateSymbols = (fromCurrency, toCurrency) => {
  if (!fromCurrency || !toCurrency || fromCurrency === toCurrency) {
    return [];
  }

  const directPair = `${fromCurrency}${toCurrency}=X`;
  if (fromCurrency === FX_BRIDGE_CURRENCY || toCurrency === FX_BRIDGE_CURRENCY) {
    return [directPair];
  }

  return [
    directPair,
    `${fromCurrency}${FX_BRIDGE_CURRENCY}=X`,
    `${FX_BRIDGE_CURRENCY}${toCurrency}=X`
  ];
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

const resolveMarket = (code, market) => {
  const normalizedMarket = normalizeMarket(market);
  if (normalizedMarket && normalizedMarket !== '未知') return normalizedMarket;
  return guessMarket(code);
};

const formatDateForInput = (dateValue) => {
  const parsedDate = new Date(dateValue);
  if (Number.isNaN(parsedDate.getTime())) {
    return dateValue;
  }

  return `${parsedDate.getFullYear()}-${String(parsedDate.getMonth() + 1).padStart(2, '0')}-${String(parsedDate.getDate()).padStart(2, '0')}`;
};

const getDemoExchangeRate = (fromCurrency, toCurrency) => {
  const fromUsdRate = DEMO_USD_RATES[fromCurrency];
  const toUsdRate = DEMO_USD_RATES[toCurrency];

  if (!fromUsdRate || !toUsdRate) {
    return 1;
  }

  return fromUsdRate / toUsdRate;
};

export function useTradeData(showToast) {
  const { t, i18n } = useTranslation();
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
  const [lastImportMeta, setLastImportMeta] = useState(null);
  const [expandedStock, setExpandedStock] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingStockSymbol, setEditingStockSymbol] = useState(null);
  const [tempStockEdit, setTempStockEdit] = useState({ name: '', price: '' });
  const [newRec, setNewRec] = useState(DEFAULT_NEW_RECORD);
  const [isLoadingPrices, setIsLoadingPrices] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const activeLocale = normalizeLocale(i18n.resolvedLanguage || i18n.language);
  const effectiveExchangeRates = isDemo && Object.keys(exchangeRates).length === 0
    ? null
    : exchangeRates;

  const persistValue = (key, value) => asyncStorage.set(key, value);
  const persistJson = (key, value) => persistValue(key, JSON.stringify(value));
  const persistRawData = (updatedRawData) => {
    setRawData(updatedRawData);
    persistJson(STORAGE_KEYS.dashboardData, updatedRawData);
  };
  const resetToDemoData = () => {
    asyncStorage.remove(STORAGE_KEYS.dashboardData);
    setLastImportMeta(null);
    setRawData(parseCSV(DEFAULT_CSV));
  };
  const persistManualData = (updatedManualStockData) => {
    setManualStockData(updatedManualStockData);
    persistJson(STORAGE_KEYS.manualStockData, updatedManualStockData);
  };
  const persistMarketData = (updatedLiveData, updatedExchangeRates) => {
    setLiveData(updatedLiveData);
    setExchangeRates(updatedExchangeRates);
    persistJson(STORAGE_KEYS.dashboardCache, updatedLiveData);
    persistJson(STORAGE_KEYS.exchangeRates, updatedExchangeRates);
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const savedKey = await asyncStorage.get(STORAGE_KEYS.apiKey);
        if (savedKey) setApiKey(savedKey);

        const savedCurrency = await asyncStorage.get(STORAGE_KEYS.baseCurrency);
        if (savedCurrency) setBaseCurrency(savedCurrency);

        const savedCache = await asyncStorage.get(STORAGE_KEYS.dashboardCache);
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

        const savedManual = await asyncStorage.get(STORAGE_KEYS.manualStockData);
        if (savedManual) {
          setManualStockData(JSON.parse(savedManual));
        }

        const savedRates = await asyncStorage.get(STORAGE_KEYS.exchangeRates);
        if (savedRates) {
          setExchangeRates(JSON.parse(savedRates));
        }

        const savedData = await asyncStorage.get(STORAGE_KEYS.dashboardData);
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

    const directRate = effectiveExchangeRates?.[`${fromCurrency}${toCurrency}=X`]?.rate;
    if (Number.isFinite(directRate) && directRate > 0) {
      return directRate;
    }

    const sourceToUsdRate = effectiveExchangeRates?.[`${fromCurrency}${FX_BRIDGE_CURRENCY}=X`]?.rate;
    const usdToTargetRate = effectiveExchangeRates?.[`${FX_BRIDGE_CURRENCY}${toCurrency}=X`]?.rate;
    if (
      Number.isFinite(sourceToUsdRate) && sourceToUsdRate > 0
      && Number.isFinite(usdToTargetRate) && usdToTargetRate > 0
    ) {
      return sourceToUsdRate * usdToTargetRate;
    }

    if (isDemo) {
      return getDemoExchangeRate(fromCurrency, toCurrency);
    }

    return 1;
  };

  const handleSaveApiKey = () => {
    persistValue(STORAGE_KEYS.apiKey, apiKey);
    showToast(t('messages.apiKeySaved'));
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

    persistManualData(updatedManualStockData);
    setEditingStockSymbol(null);
    showToast(t('messages.manualStockSaved', { symbol }));
  };

  const fetchLivePrices = async (isForce = false, targetBaseCurrency = baseCurrency) => {
    if (!apiKey) {
      setShowManager(true);
      showToast(t('messages.needApiKey'));
      return;
    }

    const symbolEntries = rawData
      .map((row) => {
        const code = String(row['代號'] || '').trim();
        if (!code) return null;

        const market = resolveMarket(code, row['市場']);

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
        const currency = normalizeQuoteCurrencyData(cached?.currency).currency || fallbackCurrency;

        if (currency && currency !== targetBaseCurrency) {
          getFxRateSymbols(currency, targetBaseCurrency).forEach((rateKey) => {
            const cachedRate = exchangeRates[rateKey];
            if (isForce || !cachedRate || now - cachedRate.timestamp > ONE_DAY) {
              currenciesToFetch.add(rateKey);
            }
          });
        }
      });

      if (codesToFetch.length > 0) {
        uniqueSymbols.forEach((symbol) => {
          const currency = getCurrencyBySymbolOrMarket(symbol, marketBySymbol.get(symbol));
          if (currency && currency !== targetBaseCurrency) {
            getFxRateSymbols(currency, targetBaseCurrency).forEach((rateKey) => {
              currenciesToFetch.add(rateKey);
            });
          }
        });
      }

      if (codesToFetch.length === 0 && currenciesToFetch.size === 0) {
        setLastUpdate(new Date());
        setIsLoadingPrices(false);
        showToast(t('messages.cacheFresh'));
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
          throw new Error(`HTTP ${response.status}`);
        }

        const json = await response.json();
        if (json?.quoteResponse?.result) {
          json.quoteResponse.result.forEach((item) => {
            const normalizedQuote = normalizeQuoteCurrencyData(item.currency, item.regularMarketPrice);
            updatedLiveData[item.symbol] = {
              price: normalizedQuote.price,
              name: item.longName || item.shortName || STOCK_MAPPING[item.symbol]?.name,
              currency: normalizedQuote.currency || getCurrencyBySymbolOrMarket(item.symbol, marketBySymbol.get(item.symbol)),
              timestamp: now
            };
            fetchedSymbols.add(item.symbol);
            fetchedCount += 1;

            const itemCurrency = normalizedQuote.currency || getCurrencyBySymbolOrMarket(item.symbol, marketBySymbol.get(item.symbol));
            if (itemCurrency && itemCurrency !== targetBaseCurrency) {
              getFxRateSymbols(itemCurrency, targetBaseCurrency).forEach((rateKey) => {
                currenciesToFetch.add(rateKey);
              });
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
          persistManualData(updatedManualStockData);
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

      persistMarketData(updatedLiveData, updatedExchangeRates);
      setLastUpdate(new Date());
      showToast(t('messages.updateSuccess', { count: formatLocalizedNumber(fetchedCount, activeLocale) }));
    } catch (error) {
      showToast(t('messages.fetchFailed', { message: error.message }));
    } finally {
      setIsLoadingPrices(false);
    }
  };

  const handleSaveBaseCurrency = (currency) => {
    setBaseCurrency(currency);
    persistValue(STORAGE_KEYS.baseCurrency, currency);
    showToast(t('messages.baseCurrencyChanged', { currency }));

    setTimeout(() => {
      fetchLivePrices(false, currency);
    }, 100);
  };

  const importCsvText = (text) => {
    const { rows, meta } = parseCSVWithMeta(text);

    if (!meta.ok) {
      setLastImportMeta(null);

      if (meta.errorCode === 'missingRequiredHeaders') {
        const missingFieldLabels = meta.missingRequiredFields
          .map((field) => CSV_REQUIRED_FIELD_LABELS[field])
          .filter(Boolean)
          .map(({ key, defaultValue }) => t(key, { defaultValue }))
          .join(' / ');

        showToast(t('messages.csvImportFailedHeaders', { fields: missingFieldLabels }));
      } else {
        showToast(t('messages.csvImportFailedNoData'));
      }

      return meta;
    }

    persistRawData(rows);
    setIsDemo(false);
    setLastImportMeta(meta);
    showToast(t('messages.csvImportSuccess', {
      count: formatLocalizedNumber(meta.importedRowCount, activeLocale),
      profile: meta.profileLabel,
      delimiter: meta.delimiterLabel
    }));

    return meta;
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
      showToast(t('messages.recordUpdated'));
    } else {
      updatedRawData = [...rawData, row];
    }

    persistRawData(updatedRawData);
    setNewRec((currentRecord) => getResetRecord(currentRecord));
  };

  const handleDeleteRecord = (index) => {
    const updatedRawData = rawData.filter((_, rowIndex) => rowIndex !== index);
    persistRawData(updatedRawData);

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

    setNewRec({
      date: formatDateForInput(row['日期']),
      type: row['類型'],
      code: row['代號'],
      market: resolveMarket(row['代號'], row['市場']),
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
    if (window.confirm(t('messages.clearConfirm'))) {
      if (rawData.length > 0 && !isDemo) {
        if (window.confirm(t('messages.backupConfirm'))) {
          exportBackup?.();
        }
      }

      resetToDemoData();
      setIsDemo(true);
      setShowManager(false);
      showToast(t('messages.dataCleared'));
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

      const market = resolveMarket(rawCode, row['市場']);

      const symbol = formatSymbol(rawCode, market);
      const quantity = parseFloat(row['數量']) || 0;
      const amount = getNumericValue(row['總金額']);
      const pnl = getNumericValue(row['損益']);

      if (!aggregatedStocks[symbol]) {
        aggregatedStocks[symbol] = {
          symbol,
          rawCode,
          market,
          name: STOCK_MAPPING[symbol]?.name || t('data.unknownSymbol', { symbol }),
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
        const normalizedApiQuote = normalizeQuoteCurrencyData(apiData?.currency, apiData?.price);
        const currentPrice = isManualPrice ? manualData.price : normalizedApiQuote.price || stock.currentPrice;
        const currentName = isManualName ? manualData.name : apiData?.name || stock.name;
        const lastUpdateTimestamp = isManualPrice ? manualData.timestamp : apiData?.timestamp || null;
        const currency = normalizedApiQuote.currency || getCurrencyBySymbolOrMarket(stock.symbol, stock.market);
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
  }, [baseCurrency, exchangeRates, isAppLoaded, liveData, manualStockData, rawData, t]);

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
        name: t('charts.others'),
        currentValueBase: otherHoldingsValue,
        symbol: 'OTHERS'
      });
      holdingData = topHoldings;
    }

    const pnlData = processedData.filter((item) => item.realizedPnlBase !== 0);
    return { holdingData, pnlData };
  }, [processedData, t]);

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

      const market = resolveMarket(rawCode, row['市場']);

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
    let filtered = aggregatedByDate;
    if (trendTimeRange === 'YTD') {
      const yearToDate = new Date(new Date().getFullYear(), 0, 1).getTime();
      filtered = aggregatedByDate.filter((item) => item.timestamp >= yearToDate);
    } else if (TREND_RANGE_MS_MAP[trendTimeRange]) {
      const cutoff = now - TREND_RANGE_MS_MAP[trendTimeRange];
      filtered = aggregatedByDate.filter((item) => item.timestamp >= cutoff);
    }

    return filtered.map((item) => ({
      ...item,
      displayDate: formatLocalizedDate(item.date, activeLocale, {
        month: 'short',
        day: 'numeric'
      })
    }));
  }, [activeLocale, baseCurrency, exchangeRates, isAppLoaded, rawData, trendTimeRange]);

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

  const formatBaseCurrency = (value, options = {}) => (
    formatLocalizedCurrency(value, baseCurrency, activeLocale, options)
  );

  const formatOriginalCurrency = (value, currency, options = {}) => (
    formatLocalizedCurrency(value, currency || baseCurrency, activeLocale, options)
  );

  const formatPercent = (value, options = {}) => formatLocalizedPercent(value, activeLocale, options);

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
    lastImportMeta,
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
