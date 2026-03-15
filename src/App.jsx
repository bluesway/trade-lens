import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw, ShieldCheck } from 'lucide-react';
import { toPng } from 'html-to-image';
import { useTradeData } from './hooks/useTradeData';

import ChartsSection from './components/ChartsSection';
import DataTable from './components/DataTable';
import Header from './components/Header';
import ManagerPanel from './components/ManagerPanel';
import SummaryCards from './components/SummaryCards';
import UserNotice from './components/UserNotice';

export default function App() {
  const [toastMsg, setToastMsg] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showUserNotice, setShowUserNotice] = useState(false);

  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);
  const trendChartRef = useRef(null);

  const showToast = (message) => {
    setToastMsg(message);
    setTimeout(() => setToastMsg(''), 6000);
  };

  const {
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
    rawData,
    requestSort,
    setApiKey,
    setExpandedStock,
    setHideZeroHolding,
    setMarketFilter,
    setShowManager,
    setTempStockEdit,
    setTrendTimeRange,
    showManager,
    startEditingStock,
    summary,
    tempStockEdit,
    trendData,
    trendTimeRange,
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
      showToast('正在產生圖片...');
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
      showToast('圖片匯出成功！');
    } catch (error) {
      console.error(error);
      showToast('圖片匯出失敗');
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      importCsvText(loadEvent.target.result);
    };
    reader.readAsText(file);
  };

  const handleExportCSV = () => {
    if (rawData.length === 0) {
      showToast('目前沒有資料可匯出！');
      return;
    }

    const headers = ['日期', '類型', '代號', '市場', '數量', '單價', '總金額', '損益'];
    const csvContent = [
      headers.join(','),
      ...rawData.map((row) => headers.map((header) => {
        let value = row[header] || '';
        if (String(value).includes(',')) {
          value = `"${value}"`;
        }
        return value;
      }).join(','))
    ].join('\n');

    const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `trade_records_${new Date().toISOString().slice(0, 10)}.csv`);
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
          <p className="font-medium">載入本機 IndexedDB 資料中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-slate-950 text-slate-200' : 'bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200'} p-4 md:p-8 font-sans`}>
      {toastMsg && (
        <div className="fixed bottom-6 right-6 bg-slate-800 dark:bg-blue-600 text-white px-5 py-3 rounded-xl shadow-2xl z-50 animate-fade-in-up border border-white/10 flex items-center gap-2">
          <ShieldCheck size={18} />
          {toastMsg}
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        <UserNotice show={showUserNotice} onDismiss={dismissNotice} />

        <Header
          apiKey={apiKey}
          darkMode={darkMode}
          fetchLivePrices={fetchLivePrices}
          handleExportCSV={handleExportCSV}
          handleFileUpload={handleFileUpload}
          isDemo={isDemo}
          isLoadingPrices={isLoadingPrices}
          lastUpdate={lastUpdate}
          rawDataCount={rawData.length}
          setShowManager={setShowManager}
          showManager={showManager}
          toggleDarkMode={toggleDarkMode}
        />

        {showManager && (
          <ManagerPanel
            apiKey={apiKey}
            baseCurrency={baseCurrency}
            cancelEditingRecord={cancelEditingRecord}
            editingIndex={editingIndex}
            handleAddRecord={handleAddRecord}
            handleClearData={() => handleClearData(handleExportCSV)}
            handleDeleteRecord={handleDeleteRecord}
            handleEditRecord={handleEditRecord}
            handleSaveApiKey={handleSaveApiKey}
            handleSaveBaseCurrency={handleSaveBaseCurrency}
            hideZeroHolding={hideZeroHolding}
            liveData={liveData}
            newRec={newRec}
            onClose={() => setShowManager(false)}
            rawData={rawData}
            setApiKey={setApiKey}
            setHideZeroHolding={setHideZeroHolding}
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
          setExpandedStock={setExpandedStock}
          setMarketFilter={setMarketFilter}
          setTempStockEdit={setTempStockEdit}
          startEditingStock={startEditingStock}
          tempStockEdit={tempStockEdit}
        />
      </div>
    </div>
  );
}
