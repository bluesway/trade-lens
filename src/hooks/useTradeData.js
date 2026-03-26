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
  CSV_IMPORT_PROFILE_OPTIONS,
  formatSymbol,
  getCurrencyBySymbolOrMarket,
  guessMarket,
  normalizeQuoteCurrencyData,
  normalizeMarket,
  parseCSV,
  parseCSVWithMeta
} from '../utils/helpers';
import {
  DEFAULT_CSV,
  DEFAULT_SYMBOL_OVERRIDES,
  DEMO_REFERENCE_UPDATED_AT,
  DEMO_USD_RATES,
  STOCK_MAPPING
} from '../utils/constants';

const STORAGE_KEYS = {
  apiKey: 'yfapi_net_key',
  baseCurrency: 'tr_base_currency',
  csvImportProfile: 'tr_csv_import_profile',
  dashboardCache: 'tr_dashboard_cache',
  dashboardData: 'tr_dashboard_data',
  exchangeRates: 'tr_exchange_rates',
  manualStockData: 'tr_manual_stock_data',
  symbolOverrides: 'tr_symbol_overrides'
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
const POSITION_EPSILON = 0.0000001;
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
const TRADE_ROW_SIGNATURE_FIELDS = ['日期', '類型', '代號', '市場', '數量', '單價', '總金額', '損益', '說明'];
const CSV_IMPORT_PROFILE_IDS = new Set(CSV_IMPORT_PROFILE_OPTIONS.map(({ id }) => id));
const MAX_IMPORT_SKIP_PREVIEW_ROWS = 5;
const SPLIT_TRADE_TYPES = new Set(['拆股', '反向拆股']);
const LEDGER_TRADE_TYPES = new Set(['買入', '賣出', '拆股', '反向拆股']);
const TRADE_DATE_PATTERNS = [
  /(\d{4})[/-](\d{1,2})[/-](\d{1,2})/g,
  /(\d{1,2})[/-](\d{1,2})[/-](\d{4})/g
];
const getDefaultHistorySortDirection = (key) => (key === '代號' ? 'asc' : 'desc');

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

const getOptionalNumericValue = (value) => {
  const sanitizedValue = String(value ?? '')
    .replace(/[^0-9.-]+/g, '')
    .trim();

  if (!sanitizedValue || /^-?\.?$/.test(sanitizedValue)) {
    return null;
  }

  const parsedValue = Number.parseFloat(sanitizedValue);
  return Number.isFinite(parsedValue) ? parsedValue : null;
};

const formatNumericValue = (value, maxFractionDigits = 8) => {
  if (!Number.isFinite(value)) {
    return '';
  }

  return value
    .toFixed(maxFractionDigits)
    .replace(/\.?0+$/, '');
};

const hasMeaningfulValue = (value) => Number.isFinite(value) && Math.abs(value) > POSITION_EPSILON;

const buildTradeDateTimestamp = (year, month, day) => {
  const parsedYear = Number.parseInt(year, 10);
  const parsedMonth = Number.parseInt(month, 10);
  const parsedDay = Number.parseInt(day, 10);

  if (
    !Number.isInteger(parsedYear)
    || !Number.isInteger(parsedMonth)
    || !Number.isInteger(parsedDay)
    || parsedMonth < 1
    || parsedMonth > 12
    || parsedDay < 1
    || parsedDay > 31
  ) {
    return null;
  }

  return new Date(parsedYear, parsedMonth - 1, parsedDay).getTime();
};

const extractTradeDateTimestamp = (dateValue) => {
  const normalizedValue = String(dateValue || '').trim();
  if (!normalizedValue) {
    return null;
  }

  const matchedTimestamps = [];
  TRADE_DATE_PATTERNS.forEach((pattern, patternIndex) => {
    const matches = normalizedValue.matchAll(pattern);
    for (const match of matches) {
      const timestamp = patternIndex === 0
        ? buildTradeDateTimestamp(match[1], match[2], match[3])
        : buildTradeDateTimestamp(match[3], match[1], match[2]);

      if (Number.isFinite(timestamp)) {
        matchedTimestamps.push(timestamp);
      }
    }
  });

  if (matchedTimestamps.length > 0) {
    return Math.min(...matchedTimestamps);
  }

  const parsedDate = new Date(normalizedValue);
  const timestamp = parsedDate.getTime();
  return Number.isNaN(timestamp) ? null : timestamp;
};

const getTradeTimestamp = (dateValue) => {
  return extractTradeDateTimestamp(dateValue) ?? 0;
};

const sortTradeRowsChronologically = (rows) => [...rows].sort((a, b) => {
  const timestampDifference = getTradeTimestamp(a.row?.['日期']) - getTradeTimestamp(b.row?.['日期']);
  if (timestampDifference !== 0) {
    return timestampDifference;
  }

  return a.originalIndex - b.originalIndex;
});

const calculateOpenPositionMetrics = (openLots) => openLots.reduce(
  (accumulator, lot) => ({
    holdingQty: accumulator.holdingQty + (lot.side * lot.quantity),
    netCostOriginal: accumulator.netCostOriginal + (lot.side * lot.quantity * lot.unitPrice),
    holdingCostOriginal: accumulator.holdingCostOriginal + (lot.quantity * lot.unitPrice)
  }),
  {
    holdingQty: 0,
    netCostOriginal: 0,
    holdingCostOriginal: 0
  }
);

const normalizeSplitFactor = (factor) => (
  Number.isFinite(factor)
  && factor > POSITION_EPSILON
  && Math.abs(factor - 1) > POSITION_EPSILON
    ? factor
    : null
);

const extractSplitFactorFromText = (rawValue) => {
  const normalizedText = String(rawValue || '')
    .replace(/[－–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();

  if (!normalizedText) {
    return null;
  }

  const ratioPatterns = [
    /(\d+(?:\.\d+)?)\s*(?:for|:|\/|to)\s*(\d+(?:\.\d+)?)/i,
    /(\d+(?:\.\d+)?)\s*-\s*for\s*-\s*(\d+(?:\.\d+)?)/i
  ];

  for (const pattern of ratioPatterns) {
    const match = normalizedText.match(pattern);
    if (!match) {
      continue;
    }

    const numerator = Number.parseFloat(match[1]);
    const denominator = Number.parseFloat(match[2]);
    if (Number.isFinite(numerator) && Number.isFinite(denominator) && denominator > 0) {
      return normalizeSplitFactor(numerator / denominator);
    }
  }

  return null;
};

const resolveSplitFactor = (row, openLots) => {
  const explicitRowFactor = normalizeSplitFactor(getNumericValue(row['拆股比例']));
  if (explicitRowFactor) {
    return explicitRowFactor;
  }

  const textFactor = extractSplitFactorFromText(`${row['原始類型'] || ''} ${row['說明'] || ''}`);
  if (textFactor) {
    return textFactor;
  }

  const quantityDelta = Math.abs(getNumericValue(row['數量']));
  if (!hasMeaningfulValue(quantityDelta)) {
    return null;
  }

  const { holdingQty } = calculateOpenPositionMetrics(openLots);
  const currentHoldingAbs = Math.abs(holdingQty);
  if (!hasMeaningfulValue(currentHoldingAbs)) {
    return null;
  }

  const nextHoldingAbs = row['類型'] === '拆股'
    ? currentHoldingAbs + quantityDelta
    : currentHoldingAbs - quantityDelta;

  if (!hasMeaningfulValue(nextHoldingAbs)) {
    return null;
  }

  return normalizeSplitFactor(nextHoldingAbs / currentHoldingAbs);
};

const buildFallbackResolvedTradeRow = (row, originalIndex) => ({
  ...row,
  originalIndex,
  __market: resolveMarket(row['代號'], row['市場']),
  __symbol: '',
  __currency: '',
  __quantityValue: getNumericValue(row['數量']),
  __priceValue: getNumericValue(row['單價']),
  __amountValue: getNumericValue(row['總金額']),
  __resolvedPnlOriginal: getOptionalNumericValue(row['損益']) ?? 0,
  __closedCostOriginal: 0,
  __matchedLongSoldQty: 0,
  __matchedLongSoldCostOriginal: 0,
  __holdingQtyAfter: 0,
  __netOpenCostOriginalAfter: 0,
  __holdingCostOriginalAfter: 0,
  __hasDerivedPnl: false,
  __hasProvidedPnl: getOptionalNumericValue(row['損益']) !== null
});

const buildResolvedTradeRows = (rows, overrides = []) => {
  const openLotsBySymbol = new Map();
  const resolvedByOriginalIndex = new Map();
  const chronologicalResolvedRows = [];
  const rowsWithIndex = rows.map((row, originalIndex) => ({ row, originalIndex }));

  const aliasOverrides = overrides.filter((o) => o.type === 'alias' && o.sourceCode && o.aliasCode);
  const getAliasedCodeAndMarket = (rawCode, market) => {
    for (const o of aliasOverrides) {
      if (o.sourceCode === rawCode && (!o.sourceMarket || o.sourceMarket === market)) {
        return { code: o.aliasCode, market: o.aliasMarket || market };
      }
    }
    return { code: rawCode, market };
  };

  sortTradeRowsChronologically(rowsWithIndex).forEach(({ row, originalIndex }) => {
    const rawCode = String(row['代號'] || '').trim();
    const type = row['類型'];

    if (!rawCode || !LEDGER_TRADE_TYPES.has(type)) {
      const fallbackRow = buildFallbackResolvedTradeRow(row, originalIndex);
      resolvedByOriginalIndex.set(originalIndex, fallbackRow);
      chronologicalResolvedRows.push(fallbackRow);
      return;
    }

    const resolvedMarket = resolveMarket(rawCode, row['市場']);
    const { code: effectiveCode, market } = getAliasedCodeAndMarket(rawCode, resolvedMarket);
    const symbol = formatSymbol(effectiveCode, market);
    const currency = getCurrencyBySymbolOrMarket(symbol, market);
    const openLots = openLotsBySymbol.get(symbol) || [];
    let quantityValue = Math.abs(getNumericValue(row['數量']));

    if (row.__syntheticDelist && type === '賣出' && !hasMeaningfulValue(quantityValue)) {
      const { holdingQty } = calculateOpenPositionMetrics(openLots);
      quantityValue = Math.abs(holdingQty);
      if (!hasMeaningfulValue(quantityValue)) {
        const fallbackRow = buildFallbackResolvedTradeRow(row, originalIndex);
        resolvedByOriginalIndex.set(originalIndex, fallbackRow);
        chronologicalResolvedRows.push(fallbackRow);
        return;
      }
    }

    const priceFromRow = getNumericValue(row['單價']);
    const amountFromRow = Math.abs(getNumericValue(row['總金額']));
    const unitPrice = hasMeaningfulValue(priceFromRow)
      ? priceFromRow
      : (hasMeaningfulValue(quantityValue) ? amountFromRow / quantityValue : 0);
    const amountValue = hasMeaningfulValue(amountFromRow)
      ? amountFromRow
      : quantityValue * unitPrice;
    const rawPnlText = String(row['損益'] ?? '').trim();
    const parsedProvidedPnl = getOptionalNumericValue(rawPnlText);
    const hasProvidedPnl = parsedProvidedPnl !== null;

    let remainingQuantity = quantityValue;
    let computedPnlOriginal = 0;
    let closedCostOriginal = 0;
    let closedQuantity = 0;
    let matchedLongSoldQty = 0;
    let matchedLongSoldCostOriginal = 0;

    if (type === '買入') {
      while (remainingQuantity > POSITION_EPSILON && openLots[0]?.side === -1) {
        const shortLot = openLots[0];
        const matchedQuantity = Math.min(remainingQuantity, shortLot.quantity);
        computedPnlOriginal += (shortLot.unitPrice - unitPrice) * matchedQuantity;
        closedCostOriginal += shortLot.unitPrice * matchedQuantity;
        closedQuantity += matchedQuantity;
        shortLot.quantity -= matchedQuantity;
        remainingQuantity -= matchedQuantity;

        if (shortLot.quantity <= POSITION_EPSILON) {
          openLots.shift();
        }
      }

      if (remainingQuantity > POSITION_EPSILON) {
        openLots.push({
          side: 1,
          quantity: remainingQuantity,
          unitPrice
        });
      }
    } else if (type === '賣出') {
      while (remainingQuantity > POSITION_EPSILON && openLots[0]?.side === 1) {
        const longLot = openLots[0];
        const matchedQuantity = Math.min(remainingQuantity, longLot.quantity);
        computedPnlOriginal += (unitPrice - longLot.unitPrice) * matchedQuantity;
        closedCostOriginal += longLot.unitPrice * matchedQuantity;
        closedQuantity += matchedQuantity;
        matchedLongSoldQty += matchedQuantity;
        matchedLongSoldCostOriginal += longLot.unitPrice * matchedQuantity;
        longLot.quantity -= matchedQuantity;
        remainingQuantity -= matchedQuantity;

        if (longLot.quantity <= POSITION_EPSILON) {
          openLots.shift();
        }
      }

      if (remainingQuantity > POSITION_EPSILON) {
        openLots.push({
          side: -1,
          quantity: remainingQuantity,
          unitPrice
        });
      }
    } else if (SPLIT_TRADE_TYPES.has(type)) {
      const splitFactor = resolveSplitFactor(row, openLots);
      if (splitFactor) {
        openLots.forEach((lot) => {
          lot.quantity *= splitFactor;
          lot.unitPrice /= splitFactor;
        });
      }
    }

    const normalizedOpenLots = openLots.filter((lot) => lot.quantity > POSITION_EPSILON);
    openLotsBySymbol.set(symbol, normalizedOpenLots);

    const {
      holdingQty,
      netCostOriginal,
      holdingCostOriginal
    } = calculateOpenPositionMetrics(normalizedOpenLots);
    const resolvedPnlOriginal = hasProvidedPnl
      ? parsedProvidedPnl
      : (closedQuantity > POSITION_EPSILON ? computedPnlOriginal : 0);
    const shouldPopulatePnlCell = hasProvidedPnl || closedQuantity > POSITION_EPSILON;

    const resolvedRow = {
      ...row,
      originalIndex,
      損益: shouldPopulatePnlCell
        ? (hasProvidedPnl ? rawPnlText : formatNumericValue(resolvedPnlOriginal))
        : '',
      __market: market,
      __symbol: symbol,
      __currency: currency,
      __quantityValue: quantityValue,
      __priceValue: unitPrice,
      __amountValue: amountValue,
      __resolvedPnlOriginal: resolvedPnlOriginal,
      __closedCostOriginal: closedCostOriginal,
      __matchedLongSoldQty: matchedLongSoldQty,
      __matchedLongSoldCostOriginal: matchedLongSoldCostOriginal,
      __holdingQtyAfter: hasMeaningfulValue(holdingQty) ? holdingQty : 0,
      __netOpenCostOriginalAfter: hasMeaningfulValue(netCostOriginal) ? netCostOriginal : 0,
      __holdingCostOriginalAfter: hasMeaningfulValue(holdingCostOriginal) ? holdingCostOriginal : 0,
      __hasDerivedPnl: !hasProvidedPnl && closedQuantity > POSITION_EPSILON,
      __hasProvidedPnl: hasProvidedPnl
    };

    resolvedByOriginalIndex.set(originalIndex, resolvedRow);
    chronologicalResolvedRows.push(resolvedRow);
  });

  return {
    resolvedTradeRows: rows.map((row, originalIndex) => (
      resolvedByOriginalIndex.get(originalIndex) || buildFallbackResolvedTradeRow(row, originalIndex)
    )),
    resolvedTradeRowsChronological: chronologicalResolvedRows
  };
};

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

const buildTrackedSymbolEntries = (rows) => {
  const entriesBySymbol = new Map();

  rows.forEach((row) => {
    const rawCode = String(row['代號'] || '').trim();
    if (!rawCode) {
      return;
    }

    const market = resolveMarket(rawCode, row['市場']);
    const symbol = formatSymbol(rawCode, market);
    if (!symbol || symbol === '000000' || symbol === '未知') {
      return;
    }

    const existingEntry = entriesBySymbol.get(symbol);
    if (existingEntry) {
      existingEntry.recordCount += 1;
      return;
    }

    entriesBySymbol.set(symbol, {
      symbol,
      rawCode,
      market,
      recordCount: 1
    });
  });

  return Array.from(entriesBySymbol.values());
};

const getSnapshotTimestamp = (value) => {
  const numericTimestamp = Number(value);
  return Number.isFinite(numericTimestamp) && numericTimestamp > 0 ? numericTimestamp : null;
};

const isFreshSnapshotTimestamp = (timestamp, now) => (
  Number.isFinite(timestamp) && timestamp > 0 && now - timestamp <= ONE_DAY
);

const getSnapshotAttemptTimestamp = (snapshot) => (
  getSnapshotTimestamp(snapshot?.attemptedAt) || getSnapshotTimestamp(snapshot?.timestamp)
);

const getRateSnapshotStatus = (rateSnapshot, now = Date.now()) => {
  const numericRate = Number(rateSnapshot?.rate);
  const rateTimestamp = getSnapshotTimestamp(rateSnapshot?.timestamp);
  const attemptTimestamp = getSnapshotAttemptTimestamp(rateSnapshot);
  const hasRate = Number.isFinite(numericRate) && numericRate > 0;

  return {
    hasRate,
    isFresh: hasRate && isFreshSnapshotTimestamp(rateTimestamp, now),
    hasRecentAttempt: isFreshSnapshotTimestamp(attemptTimestamp, now)
  };
};

const getResolvedQuoteSnapshotStatus = (symbol, liveSnapshot, manualSnapshot, now = Date.now()) => {
  const manualEntry = manualSnapshot?.[symbol];
  const manualPrice = Number.parseFloat(manualEntry?.price);

  if (Number.isFinite(manualPrice) && Math.abs(manualPrice) > POSITION_EPSILON) {
    return {
      hasQuote: true,
      // Treat manual overrides as resolved quotes during normal refreshes.
      // Users can still use force refresh to replace them with live API data.
      isFresh: true,
      hasRecentAttempt: true,
      source: 'manual'
    };
  }

  const liveQuote = liveSnapshot?.[symbol];
  const normalizedQuote = normalizeQuoteCurrencyData(
    liveQuote?.currency,
    liveQuote?.price
  );
  const liveTimestamp = getSnapshotTimestamp(liveQuote?.timestamp);
  const attemptTimestamp = getSnapshotAttemptTimestamp(liveQuote);
  const hasQuote = Number.isFinite(normalizedQuote.price) && Math.abs(normalizedQuote.price) > POSITION_EPSILON;

  return {
    hasQuote,
    isFresh: hasQuote && isFreshSnapshotTimestamp(liveTimestamp, now),
    hasRecentAttempt: isFreshSnapshotTimestamp(attemptTimestamp, now),
    source: hasQuote ? 'api' : 'missing'
  };
};

const hasResolvedQuoteSnapshot = (symbol, liveSnapshot, manualSnapshot) => (
  getResolvedQuoteSnapshotStatus(symbol, liveSnapshot, manualSnapshot).hasQuote
);

const buildMissingImportedSymbolEntries = (symbolEntries, liveSnapshot, manualSnapshot) => (
  symbolEntries
    .filter((entry) => !hasResolvedQuoteSnapshot(entry.symbol, liveSnapshot, manualSnapshot))
    .map((entry) => ({
      ...entry,
      suggestedName: manualSnapshot?.[entry.symbol]?.name
        || liveSnapshot?.[entry.symbol]?.name
        || STOCK_MAPPING[entry.symbol]?.name
        || STOCK_MAPPING[entry.rawCode]?.name
        || '',
      suggestedPrice: ''
    }))
);

const getDemoExchangeRate = (fromCurrency, toCurrency) => {
  const fromUsdRate = DEMO_USD_RATES[fromCurrency];
  const toUsdRate = DEMO_USD_RATES[toCurrency];

  if (!fromUsdRate || !toUsdRate) {
    return 1;
  }

  return fromUsdRate / toUsdRate;
};

const getExchangeRateValue = (fromCurrency, toCurrency, effectiveExchangeRates, isDemo) => {
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

const buildRefreshPlan = ({
  exchangeRates,
  liveData,
  manualStockData,
  rawData,
  targetBaseCurrency,
  isForce = false,
  symbolEntriesInput = null,
  now = Date.now()
}) => {
  const symbolEntries = Array.isArray(symbolEntriesInput)
    ? symbolEntriesInput
    : buildTrackedSymbolEntries(rawData);

  const uniqueSymbols = Array.from(new Set(symbolEntries.map((entry) => entry.symbol)));
  const marketBySymbol = new Map(symbolEntries.map((entry) => [entry.symbol, entry.market]));
  const missingRateKeys = new Set();
  const staleRateKeys = new Set();

  let missingQuoteCount = 0;
  let staleQuoteCount = 0;

  uniqueSymbols.forEach((symbol) => {
    const quoteStatus = getResolvedQuoteSnapshotStatus(symbol, liveData, manualStockData, now);
    const cachedQuote = liveData[symbol];
    if (!quoteStatus.hasQuote) {
      if (!quoteStatus.hasRecentAttempt) {
        missingQuoteCount += 1;
      }
    } else if (!quoteStatus.isFresh) {
      staleQuoteCount += 1;
    }

    const fallbackCurrency = getCurrencyBySymbolOrMarket(symbol, marketBySymbol.get(symbol));
    const currency = normalizeQuoteCurrencyData(cachedQuote?.currency).currency || fallbackCurrency;
    if (!currency || currency === targetBaseCurrency) {
      return;
    }

    getFxRateSymbols(currency, targetBaseCurrency).forEach((rateKey) => {
      const cachedRate = exchangeRates[rateKey];
      const rateStatus = getRateSnapshotStatus(cachedRate, now);
      if (!rateStatus.hasRate) {
        if (!rateStatus.hasRecentAttempt) {
          missingRateKeys.add(rateKey);
        }
        return;
      }

      if (!rateStatus.isFresh) {
        staleRateKeys.add(rateKey);
      }
    });
  });

  const codesToFetch = uniqueSymbols.filter((symbol) => {
    if (isForce) return true;
    const quoteStatus = getResolvedQuoteSnapshotStatus(symbol, liveData, manualStockData, now);
    return !quoteStatus.hasRecentAttempt;
  });

  const currenciesToFetch = new Set();
  uniqueSymbols.forEach((symbol) => {
    const cachedQuote = liveData[symbol];
    const fallbackCurrency = getCurrencyBySymbolOrMarket(symbol, marketBySymbol.get(symbol));
    const currency = normalizeQuoteCurrencyData(cachedQuote?.currency).currency || fallbackCurrency;

    if (currency && currency !== targetBaseCurrency) {
      getFxRateSymbols(currency, targetBaseCurrency).forEach((rateKey) => {
        const rateStatus = getRateSnapshotStatus(exchangeRates[rateKey], now);
        if (isForce || !rateStatus.hasRecentAttempt) {
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

  return {
    now,
    uniqueSymbols,
    marketBySymbol,
    codesToFetch,
    rateSymbolsToFetch: Array.from(currenciesToFetch),
    missingQuoteCount,
    staleQuoteCount,
    missingRateCount: missingRateKeys.size,
    staleRateCount: staleRateKeys.size,
    requiresNetworkRefresh: codesToFetch.length > 0 || currenciesToFetch.size > 0
  };
};

const DEMO_LAST_UPDATE = (() => {
  const parsedDate = new Date(DEMO_REFERENCE_UPDATED_AT);
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
})();

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
  const [historySortConfig, setHistorySortConfig] = useState({
    key: '日期',
    direction: getDefaultHistorySortDirection('日期')
  });
  const [trendTimeRange, setTrendTimeRange] = useState('全部');
  const [showManager, setShowManager] = useState(false);
  const [hideZeroHolding, setHideZeroHolding] = useState(false);
  const [csvImportProfile, setCsvImportProfile] = useState('auto');
  const [lastImportMeta, setLastImportMeta] = useState(null);
  const [pendingImportSymbolReview, setPendingImportSymbolReview] = useState(null);
  const [expandedStock, setExpandedStock] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingStockSymbol, setEditingStockSymbol] = useState(null);
  const [tempStockEdit, setTempStockEdit] = useState({
    code: '',
    market: '',
    name: '',
    price: ''
  });
  const [newRec, setNewRec] = useState(DEFAULT_NEW_RECORD);
  const [symbolOverrides, setSymbolOverrides] = useState([]);
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
    setPendingImportSymbolReview(null);
    setRawData(parseCSV(DEFAULT_CSV));
  };
  const persistManualData = (updatedManualStockData) => {
    setManualStockData(updatedManualStockData);
    persistJson(STORAGE_KEYS.manualStockData, updatedManualStockData);
  };

  const persistSymbolOverrides = (updated) => {
    setSymbolOverrides(updated);
    persistJson(STORAGE_KEYS.symbolOverrides, updated);
  };

  const addSymbolOverride = (entry) => {
    const now = new Date().toISOString();
    const newEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    persistSymbolOverrides([...symbolOverrides, newEntry]);
  };

  const deleteSymbolOverride = (id) => {
    persistSymbolOverrides(symbolOverrides.filter((o) => o.id !== id));
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

        const savedCsvImportProfile = await asyncStorage.get(STORAGE_KEYS.csvImportProfile);
        if (CSV_IMPORT_PROFILE_IDS.has(savedCsvImportProfile)) {
          setCsvImportProfile(savedCsvImportProfile);
        }

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

        const savedOverrides = await asyncStorage.get(STORAGE_KEYS.symbolOverrides);
        if (savedOverrides) {
          const parsedOverrides = JSON.parse(savedOverrides);
          if (Array.isArray(parsedOverrides)) {
            setSymbolOverrides(parsedOverrides);
          }
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

  const handleSaveApiKey = () => {
    persistValue(STORAGE_KEYS.apiKey, apiKey);
    showToast(t('messages.apiKeySaved'));
  };

  const handleSaveManualStock = (symbol) => {
    const trimmedCode = String(tempStockEdit.code || '').trim().toUpperCase();
    const targetMarket = tempStockEdit.market || processedData.find((stock) => stock.symbol === symbol)?.market || '';
    const nextSymbol = trimmedCode ? formatSymbol(trimmedCode, targetMarket) : symbol;
    const trimmedName = String(tempStockEdit.name || '').trim();
    const parsedManualPrice = getOptionalNumericValue(tempStockEdit.price);
    const timestamp = Date.now();

    if (nextSymbol !== symbol) {
      const updatedRawData = rawData.map((row) => {
        const rawCode = String(row['代號'] || '').trim();
        if (!rawCode) {
          return row;
        }

        const rowSymbol = formatSymbol(rawCode, resolveMarket(rawCode, row['市場']));
        if (rowSymbol !== symbol) {
          return row;
        }

        return {
          ...row,
          代號: trimmedCode
        };
      });

      persistRawData(updatedRawData);

      if (expandedStock === symbol) {
        setExpandedStock(nextSymbol);
      }
    }

    const updatedManualStockData = { ...manualStockData };
    if (nextSymbol !== symbol && updatedManualStockData[symbol]) {
      delete updatedManualStockData[symbol];
    }

    const nextManualEntry = {};
    if (trimmedName) {
      nextManualEntry.name = trimmedName;
    }

    if (Number.isFinite(parsedManualPrice) && Math.abs(parsedManualPrice) > POSITION_EPSILON) {
      nextManualEntry.price = parsedManualPrice;
    }

    if (Object.keys(nextManualEntry).length > 0) {
      updatedManualStockData[nextSymbol] = {
        ...nextManualEntry,
        timestamp
      };
    } else {
      delete updatedManualStockData[nextSymbol];
    }

    persistManualData(updatedManualStockData);

    if (nextSymbol !== symbol && liveData[symbol]) {
      const updatedLiveData = { ...liveData };
      delete updatedLiveData[symbol];
      persistMarketData(updatedLiveData, exchangeRates);
    }

    setEditingStockSymbol(null);
    setTempStockEdit({
      code: '',
      market: '',
      name: '',
      price: ''
    });
    showToast(t('messages.manualStockSaved', { symbol: nextSymbol }));
  };

  const {
    resolvedTradeRows,
    resolvedTradeRowsChronological
  } = useMemo(() => {
    const effectiveOverrides = [...DEFAULT_SYMBOL_OVERRIDES, ...symbolOverrides];
    const syntheticDelistRows = effectiveOverrides
      .filter((o) => o.type === 'delist' && o.sourceCode && o.delistDate && o.delistPrice > 0)
      .map((o) => ({
        日期: o.delistDate,
        類型: '賣出',
        代號: o.sourceCode,
        市場: o.sourceMarket || '',
        數量: '',
        單價: String(o.delistPrice),
        總金額: '',
        損益: '',
        說明: o.note || '',
        __syntheticDelist: true,
        __overrideId: o.id,
      }));
    return buildResolvedTradeRows([...rawData, ...syntheticDelistRows], effectiveOverrides);
  }, [rawData, symbolOverrides]);

  const refreshPlan = useMemo(
    () => buildRefreshPlan({
      exchangeRates,
      liveData,
      manualStockData,
      rawData,
      targetBaseCurrency: baseCurrency
    }),
    [baseCurrency, exchangeRates, liveData, manualStockData, rawData]
  );
  const hasStaleMarketData = refreshPlan.requiresNetworkRefresh;

  const fetchLivePrices = async (isForce = false, targetBaseCurrency = baseCurrency, options = {}) => {
    const {
      symbolEntries = null,
      suppressToast = false,
      suppressFreshToast = false,
      suppressApiKeyToast = false
    } = options;

    if (!apiKey) {
      if (!suppressApiKeyToast) {
        setShowManager(true);
        showToast(t('messages.needApiKey'));
      }

      return {
        ok: false,
        reason: 'missingApiKey',
        fetchedSymbols: [],
        liveDataSnapshot: liveData,
        exchangeRatesSnapshot: exchangeRates,
        manualStockDataSnapshot: manualStockData
      };
    }

    const refreshTargets = buildRefreshPlan({
      exchangeRates,
      liveData,
      manualStockData,
      rawData,
      targetBaseCurrency,
      isForce,
      symbolEntriesInput: symbolEntries
    });
    const { codesToFetch, marketBySymbol, rateSymbolsToFetch, uniqueSymbols } = refreshTargets;
    if (uniqueSymbols.length === 0) {
      return {
        ok: true,
        reason: 'noSymbols',
        fetchedSymbols: [],
        liveDataSnapshot: liveData,
        exchangeRatesSnapshot: exchangeRates,
        manualStockDataSnapshot: manualStockData
      };
    }

    setIsLoadingPrices(true);

    try {
      const now = refreshTargets.now;
      const currenciesToFetch = new Set(rateSymbolsToFetch);

      if (!refreshTargets.requiresNetworkRefresh) {
        setLastUpdate(new Date());
        if (!suppressFreshToast) {
          showToast(t('messages.cacheFresh'));
        }

        return {
          ok: true,
          reason: 'cacheFresh',
          fetchedSymbols: [],
          liveDataSnapshot: liveData,
          exchangeRatesSnapshot: exchangeRates,
          manualStockDataSnapshot: manualStockData
        };
      }

      const updatedLiveData = { ...liveData };
      const updatedExchangeRates = { ...exchangeRates };
      let updatedManualStockData = { ...manualStockData };
      let isManualDataChanged = false;
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
        chunk.forEach((symbol) => {
          updatedLiveData[symbol] = {
            ...updatedLiveData[symbol],
            currency: updatedLiveData[symbol]?.currency || getCurrencyBySymbolOrMarket(symbol, marketBySymbol.get(symbol)),
            attemptedAt: now
          };
        });
        if (json?.quoteResponse?.result) {
          json.quoteResponse.result.forEach((item) => {
            const normalizedQuote = normalizeQuoteCurrencyData(item.currency, item.regularMarketPrice);
            updatedLiveData[item.symbol] = {
              ...updatedLiveData[item.symbol],
              price: normalizedQuote.price,
              name: item.longName || item.shortName || STOCK_MAPPING[item.symbol]?.name,
              currency: normalizedQuote.currency || getCurrencyBySymbolOrMarket(item.symbol, marketBySymbol.get(item.symbol)),
              timestamp: now,
              attemptedAt: now
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
        fetchedSymbols.forEach((symbol) => {
          if (updatedManualStockData[symbol]) {
            delete updatedManualStockData[symbol];
            isManualDataChanged = true;
          }
        });
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
          chunk.forEach((rateSymbol) => {
            updatedExchangeRates[rateSymbol] = {
              ...updatedExchangeRates[rateSymbol],
              attemptedAt: now
            };
          });
          const json = await response.json();
          if (json?.quoteResponse?.result) {
            json.quoteResponse.result.forEach((item) => {
              updatedExchangeRates[item.symbol] = {
                ...updatedExchangeRates[item.symbol],
                rate: item.regularMarketPrice,
                timestamp: now,
                attemptedAt: now
              };
            });
          }
        }

        if (index + 10 < rateSymbols.length) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      persistMarketData(updatedLiveData, updatedExchangeRates);
      if (isManualDataChanged) {
        persistManualData(updatedManualStockData);
      }
      setLastUpdate(new Date());

      if (!suppressToast) {
        showToast(t('messages.updateSuccess', { count: formatLocalizedNumber(fetchedCount, activeLocale) }));
      }

      return {
        ok: true,
        reason: 'updated',
        fetchedSymbols: Array.from(fetchedSymbols),
        liveDataSnapshot: updatedLiveData,
        exchangeRatesSnapshot: updatedExchangeRates,
        manualStockDataSnapshot: updatedManualStockData
      };
    } catch (error) {
      if (!suppressToast) {
        showToast(t('messages.fetchFailed', { message: error.message }));
      }

      return {
        ok: false,
        reason: 'fetchFailed',
        error,
        fetchedSymbols: [],
        liveDataSnapshot: liveData,
        exchangeRatesSnapshot: exchangeRates,
        manualStockDataSnapshot: manualStockData
      };
    } finally {
      setIsLoadingPrices(false);
    }
  };

  const handleRefreshPrices = () => {
    if (!apiKey) {
      void fetchLivePrices(false);
      return;
    }

    if (hasStaleMarketData) {
      void fetchLivePrices(false);
      return;
    }

    if (window.confirm(t('header.forceRefreshConfirm'))) {
      void fetchLivePrices(true);
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

  const handleSetCsvImportProfile = (profileId) => {
    const nextProfileId = CSV_IMPORT_PROFILE_IDS.has(profileId) ? profileId : 'auto';
    setCsvImportProfile(nextProfileId);
    persistValue(STORAGE_KEYS.csvImportProfile, nextProfileId);
  };

  const getLocalizedProfileLabel = (profileLabelKey, fallbackLabel) => (
    profileLabelKey
      ? t(profileLabelKey, { defaultValue: fallbackLabel })
      : fallbackLabel
  );

  const getLocalizedDelimiterLabel = (delimiterLabel) => (
    delimiterLabel === 'tab'
      ? t('header.csvDelimiters.tab', { defaultValue: 'tab' })
      : delimiterLabel
  );

  const buildImportMeta = (meta) => ({
    ...meta,
    selectionMode: csvImportProfile === 'auto' ? 'auto' : 'manual'
  });

  const showImportErrorToast = (importMeta) => {
    const localizedDelimiterLabel = getLocalizedDelimiterLabel(importMeta.delimiterLabel);

    if (importMeta.errorCode === 'missingRequiredHeaders') {
      const missingFieldLabels = importMeta.missingRequiredFields
        .map((field) => CSV_REQUIRED_FIELD_LABELS[field])
        .filter(Boolean)
        .map(({ key, defaultValue }) => t(key, { defaultValue }))
        .join(' / ');

      showToast(t('messages.csvImportFailedHeaders', {
        defaultValue: 'CSV import failed: missing required fields {{fields}}.',
        fields: missingFieldLabels
      }));
    } else if (importMeta.errorCode === 'rowWidthMismatch') {
      showToast(t('messages.csvImportFailedRowWidth', {
        defaultValue: 'CSV import failed: row {{row}} has more columns than the header, usually because a thousands-separated number in a {{delimiter}} file was not quoted properly.',
        row: formatLocalizedNumber(importMeta.problematicRowNumbers[0], activeLocale),
        delimiter: localizedDelimiterLabel
      }));
    } else {
      showToast(t('messages.csvImportFailedNoData', {
        defaultValue: 'CSV import failed: no usable trade rows were found.'
      }));
    }
  };

  const buildTradeRowSignature = (row) => TRADE_ROW_SIGNATURE_FIELDS
    .map((field) => {
      const rawValue = String(row[field] || '').trim();

      if (['數量', '單價', '總金額', '損益'].includes(field)) {
        const numericValue = Number.parseFloat(rawValue.replace(/[^0-9.-]+/g, ''));
        return Number.isFinite(numericValue) ? numericValue.toString() : '';
      }

      if (field === '代號') {
        return rawValue.toUpperCase();
      }

      return rawValue;
    })
    .join('\u241f');

  const buildPendingImportReviewEntries = (rows) => {
    const entriesBySymbol = new Map();

    rows.forEach((row) => {
      const rawCode = String(row['代號'] || '').trim();
      if (!rawCode) {
        return;
      }

      const market = resolveMarket(rawCode, row['市場']);
      const symbol = formatSymbol(rawCode, market);
      if (!symbol || symbol === '000000' || symbol === '未知') {
        return;
      }

      const rowSignature = buildTradeRowSignature(row);
      const existingEntry = entriesBySymbol.get(symbol);
      if (existingEntry) {
        existingEntry.recordCount += 1;
        existingEntry.rowSignatures.push(rowSignature);
        return;
      }

      entriesBySymbol.set(symbol, {
        symbol,
        rawCode,
        market,
        recordCount: 1,
        rowSignatures: [rowSignature]
      });
    });

    return Array.from(entriesBySymbol.values());
  };

  const buildDuplicatePreviewRow = (row) => ({
    rowNumber: null,
    reasonCode: 'duplicate',
    date: String(row['日期'] || '').trim(),
    type: String(row['類型'] || '').trim(),
    symbol: String(row['代號'] || '').trim(),
    market: String(row['市場'] || '').trim(),
    description: ''
  });

  const prepareCsvImport = (text) => {
    const { rows, meta } = parseCSVWithMeta(text, { profileId: csvImportProfile });
    const importMeta = buildImportMeta(meta);

    if (!importMeta.ok) {
      setLastImportMeta(null);
      showImportErrorToast(importMeta);
      return null;
    }

    return {
      rows,
      meta: importMeta
    };
  };

  const dismissPendingImportSymbolReview = () => {
    setPendingImportSymbolReview(null);
  };

  const skipPendingImportSymbolReview = (symbols) => {
    const selectedSymbols = new Set(symbols.filter(Boolean));
    if (selectedSymbols.size === 0) {
      return { skippedCount: 0 };
    }

    setPendingImportSymbolReview((currentReview) => {
      if (!currentReview) {
        return currentReview;
      }

      const remainingEntries = currentReview.entries.filter((entry) => !selectedSymbols.has(entry.symbol));
      return remainingEntries.length > 0
        ? {
          ...currentReview,
          entries: remainingEntries
        }
        : null;
    });

    showToast(t('messages.importMissingDataSkipped', {
      defaultValue: 'Kept {{count}} unresolved symbols for later review.',
      count: formatLocalizedNumber(selectedSymbols.size, activeLocale)
    }));

    return { skippedCount: selectedSymbols.size };
  };

  const savePendingImportSymbolReview = async (entries) => {
    const normalizedEntries = entries.map((entry) => {
      const trimmedName = String(entry.name || '').trim();
      const nextRawCode = String(entry.code || entry.rawCode || '').trim().toUpperCase() || entry.rawCode;
      const nextSymbol = formatSymbol(nextRawCode, entry.market) || entry.symbol;
      const parsedPrice = getOptionalNumericValue(entry.price);

      return {
        ...entry,
        originalSymbol: entry.symbol,
        trimmedName,
        nextRawCode,
        nextSymbol,
        parsedPrice,
        hasValidPrice: Number.isFinite(parsedPrice) && parsedPrice > POSITION_EPSILON,
        hasCodeChange: nextRawCode !== entry.rawCode,
        hasNameChange: trimmedName.length > 0
      };
    });

    const actionableEntries = normalizedEntries.filter((entry) => (
      entry.hasCodeChange || entry.hasNameChange || entry.hasValidPrice
    ));

    if (actionableEntries.length === 0) {
      showToast(t('messages.importMissingDataNeedAction', {
        defaultValue: 'Selected symbols do not have a new ticker, name, or valid manual price yet.'
      }));
      return { savedCount: 0 };
    }

    const replacementCodeBySignature = new Map();
    actionableEntries
      .filter((entry) => entry.hasCodeChange)
      .forEach((entry) => {
        (entry.rowSignatures || []).forEach((signature) => {
          replacementCodeBySignature.set(signature, entry.nextRawCode);
        });
      });

    const nextSignatureByOriginal = new Map();
    if (replacementCodeBySignature.size > 0) {
      const updatedRawData = rawData.map((row) => {
        const rowSignature = buildTradeRowSignature(row);
        const replacementCode = replacementCodeBySignature.get(rowSignature);
        if (!replacementCode) {
          return row;
        }

        const updatedRow = {
          ...row,
          代號: replacementCode
        };
        nextSignatureByOriginal.set(rowSignature, buildTradeRowSignature(updatedRow));
        return updatedRow;
      });

      persistRawData(updatedRawData);
    }

    const timestamp = Date.now();
    let updatedManualStockData = { ...manualStockData };
    let manualDataChanged = false;

    actionableEntries.forEach((entry) => {
      if (!entry.hasNameChange && !entry.hasValidPrice) {
        return;
      }

      const existingManualEntry = updatedManualStockData[entry.nextSymbol] || {};
      const nextManualEntry = { ...existingManualEntry };

      if (entry.hasNameChange) {
        nextManualEntry.name = entry.trimmedName;
      }

      if (entry.hasValidPrice) {
        nextManualEntry.price = entry.parsedPrice;
      }

      updatedManualStockData[entry.nextSymbol] = {
        ...nextManualEntry,
        timestamp
      };
      manualDataChanged = true;
    });

    if (manualDataChanged) {
      persistManualData(updatedManualStockData);
    }

    const reviewCandidates = actionableEntries.map((entry) => ({
      ...entry,
      symbol: entry.nextSymbol,
      rawCode: entry.nextRawCode,
      rowSignatures: (entry.rowSignatures || []).map((signature) => nextSignatureByOriginal.get(signature) || signature)
    }));

    let liveDataSnapshot = liveData;
    let manualStockDataSnapshot = updatedManualStockData;

    if (apiKey) {
      const entriesNeedingQuoteRefresh = reviewCandidates.filter((entry) => !entry.hasValidPrice);
      if (entriesNeedingQuoteRefresh.length > 0) {
        const refreshResult = await fetchLivePrices(false, baseCurrency, {
          symbolEntries: entriesNeedingQuoteRefresh,
          suppressToast: true,
          suppressFreshToast: true,
          suppressApiKeyToast: true
        });

        liveDataSnapshot = refreshResult.liveDataSnapshot || liveDataSnapshot;
        manualStockDataSnapshot = manualDataChanged
          ? {
            ...(refreshResult.manualStockDataSnapshot || {}),
            ...updatedManualStockData
          }
          : (refreshResult.manualStockDataSnapshot || manualStockDataSnapshot);

        if (manualDataChanged) {
          persistManualData(manualStockDataSnapshot);
        }
      }
    }

    const unresolvedEntries = buildMissingImportedSymbolEntries(
      reviewCandidates,
      liveDataSnapshot,
      manualStockDataSnapshot
    );
    const unresolvedEntriesByOriginalSymbol = new Map(
      unresolvedEntries.map((entry) => [entry.originalSymbol, entry])
    );
    const selectedOriginalSymbols = new Set(actionableEntries.map((entry) => entry.originalSymbol));

    setPendingImportSymbolReview((currentReview) => {
      if (!currentReview) {
        return currentReview;
      }

      const nextEntries = currentReview.entries.flatMap((entry) => {
        if (!selectedOriginalSymbols.has(entry.symbol)) {
          return [entry];
        }

        const unresolvedEntry = unresolvedEntriesByOriginalSymbol.get(entry.symbol);
        return unresolvedEntry ? [unresolvedEntry] : [];
      });

      return nextEntries.length > 0
        ? {
          ...currentReview,
          entries: nextEntries,
          missingApiKey: currentReview.missingApiKey || !apiKey
        }
        : null;
    });

    showToast(t('messages.importMissingDataSaved', {
      defaultValue: 'Saved review changes for {{count}} symbols.',
      count: formatLocalizedNumber(actionableEntries.length, activeLocale)
    }));

    return { savedCount: actionableEntries.length };
  };

  const deletePendingImportSymbolRecords = (entries) => {
    const normalizedEntries = entries.filter(Boolean);
    const selectedSymbols = new Set(normalizedEntries.map((entry) => entry.symbol).filter(Boolean));
    const selectedRowSignatures = new Set(
      normalizedEntries.flatMap((entry) => entry.rowSignatures || [])
    );

    if (selectedSymbols.size === 0) {
      return { deletedCount: 0 };
    }

    const updatedRawData = rawData.filter((row) => {
      if (selectedRowSignatures.size > 0) {
        return !selectedRowSignatures.has(buildTradeRowSignature(row));
      }

      const rawCode = String(row['代號'] || '').trim();
      if (!rawCode) {
        return true;
      }
      const rowSymbol = formatSymbol(rawCode, resolveMarket(rawCode, row['市場']));
      return !selectedSymbols.has(rowSymbol);
    });
    persistRawData(updatedRawData);

    const remainingSymbols = new Set(buildTrackedSymbolEntries(updatedRawData).map((entry) => entry.symbol));

    let updatedManualStockData = manualStockData;
    let manualChanged = false;
    selectedSymbols.forEach((symbol) => {
      if (!remainingSymbols.has(symbol) && updatedManualStockData[symbol]) {
        if (!manualChanged) {
          updatedManualStockData = { ...updatedManualStockData };
          manualChanged = true;
        }
        delete updatedManualStockData[symbol];
      }
    });
    if (manualChanged) {
      persistManualData(updatedManualStockData);
    }

    let updatedLiveData = liveData;
    let liveChanged = false;
    selectedSymbols.forEach((symbol) => {
      if (!remainingSymbols.has(symbol) && updatedLiveData[symbol]) {
        if (!liveChanged) {
          updatedLiveData = { ...updatedLiveData };
          liveChanged = true;
        }
        delete updatedLiveData[symbol];
      }
    });
    if (liveChanged) {
      persistMarketData(updatedLiveData, exchangeRates);
    }

    setPendingImportSymbolReview((currentReview) => {
      if (!currentReview) {
        return currentReview;
      }

      const remainingEntries = currentReview.entries.filter((entry) => !selectedSymbols.has(entry.symbol));
      return remainingEntries.length > 0
        ? {
          ...currentReview,
          entries: remainingEntries
        }
        : null;
    });

    showToast(t('messages.importMissingDataDeleted', {
      defaultValue: 'Deleted {{count}} unresolved symbols and their rows.',
      count: formatLocalizedNumber(selectedSymbols.size, activeLocale)
    }));

    return { deletedCount: selectedSymbols.size };
  };

  const applyPreparedCsvImport = async (preparedImport, options = {}) => {
    if (!preparedImport?.meta?.ok || !Array.isArray(preparedImport.rows)) {
      return null;
    }

    const mode = options.mode === 'append' ? 'append' : 'replace';
    const announceMode = Boolean(options.announceMode);
    let nextRows = preparedImport.rows;
    let appliedRows = preparedImport.rows;
    let duplicateRowCount = 0;
    const duplicatePreviewRows = [];
    setPendingImportSymbolReview(null);

    if (mode === 'append') {
      const existingSignatures = new Set(rawData.map(buildTradeRowSignature));
      const uniqueRows = [];

      preparedImport.rows.forEach((row) => {
        const signature = buildTradeRowSignature(row);
        if (existingSignatures.has(signature)) {
          duplicateRowCount += 1;
          if (duplicatePreviewRows.length < MAX_IMPORT_SKIP_PREVIEW_ROWS) {
            duplicatePreviewRows.push(buildDuplicatePreviewRow(row));
          }
          return;
        }

        existingSignatures.add(signature);
        uniqueRows.push(row);
      });

      appliedRows = uniqueRows;
      nextRows = [...rawData, ...uniqueRows];
    }

    const appliedRowCount = mode === 'append'
      ? preparedImport.rows.length - duplicateRowCount
      : preparedImport.rows.length;
    const importMeta = {
      ...preparedImport.meta,
      applyMode: mode,
      appliedRowCount,
      duplicateRowCount
    };
    const localizedProfileLabel = getLocalizedProfileLabel(importMeta.profileLabelKey, importMeta.profileLabel);
    const localizedDelimiterLabel = getLocalizedDelimiterLabel(importMeta.delimiterLabel);
    const parserSkippedCount = importMeta.skippedRowCount || 0;
    const totalSkippedCount = parserSkippedCount + duplicateRowCount;
    const hasSkippedRows = totalSkippedCount > 0;
    const skippedPreviewRows = [...(preparedImport.meta.skippedPreviewRows || [])];
    const previewCapacity = Math.max(0, MAX_IMPORT_SKIP_PREVIEW_ROWS - skippedPreviewRows.length);
    if (previewCapacity > 0) {
      skippedPreviewRows.push(...duplicatePreviewRows.slice(0, previewCapacity));
    }
    importMeta.skippedPreviewRows = skippedPreviewRows;
    importMeta.skippedPreviewOverflowCount = Math.max(0, totalSkippedCount - skippedPreviewRows.length);
    const actionLabel = announceMode
      ? t(
        mode === 'append' ? 'messages.csvImportApplyAppend' : 'messages.csvImportApplyReplace',
        {
          defaultValue: mode === 'append'
            ? '已追加到現有資料'
            : '已覆蓋目前資料'
        }
      )
      : '';
    const successMessageKey = importMeta.importKind === 'positions'
      ? (
        announceMode
          ? (hasSkippedRows ? 'messages.csvImportSuccessPositionsAppliedSkipped' : 'messages.csvImportSuccessPositionsApplied')
          : (hasSkippedRows ? 'messages.csvImportSuccessPositionsSkipped' : 'messages.csvImportSuccessPositions')
      )
      : (
        announceMode
          ? (hasSkippedRows ? 'messages.csvImportSuccessAppliedSkipped' : 'messages.csvImportSuccessApplied')
          : (hasSkippedRows ? 'messages.csvImportSuccessSkipped' : 'messages.csvImportSuccess')
      );
    const successDefaultValue = importMeta.importKind === 'positions'
      ? (
        announceMode
          ? (
            hasSkippedRows
              ? 'Imported {{count}} positions as synthetic buy rows, {{action}}, and skipped {{skipped}} rows ({{profile}} · {{delimiter}}).'
              : 'Imported {{count}} positions as synthetic buy rows and {{action}} ({{profile}} · {{delimiter}}).'
          )
          : (
            hasSkippedRows
              ? 'Imported {{count}} positions as synthetic buy rows and skipped {{skipped}} unsupported rows ({{profile}} · {{delimiter}}).'
              : 'Imported {{count}} positions as synthetic buy rows ({{profile}} · {{delimiter}}).'
          )
      )
      : (
        announceMode
          ? (
            hasSkippedRows
              ? 'Imported {{count}} trades, {{action}}, and skipped {{skipped}} rows ({{profile}} · {{delimiter}}).'
              : 'Imported {{count}} trades and {{action}} ({{profile}} · {{delimiter}}).'
          )
          : (
            hasSkippedRows
              ? 'Imported {{count}} trades and skipped {{skipped}} unsupported rows ({{profile}} · {{delimiter}}).'
              : 'Imported {{count}} trades ({{profile}} · {{delimiter}}).'
          )
      );

    persistRawData(nextRows);
    setIsDemo(false);
    setLastImportMeta(importMeta);

    showToast(t(successMessageKey, {
      defaultValue: successDefaultValue,
      count: formatLocalizedNumber(appliedRowCount, activeLocale),
      skipped: formatLocalizedNumber(totalSkippedCount, activeLocale),
      duplicates: formatLocalizedNumber(duplicateRowCount, activeLocale),
      action: actionLabel,
      profile: localizedProfileLabel,
      delimiter: localizedDelimiterLabel
    }));

    const missingImportedSymbolEntries = buildMissingImportedSymbolEntries(
      buildPendingImportReviewEntries(appliedRows),
      liveData,
      manualStockData
    );

    if (missingImportedSymbolEntries.length > 0) {
      let liveDataSnapshot = liveData;
      let manualStockDataSnapshot = manualStockData;
      let missingApiKey = !apiKey;

      if (apiKey) {
        const refreshResult = await fetchLivePrices(false, baseCurrency, {
          symbolEntries: missingImportedSymbolEntries,
          suppressToast: true,
          suppressFreshToast: true,
          suppressApiKeyToast: true
        });

        liveDataSnapshot = refreshResult.liveDataSnapshot || liveDataSnapshot;
        manualStockDataSnapshot = refreshResult.manualStockDataSnapshot || manualStockDataSnapshot;
        missingApiKey = refreshResult.reason === 'missingApiKey';
      }

      const unresolvedImportedEntries = buildMissingImportedSymbolEntries(
        missingImportedSymbolEntries,
        liveDataSnapshot,
        manualStockDataSnapshot
      );

      if (unresolvedImportedEntries.length > 0) {
        setPendingImportSymbolReview({
          attemptedAutoRefresh: Boolean(apiKey),
          missingApiKey,
          entries: unresolvedImportedEntries
        });
      }
    }

    return importMeta;
  };

  const handleAddRecord = () => {
    const isSplitTrade = SPLIT_TRADE_TYPES.has(newRec.type);
    if (!newRec.code || !newRec.qty || !newRec.date || (!isSplitTrade && !newRec.amount)) return;

    const parsedQuantity = Number.parseFloat(newRec.qty);
    const parsedAmount = Number.parseFloat(newRec.amount);
    const derivedPrice = Number.isFinite(parsedQuantity)
      && Math.abs(parsedQuantity) > POSITION_EPSILON
      && Number.isFinite(parsedAmount)
      ? (parsedAmount / parsedQuantity).toFixed(4)
      : '';

    const row = {
      日期: newRec.date,
      類型: newRec.type,
      代號: newRec.code.trim(),
      市場: newRec.market,
      數量: newRec.qty,
      單價: newRec.price || (isSplitTrade ? '' : derivedPrice),
      總金額: isSplitTrade ? (newRec.amount || '') : newRec.amount,
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
      price: row['單價'] || '',
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
    setTempStockEdit({
      code: stock.rawCode,
      market: stock.market,
      name: stock.isManualName ? stock.name : '',
      price: stock.isManualPrice ? formatNumericValue(stock.currentPrice) : ''
    });
  };

  const cancelEditingStock = () => {
    setEditingStockSymbol(null);
    setTempStockEdit({
      code: '',
      market: '',
      name: '',
      price: ''
    });
  };

  // Phase 1: aggregate trade-level data into per-symbol buckets.
  // This only depends on the resolved rows, so it stays stable while live prices
  // refresh — avoiding a full re-aggregation (loop over all rows, history.push, etc.)
  // on every price update.
  const aggregatedStockBase = useMemo(() => {
    if (!isAppLoaded) return {};

    const stocks = {};

    resolvedTradeRowsChronological.forEach((row) => {
      const symbol = row.__symbol;
      if (!symbol) return;

      const market = row.__market;
      const rawCode = String(row['代號'] || '').trim();

      if (!stocks[symbol]) {
        stocks[symbol] = {
          symbol,
          rawCode,
          market,
          name: STOCK_MAPPING[symbol]?.name || symbol,
          defaultPrice: STOCK_MAPPING[symbol]?.price || 0,
          defaultCurrency: row.__currency || getCurrencyBySymbolOrMarket(symbol, market),
          holdingQty: 0,
          holdingCostOriginal: 0,
          realizedPnl: 0,
          realizedCostOriginal: 0,
          totalCost: 0,
          totalSoldQty: 0,
          totalSoldCostOriginal: 0,
          tradeCount: 0,
          latestTradeTimestamp: 0,
          history: []
        };
      }

      stocks[symbol].tradeCount += 1;
      stocks[symbol].history.push(row);
      stocks[symbol].latestTradeTimestamp = getTradeTimestamp(row['日期']);
      stocks[symbol].holdingQty = row.__holdingQtyAfter;
      stocks[symbol].holdingCostOriginal = row.__holdingCostOriginalAfter;
      stocks[symbol].totalCost = row.__netOpenCostOriginalAfter;
      stocks[symbol].realizedPnl += row.__resolvedPnlOriginal;
      stocks[symbol].realizedCostOriginal += row.__closedCostOriginal;
      stocks[symbol].totalSoldQty += row.__matchedLongSoldQty;
      stocks[symbol].totalSoldCostOriginal += row.__matchedLongSoldCostOriginal;
    });

    return stocks;
  }, [isAppLoaded, resolvedTradeRowsChronological]);

  // Phase 2: enrich each stock with live price / exchange-rate data.
  // Runs on every price refresh but only iterates the symbol list (small),
  // not the full trade-row list.
  const processedData = useMemo(() => {
    return Object.values(aggregatedStockBase)
      .map((stock) => {
        const apiData = liveData[stock.symbol];
        const manualData = manualStockData[stock.symbol];

        const isManualPrice = manualData?.price !== undefined;
        const isManualName = manualData?.name !== undefined && manualData?.name !== '';
        const normalizedApiQuote = normalizeQuoteCurrencyData(apiData?.currency, apiData?.price);
        const currentPrice = isManualPrice ? manualData.price : normalizedApiQuote.price || stock.defaultPrice;
        const currentName = isManualName ? manualData.name : apiData?.name || stock.name;
        const nameUpdateTimestamp = isManualName ? manualData?.timestamp || null : apiData?.timestamp || null;
        const priceUpdateTimestamp = isManualPrice ? manualData?.timestamp || null : apiData?.timestamp || null;
        const lastUpdateTimestamp = priceUpdateTimestamp || nameUpdateTimestamp;
        const currency = normalizedApiQuote.currency || stock.defaultCurrency;
        const exchangeRate = getExchangeRateValue(currency, baseCurrency, effectiveExchangeRates, isDemo);

        const hasCurrentPrice = hasMeaningfulValue(currentPrice);
        const currentValueOriginal = hasCurrentPrice ? stock.holdingQty * currentPrice : 0;
        const unrealizedPnlOriginal = hasCurrentPrice ? currentValueOriginal - stock.totalCost : 0;
        const unrealizedPnlPercent = stock.holdingCostOriginal > 0 && hasCurrentPrice
          ? (unrealizedPnlOriginal / stock.holdingCostOriginal) * 100
          : 0;
        const realizedPnlPercent = stock.realizedCostOriginal > 0
          ? (stock.realizedPnl / stock.realizedCostOriginal) * 100
          : 0;
        const ifSoldTodayPnlOriginal = hasCurrentPrice
          ? (stock.totalSoldQty * currentPrice) - stock.totalSoldCostOriginal
          : 0;
        const ifSoldTodayPnlPercent = stock.totalSoldCostOriginal > 0 && hasCurrentPrice
          ? (ifSoldTodayPnlOriginal / stock.totalSoldCostOriginal) * 100
          : 0;

        const currentValueBase = currentValueOriginal * exchangeRate;
        const totalCostBase = stock.totalCost * exchangeRate;
        const holdingCostBase = stock.holdingCostOriginal * exchangeRate;
        const unrealizedPnlBase = unrealizedPnlOriginal * exchangeRate;
        const realizedPnlBase = stock.realizedPnl * exchangeRate;
        const realizedCostBase = stock.realizedCostOriginal * exchangeRate;
        const ifSoldTodayPnlBase = ifSoldTodayPnlOriginal * exchangeRate;

        return {
          ...stock,
          name: currentName,
          currentPrice,
          isManualPrice,
          isManualName,
          nameUpdateTimestamp,
          priceUpdateTimestamp,
          lastUpdateTimestamp,
          currency,
          exchangeRate,
          currentValueOriginal,
          unrealizedPnlOriginal,
          unrealizedPnlPercent,
          realizedPnlOriginal: stock.realizedPnl,
          realizedCostOriginal: stock.realizedCostOriginal,
          realizedPnlPercent,
          ifSoldTodayPnlOriginal,
          ifSoldTodayPnlPercent,
          currentValueBase,
          totalCostBase,
          holdingCostBase,
          unrealizedPnlBase,
          realizedPnlBase,
          realizedCostBase,
          ifSoldTodayPnlBase
        };
      })
      .sort((a, b) => b.latestTradeTimestamp - a.latestTradeTimestamp);
  }, [
    aggregatedStockBase,
    baseCurrency,
    effectiveExchangeRates,
    isDemo,
    liveData,
    manualStockData
  ]);

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
    let direction = getDefaultHistorySortDirection(key);
    if (historySortConfig.key === key) {
      direction = historySortConfig.direction === 'desc' ? 'asc' : 'desc';
    }
    setHistorySortConfig({ key, direction });
  };

  const setHistorySort = (key) => {
    setHistorySortConfig({
      key,
      direction: getDefaultHistorySortDirection(key)
    });
  };

  const toggleHistorySortDirection = () => {
    setHistorySortConfig((currentConfig) => ({
      ...currentConfig,
      direction: currentConfig.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const displayData = useMemo(() => {
    let filtered = [...processedData];

    if (hideZeroHolding) {
      filtered = filtered.filter((stock) => hasMeaningfulValue(stock.holdingQty));
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
        } else if (historySortConfig.key === '日期') {
          valueA = a.latestTradeTimestamp;
          valueB = b.latestTradeTimestamp;
        } else {
          valueA = a.latestTradeTimestamp;
          valueB = b.latestTradeTimestamp;
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
      totalHoldingCost: accumulator.totalHoldingCost + currentStock.holdingCostBase,
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

  const trendDataBase = useMemo(() => {
    if (!isAppLoaded || resolvedTradeRowsChronological.length === 0) return [];

    const stockStates = {};
    const aggregatedByDate = [];
    let runningHoldingCostBase = 0;
    let runningRealizedPnlBase = 0;

    resolvedTradeRowsChronological.forEach((row) => {
      const symbol = row.__symbol;
      if (!symbol) return;

      const market = row.__market;
      const date = row['日期'];
      const dateObject = new Date(date);
      if (Number.isNaN(dateObject.getTime())) return;

      const currency = row.__currency || getCurrencyBySymbolOrMarket(symbol, market);
      const exchangeRate = getExchangeRateValue(currency, baseCurrency, effectiveExchangeRates, isDemo);

      if (!stockStates[symbol]) {
        stockStates[symbol] = { holdingCostOriginal: 0 };
      }

      const previousHoldingCostOriginal = stockStates[symbol].holdingCostOriginal;
      const nextHoldingCostOriginal = row.__holdingCostOriginalAfter;

      runningHoldingCostBase += (nextHoldingCostOriginal - previousHoldingCostOriginal) * exchangeRate;
      runningRealizedPnlBase += row.__resolvedPnlOriginal * exchangeRate;
      stockStates[symbol].holdingCostOriginal = nextHoldingCostOriginal;

      const lastEntry = aggregatedByDate[aggregatedByDate.length - 1];
      if (lastEntry && lastEntry.date === date) {
        lastEntry.costBase = runningHoldingCostBase;
        lastEntry.realizedPnlBase = runningRealizedPnlBase;
      } else {
        aggregatedByDate.push({
          date,
          timestamp: dateObject.getTime(),
          costBase: runningHoldingCostBase,
          realizedPnlBase: runningRealizedPnlBase
        });
      }
    });

    const now = Date.now();
    if (trendTimeRange === 'YTD') {
      const yearToDate = new Date(new Date().getFullYear(), 0, 1).getTime();
      return aggregatedByDate.filter((item) => item.timestamp >= yearToDate);
    }
    if (TREND_RANGE_MS_MAP[trendTimeRange]) {
      const cutoff = now - TREND_RANGE_MS_MAP[trendTimeRange];
      return aggregatedByDate.filter((item) => item.timestamp >= cutoff);
    }
    return aggregatedByDate;
  }, [
    baseCurrency,
    effectiveExchangeRates,
    isAppLoaded,
    isDemo,
    resolvedTradeRowsChronological,
    trendTimeRange
  ]);

  const trendData = useMemo(() => trendDataBase.map((item) => ({
    ...item,
    displayDate: formatLocalizedDate(item.date, activeLocale, { month: 'short', day: 'numeric' })
  })), [trendDataBase, activeLocale]);

  const availableMarkets = useMemo(
    () => Array.from(new Set(processedData.map((stock) => stock.market))).filter(Boolean),
    [processedData]
  );

  const holdingCount = useMemo(
    () => processedData.filter((stock) => hasMeaningfulValue(stock.holdingQty)).length,
    [processedData]
  );

  const trackedSymbols = useMemo(
    () => buildTrackedSymbolEntries(rawData).map((entry) => entry.symbol),
    [rawData]
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
    csvImportProfile,
    displayData,
    editingIndex,
    editingStockSymbol,
    expandedStock,
    fetchLivePrices,
    handleRefreshPrices,
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
    hasStaleMarketData,
    hideZeroHolding,
    historySortConfig,
    holdingCount,
    applyPreparedCsvImport,
    deletePendingImportSymbolRecords,
    isAppLoaded,
    isDemo,
    isLoadingPrices,
    lastImportMeta,
    lastUpdate,
    demoLastUpdate: DEMO_LAST_UPDATE,
    liveData,
    marketFilter,
    newRec,
    overallRealizedPercent,
    overallUnrealizedPercent,
    processedData,
    prepareCsvImport,
    pendingImportSymbolReview,
    rawData,
    resolvedTradeRows,
    requestSort,
    savePendingImportSymbolReview,
    skipPendingImportSymbolReview,
    setApiKey,
    setCsvImportProfile: handleSetCsvImportProfile,
    setExpandedStock,
    setHistorySort,
    setHideZeroHolding,
    setMarketFilter,
    setShowManager,
    setTempStockEdit,
    showManager,
    startEditingStock,
    summary,
    tempStockEdit,
    toggleHistorySortDirection,
    trackedSymbols,
    trendData,
    trendTimeRange,
    dismissPendingImportSymbolReview,
    updateNewRecAmount,
    updateNewRecField,
    updateNewRecPrice,
    updateNewRecQuantity,
    setTrendTimeRange,
    symbolOverrides,
    addSymbolOverride,
    deleteSymbolOverride
  };
}
