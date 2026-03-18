import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, CheckSquare, Database, Trash2, X } from 'lucide-react';
import { normalizeLocale } from '../locales/config';
import { formatLocalizedNumber } from '../utils/localization';
import { formatSymbol, getMarketLabel } from '../utils/helpers';

const buildDrafts = (entries) => Object.fromEntries(
  entries.map((entry) => [
    entry.symbol,
    {
      code: entry.rawCode || '',
      name: entry.suggestedName || '',
      price: entry.suggestedPrice || ''
    }
  ])
);

export default function ImportMissingDataDialog({
  existingSymbols = [],
  onClose,
  onDeleteSelected,
  onOpenManager,
  onSaveSelected,
  onSkipSelected,
  pendingReview
}) {
  const { t, i18n } = useTranslation();
  const activeLocale = normalizeLocale(i18n.resolvedLanguage || i18n.language);
  const entries = pendingReview?.entries || [];
  const [selectedSymbols, setSelectedSymbols] = useState(() => new Set(entries.map((entry) => entry.symbol)));
  const [drafts, setDrafts] = useState(() => buildDrafts(entries));
  const previousEntrySymbolsRef = useRef([]);

  useEffect(() => {
    const nextEntrySymbols = entries.map((entry) => entry.symbol);
    const previousEntrySymbols = previousEntrySymbolsRef.current;
    const hasOverlapWithPreviousEntries = nextEntrySymbols.some((symbol) => previousEntrySymbols.includes(symbol));

    setSelectedSymbols((currentSelection) => {
      if (nextEntrySymbols.length === 0) {
        return new Set();
      }

      if (!hasOverlapWithPreviousEntries) {
        return new Set(nextEntrySymbols);
      }

      return new Set(nextEntrySymbols.filter((symbol) => currentSelection.has(symbol)));
    });

    setDrafts((currentDrafts) => Object.fromEntries(
      entries.map((entry) => [
        entry.symbol,
        {
          code: currentDrafts[entry.symbol]?.code ?? entry.rawCode ?? '',
          name: currentDrafts[entry.symbol]?.name ?? entry.suggestedName ?? '',
          price: currentDrafts[entry.symbol]?.price ?? entry.suggestedPrice ?? ''
        }
      ])
    ));

    previousEntrySymbolsRef.current = nextEntrySymbols;
  }, [entries]);

  const currentReviewSymbols = useMemo(
    () => new Set(entries.map((entry) => entry.symbol)),
    [entries]
  );

  const stableExistingSymbols = useMemo(
    () => new Set(
      existingSymbols.filter((symbol) => symbol && !currentReviewSymbols.has(symbol))
    ),
    [currentReviewSymbols, existingSymbols]
  );

  const nextSymbolsByEntry = useMemo(
    () => new Map(entries.map((entry) => {
      const nextRawCode = String(drafts[entry.symbol]?.code ?? entry.rawCode ?? '').trim().toUpperCase();
      const nextSymbol = formatSymbol(nextRawCode, entry.market) || entry.symbol;
      return [entry.symbol, nextSymbol];
    })),
    [drafts, entries]
  );

  const nextSymbolCounts = useMemo(() => {
    const counts = new Map();
    nextSymbolsByEntry.forEach((symbol) => {
      counts.set(symbol, (counts.get(symbol) || 0) + 1);
    });
    return counts;
  }, [nextSymbolsByEntry]);

  const selectedEntries = entries
    .filter((entry) => selectedSymbols.has(entry.symbol))
    .map((entry) => ({
      ...entry,
      code: drafts[entry.symbol]?.code || entry.rawCode || '',
      name: drafts[entry.symbol]?.name || '',
      price: drafts[entry.symbol]?.price || ''
    }));

  if (!pendingReview || entries.length === 0) {
    return null;
  }

  const selectedCount = selectedSymbols.size;

  const toggleSymbol = (symbol) => {
    setSelectedSymbols((currentSelection) => {
      const nextSelection = new Set(currentSelection);
      if (nextSelection.has(symbol)) {
        nextSelection.delete(symbol);
      } else {
        nextSelection.add(symbol);
      }
      return nextSelection;
    });
  };

  const updateDraft = (symbol, field, value) => {
    setDrafts((currentDrafts) => ({
      ...currentDrafts,
      [symbol]: {
        ...currentDrafts[symbol],
        [field]: value
      }
    }));
  };

  const handleSaveSelected = () => {
    if (selectedEntries.length === 0) {
      return;
    }

    void onSaveSelected(selectedEntries);
  };

  const handleSkipSelected = () => {
    if (selectedEntries.length === 0) {
      return;
    }

    void onSkipSelected(selectedEntries.map((entry) => entry.symbol));
  };

  const handleDeleteSelected = () => {
    if (selectedEntries.length === 0) {
      return;
    }

    const confirmed = window.confirm(t('app.importMissingDataDeleteConfirm', {
      defaultValue: 'Delete the selected symbols and all of their imported rows?'
    }));

    if (!confirmed) {
      return;
    }

    onDeleteSelected(selectedEntries);
  };

  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm">
      <div className="max-h-[calc(100vh-2rem)] w-full max-w-5xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5 dark:border-slate-800">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-900/20 dark:text-amber-300">
              <AlertTriangle size={14} />
              {t('app.importMissingDataBadge', { defaultValue: 'Needs quote review' })}
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {t('app.importMissingDataTitle', { defaultValue: 'Some imported symbols still need prices' })}
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              {pendingReview.missingApiKey
                ? t('app.importMissingDataIntroNoApi', {
                  defaultValue: 'These imported symbols do not have cached quotes yet. Update the ticker, add a manual name and price now, skip them for later, or delete their rows. You can also open the trade manager to fix the records first.'
                })
                : t('app.importMissingDataIntro', {
                  defaultValue: 'Trade Lens already tried to fetch quotes for the newly imported symbols. The ones below still need help, so you can update the ticker, save a manual name and price, skip them for now, or delete their rows in one shot.'
                })}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            title={t('common.close')}
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5 px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/40">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 shadow-sm dark:bg-slate-900 dark:text-slate-400">
                {t('app.importMissingDataSelectedCount', {
                  defaultValue: '{{count}} selected',
                  count: formatLocalizedNumber(selectedCount, activeLocale)
                })}
              </span>
              {pendingReview.missingApiKey && (
                <span className="inline-flex items-center rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-rose-600 dark:bg-rose-900/20 dark:text-rose-300">
                  {t('messages.needApiKey')}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedSymbols(new Set(entries.map((entry) => entry.symbol)))}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <CheckSquare size={16} />
                {t('app.importMissingDataSelectAll', { defaultValue: 'Select all' })}
              </button>
              <button
                type="button"
                onClick={() => setSelectedSymbols(new Set())}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {t('app.importMissingDataClearSelection', { defaultValue: 'Clear selection' })}
              </button>
              <button
                type="button"
                onClick={onOpenManager}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Database size={16} />
                {t('header.settingsRecords')}
              </button>
            </div>
          </div>

          <div className="grid gap-3">
            {entries.map((entry) => {
              const isSelected = selectedSymbols.has(entry.symbol);
              const draft = drafts[entry.symbol] || { code: '', name: '', price: '' };
              const nextSymbol = nextSymbolsByEntry.get(entry.symbol) || entry.symbol;
              const willMergeWithExisting = stableExistingSymbols.has(nextSymbol);
              const willMergeWithinReview = (nextSymbolCounts.get(nextSymbol) || 0) > 1;
              const shouldShowMergeWarning = willMergeWithExisting || willMergeWithinReview;

              return (
                <div
                  key={entry.symbol}
                  className={`grid gap-4 rounded-2xl border p-4 transition-colors lg:grid-cols-[auto_minmax(0,1.1fr)_minmax(16rem,0.9fr)] ${
                    isSelected
                      ? 'border-blue-200 bg-blue-50/70 dark:border-blue-800 dark:bg-blue-900/10'
                      : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950/30'
                  }`}
                >
                  <div className="flex items-start pt-1">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSymbol(entry.symbol)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        {entry.rawCode}
                      </span>
                      <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 shadow-sm dark:bg-slate-900 dark:text-slate-400">
                        {getMarketLabel(entry.market, activeLocale, t)}
                      </span>
                      <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 shadow-sm dark:bg-slate-900 dark:text-slate-400">
                        {t('app.importMissingDataRowsLabel', {
                          defaultValue: '{{count}} rows',
                          count: formatLocalizedNumber(entry.recordCount, activeLocale)
                        })}
                      </span>
                    </div>
                    <div className="grid gap-2 text-xs text-slate-500 dark:text-slate-400 sm:grid-cols-3">
                      <div>
                        <div className="font-semibold uppercase tracking-[0.14em]">
                          {t('manager.fields.symbol')}
                        </div>
                        <div className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                          {entry.symbol}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold uppercase tracking-[0.14em]">
                          {t('manager.fields.market')}
                        </div>
                        <div className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                          {getMarketLabel(entry.market, activeLocale, t)}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold uppercase tracking-[0.14em]">
                          {t('app.importMissingDataRowsShort', { defaultValue: 'Rows' })}
                        </div>
                        <div className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                          {formatLocalizedNumber(entry.recordCount, activeLocale)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                        {t('manager.fields.symbol')}
                      </label>
                      <input
                        type="text"
                        value={draft.code}
                        onChange={(event) => updateDraft(entry.symbol, 'code', event.target.value.toUpperCase())}
                        placeholder={t('app.importMissingDataCodePlaceholder', { defaultValue: 'Updated ticker symbol' })}
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                        {t('table.manualNamePlaceholder', { defaultValue: 'Company name' })}
                      </label>
                      <input
                        type="text"
                        value={draft.name}
                        onChange={(event) => updateDraft(entry.symbol, 'name', event.target.value)}
                        placeholder={t('app.importMissingDataNamePlaceholder', { defaultValue: 'Optional display name' })}
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                        {t('manager.fields.price')}
                      </label>
                      <input
                        type="number"
                        inputMode="decimal"
                        step="any"
                        value={draft.price}
                        onChange={(event) => updateDraft(entry.symbol, 'price', event.target.value)}
                        placeholder={t('manager.placeholders.price')}
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                      />
                    </div>
                  </div>

                  {shouldShowMergeWarning && (
                    <div className="rounded-xl border border-amber-200 bg-amber-50/80 px-3 py-2 text-sm text-amber-800 dark:border-amber-800/80 dark:bg-amber-900/20 dark:text-amber-200">
                      {t('app.importMissingDataMergeWarning', {
                        defaultValue: 'Saving this ticker will combine these rows under {{symbol}} in holdings and P/L.',
                        symbol: nextSymbol
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">
            <button
              type="button"
              onClick={handleDeleteSelected}
              disabled={selectedCount === 0}
              className="inline-flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-rose-900/20 dark:text-rose-300 dark:hover:bg-rose-900/40"
            >
              <Trash2 size={16} />
              {t('app.importMissingDataDeleteSelected', { defaultValue: 'Delete selected rows' })}
            </button>
            <button
              type="button"
              onClick={handleSkipSelected}
              disabled={selectedCount === 0}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {t('app.importMissingDataSkipSelected', { defaultValue: 'Skip selected for now' })}
            </button>
            <button
              type="button"
              onClick={handleSaveSelected}
              disabled={selectedCount === 0}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CheckSquare size={16} />
              {t('app.importMissingDataSaveSelected', { defaultValue: 'Save selected' })}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {t('app.importMissingDataClose', { defaultValue: 'Close for now' })}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
