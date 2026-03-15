import React from 'react';
import { Info, ShieldCheck, Key, Database, Activity, X } from 'lucide-react';

export default function UserNotice({ show, onDismiss }) {
  if (!show) return null;
  
  return (
    <div className="bg-blue-600 dark:bg-blue-700 text-white p-6 rounded-2xl shadow-lg border border-blue-400/30 relative overflow-hidden group">
      <button 
        onClick={onDismiss}
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-20"
        title="不再顯示"
      >
        <X size={20} />
      </button>
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center relative z-10">
        <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm hidden md:block">
          <Info size={32} className="text-blue-100" />
        </div>
        <div className="flex-1 space-y-2">
          <h2 className="text-xl font-bold flex items-center gap-2">
            👋 歡迎使用 Trade Lens 交易視覺化工具
          </h2>
          <p className="text-blue-50 text-sm leading-relaxed max-w-4xl">
            這是一個專為投資者設計的開源工具，幫助您追蹤全球市場的交易績效。您可以匯入券商匯出的 CSV 檔案，快速產生成本走勢、損益分佈與持倉比例圖表，讓您更直觀地掌握投資動向。
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <ShieldCheck size={14} className="text-emerald-300" />
              <span>隱私安全：所有資料僅儲存在您的瀏覽器本地 (IndexedDB)，絕對不經伺服器。</span>
            </div>
            <div className="flex items-center gap-2 text-xs bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <Key size={14} className="text-amber-300" />
              <span>API 金鑰：僅用於向 yfapi.net 抓取股價，且金鑰同樣僅儲存於本地。</span>
            </div>
            <a 
              href="https://git.bluesway.org/bluesway/trade-lens" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg border border-white/20 transition-colors cursor-pointer"
            >
              <Database size={14} className="text-blue-200" />
              <span>開放原始碼：查看專案原始碼與貢獻</span>
            </a>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-8 -right-8 text-white/5 group-hover:text-white/10 transition-colors duration-700 rotate-12">
        <Activity size={160} />
      </div>
    </div>
  );
}
