import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Database, DollarSign, Download, Edit2, Info, Key, Plus, Trash2, X } from 'lucide-react';
import {
  BASE_CURRENCY_OPTIONS,
  TRADE_TYPE_TRANSLATION_KEYS,
  normalizeLocale
} from '../locales/config';
import {
  formatGregorianReferenceDate,
  getLocalizedCurrencyName,
  formatLocalizedCurrency,
  formatLocalizedNumber,
  shouldShowGregorianReference
} from '../utils/localization';
import {
  formatDate,
  formatSymbol,
  getMarketLabel,
  getMarketSymbolPlaceholder,
  getCurrencyBySymbolOrMarket,
  guessMarket,
  MANUAL_MARKET_OPTIONS,
  normalizeMarket
} from '../utils/helpers';
import { STOCK_MAPPING } from '../utils/constants';

export default function ManagerPanel({
  apiKey,
  baseCurrency,
  cancelEditingRecord,
  editingIndex,
  handleAddRecord,
  handleClearData,
  handleDeleteRecord,
  handleEditRecord,
  handleExportCSV,
  handleSaveApiKey,
  handleSaveBaseCurrency,
  hideZeroHolding,
  liveData,
  newRec,
  onClose,
  rawData,
  setApiKey,
  setHideZeroHolding,
  updateNewRecAmount,
  updateNewRecField,
  updateNewRecPrice,
  updateNewRecQuantity
}) {
  const { t, i18n } = useTranslation();
  const formRef = useRef(null);
  const activeLocale = normalizeLocale(i18n.resolvedLanguage || i18n.language);
  const showGregorianReference = shouldShowGregorianReference(activeLocale);
  const tradeTypeOptions = ['買入', '賣出', '拆股', '反向拆股'];
  const marketOptions = MANUAL_MARKET_OPTIONS;
  const symbolPlaceholder = getMarketSymbolPlaceholder(newRec.market) || t('manager.placeholders.symbol');
  const tradeTypeFallbackLabels = {
    買入: 'Buy',
    賣出: 'Sell',
    拆股: 'Stock Split',
    反向拆股: 'Reverse Split'
  };

  const getCurrencyOptionLabel = (currency) => {
    const translationKey = `currencies.${currency}`;
    if (i18n.exists(translationKey)) {
      return t(translationKey);
    }

    const localizedName = getLocalizedCurrencyName(currency, activeLocale);
    return localizedName === currency ? currency : `${localizedName} (${currency})`;
  };

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

  const parseNumericValue = (value) => {
    const numericValue = Number(String(value || '').replace(/[^0-9.-]+/g, ''));
    return Number.isFinite(numericValue) ? numericValue : null;
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

  useEffect(() => {
    if (editingIndex !== null) {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [editingIndex]);

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800/10 dark:border-slate-800">
      <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <Database className="text-blue-600" />
          {t('manager.title')}
        </h2>
        <div className="flex flex-wrap justify-end gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <Download size={16} />
            {t('common.exportCsv', { defaultValue: 'Export CSV' })}
          </button>
          <button
            onClick={handleClearData}
            className="px-3 py-1.5 text-sm bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40 rounded-md font-medium transition-colors"
          >
            {t('manager.clearAndLoadDemo')}
          </button>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" title={t('common.close')}>
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 p-5 rounded-xl">
          <div className="flex justify-between items-start mb-3">
            <label className="flex items-center gap-2 text-sm font-bold text-blue-900 dark:text-blue-100">
              <Key size={16} />
              {t('manager.apiKeyTitle')}
            </label>
            <a
              href="https://financeapi.net/dashboard"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold flex items-center gap-1 bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-300 hover:bg-blue-600 hover:text-white transition-colors px-2.5 py-1 rounded-md"
            >
              <Info size={14} />
              {t('manager.getFreeApiKey')}
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="password"
              placeholder={t('manager.apiKeyPlaceholder')}
              value={apiKey}
              onChange={(event) => setApiKey(event.target.value)}
              className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-mono bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <button
              onClick={handleSaveApiKey}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm whitespace-nowrap"
            >
              {t('manager.saveApiKey')}
            </button>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
            <DollarSign size={16} />
            {t('manager.baseCurrencyTitle')}
          </label>
          <div className="flex gap-3">
            <select
              value={baseCurrency}
              onChange={(event) => handleSaveBaseCurrency(event.target.value)}
              className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {BASE_CURRENCY_OPTIONS.map((currency) => (
                <option key={currency} value={currency}>
                  {getCurrencyOptionLabel(currency)}
                </option>
              ))}
            </select>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            {t('manager.baseCurrencyHelp')}
          </p>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-xl mb-6 flex items-center justify-between">
        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{t('manager.hideZeroHolding')}</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={hideZeroHolding}
            onChange={() => setHideZeroHolding(!hideZeroHolding)}
          />
          <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
        </label>
      </div>

      <div ref={formRef} className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-xl mb-6">
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
          <Plus size={16} /> {t('manager.manualRecordTitle')}
        </h4>
        <div className="flex flex-wrap gap-4 items-end">
          <div className="w-[130px]">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{t('manager.fields.date')}</label>
            <input
              type="date"
              value={newRec.date}
              onChange={(event) => updateNewRecField('date', event.target.value)}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-[150px]">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{t('manager.fields.type')}</label>
            <select
              value={newRec.type}
              onChange={(event) => updateNewRecField('type', event.target.value)}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              {tradeTypeOptions.map((tradeType) => (
                <option key={tradeType} value={tradeType}>
                  {getTradeTypeLabel(tradeType)}
                </option>
              ))}
            </select>
          </div>
          <div className="w-[100px]">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{t('manager.fields.market')}</label>
            <select
              value={newRec.market}
              onChange={(event) => updateNewRecField('market', event.target.value)}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-blue-700 dark:text-blue-300"
            >
              {marketOptions.map((market) => (
                <option key={market} value={market}>
                  {getMarketLabel(market, activeLocale, t)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-[100px]">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{t('manager.fields.symbol')}</label>
            <input
              type="text"
              placeholder={symbolPlaceholder}
              value={newRec.code}
              onChange={(event) => updateNewRecField('code', event.target.value)}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1 min-w-[100px]">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{t('manager.fields.quantity')}</label>
            <input
              type="number"
              placeholder={t('manager.placeholders.quantity')}
              value={newRec.qty}
              onChange={(event) => updateNewRecQuantity(event.target.value)}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1 min-w-[100px]">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{t('manager.fields.price')}</label>
            <input
              type="number"
              placeholder={t('manager.placeholders.price')}
              value={newRec.price}
              onChange={(event) => updateNewRecPrice(event.target.value)}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1 min-w-[120px]">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{t('manager.fields.amount')}</label>
            <input
              type="number"
              placeholder={t('manager.placeholders.amount')}
              value={newRec.amount}
              onChange={(event) => updateNewRecAmount(event.target.value)}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1 min-w-[120px]">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{t('manager.fields.pnl')}</label>
            <input
              type="number"
              placeholder={t('manager.placeholders.pnl')}
              value={newRec.pnl}
              onChange={(event) => updateNewRecField('pnl', event.target.value)}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            {editingIndex !== null && (
              <button
                onClick={cancelEditingRecord}
                className="flex items-center justify-center bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors h-[38px] w-[80px]"
              >
                {t('common.cancel')}
              </button>
            )}
            <button
              onClick={handleAddRecord}
              disabled={!newRec.date || !newRec.code || !newRec.qty || !newRec.amount}
              className="flex items-center justify-center bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed h-[38px] min-w-[80px]"
            >
              {editingIndex !== null ? t('manager.saveChanges') : t('manager.addRecord')}
            </button>
          </div>
        </div>
      </div>

      <div className="max-h-[350px] overflow-y-auto border border-slate-100 dark:border-slate-800 rounded-xl">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 sticky top-0 shadow-sm z-10">
            <tr>
              <th className="px-4 py-3 font-semibold">{t('table.columns.date')}</th>
              <th className="px-4 py-3 font-semibold">{t('table.columns.type')}</th>
              <th className="px-4 py-3 font-semibold">{t('table.columns.symbol')}</th>
              <th className="px-4 py-3 font-semibold text-right">{t('table.columns.quantity')}</th>
              <th className="px-4 py-3 font-semibold text-right">{t('table.columns.price')}</th>
              <th className="px-4 py-3 font-semibold text-right">{t('table.columns.amount')}</th>
              <th className="px-4 py-3 font-semibold text-right">{t('table.columns.pnl')}</th>
              <th className="px-4 py-3 font-semibold text-center w-16">{t('table.columns.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {rawData
              .map((row, originalIndex) => ({ ...row, originalIndex }))
              .sort((a, b) => new Date(b['日期'] || 0) - new Date(a['日期'] || 0))
              .map((row) => {
                let market = normalizeMarket(row['市場']);
                if (market === '未知' || !market) {
                  market = guessMarket(row['代號']);
                }

                const symbol = formatSymbol(row['代號'], market);
                const currency = getCurrencyBySymbolOrMarket(symbol, market);
                const resolvedName = liveData[symbol]?.name || STOCK_MAPPING[symbol]?.name || t('data.unknown');
                const quantityValue = parseNumericValue(row['數量']);
                const priceValue = parseNumericValue(row['單價']);
                const amountValue = parseNumericValue(row['總金額']);
                const pnlValue = parseNumericValue(row['損益']);

                return (
                  <tr key={row.originalIndex} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-2 text-slate-600 dark:text-slate-400">{renderTradeDate(row['日期'])}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${getTradeTypeBadgeClass(row['類型'])}`}
                      >
                        {getTradeTypeLabel(row['類型'])}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        {symbol}
                        <span className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded">
                          {getMarketLabel(market, activeLocale, t)}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{resolvedName}</div>
                    </td>
                    <td className="px-4 py-2 text-right text-slate-700 dark:text-slate-300">
                      {quantityValue === null ? '-' : formatLocalizedNumber(quantityValue, activeLocale, { maximumFractionDigits: 4 })}
                    </td>
                    <td className="px-4 py-2 text-right text-slate-500 dark:text-slate-400">
                      {priceValue === null ? '-' : formatLocalizedCurrency(priceValue, currency, activeLocale)}
                    </td>
                    <td className="px-4 py-2 text-right font-medium text-slate-800 dark:text-slate-200">
                      {amountValue === null ? '-' : formatLocalizedCurrency(amountValue, currency, activeLocale)}
                    </td>
                    <td className="px-4 py-2 text-right text-slate-500 dark:text-slate-400">
                      {pnlValue === null ? '-' : formatLocalizedCurrency(pnlValue, currency, activeLocale, { signed: true })}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEditRecord(row.originalIndex)}
                          className="text-slate-400 hover:text-blue-500 transition-colors p-1"
                          title={t('common.edit')}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteRecord(row.originalIndex)}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                          title={t('common.delete')}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            {rawData.length === 0 && (
              <tr>
                <td colSpan="8" className="px-4 py-8 text-center text-slate-400 dark:text-slate-500">
                  {t('manager.noRecords')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
