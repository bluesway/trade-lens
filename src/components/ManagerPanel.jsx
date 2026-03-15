import React, { useEffect, useRef } from 'react';
import { Database, DollarSign, Edit2, Info, Key, Plus, Trash2, X } from 'lucide-react';
import { formatDate, formatSymbol, guessMarket } from '../utils/helpers';
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
  const formRef = useRef(null);

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
          設定與紀錄管理
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleClearData}
            className="px-3 py-1.5 text-sm bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40 rounded-md font-medium transition-colors"
          >
            清除並載入範例
          </button>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 p-5 rounded-xl">
          <div className="flex justify-between items-start mb-3">
            <label className="flex items-center gap-2 text-sm font-bold text-blue-900 dark:text-blue-100">
              <Key size={16} />
              yfapi.net API 金鑰設定
            </label>
            <a
              href="https://financeapi.net/dashboard"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold flex items-center gap-1 bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-300 hover:bg-blue-600 hover:text-white transition-colors px-2.5 py-1 rounded-md"
            >
              <Info size={14} />
              免費註冊取得
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="password"
              placeholder="請貼上您的 x-api-key (例如: A2sD8...)"
              value={apiKey}
              onChange={(event) => setApiKey(event.target.value)}
              className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-mono bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <button
              onClick={handleSaveApiKey}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm whitespace-nowrap"
            >
              儲存金鑰
            </button>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
            <DollarSign size={16} />
            總計面板基礎幣別 (Base Currency)
          </label>
          <div className="flex gap-3">
            <select
              value={baseCurrency}
              onChange={(event) => handleSaveBaseCurrency(event.target.value)}
              className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="TWD">新台幣 (TWD)</option>
              <option value="CNY">人民幣 (CNY)</option>
              <option value="HKD">港幣 (HKD)</option>
              <option value="USD">美金 (USD)</option>
              <option value="JPY">日圓 (JPY)</option>
            </select>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            * 所有的外幣資產都會透過即時匯率轉換成此幣別，以便在上方總計看板中進行加總計算。
          </p>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-xl mb-6 flex items-center justify-between">
        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">隱藏目前無持股的交易紀錄</span>
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
          <Plus size={16} /> 手動新增單筆紀錄
        </h4>
        <div className="flex flex-wrap gap-4 items-end">
          <div className="w-[130px]">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">日期</label>
            <input
              type="date"
              value={newRec.date}
              onChange={(event) => updateNewRecField('date', event.target.value)}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-[80px]">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">類型</label>
            <select
              value={newRec.type}
              onChange={(event) => updateNewRecField('type', event.target.value)}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <option>買入</option>
              <option>賣出</option>
            </select>
          </div>
          <div className="w-[100px]">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">市場</label>
            <select
              value={newRec.market}
              onChange={(event) => updateNewRecField('market', event.target.value)}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-blue-700 dark:text-blue-300"
            >
              <option>陸股</option>
              <option>港股</option>
              <option>台股</option>
              <option>日股</option>
              <option>美股</option>
              <option>其他</option>
            </select>
          </div>
          <div className="flex-1 min-w-[100px]">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">代號</label>
            <input
              type="text"
              placeholder="如: AAPL"
              value={newRec.code}
              onChange={(event) => updateNewRecField('code', event.target.value)}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1 min-w-[100px]">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">數量</label>
            <input
              type="number"
              placeholder="股數"
              value={newRec.qty}
              onChange={(event) => updateNewRecQuantity(event.target.value)}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1 min-w-[100px]">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">單價 (原幣)</label>
            <input
              type="number"
              placeholder="單股價格"
              value={newRec.price}
              onChange={(event) => updateNewRecPrice(event.target.value)}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1 min-w-[120px]">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">總金額 (原幣)</label>
            <input
              type="number"
              placeholder="依該市場幣別"
              value={newRec.amount}
              onChange={(event) => updateNewRecAmount(event.target.value)}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1 min-w-[120px]">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">損益 (賣出填,原幣)</label>
            <input
              type="number"
              placeholder="選填"
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
                取消
              </button>
            )}
            <button
              onClick={handleAddRecord}
              disabled={!newRec.date || !newRec.code || !newRec.qty || !newRec.amount}
              className="flex items-center justify-center bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed h-[38px] min-w-[80px]"
            >
              {editingIndex !== null ? '儲存變更' : '加入'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-h-[350px] overflow-y-auto border border-slate-100 dark:border-slate-800 rounded-xl">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 sticky top-0 shadow-sm z-10">
            <tr>
              <th className="px-4 py-3 font-semibold">日期</th>
              <th className="px-4 py-3 font-semibold">類型</th>
              <th className="px-4 py-3 font-semibold">代號 / 股名 (市場)</th>
              <th className="px-4 py-3 font-semibold text-right">數量</th>
              <th className="px-4 py-3 font-semibold text-right">單價(原幣)</th>
              <th className="px-4 py-3 font-semibold text-right">總金額(原幣)</th>
              <th className="px-4 py-3 font-semibold text-right">損益(原幣)</th>
              <th className="px-4 py-3 font-semibold text-center w-16">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {rawData
              .map((row, originalIndex) => ({ ...row, originalIndex }))
              .sort((a, b) => new Date(b['日期'] || 0) - new Date(a['日期'] || 0))
              .map((row) => {
                let market = row['市場'] || '未知';
                if (market === '未知' || !market) {
                  market = guessMarket(row['代號']);
                }

                const symbol = formatSymbol(row['代號'], market);
                const resolvedName = liveData[symbol]?.name || STOCK_MAPPING[symbol]?.name || '未知';

                return (
                  <tr key={row.originalIndex} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-2 text-slate-600 dark:text-slate-400">{formatDate(row['日期'])}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          row['類型'] === '買入'
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                            : 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                        }`}
                      >
                        {row['類型']}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        {symbol}
                        <span className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded">
                          {market}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{resolvedName}</div>
                    </td>
                    <td className="px-4 py-2 text-right text-slate-700 dark:text-slate-300">{row['數量']}</td>
                    <td className="px-4 py-2 text-right text-slate-500 dark:text-slate-400">{row['單價']}</td>
                    <td className="px-4 py-2 text-right font-medium text-slate-800 dark:text-slate-200">{row['總金額']}</td>
                    <td className="px-4 py-2 text-right text-slate-500 dark:text-slate-400">{row['損益'] || '-'}</td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEditRecord(row.originalIndex)}
                          className="text-slate-400 hover:text-blue-500 transition-colors p-1"
                          title="編輯"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteRecord(row.originalIndex)}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                          title="刪除"
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
                  目前沒有任何紀錄
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
