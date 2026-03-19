import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Activity,
  Clock,
  ChevronDown,
  Database,
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
import {
  CSV_IMPORT_PROFILE_OPTIONS,
  CSV_IMPORT_PROFILE_OPTION_GROUPS
} from '../utils/helpers';

export default function Header({
  apiKey,
  csvImportProfile,
  darkMode,
  demoLastUpdate,
  handleFileUpload,
  handleRefreshPrices,
  hasStaleMarketData,
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
  const [isImportSummaryOpen, setIsImportSummaryOpen] = useState(false);
  const importSummaryRef = useRef(null);
  const activeLocale = normalizeLocale(i18n.resolvedLanguage || i18n.language);
  const showGregorianReference = shouldShowGregorianReference(activeLocale);
  const csvRowKeys = ['date', 'type', 'symbol', 'market', 'quantity', 'price', 'amount', 'pnl'];

  useEffect(() => {
    if (!lastImportMeta) {
      setIsImportSummaryOpen(false);
    }
  }, [lastImportMeta]);

  useEffect(() => {
    if (!isImportSummaryOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!importSummaryRef.current?.contains(event.target)) {
        setIsImportSummaryOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsImportSummaryOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown, { passive: true });
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isImportSummaryOpen]);

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

  const getLocalizedImportModeLabel = (selectionMode) => (
    selectionMode === 'manual'
      ? t('header.importModeManualOverride', { defaultValue: 'Manual preset' })
      : t('header.importModeAutoDetected', { defaultValue: 'Auto-detected' })
  );

  const getLocalizedImportKindLabel = (importKind) => (
    importKind === 'positions'
      ? t('header.importKindPositions', { defaultValue: 'Positions snapshot' })
      : t('header.importKindTrades', { defaultValue: 'Trades' })
  );

  const getLocalizedImportApplyModeLabel = (applyMode) => (
    applyMode === 'append'
      ? t('header.importApplyModeAppend', { defaultValue: 'Append to current data' })
      : t('header.importApplyModeReplace', { defaultValue: 'Replace current data' })
  );

  const getLocalizedImportGroupLabel = (group) => (
    t(group.translationKey, { defaultValue: group.label })
  );

  const importProfileLabel = t('header.importProfileLabel', { defaultValue: 'CSV parser' });
  const totalSkippedImportRows = (lastImportMeta?.skippedRowCount || 0) + (lastImportMeta?.duplicateRowCount || 0);
  const hasSkippedImportRows = totalSkippedImportRows > 0;
  const appliedImportRowCount = lastImportMeta?.appliedRowCount ?? lastImportMeta?.importedRowCount ?? 0;
  const skippedPreviewRows = lastImportMeta?.skippedPreviewRows || [];
  const skippedPreviewOverflowCount = lastImportMeta?.skippedPreviewOverflowCount
    ?? Math.max(0, totalSkippedImportRows - skippedPreviewRows.length);
  const selectedImportProfileOption = CSV_IMPORT_PROFILE_OPTIONS
    .find((option) => option.id === csvImportProfile) || CSV_IMPORT_PROFILE_OPTIONS[0];
  const selectedImportProfileGroup = CSV_IMPORT_PROFILE_OPTION_GROUPS
    .find((group) => group.options.some((option) => option.id === selectedImportProfileOption.id));
  const importProfileHelperText = (
    selectedImportProfileOption.presetKind === 'broker'
      ? t('header.importProfileHelpBroker', {
        defaultValue: 'Use a broker preset when the CSV comes from a supported broker export. It locks the parser to that broker’s usual column meanings and market hints.'
      })
      : selectedImportProfileOption.presetKind === 'generic'
        ? t('header.importProfileHelpGeneric', {
          defaultValue: 'Use a generic template when the CSV looks familiar by language, but it does not come from one of the supported broker presets.'
        })
        : t('header.importProfileHelpAuto', {
          defaultValue: 'Leave this on auto detect unless a specific broker export keeps getting guessed wrong. For most files, auto is the safest first shot.'
        })
  );
  const importProfileMeta = [
    selectedImportProfileGroup && getLocalizedImportGroupLabel(selectedImportProfileGroup),
    selectedImportProfileOption.presetKind === 'auto'
      ? t('header.importProfileAuto', { defaultValue: 'Auto detect' })
      : getLocalizedImportKindLabel(selectedImportProfileOption.importKind)
  ].filter(Boolean).join(' · ');
  const recordsLoadedText = t('header.recordsLoaded', {
    count: formatLocalizedNumber(rawDataCount, activeLocale)
  });
  const languageLabel = t('header.languageLabel', { defaultValue: 'Language' });

  const liveStatus = isDemo && demoLastUpdate
    ? {
      badgeClass: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-800',
      markerClass: 'bg-amber-200/70 dark:bg-amber-500/20 text-amber-900 dark:text-amber-200',
      label: 'Demo',
      timestamp: demoLastUpdate,
      title: showGregorianReference ? formatGregorianReferenceDateTime(demoLastUpdate) : t('header.demoDescription')
    }
    : !isDemo && lastUpdate
      ? {
        badgeClass: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800',
        markerClass: 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-200',
        label: 'Live',
        timestamp: lastUpdate,
        title: showGregorianReference ? formatGregorianReferenceDateTime(lastUpdate) : undefined
      }
      : null;

  const refreshButtonClasses = apiKey
    ? hasStaleMarketData
      ? 'bg-blue-600 text-white hover:bg-blue-700'
      : 'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50'
    : 'bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-900/20 dark:text-rose-400 dark:hover:bg-rose-900/40';
  const refreshButtonTitle = apiKey
    ? (hasStaleMarketData ? t('header.updateWithCache') : t('header.forceRefreshTitle'))
    : t('header.setApiKeyFirst');
  const refreshButtonLabel = apiKey ? t('header.updatePrices') : t('header.apiKeyRequired');

  const getLocalizedSkippedReasonLabel = (reasonCode) => {
    switch (reasonCode) {
      case 'derivative':
        return t('header.skippedReasonDerivative', { defaultValue: 'Likely option or derivative' });
      case 'duplicate':
        return t('header.skippedReasonDuplicate', { defaultValue: 'Exact duplicate of an existing trade' });
      case 'missingTradeFields':
        return t('header.skippedReasonMissingFields', { defaultValue: 'Missing date, symbol, or trade side' });
      case 'invalidQuantity':
        return t('header.skippedReasonQuantity', { defaultValue: 'Quantity is missing or invalid' });
      case 'invalidAmount':
        return t('header.skippedReasonAmount', { defaultValue: 'Price and amount are both unusable' });
      default:
        return t('header.skippedReasonGeneric', { defaultValue: 'Unsupported or incomplete row' });
    }
  };

  return (
    <div className="grid gap-5 rounded-[28px] border border-slate-200/80 bg-slate-50/70 p-5 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.18)] dark:border-slate-800 dark:bg-slate-950 xl:grid-cols-[minmax(0,1.06fr)_minmax(430px,0.94fr)]">
      <div className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex h-full flex-col justify-between gap-8">
          <div className="space-y-4">
            <div className="space-y-3">
              <h1 className="flex items-start gap-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white xl:text-[2.25rem] xl:leading-[1.12]">
                <Activity className="mt-1 shrink-0 text-blue-600 dark:text-blue-400" />
                <span>{t('header.title')}</span>
              </h1>
              {isDemo && (
                <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400">
                  {t('header.demoDescription')}
                </p>
              )}
              {rawDataCount > 0 && (
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm dark:border-blue-900/70 dark:bg-blue-950/40 dark:text-blue-200">
                  <Activity size={14} className="shrink-0" />
                  <span>{recordsLoadedText}</span>
                </span>
              )}
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-blue-50/80 p-4 shadow-[0_24px_50px_-38px_rgba(37,99,235,0.4)] dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                {liveStatus && (
                  <span
                    className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold ${liveStatus.badgeClass}`}
                    title={liveStatus.title}
                  >
                    <Clock size={14} />
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] ${liveStatus.markerClass}`}>
                      {liveStatus.label}
                    </span>
                  </span>
                )}

                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-white/80 p-2.5 text-slate-500 shadow-sm dark:bg-slate-950/50 dark:text-slate-300">
                    <Clock size={18} />
                  </div>
                  <div className="space-y-1">
                    {liveStatus ? (
                      <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                        {t('header.lastUpdated', { value: formatLocalizedDateTime(liveStatus.timestamp, activeLocale) })}
                      </p>
                    ) : (
                      <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                        {refreshButtonLabel}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {rawDataCount > 0 && (
                <button
                  onClick={handleRefreshPrices}
                  disabled={isLoadingPrices || rawDataCount === 0}
                  className={`inline-flex min-h-[3.5rem] items-center justify-center gap-2 rounded-[20px] px-5 py-3 text-sm font-semibold shadow-sm transition-colors disabled:opacity-50 lg:min-w-[12rem] ${refreshButtonClasses}`}
                  title={refreshButtonTitle}
                >
                  <RefreshCw size={18} className={isLoadingPrices ? 'animate-spin' : ''} />
                  <span>{refreshButtonLabel}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-[22px] border border-slate-200/80 bg-white/85 p-3 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/85">
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center">
            <label
              className="flex min-w-[17rem] flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition-colors hover:border-blue-200 dark:border-slate-700 dark:bg-slate-800 xl:max-w-md xl:flex-none"
              title={languageLabel}
            >
              <Languages size={16} className="shrink-0 text-blue-600 dark:text-blue-300" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                {languageLabel}
              </span>
              <select
                value={activeLocale}
                onChange={handleLocaleChange}
                className="min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-700 outline-none dark:text-slate-200"
                title={languageLabel}
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
              className="justify-self-start rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm transition-colors hover:border-blue-200 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 sm:justify-self-center"
              title={darkMode ? t('header.switchToLight') : t('header.switchToDark')}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setShowManager(!showManager)}
              className={`inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-medium transition-colors shadow-sm sm:justify-self-end ${
                showManager
                  ? 'bg-slate-800 text-white'
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              <Database size={18} />
              <span>{t('header.settingsRecords')}</span>
            </button>
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="grid gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  {t('common.importCsv', { defaultValue: 'Import CSV' })}
                </span>
                {selectedImportProfileGroup && (
                  <span className="inline-flex items-center rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 shadow-sm dark:bg-slate-900 dark:text-slate-400">
                    {getLocalizedImportGroupLabel(selectedImportProfileGroup)}
                  </span>
                )}
                {selectedImportProfileOption.presetKind !== 'auto' && (
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                    {getLocalizedImportKindLabel(selectedImportProfileOption.importKind)}
                  </span>
                )}
              </div>

              <p className="max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                {importProfileHelperText}
              </p>
            </div>

            <div className="grid w-full gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(13rem,15rem)]">
              <label
                className="relative flex min-h-[5.25rem] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-blue-200 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800/80"
                title={importProfileLabel}
              >
                <div className="pointer-events-none flex min-w-0 flex-1 flex-col justify-between gap-3 pr-8">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    {importProfileLabel}
                  </span>
                  <div className="min-w-0">
                    <div className="line-clamp-2 break-words text-sm font-semibold leading-6 text-slate-800 dark:text-slate-100">
                      {getLocalizedProfileLabel(selectedImportProfileOption)}
                    </div>
                    <div className="mt-1 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                      {importProfileMeta}
                    </div>
                  </div>
                </div>
                <ChevronDown size={18} className="pointer-events-none absolute right-4 top-4 shrink-0 text-slate-400 dark:text-slate-500" />
                <select
                  value={csvImportProfile}
                  onChange={(event) => setCsvImportProfile(event.target.value)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  title={importProfileLabel}
                >
                  {CSV_IMPORT_PROFILE_OPTION_GROUPS.map((group) => (
                    <optgroup key={group.id} label={getLocalizedImportGroupLabel(group)}>
                      {group.options.map((option) => (
                        <option key={option.id} value={option.id}>
                          {getLocalizedProfileLabel(option)}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </label>

              <div className="relative group">
                <div className="pointer-events-none absolute right-0 top-[calc(100%+0.75rem)] z-50 w-80 translate-y-1 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 opacity-0 invisible shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  <h4 className="mb-2 flex items-center gap-2 border-b border-slate-200 pb-1 font-bold text-slate-800 dark:border-slate-700 dark:text-slate-100">
                    <Info size={14} className="text-blue-500" />
                    {t('header.csvTitle')}
                  </h4>
                  <p className="mb-2 text-xs">{t('header.csvIntro')}</p>
                  <ul className="list-disc space-y-1 rounded bg-slate-50 p-2 pl-5 text-xs font-mono dark:bg-slate-900/70">
                    {csvRowKeys.map((rowKey) => (
                      <li key={rowKey}>{t(`header.csvRows.${rowKey}`)}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs font-medium text-blue-600 dark:text-blue-400">
                    {t('header.csvNote1')}
                  </p>
                  <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    {t('header.csvNote2')}
                  </p>
                  <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    {t('header.csvNote3', {
                      defaultValue: '* Note 3: The app auto-detects common broker CSV layouts plus semicolon and tab-delimited files. After import, the detected layout shows up on the top right.'
                    })}
                  </p>
                </div>

                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                />
                <button className="flex min-h-[5.25rem] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 font-semibold text-white shadow-sm transition-all hover:from-blue-700 hover:to-blue-600">
                  <Upload size={18} />
                  {t('common.importCsv', { defaultValue: 'Import CSV' })}
                </button>
              </div>
            </div>
          </div>

          {lastImportMeta && (
            <div ref={importSummaryRef} className="relative mt-4">
              <button
                type="button"
                onClick={() => setIsImportSummaryOpen((currentValue) => !currentValue)}
                aria-expanded={isImportSummaryOpen}
                className={`flex flex-wrap items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium ${
                  hasSkippedImportRows
                    ? 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300'
                    : 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                } w-full cursor-pointer text-left transition-colors hover:brightness-[0.98] dark:hover:brightness-110`}
                title={`${getLocalizedImportMetaProfileLabel(lastImportMeta)} · ${getLocalizedImportDelimiterLabel(lastImportMeta.delimiterLabel)}`}
              >
                <span>{getLocalizedImportMetaProfileLabel(lastImportMeta)}</span>
                <span className={hasSkippedImportRows ? 'text-amber-400 dark:text-amber-500' : 'text-emerald-400 dark:text-emerald-500'}>•</span>
                <span>{t('header.importBadgeImported', {
                  defaultValue: '{{count}} imported',
                  count: formatLocalizedNumber(appliedImportRowCount, activeLocale)
                })}</span>
                {hasSkippedImportRows && (
                  <>
                    <span className="text-amber-400 dark:text-amber-500">•</span>
                    <span>{t('header.importBadgeSkipped', {
                      defaultValue: '{{count}} skipped',
                      count: formatLocalizedNumber(totalSkippedImportRows, activeLocale)
                    })}</span>
                  </>
                )}
                <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-current/80">
                  {t('header.importDetailsToggle', { defaultValue: 'Details' })}
                  <ChevronDown size={14} className={`transition-transform ${isImportSummaryOpen ? 'rotate-180' : ''}`} />
                </span>
              </button>

              {isImportSummaryOpen && (
                <div className="absolute left-0 top-[calc(100%+0.75rem)] z-50 w-full max-w-md rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-xl dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 lg:left-auto lg:right-0">
                <h4 className="mb-3 flex items-center gap-2 border-b border-slate-200 pb-2 font-bold text-slate-800 dark:border-slate-700 dark:text-slate-100">
                  <Info size={14} className="text-blue-500" />
                  {t('header.importSummaryTitle', { defaultValue: 'Last import' })}
                </h4>

                <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-xs">
                  <span className="text-slate-500 dark:text-slate-400">{t('header.importSummaryProfile', { defaultValue: 'Profile' })}</span>
                  <span className="font-medium text-right text-slate-700 dark:text-slate-200">{getLocalizedImportMetaProfileLabel(lastImportMeta)}</span>

                  <span className="text-slate-500 dark:text-slate-400">{t('header.importSummaryMode', { defaultValue: 'Mode' })}</span>
                  <span className="font-medium text-right text-slate-700 dark:text-slate-200">{getLocalizedImportModeLabel(lastImportMeta.selectionMode)}</span>

                  {lastImportMeta.applyMode && (
                    <>
                      <span className="text-slate-500 dark:text-slate-400">{t('header.importSummaryApply', { defaultValue: 'Apply mode' })}</span>
                      <span className="font-medium text-right text-slate-700 dark:text-slate-200">{getLocalizedImportApplyModeLabel(lastImportMeta.applyMode)}</span>
                    </>
                  )}

                  <span className="text-slate-500 dark:text-slate-400">{t('header.importSummaryKind', { defaultValue: 'Import kind' })}</span>
                  <span className="font-medium text-right text-slate-700 dark:text-slate-200">{getLocalizedImportKindLabel(lastImportMeta.importKind)}</span>

                  <span className="text-slate-500 dark:text-slate-400">{t('header.importSummaryDelimiter', { defaultValue: 'Delimiter' })}</span>
                  <span className="font-medium text-right text-slate-700 dark:text-slate-200">{getLocalizedImportDelimiterLabel(lastImportMeta.delimiterLabel)}</span>

                  <span className="text-slate-500 dark:text-slate-400">{t('header.importSummaryImported', { defaultValue: 'Imported rows' })}</span>
                  <span className="font-medium text-right text-emerald-600 dark:text-emerald-400">{formatLocalizedNumber(appliedImportRowCount, activeLocale)}</span>

                  <span className="text-slate-500 dark:text-slate-400">{t('header.importSummarySkipped', { defaultValue: 'Parser skipped' })}</span>
                  <span className={`font-medium text-right ${hasSkippedImportRows ? 'text-amber-600 dark:text-amber-400' : 'text-slate-700 dark:text-slate-200'}`}>
                    {formatLocalizedNumber(lastImportMeta.skippedRowCount || 0, activeLocale)}
                  </span>

                  {lastImportMeta.duplicateRowCount !== undefined && (
                    <>
                      <span className="text-slate-500 dark:text-slate-400">{t('header.importSummaryDuplicates', { defaultValue: 'Exact duplicates skipped' })}</span>
                      <span className={`font-medium text-right ${(lastImportMeta.duplicateRowCount || 0) > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-700 dark:text-slate-200'}`}>
                        {formatLocalizedNumber(lastImportMeta.duplicateRowCount || 0, activeLocale)}
                      </span>
                    </>
                  )}
                </div>

                {hasSkippedImportRows && skippedPreviewRows.length > 0 && (
                  <div className="mt-4 border-t border-slate-200 pt-3 dark:border-slate-700">
                    <div className="flex items-center justify-between gap-3">
                      <h5 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                        {t('header.skippedPreviewTitle', { defaultValue: 'Skipped rows preview' })}
                      </h5>
                      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                        {t('header.importBadgeSkipped', {
                          defaultValue: '{{count}} skipped',
                          count: formatLocalizedNumber(totalSkippedImportRows, activeLocale)
                        })}
                      </span>
                    </div>

                    <div className="mt-3 space-y-2">
                      {skippedPreviewRows.map((previewRow, index) => (
                        <div key={`${previewRow.reasonCode}-${previewRow.rowNumber || 'na'}-${previewRow.symbol || index}`} className="rounded-lg border border-slate-200 bg-slate-50/90 px-3 py-2 dark:border-slate-700 dark:bg-slate-900/60">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold text-slate-800 dark:text-slate-100">
                              {previewRow.symbol || t('header.skippedPreviewUnknownSymbol', { defaultValue: 'Unknown symbol' })}
                            </span>
                            {previewRow.type && (
                              <span className="rounded bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-500 shadow-sm dark:bg-slate-800 dark:text-slate-300">
                                {previewRow.type}
                              </span>
                            )}
                            {previewRow.date && (
                              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                                {previewRow.date}
                              </span>
                            )}
                            {previewRow.rowNumber && (
                              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                                {t('header.skippedPreviewRowNumber', {
                                  defaultValue: 'row {{row}}',
                                  row: formatLocalizedNumber(previewRow.rowNumber, activeLocale)
                                })}
                              </span>
                            )}
                          </div>
                          <div className="mt-1 text-xs font-medium text-amber-700 dark:text-amber-300">
                            {getLocalizedSkippedReasonLabel(previewRow.reasonCode)}
                          </div>
                          {(previewRow.market || previewRow.description) && (
                            <div className="mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-400">
                              {[
                                previewRow.market && t('header.skippedPreviewMarket', {
                                  defaultValue: 'Market: {{value}}',
                                  value: previewRow.market
                                }),
                                previewRow.description
                              ].filter(Boolean).join(' · ')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {skippedPreviewOverflowCount > 0 && (
                      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                        {t('header.skippedPreviewOverflow', {
                          defaultValue: '{{count}} more skipped rows are not shown here.',
                          count: formatLocalizedNumber(skippedPreviewOverflowCount, activeLocale)
                        })}
                      </p>
                    )}
                  </div>
                )}
              </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
