import React from 'react';
import { Activity, Sun, Moon, Database, RefreshCw, Upload, Download, HelpCircle, Clock, Info } from 'lucide-react';

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
  handleExportCSV
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
        >
          <RefreshCw size={18} className={isLoadingPrices ? "animate-spin" : ""} />
          <span className="hidden md:inline">{apiKey ? '更新股價' : '需設定金鑰'}</span>
        </button>
        
        <div className="flex items-center gap-2">
          {/* Import CSV with Tooltip */}
          <div className="relative group">
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-slate-800 dark:bg-slate-700 text-white p-4 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[60]">
              <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-1">
                <Info size={14} className="text-blue-400" />
                <span className="font-bold text-xs text-white">CSV 格式建議</span>
              </div>
              <ul className="text-[10px] space-y-1 text-slate-300">
                <li>• 標題需含：日期, 類型, 代號, 數量, 總金額</li>
                <li>• 類型支援：買入/賣出 (或 Buy/Sell)</li>
                <li>• 建議代號帶市場，如：<code className="bg-white/10 px-1 rounded text-blue-300">2330.TW</code></li>
              </ul>
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-800 dark:border-t-slate-700"></div>
            </div>
            
            <input 
              type="file" 
              accept=".csv" 
              onChange={handleFileUpload} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm whitespace-nowrap">
              <Upload size={18} />
              匯入 CSV
            </button>
          </div>

          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-200 px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm whitespace-nowrap"
          >
            <Download size={18} />
            匯出 CSV
          </button>
        </div>
      </div>
    </div>
  );
}
