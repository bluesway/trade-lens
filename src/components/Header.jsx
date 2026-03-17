import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Activity,
  Clock,
  Database,
  Download,
  Info,
  Languages,
  Moon,
  RefreshCw,
  Sun,
  Upload
} from 'lucide-react';
import {
  SUPPORTED_LOCALES,
  normalizeLocale,
  syncLocaleToUrl
} from '../locales/config';
import {
  formatGregorianReferenceDateTime,
  formatLocalizedDateTime,
  formatLocalizedNumber,
  shouldShowGregorianReference
} from '../utils/localization';
import { CSV_IMPORT_PROFILE_OPTIONS } from '../utils/helpers';

export default function Header({
  apiKey,
  csvImportProfile,
  darkMode,
  fetchLivePrices,
  handleExportCSV,
  handleFileUpload,
  isDemo,
  isLoadingPrices,
  lastImportMeta,
  lastUpdate,
  rawDataCount,
  setCsvImportProfile,
  setShowManager,
  showManager,
  toggleDarkMode
}) {
  const { t, i18n } = useTranslation();
  const activeLocale = normalizeLocale(i18n.resolvedLanguage || i18n.language);
  const showGregorianReference = shouldShowGregorianReference(activeLocale);
  const csvRowKeys = ['date', 'type', 'symbol', 'market', 'quantity', 'price', 'amount', 'pnl'];

  const handleLocaleChange = (event) => {
    const nextLocale = event.target.value;
    syncLocaleToUrl(nextLocale);
    void i18n.changeLanguage(nextLocale);
  };

  const getLocalizedProfileLabel = (option) => (
    t(option.translationKey, { defaultValue: option.label })
  );

  const getLocalizedImportDelimiterLabel = (delimiterLabel) => (
    delimiterLabel === 'tab'
      ? t('header.csvDelimiters.tab', { defaultValue: 'tab' })
      : delimiterLabel
  );
  const getLocalizedImportMetaProfileLabel = (importMeta) => (
    importMeta?.profileLabelKey
      ? t(importMeta.profileLabelKey, { defaultValue: importMeta.profileLabel })
      : importMeta?.profileLabel
  );

  const importProfileLabel = t('header.importProfileLabel', { defaultValue: 'CSV parser' });

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Activity className="text-blue-600" />
          {t('header.title')}
        </h1>
        <div className="flex flex-col gap-2 md:flex-row md:items-center mt-2">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {isDemo ? t('header.demoDescription') : t('header.recordsLoaded', { count: formatLocalizedNumber(rawDataCount, activeLocale) })}
          </p>
          {lastUpdate && (
            <span
              className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-full flex items-center gap-1.5 w-fit font-medium border border-blue-100 dark:border-blue-800"
              title={showGregorianReference ? formatGregorianReferenceDateTime(lastUpdate) : undefined}
            >
              <Clock size={14} />
              {t('header.lastUpdated', { value: formatLocalizedDateTime(lastUpdate, activeLocale) })}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label
          className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 shadow-sm"
          title="Language"
        >
          <Languages size={16} className="text-blue-600 dark:text-blue-300" />
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
            Language
          </span>
          <select
            value={activeLocale}
            onChange={handleLocaleChange}
            className="bg-transparent text-sm font-medium text-slate-700 dark:text-slate-200 outline-none"
            title="Language"
          >
            {SUPPORTED_LOCALES.map((locale) => (
              <option key={locale.code} value={locale.code}>
                {locale.nativeLabel}
              </option>
            ))}
          </select>
        </label>

        <button
          onClick={toggleDarkMode}
          className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
          title={darkMode ? t('header.switchToLight') : t('header.switchToDark')}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          onClick={() => setShowManager(!showManager)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm ${
            showManager
              ? 'bg-slate-800 text-white'
              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
        >
          <Database size={18} />
          <span className="hidden md:inline">{t('header.settingsRecords')}</span>
        </button>

        <button
          onClick={() => fetchLivePrices(false)}
          disabled={isLoadingPrices || rawDataCount === 0}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 ${
            apiKey
              ? 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40'
          }`}
          title={apiKey ? t('header.updateWithCache') : t('header.setApiKeyFirst')}
        >
          <RefreshCw size={18} className={isLoadingPrices ? 'animate-spin' : ''} />
          <span className="hidden md:inline">{apiKey ? t('header.updatePrices') : t('header.apiKeyRequired')}</span>
        </button>

        <button
          onClick={() => {
            if (window.confirm(t('header.forceRefreshConfirm'))) {
              fetchLivePrices(true);
            }
          }}
          disabled={isLoadingPrices || rawDataCount === 0}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 ${
            apiKey
              ? 'bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-400'
              : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40'
          }`}
          title={apiKey ? t('header.forceRefreshTitle') : t('header.setApiKeyFirst')}
        >
          <Activity size={18} className={isLoadingPrices ? 'animate-pulse' : ''} />
          <span className="hidden md:inline">{t('header.forceRefresh')}</span>
        </button>

        <div className="relative flex items-center gap-2">
          <label
            className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 shadow-sm"
            title={importProfileLabel}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              {importProfileLabel}
            </span>
            <select
              value={csvImportProfile}
              onChange={(event) => setCsvImportProfile(event.target.value)}
              className="bg-transparent text-sm font-medium text-slate-700 dark:text-slate-200 outline-none max-w-44"
              title={importProfileLabel}
            >
              {CSV_IMPORT_PROFILE_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {getLocalizedProfileLabel(option)}
                </option>
              ))}
            </select>
          </label>

          <div className="relative group">
            <div className="pointer-events-none absolute right-0 top-14 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl shadow-xl z-50 text-sm text-slate-600 dark:text-slate-300 opacity-0 invisible translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0">
              <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-2 border-b border-slate-200 dark:border-slate-700 pb-1 flex items-center gap-2">
                <Info size={14} className="text-blue-500" />
                {t('header.csvTitle')}
              </h4>
              <p className="mb-2 text-xs">{t('header.csvIntro')}</p>
              <ul className="list-disc pl-5 space-y-1 text-xs font-mono bg-slate-50 dark:bg-slate-900/70 p-2 rounded">
                {csvRowKeys.map((rowKey) => (
                  <li key={rowKey}>{t(`header.csvRows.${rowKey}`)}</li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-blue-600 dark:text-blue-400 font-medium">
                {t('header.csvNote1')}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                {t('header.csvNote2')}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                {t('header.csvNote3', {
                  defaultValue: '* Note 3: The app auto-detects common broker CSV layouts plus semicolon and tab-delimited files. After import, the detected layout shows up on the top right.'
                })}
              </p>
            </div>

            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm whitespace-nowrap relative">
              <Upload size={18} />
              {t('common.importCsv', { defaultValue: 'Import CSV' })}
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm whitespace-nowrap"
          >
            <Download size={18} />
            {t('common.exportCsv', { defaultValue: 'Export CSV' })}
          </button>

          {lastImportMeta && (
            <div
              className="hidden lg:flex items-center gap-2 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 text-xs font-medium text-emerald-700 dark:text-emerald-300"
              title={`${getLocalizedImportMetaProfileLabel(lastImportMeta)} · ${getLocalizedImportDelimiterLabel(lastImportMeta.delimiterLabel)}`}
            >
              <span>{getLocalizedImportMetaProfileLabel(lastImportMeta)}</span>
              <span className="text-emerald-400 dark:text-emerald-500">•</span>
              <span>{getLocalizedImportDelimiterLabel(lastImportMeta.delimiterLabel)}</span>
              <span className="text-emerald-400 dark:text-emerald-500">•</span>
              <span>{formatLocalizedNumber(lastImportMeta.importedRowCount, activeLocale)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
