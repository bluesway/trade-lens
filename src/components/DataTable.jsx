import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Edit2,
  Save,
  X
} from 'lucide-react';
import {
  TRADE_TYPE_TRANSLATION_KEYS,
  normalizeLocale
} from '../locales/config';
import {
  formatGregorianReferenceDate,
  formatGregorianReferenceDateTime,
  formatLocalizedDateTime,
  formatLocalizedNumber,
  shouldShowGregorianReference
} from '../utils/localization';
import { formatDate, getMarketLabel } from '../utils/helpers';

export default function DataTable({
  availableMarkets,
  cancelEditingStock,
  displayData,
  editingStockSymbol,
  expandedStock,
  formatOriginalCurrency,
  formatPercent,
  handleSaveManualStock,
  historySortConfig,
  marketFilter,
  requestSort,
  setExpandedStock,
  setMarketFilter,
  setTempStockEdit,
  startEditingStock,
  tempStockEdit
}) {
  const { t, i18n } = useTranslation();
  const activeLocale = normalizeLocale(i18n.resolvedLanguage || i18n.language);
  const showGregorianReference = shouldShowGregorianReference(activeLocale);
  const tradeTypeFallbackLabels = {
    買入: 'Buy',
    賣出: 'Sell',
    拆股: 'Stock Split',
    反向拆股: 'Reverse Split'
  };

  const parseTradeNumericValue = (value) => {
    const sanitizedValue = String(value ?? '')
      .replace(/[^0-9.-]+/g, '')
      .trim();

    if (!sanitizedValue || /^-?\.?$/.test(sanitizedValue)) {
      return null;
    }

    const parsedValue = Number.parseFloat(sanitizedValue);
    return Number.isFinite(parsedValue) ? parsedValue : null;
  };

  const getTradeTypeLabel = (tradeType) => {
    const translationKey = TRADE_TYPE_TRANSLATION_KEYS[tradeType];
    if (!translationKey) {
      return tradeType;
    }

    return t(translationKey, {
      defaultValue: tradeTypeFallbackLabels[tradeType] || tradeType
    });
  };

  const getTradeTypeBadgeClass = (tradeType) => {
    switch (tradeType) {
      case '買入':
        return 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case '賣出':
        return 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400';
      case '拆股':
      case '反向拆股':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
      default:
        return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  const isSplitTradeType = (tradeType) => tradeType === '拆股' || tradeType === '反向拆股';

  const renderTradeDate = (value) => {
    const localizedDate = formatDate(value, activeLocale);
    if (!showGregorianReference) {
      return localizedDate;
    }

    return (
      <div className="leading-tight">
        <div>{localizedDate}</div>
        <div className="text-[10px] text-slate-400 dark:text-slate-500">{formatGregorianReferenceDate(value)}</div>
      </div>
    );
  };

  const renderTradeAmount = (value, currencyCode, options = {}) => {
    const numericValue = parseTradeNumericValue(value);
    return numericValue === null ? '-' : formatOriginalCurrency(numericValue, currencyCode, options);
  };

  const renderTradeQuantity = (value) => {
    const numericValue = parseTradeNumericValue(value);
    return numericValue === null
      ? '-'
      : formatLocalizedNumber(numericValue, activeLocale, { maximumFractionDigits: 4 });
  };

  const renderHistoryRowDescription = (historyRow, currencyCode) => {
    if (isSplitTradeType(historyRow['類型'])) {
      const quantityLabel = renderTradeQuantity(historyRow['數量']);
      if (quantityLabel === '-') {
        return historyRow['說明'] || getTradeTypeLabel(historyRow['類型']);
      }

      return t('table.splitQuantityChange', {
        defaultValue: '{{quantity}} shares adjusted',
        quantity: quantityLabel
      });
    }

    return t('table.quantityAtPrice', {
      quantity: renderTradeQuantity(historyRow['數量']),
      price: formatOriginalCurrency(historyRow['單價'], currencyCode)
    });
  };

  const formatStockUpdateValue = (timestamp) => (
    timestamp
      ? [
        formatLocalizedDateTime(timestamp, activeLocale),
        showGregorianReference ? `(${formatGregorianReferenceDateTime(timestamp)})` : ''
      ].filter(Boolean).join(' ')
      : t('table.notUpdatedYet')
  );

  const getStockUpdateSummary = (isManualOverride, timestamp) => t(
    isManualOverride ? 'table.manualUpdatedAt' : 'table.apiUpdatedAt',
    { value: formatStockUpdateValue(timestamp) }
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            {t('table.title')}
          </h3>
          <span className="text-xs font-normal text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded w-fit">
            {t('table.subtitle')}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {['全部', ...availableMarkets].map((market) => (
            <button
              key={market}
              onClick={() => setMarketFilter(market)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                marketFilter === market
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {getMarketLabel(market, activeLocale, t)}
            </button>
          ))}
        </div>
      </div>

      <div className="hidden md:block overflow-auto max-h-[calc(100vh-100px)] custom-scrollbar">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 z-30 shadow-sm">
            <tr>
              <th className="w-10 sticky top-0 bg-slate-50 dark:bg-slate-800 z-30" />
              <th
                className="min-w-[17rem] w-[17rem] px-6 py-4 font-semibold cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors sticky top-0 bg-slate-50 dark:bg-slate-800 z-30"
                onClick={() => requestSort('代號')}
              >
                <div className="flex items-center gap-1">
                  {t('table.columns.symbol')}
                  {historySortConfig?.key === '代號'
                    ? (historySortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)
                    : <ArrowUpDown size={14} className="opacity-50" />}
                </div>
              </th>
              <th
                className="px-6 py-4 font-semibold text-right cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors sticky top-0 bg-slate-50 dark:bg-slate-800 z-30"
                onClick={() => requestSort('持股數')}
              >
                <div className="flex items-center justify-end gap-1">
                  {t('table.columns.holdingQty')}
                  {historySortConfig?.key === '持股數'
                    ? (historySortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)
                    : <ArrowUpDown size={14} className="opacity-50" />}
                </div>
              </th>
              <th
                className="px-6 py-4 font-semibold text-right cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors sticky top-0 bg-slate-50 dark:bg-slate-800 z-30"
                onClick={() => requestSort('市值')}
              >
                <div className="flex items-center justify-end gap-1">
                  {t('table.columns.currentValue')}
                  {historySortConfig?.key === '市值'
                    ? (historySortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)
                    : <ArrowUpDown size={14} className="opacity-50" />}
                </div>
              </th>
              <th
                className="px-6 py-4 font-semibold text-right cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors sticky top-0 bg-slate-50 dark:bg-slate-800 z-30"
                onClick={() => requestSort('未實現')}
              >
                <div className="flex items-center justify-end gap-1">
                  {t('table.columns.unrealized')}
                  {historySortConfig?.key === '未實現'
                    ? (historySortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)
                    : <ArrowUpDown size={14} className="opacity-50" />}
                </div>
              </th>
              <th
                className="px-6 py-4 font-semibold text-right cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors sticky top-0 bg-slate-50 dark:bg-slate-800 z-30"
                onClick={() => requestSort('已實現')}
              >
                <div className="flex items-center justify-end gap-1">
                  {t('table.columns.realized')}
                  {historySortConfig?.key === '已實現'
                    ? (historySortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)
                    : <ArrowUpDown size={14} className="opacity-50" />}
                </div>
              </th>
              <th className="px-6 py-4 font-semibold text-right border-l border-slate-200 dark:border-slate-700 sticky top-0 bg-slate-50 dark:bg-slate-800 z-30">
                {t('table.columns.ifSoldToday')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {displayData.map((stock) => {
              const percentDiff = stock.realizedPnlPercent - stock.ifSoldTodayPnlPercent;
              const hasSold = stock.totalSoldQty > 0;
              const currencyCode = stock.currency;
              const isExpanded = expandedStock === stock.symbol;
              const hasOpenPosition = Math.abs(stock.holdingQty) > 0.0001;
              const hasCurrentValue = Math.abs(stock.currentValueOriginal) > 0.0001;

              return (
                <React.Fragment key={stock.symbol}>
                  <tr
                    className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${
                      isExpanded ? 'bg-slate-50 dark:bg-slate-900/50' : ''
                    }`}
                    onClick={() => setExpandedStock(isExpanded ? null : stock.symbol)}
                  >
                    <td className="pl-4 text-slate-400">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </td>
                    <td className="w-[17rem] min-w-[17rem] max-w-[17rem] px-6 py-4 align-top">
                      <div
                        className="min-w-0 font-bold text-slate-800 dark:text-slate-200"
                        onClick={(event) => event.stopPropagation()}
                      >
                        {editingStockSymbol === stock.symbol ? (
                          <div className="max-w-full space-y-2">
                            <input
                              type="text"
                              value={tempStockEdit.code}
                              onChange={(event) => setTempStockEdit({ ...tempStockEdit, code: event.target.value.toUpperCase() })}
                              className="w-full rounded border border-slate-300 bg-white px-2 py-1 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
                              placeholder={t('manager.fields.symbol')}
                            />
                            <div className="flex items-start gap-2">
                              <input
                                type="text"
                                value={tempStockEdit.name}
                                onChange={(event) => setTempStockEdit({ ...tempStockEdit, name: event.target.value })}
                                className="min-w-0 flex-1 rounded border border-slate-300 bg-white px-2 py-1 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
                                placeholder={t('table.manualNamePlaceholder')}
                              />
                              <div className="flex shrink-0 gap-1">
                                <button onClick={() => handleSaveManualStock(stock.symbol)} className="rounded bg-blue-600 p-1 text-white hover:bg-blue-700" title={t('common.save')}>
                                  <Save size={14} />
                                </button>
                                <button
                                  onClick={cancelEditingStock}
                                  className="rounded bg-slate-200 p-1 text-slate-600 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                                  title={t('common.cancel')}
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            </div>
                            <div className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
                              {getMarketLabel(stock.market, activeLocale, t)} &middot; {stock.currency}
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex min-w-0 items-center gap-2">
                              <span className="truncate" title={stock.symbol}>{stock.symbol}</span>
                              <span className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                {getMarketLabel(stock.market, activeLocale, t)} &middot; {stock.currency}
                              </span>
                              {stock.isManualName && (
                                <span className="shrink-0 rounded bg-amber-100 px-1 py-0.5 text-[10px] text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                                  {t('table.manualBadge')}
                                </span>
                              )}
                              <button
                                onClick={(event) => {
                                  event.stopPropagation();
                                  startEditingStock(stock);
                                }}
                                className="ml-auto shrink-0 text-slate-300 hover:text-blue-500"
                                title={t('common.edit')}
                              >
                                <Edit2 size={12} />
                              </button>
                            </div>
                            <div className="group/name relative mt-1 max-w-full cursor-help" title={stock.name}>
                              <div className="line-clamp-2 break-words text-xs leading-5 text-slate-500 dark:text-slate-400">
                                {stock.name}
                              </div>
                              <div className="absolute left-0 bottom-full z-50 mb-2 hidden w-72 max-w-[calc(100vw-8rem)] rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-left text-[11px] text-white shadow-lg group-hover/name:block dark:bg-slate-700">
                                <div className="break-words font-semibold text-slate-100">{stock.name}</div>
                                <div className="mt-1 text-[10px] leading-4 text-slate-200">
                                  {getStockUpdateSummary(stock.isManualName, stock.nameUpdateTimestamp)}
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      {formatLocalizedNumber(stock.holdingQty, activeLocale, { maximumFractionDigits: 4 })}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="font-medium text-slate-800 dark:text-slate-200">
                        {hasCurrentValue ? formatOriginalCurrency(stock.currentValueOriginal, currencyCode, { signed: stock.currentValueOriginal < 0 }) : '-'}
                      </div>
                      <div
                        className="group/price relative mt-1 flex items-center justify-end gap-1 text-xs text-slate-400 dark:text-slate-500"
                        onClick={(event) => event.stopPropagation()}
                      >
                        {editingStockSymbol === stock.symbol ? (
                          <input
                            type="number"
                            value={tempStockEdit.price}
                            onChange={(event) => setTempStockEdit({ ...tempStockEdit, price: event.target.value })}
                            className="w-24 rounded border border-slate-300 bg-white px-1 py-1 text-right text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
                            placeholder={t('table.currentPricePlaceholder')}
                          />
                        ) : (
                          <>
                            {stock.isManualPrice && (
                              <span className="mr-1 rounded bg-amber-100 px-1 text-[10px] text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                                {t('table.manualBadge')}
                              </span>
                            )}
                            <span>{stock.currentPrice > 0 ? t('table.atPrice', { price: formatOriginalCurrency(stock.currentPrice, currencyCode) }) : '-'}</span>
                            <div className="absolute right-0 bottom-full z-50 mb-1 hidden rounded border border-white/10 bg-slate-800 px-2 py-1 text-[10px] text-white shadow-lg group-hover/price:block dark:bg-slate-700">
                              {getStockUpdateSummary(stock.isManualPrice, stock.priceUpdateTimestamp)}
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      {hasOpenPosition ? (
                        <div className={`flex flex-col items-end ${
                          stock.unrealizedPnlOriginal > 0
                            ? 'text-blue-600 dark:text-blue-400'
                            : stock.unrealizedPnlOriginal < 0
                              ? 'text-rose-600 dark:text-rose-400'
                              : 'text-slate-500 dark:text-slate-400'
                        }`}
                        >
                          <span className="font-bold">
                            {formatOriginalCurrency(stock.unrealizedPnlOriginal, currencyCode, { signed: true })}
                          </span>
                          <span className="mt-1 rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-slate-800">
                            {formatPercent(stock.unrealizedPnlPercent)}
                          </span>
                        </div>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      {(stock.realizedPnlOriginal !== 0 || stock.tradeCount > 0) ? (
                        <div className={`flex flex-col items-end ${
                          stock.realizedPnlOriginal > 0
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : stock.realizedPnlOriginal < 0
                              ? 'text-rose-600 dark:text-rose-400'
                              : 'text-slate-500 dark:text-slate-400'
                        }`}
                        >
                          <span className="font-bold">
                            {stock.realizedPnlOriginal !== 0 ? formatOriginalCurrency(stock.realizedPnlOriginal, currencyCode, { signed: true }) : '-'}
                          </span>
                          {stock.realizedPnlPercent !== 0 && (
                            <span className="mt-1 rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-slate-800">
                              {formatPercent(stock.realizedPnlPercent)}
                            </span>
                          )}
                        </div>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 text-right border-l border-slate-200 dark:border-slate-700 whitespace-nowrap">
                      {hasSold ? (
                        <div className={`flex flex-col items-end ${
                          stock.ifSoldTodayPnlOriginal > 0
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : stock.ifSoldTodayPnlOriginal < 0
                              ? 'text-rose-600 dark:text-rose-400'
                              : 'text-slate-500 dark:text-slate-400'
                        }`}
                        >
                          <span className="font-bold opacity-75">
                            {formatOriginalCurrency(stock.ifSoldTodayPnlOriginal, currencyCode, { signed: true })}
                          </span>
                          <div className="mt-1 flex items-center gap-1">
                            {percentDiff > 7 ? (
                              <span className="whitespace-nowrap rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                                {t('table.hedgeSuccess', { value: formatPercent(percentDiff) })}
                              </span>
                            ) : percentDiff < -7 ? (
                              <span className="whitespace-nowrap rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-medium text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
                                {t('table.soldTooEarly', { value: formatPercent(percentDiff) })}
                              </span>
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
                            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              <tr>
                                <th className="px-4 py-2 font-semibold">{t('table.columns.date')}</th>
                                <th className="px-4 py-2 font-semibold">{t('table.columns.type')}</th>
                                <th className="px-4 py-2 font-semibold text-right">{t('table.columns.quantity')}</th>
                                <th className="px-4 py-2 font-semibold text-right">{t('table.columns.price')}</th>
                                <th className="px-4 py-2 font-semibold text-right">{t('table.columns.amount')}</th>
                                <th className="px-4 py-2 font-semibold text-right">{t('table.columns.pnl')}</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                              {stock.history.map((historyRow, index) => (
                                <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                                  <td className="px-4 py-2 text-slate-600 dark:text-slate-400">{renderTradeDate(historyRow['日期'])}</td>
                                  <td className="px-4 py-2">
                                    <span
                                      className={`px-1.5 py-0.5 rounded font-medium ${getTradeTypeBadgeClass(historyRow['類型'])}`}
                                    >
                                      {getTradeTypeLabel(historyRow['類型'])}
                                    </span>
                                  </td>
                                  <td className="px-4 py-2 text-right text-slate-700 dark:text-slate-300">
                                    {renderTradeQuantity(historyRow['數量'])}
                                  </td>
                                  <td className="px-4 py-2 text-right text-slate-700 dark:text-slate-300">
                                    {renderTradeAmount(historyRow['單價'], currencyCode)}
                                  </td>
                                  <td className="px-4 py-2 text-right font-medium text-slate-800 dark:text-slate-200">
                                    {renderTradeAmount(historyRow['總金額'], currencyCode)}
                                  </td>
                                  <td className="px-4 py-2 text-right text-slate-500 dark:text-slate-400">
                                    {renderTradeAmount(historyRow['損益'], currencyCode, { signed: true })}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="md:hidden flex flex-col bg-slate-50 dark:bg-slate-900/50 p-3 gap-3">
        {displayData.map((stock) => {
          const currencyCode = stock.currency;
          const isExpanded = expandedStock === stock.symbol;
          const hasOpenPosition = Math.abs(stock.holdingQty) > 0.0001;
          const hasCurrentValue = Math.abs(stock.currentValueOriginal) > 0.0001;

          return (
            <div key={stock.symbol} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden">
              <div
                className="p-4 flex flex-col gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                onClick={() => setExpandedStock(isExpanded ? null : stock.symbol)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-slate-800 dark:text-slate-200 text-lg flex items-center gap-2">
                      {stock.symbol}
                      <span className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded">
                        {getMarketLabel(stock.market, activeLocale, t)} &middot; {stock.currency}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{stock.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-800 dark:text-slate-200 text-lg">
                      {hasCurrentValue ? formatOriginalCurrency(stock.currentValueOriginal, currencyCode, { signed: stock.currentValueOriginal < 0 }) : '-'}
                    </div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      {stock.currentPrice > 0 ? t('table.atPrice', { price: formatOriginalCurrency(stock.currentPrice, currencyCode) }) : '-'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-sm pt-3 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">{t('table.mobileHoldingQty')}</span>
                    <span className="font-medium text-slate-700 dark:text-slate-200 mt-0.5">{formatLocalizedNumber(stock.holdingQty, activeLocale, { maximumFractionDigits: 4 })}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">{t('table.mobileUnrealized')}</span>
                    {hasOpenPosition ? (
                      <div className={`flex flex-col items-end mt-0.5 ${
                        stock.unrealizedPnlOriginal > 0
                          ? 'text-blue-600 dark:text-blue-400'
                          : stock.unrealizedPnlOriginal < 0
                            ? 'text-rose-600 dark:text-rose-400'
                            : 'text-slate-500 dark:text-slate-400'
                      }`}
                      >
                        <span className="font-bold text-xs">
                          {formatOriginalCurrency(stock.unrealizedPnlOriginal, currencyCode, { signed: true })}
                        </span>
                        <span className="text-[10px] leading-none mt-1">{formatPercent(stock.unrealizedPnlPercent)}</span>
                      </div>
                    ) : <span className="mt-0.5 text-slate-400 dark:text-slate-500">-</span>}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">{t('table.mobileRealized')}</span>
                    {(stock.realizedPnlOriginal !== 0 || stock.tradeCount > 0) ? (
                      <div className={`flex flex-col items-end mt-0.5 ${
                        stock.realizedPnlOriginal > 0
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : stock.realizedPnlOriginal < 0
                            ? 'text-rose-600 dark:text-rose-400'
                            : 'text-slate-500 dark:text-slate-400'
                      }`}
                      >
                        <span className="font-bold text-xs">
                          {stock.realizedPnlOriginal !== 0 ? formatOriginalCurrency(stock.realizedPnlOriginal, currencyCode, { signed: true }) : '-'}
                        </span>
                        {stock.realizedPnlPercent !== 0 && (
                          <span className="text-[10px] leading-none mt-1">{formatPercent(stock.realizedPnlPercent)}</span>
                        )}
                      </div>
                    ) : <span className="mt-0.5 text-slate-400 dark:text-slate-500">-</span>}
                  </div>
                </div>

                <div className="flex justify-center mt-1 text-slate-300 dark:text-slate-600">
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {isExpanded && (
                <div className="bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-700 p-3">
                  <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                    {t('table.tradeDetails')}
                  </div>
                  <div className="flex flex-col gap-2">
                    {stock.history.map((historyRow, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs flex justify-between items-center shadow-sm"
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-1.5 py-0.5 text-[10px] rounded font-medium ${getTradeTypeBadgeClass(historyRow['類型'])}`}
                            >
                              {getTradeTypeLabel(historyRow['類型'])}
                            </span>
                            <div className="text-slate-500 dark:text-slate-400">{renderTradeDate(historyRow['日期'])}</div>
                          </div>
                          <div className="text-slate-600 dark:text-slate-400">
                            {renderHistoryRowDescription(historyRow, currencyCode)}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="font-bold text-slate-700 dark:text-slate-200">{renderTradeAmount(historyRow['總金額'], currencyCode)}</span>
                          {parseTradeNumericValue(historyRow['損益']) !== null && (
                            <span
                              className={`font-medium ${
                                parseTradeNumericValue(historyRow['損益']) > 0
                                  ? 'text-emerald-500'
                                  : parseTradeNumericValue(historyRow['損益']) < 0
                                    ? 'text-rose-500'
                                    : 'text-slate-500 dark:text-slate-400'
                              }`}
                            >
                              {renderTradeAmount(historyRow['損益'], currencyCode, { signed: true })}
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
  );
}
