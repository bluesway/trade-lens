import React from 'react';
import { Activity, Sun, Moon, Database, RefreshCw, Upload, Download, HelpCircle, Clock } from 'lucide-react';

export default function Header({ 
  isDemo, 
  rawDataCount, 
  lastUpdate, 
  darkMode, 
  toggleDarkMode, 
  showManager, 
  setShowManager, 
  fetchLivePrices, 
  isLoadingPrices, 
  apiKey, 
  handleFileUpload, 
  handleExportCSV, 
  showCsvHelp, 
  setShowCsvHelp 
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Activity className="text-blue-600" />
          全球交易組合視覺化儀表板
        </h1>
        <div className="flex flex-col gap-2 md:flex-row md:items-center mt-2">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {isDemo ? "目前顯示為部分預設範例資料。請上傳完整 CSV 以查看全貌。" : `已成功載入並分析 ${rawDataCount} 筆交易紀錄`}
          </p>
          {lastUpdate && (
            <span className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-full flex items-center gap-1.5 w-fit font-medium border border-blue-100 dark:border-blue-800">
              <Clock size={14} />
              資料最後更新: {lastUpdate.toLocaleString()}
            </span>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={toggleDarkMode}
          className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:bg-slate-900/50 dark:hover:bg-slate-700 transition-colors shadow-sm"
          title={darkMode ? "切換至淺色模式" : "切換至深色模式"}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button 
          onClick={() => setShowManager(!showManager)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm ${showManager ? 'bg-slate-800 text-white' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:bg-slate-900/50 dark:hover:bg-slate-700'}`}
        >
          <Database size={18} />
          <span className="hidden md:inline">設定與紀錄</span>
        </button>
        <button 
          onClick={() => fetchLivePrices(false)}
          disabled={isLoadingPrices || rawDataCount === 0}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 ${apiKey ? 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300' : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100'}`}
          title={apiKey ? "手動更新即時股價 (使用快取)" : "請先設定 API Key"}
        >
          <RefreshCw size={18} className={isLoadingPrices ? "animate-spin" : ""} />
          <span className="hidden md:inline">{apiKey ? '更新股價' : '需設定金鑰'}</span>
        </button>
        <button 
          onClick={() => {
            if (window.confirm('確定要強制刷新嗎？這將會忽略 24 小時快取並實際消耗 API 額度。')) {
              fetchLivePrices(true);
            }
          }}
          disabled={isLoadingPrices || rawDataCount === 0}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 ${apiKey ? 'bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-400' : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100'}`}
          title={apiKey ? "強制更新並消耗額度" : "請先設定 API Key"}
        >
          <Activity size={18} className={isLoadingPrices ? "animate-pulse" : ""} />
          <span className="hidden md:inline">強制刷新</span>
        </button>
        
        <div className="relative flex items-center gap-2">
          <div className="relative group">
            <input 
              type="file" 
              accept=".csv" 
              onChange={handleFileUpload} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm whitespace-nowrap relative">
              <Upload size={18} />
              匯入 CSV
            </button>
          </div>
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm whitespace-nowrap"
          >
            <Download size={18} />
            匯出 CSV
          </button>
        </div>

        <div className="relative">
          <button 
            onClick={() => setShowCsvHelp(!showCsvHelp)}
            className="flex items-center justify-center w-10 h-[44px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-blue-600 hover:border-blue-300 rounded-lg transition-colors"
            title="CSV 格式說明"
          >
            <HelpCircle size={20} />
          </button>
          {showCsvHelp && (
            <div className="absolute right-0 top-14 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl shadow-xl z-50 text-sm text-slate-600 dark:text-slate-400">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2 border-b pb-1">CSV 欄位格式說明</h4>
              <p className="mb-2 text-xs">請確保您的 CSV 包含以下標題列 (順序不拘)：</p>
              <ul className="list-disc pl-5 space-y-1 text-xs font-mono bg-slate-50 dark:bg-slate-900/50 p-2 rounded">
                <li>日期 <span className="text-slate-400">(如: 2025/01/01)</span></li>
                <li>類型 <span className="text-slate-400">(買入/賣出)</span></li>
                <li>代號 <span className="text-slate-400">(如: 2330.TW, AAPL)</span></li>
                <li>市場 <span className="text-slate-400">(選填)</span></li>
                <li>數量</li>
                <li>單價 <span className="text-slate-400">(原幣別)</span></li>
                <li>總金額 <span className="text-slate-400">(原幣別)</span></li>
                <li>損益 <span className="text-slate-400">(賣出必填)</span></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
