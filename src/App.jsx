import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw, ShieldCheck } from 'lucide-react';
import { toPng } from 'html-to-image';
import { useTranslation } from 'react-i18next';
import { useTradeData } from './hooks/useTradeData';
import { isRtlLocale, normalizeLocale } from './locales/config';

import ChartsSection from './components/ChartsSection';
import DataTable from './components/DataTable';
import Header from './components/Header';
import ImportMissingDataDialog from './components/ImportMissingDataDialog';
import ImportReviewDialog from './components/ImportReviewDialog';
import ManagerPanel from './components/ManagerPanel';
import SummaryCards from './components/SummaryCards';
import UserNotice from './components/UserNotice';

export default function App() {
  const [toastMsg, setToastMsg] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showUserNotice, setShowUserNotice] = useState(false);
  const [pendingImport, setPendingImport] = useState(null);
  const [backupBeforeImport, setBackupBeforeImport] = useState(true);
  const { t, i18n } = useTranslation();

  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);
  const trendChartRef = useRef(null);
  const activeLocale = normalizeLocale(i18n.resolvedLanguage || i18n.language);
  const isRtl = isRtlLocale(activeLocale);

  const toastTimerRef = useRef(null);
  const showToast = (message) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMsg(message);
    toastTimerRef.current = setTimeout(() => setToastMsg(''), 6000);
  };

  const {
    addSymbolOverride,
    apiKey,
    availableMarkets,
    baseCurrency,
    cancelEditingRecord,
    cancelEditingStock,
    chartData,
    csvImportProfile,
    deleteSymbolOverride,
    displayData,
    demoLastUpdate,
    editingIndex,
    editingStockSymbol,
    expandedStock,
    formatBaseCurrency,
    formatOriginalCurrency,
    formatPercent,
    handleAddRecord,
    handleClearData,
    handleDeleteRecord,
    handleEditRecord,
    handleRefreshPrices,
    handleSaveApiKey,
    handleSaveBaseCurrency,
    handleSaveManualStock,
    hasStaleMarketData,
    hideZeroHolding,
    historySortConfig,
    holdingCount,
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
    applyPreparedCsvImport,
    deletePendingImportSymbolRecords,
    dismissPendingImportSymbolReview,
    prepareCsvImport,
    pendingImportSymbolReview,
    rawData,
    resolvedTradeRows,
    symbolOverrides,
    requestSort,
    savePendingImportSymbolReview,
    skipPendingImportSymbolReview,
    setApiKey,
    setCsvImportProfile,
    setExpandedStock,
    setHistorySort,
    setHideZeroHolding,
    setMarketFilter,
    setShowManager,
    setTempStockEdit,
    setTrendTimeRange,
    showManager,
    startEditingStock,
    summary,
    tempStockEdit,
    trackedSymbols,
    trendData,
    trendTimeRange,
    toggleHistorySortDirection,
    updateNewRecAmount,
    updateNewRecField,
    updateNewRecPrice,
    updateNewRecQuantity
  } = useTradeData(showToast);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('tr_dark_mode') === 'true';
    if (savedDarkMode) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    const savedShowNotice = localStorage.getItem('tr_show_user_notice') !== 'false';
    setShowUserNotice(savedShowNotice);
  }, []);

  useEffect(() => {
    document.documentElement.lang = activeLocale;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [activeLocale, isRtl]);

  const dismissNotice = () => {
    setShowUserNotice(false);
    localStorage.setItem('tr_show_user_notice', 'false');
  };

  const toggleDarkMode = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    localStorage.setItem('tr_dark_mode', nextMode);

    if (nextMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const exportChartAsImage = async (ref, fileName) => {
    if (!ref.current) return;

    try {
      showToast(t('app.generatingImage'));
      const dataUrl = await toPng(ref.current, {
        backgroundColor: darkMode ? '#0f172a' : '#ffffff',
        style: {
          borderRadius: '16px'
        }
      });
      const link = document.createElement('a');
      link.download = `${fileName}.png`;
      link.href = dataUrl;
      link.click();
      showToast(t('app.imageExportSuccess'));
    } catch (error) {
      console.error(error);
      showToast(t('app.imageExportFail'));
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const input = event.target;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const preparedImport = prepareCsvImport(loadEvent.target.result);
      input.value = '';

      if (!preparedImport) {
        return;
      }

      const hasExistingUserData = rawData.length > 0 && !isDemo;
      if (!hasExistingUserData) {
        void applyPreparedCsvImport(preparedImport, { mode: 'replace', announceMode: false });
        return;
      }

      setBackupBeforeImport(true);
      setPendingImport({
        ...preparedImport,
        fileName: file.name
      });
    };
    reader.readAsText(file);
  };

  const closeImportReview = () => {
    setPendingImport(null);
    setBackupBeforeImport(true);
  };

  const applyPendingImport = (mode) => {
    if (!pendingImport) {
      return;
    }

    const importToApply = pendingImport;

    if (backupBeforeImport && rawData.length > 0 && !isDemo) {
      handleExportCSV();
    }

    closeImportReview();
    void applyPreparedCsvImport(importToApply, {
      mode,
      announceMode: true
    });
  };

  const handleExportCSV = () => {
    if (resolvedTradeRows.length === 0) {
      showToast(t('app.noDataToExport'));
      return;
    }

    const escapeCsvCell = (value) => {
      const stringValue = String(value ?? '');
      if (!/[",\n]/.test(stringValue)) {
        return stringValue;
      }

      return `"${stringValue.replace(/"/g, '""')}"`;
    };

    const headers = ['日期', '類型', '代號', '市場', '數量', '單價', '總金額', '損益', '說明'];
    const csvContent = [
      headers.join(','),
      ...resolvedTradeRows.map((row) => headers.map((header) => escapeCsvCell(row[header] || '')).join(','))
    ].join('\n');

    const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${t('app.exportFilenamePrefix')}_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAppLoaded) {
    return (
      <div className="min-h-screen transition-colors duration-300 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400">
          <RefreshCw size={24} className="animate-spin text-blue-500" />
          <p className="font-medium">{t('app.loadingLocalData')}</p>
        </div>
      </div>
    );
  }

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-slate-950 text-slate-200' : 'bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200'} p-4 md:p-8 font-sans`}>
      <ImportReviewDialog
        backupBeforeApply={backupBeforeImport}
        currentRowCount={rawData.length}
        onAppend={() => applyPendingImport('append')}
        onCancel={closeImportReview}
        onReplace={() => applyPendingImport('replace')}
        pendingImport={pendingImport}
        setBackupBeforeApply={setBackupBeforeImport}
      />
      <ImportMissingDataDialog
        onClose={dismissPendingImportSymbolReview}
        onDeleteSelected={deletePendingImportSymbolRecords}
        onOpenManager={() => {
          dismissPendingImportSymbolReview();
          setShowManager(true);
        }}
        existingSymbols={trackedSymbols}
        onSaveSelected={savePendingImportSymbolReview}
        onSkipSelected={skipPendingImportSymbolReview}
        pendingReview={pendingImportSymbolReview}
      />

      {toastMsg && (
        <div className="pointer-events-none fixed inset-x-4 bottom-6 z-[90] flex justify-end sm:inset-x-6">
          <div className="flex max-w-md items-center gap-2 rounded-xl border border-white/10 bg-slate-800 px-5 py-3 text-white shadow-2xl animate-fade-in-up dark:bg-blue-600">
            <ShieldCheck size={18} className="shrink-0" />
            <span className="text-sm leading-6">{toastMsg}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        <UserNotice show={showUserNotice} onDismiss={dismissNotice} />

        <Header
          apiKey={apiKey}
          csvImportProfile={csvImportProfile}
          darkMode={darkMode}
          demoLastUpdate={demoLastUpdate}
          handleFileUpload={handleFileUpload}
          handleRefreshPrices={handleRefreshPrices}
          hasStaleMarketData={hasStaleMarketData}
          isDemo={isDemo}
          isLoadingPrices={isLoadingPrices}
          lastImportMeta={lastImportMeta}
          lastUpdate={lastUpdate}
          rawDataCount={rawData.length}
          setCsvImportProfile={setCsvImportProfile}
          setShowManager={setShowManager}
          showManager={showManager}
          toggleDarkMode={toggleDarkMode}
        />

        {showManager && (
          <ManagerPanel
            addSymbolOverride={addSymbolOverride}
            apiKey={apiKey}
            baseCurrency={baseCurrency}
            cancelEditingRecord={cancelEditingRecord}
            deleteSymbolOverride={deleteSymbolOverride}
            editingIndex={editingIndex}
            handleAddRecord={handleAddRecord}
            handleClearData={() => handleClearData(handleExportCSV)}
            handleDeleteRecord={handleDeleteRecord}
            handleEditRecord={handleEditRecord}
            handleExportCSV={handleExportCSV}
            handleSaveApiKey={handleSaveApiKey}
            handleSaveBaseCurrency={handleSaveBaseCurrency}
            hideZeroHolding={hideZeroHolding}
            liveData={liveData}
            newRec={newRec}
            onClose={() => setShowManager(false)}
            rawData={resolvedTradeRows}
            setApiKey={setApiKey}
            setHideZeroHolding={setHideZeroHolding}
            symbolOverrides={symbolOverrides}
            updateNewRecAmount={updateNewRecAmount}
            updateNewRecField={updateNewRecField}
            updateNewRecPrice={updateNewRecPrice}
            updateNewRecQuantity={updateNewRecQuantity}
          />
        )}

        <SummaryCards
          formatBaseCurrency={formatBaseCurrency}
          formatPercent={formatPercent}
          holdingCount={holdingCount}
          overallRealizedPercent={overallRealizedPercent}
          overallUnrealizedPercent={overallUnrealizedPercent}
          summary={summary}
        />

        <ChartsSection
          barChartRef={barChartRef}
          baseCurrency={baseCurrency}
          chartData={chartData}
          darkMode={darkMode}
          exportChartAsImage={exportChartAsImage}
          formatBaseCurrency={formatBaseCurrency}
          pieChartRef={pieChartRef}
          setTrendTimeRange={setTrendTimeRange}
          trendChartRef={trendChartRef}
          trendData={trendData}
          trendTimeRange={trendTimeRange}
        />

        <DataTable
          availableMarkets={availableMarkets}
          cancelEditingStock={cancelEditingStock}
          displayData={displayData}
          editingStockSymbol={editingStockSymbol}
          expandedStock={expandedStock}
          formatOriginalCurrency={formatOriginalCurrency}
          formatPercent={formatPercent}
          handleSaveManualStock={handleSaveManualStock}
          historySortConfig={historySortConfig}
          marketFilter={marketFilter}
          requestSort={requestSort}
          setHistorySort={setHistorySort}
          setExpandedStock={setExpandedStock}
          setMarketFilter={setMarketFilter}
          setTempStockEdit={setTempStockEdit}
          startEditingStock={startEditingStock}
          tempStockEdit={tempStockEdit}
          toggleHistorySortDirection={toggleHistorySortDirection}
        />
      </div>
    </div>
  );
}
