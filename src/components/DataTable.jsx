import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Edit2, Save, X, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { formatDate } from '../utils/helpers';

export default function DataTable({ 
  processedData, 
  marketFilter, 
  setMarketFilter, 
  hideZeroHolding, 
  formatOriginalCurrency, 
  formatPercent, 
  handleSaveManualStock 
}) {
  const [expandedStock, setExpandedStock] = useState(null);
  const [editingStockSymbol, setEditingStockSymbol] = useState(null);
  const [tempStockEdit, setTempStockEdit] = useState({ name: '', price: '' });
  const [sortConfig, setSortConfig] = useState({ key: '已實現', direction: 'desc' });

  const requestSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') direction = 'asc';
    setSortConfig({ key, direction });
  };

  const displayData = useMemo(() => {
    let filtered = [...processedData];
    if (hideZeroHolding) filtered = filtered.filter(s => s.holdingQty > 0);
    if (marketFilter !== '全部') filtered = filtered.filter(s => s.market === marketFilter);
    
    filtered.sort((a, b) => {
      let valA, valB;
      if (sortConfig.key === '市值') { valA = a.currentValueBase; valB = b.currentValueBase; }
      else if (sortConfig.key === '持股數') { valA = a.holdingQty; valB = b.holdingQty; }
      else if (sortConfig.key === '未實現') { valA = a.unrealizedPnlBase; valB = b.unrealizedPnlBase; }
      else if (sortConfig.key === '已實現') { valA = a.realizedPnlBase; valB = b.realizedPnlBase; }
      else if (sortConfig.key === '代號') { valA = a.symbol; valB = b.symbol; }
      else { valA = a.realizedPnlBase; valB = b.realizedPnlBase; }

      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return filtered;
  }, [processedData, hideZeroHolding, marketFilter, sortConfig]);

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return <ArrowUpDown size={14} className="opacity-50" />;
    return sortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">各股歷史交易記錄</h3>
          <span className="text-xs font-normal text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded w-fit">點擊列可查看買賣明細，金額皆為該市場原幣別</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['全部', ...Array.from(new Set(processedData.map(s => s.market))).filter(Boolean)].map(m => (
            <button key={m} onClick={() => setMarketFilter(m)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${marketFilter === m ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      
      {/* Desktop View */}
      <div className="hidden md:block overflow-auto max-h-[calc(100vh-100px)] custom-scrollbar">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 sticky top-0 z-30 shadow-sm">
            <tr>
              <th className="w-10"></th>
              <th className="px-6 py-4 font-semibold cursor-pointer" onClick={() => requestSort('代號')}><div className="flex items-center gap-1">代號 / 股名 (市場·幣別) <SortIcon column="代號" /></div></th>
              <th className="px-6 py-4 font-semibold text-right cursor-pointer" onClick={() => requestSort('持股數')}><div className="flex items-center justify-end gap-1">當前持股數 <SortIcon column="持股數" /></div></th>
              <th className="px-6 py-4 font-semibold text-right cursor-pointer" onClick={() => requestSort('市值')}><div className="flex items-center justify-end gap-1">目前股價 / 市值(原幣) <SortIcon column="市值" /></div></th>
              <th className="px-6 py-4 font-semibold text-right cursor-pointer" onClick={() => requestSort('未實現')}><div className="flex items-center justify-end gap-1">未實現損益(原幣) <SortIcon column="未實現" /></div></th>
              <th className="px-6 py-4 font-semibold text-right cursor-pointer" onClick={() => requestSort('已實現')}><div className="flex items-center justify-end gap-1">實際已實現(原幣) <SortIcon column="已實現" /></div></th>
              <th className="px-6 py-4 font-semibold text-right border-l border-slate-200 dark:border-slate-700">若今天才賣(原幣)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {displayData.map((stock) => {
              const isExpanded = expandedStock === stock.symbol;
              const sym = stock.currencySymbol;
              return (
                <React.Fragment key={stock.symbol}>
                  <tr className={`hover:bg-slate-50 dark:bg-slate-900/50 transition-colors cursor-pointer ${isExpanded ? 'bg-slate-50 dark:bg-slate-900/50' : ''}`} onClick={() => setExpandedStock(isExpanded ? null : stock.symbol)}>
                    <td className="pl-4 text-slate-400">{isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2" onClick={e=>e.stopPropagation()}>
                        {editingStockSymbol === stock.symbol ? (
                          <div className="flex flex-col gap-1">
                            <input type="text" value={tempStockEdit.name} onChange={e=>setTempStockEdit({...tempStockEdit, name: e.target.value})} className="px-2 py-1 border border-slate-300 dark:border-slate-600 rounded text-xs w-28 bg-white dark:bg-slate-700" />
                            <div className="flex gap-1">
                              <button onClick={() => { handleSaveManualStock(stock.symbol, tempStockEdit); setEditingStockSymbol(null); }} className="bg-blue-600 text-white p-1 rounded"><Save size={14}/></button>
                              <button onClick={() => setEditingStockSymbol(null)} className="bg-slate-200 p-1 rounded text-slate-600"><X size={14}/></button>
                            </div>
                          </div>
                        ) : (
                          <>{stock.symbol} <span className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">{stock.market} &middot; {stock.currency}</span>
                            <button onClick={(e) => { e.stopPropagation(); setEditingStockSymbol(stock.symbol); setTempStockEdit({ name: stock.name, price: stock.currentPrice }); }} className="text-slate-300 hover:text-blue-500 ml-1"><Edit2 size={12} /></button>
                          </>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{stock.name} {stock.isManualName && <span className="px-1 bg-amber-100 text-amber-600 rounded text-[10px]">手動</span>}</div>
                    </td>
                    <td className="px-6 py-4 text-right font-medium">{stock.holdingQty.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-medium text-slate-800 dark:text-slate-200">{stock.currentValueOriginal > 0 ? formatOriginalCurrency(stock.currentValueOriginal, sym) : '-'}</div>
                      <div className="text-xs text-slate-400 mt-1" onClick={e=>e.stopPropagation()}>
                        {editingStockSymbol === stock.symbol ? (
                          <input type="number" value={tempStockEdit.price} onChange={e=>setTempStockEdit({...tempStockEdit, price: e.target.value})} className="px-1 py-1 border border-slate-300 rounded w-20 text-right text-xs bg-white dark:bg-slate-700" />
                        ) : <span>{stock.currentPrice > 0 ? `@ ${sym}${stock.currentPrice.toFixed(2)}` : '-'} {stock.isManualPrice && <span className="text-amber-500 text-[10px]">手動</span>}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {stock.holdingQty > 0 ? (
                        <div className={`flex flex-col items-end ${stock.unrealizedPnlOriginal > 0 ? 'text-blue-600' : 'text-rose-600'}`}>
                          <span className="font-bold">{stock.unrealizedPnlOriginal > 0 ? '+' : ''}{formatOriginalCurrency(stock.unrealizedPnlOriginal, sym)}</span>
                          <span className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded mt-1">{formatPercent(stock.unrealizedPnlPercent)}</span>
                        </div>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className={`flex flex-col items-end ${stock.realizedPnlOriginal > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        <span className="font-bold">{stock.realizedPnlOriginal > 0 ? '+' : ''}{formatOriginalCurrency(stock.realizedPnlOriginal, sym)}</span>
                        <span className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded mt-1">{formatPercent(stock.realizedPnlPercent)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right border-l border-slate-200 dark:border-slate-700">
                      <div className={`flex flex-col items-end ${stock.ifSoldTodayPnlOriginal > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        <span className="font-bold opacity-75">{stock.ifSoldTodayPnlOriginal > 0 ? '+' : ''}{formatOriginalCurrency(stock.ifSoldTodayPnlOriginal, sym)}</span>
                      </div>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr className="bg-slate-50 dark:bg-slate-800/50"><td colSpan="8" className="px-6 py-4 p-0">
                      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden shadow-sm m-2">
                        <table className="w-full text-xs text-left">
                          <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            <tr><th className="px-4 py-2">日期</th><th className="px-4 py-2">類型</th><th className="px-4 py-2 text-right">數量</th><th className="px-4 py-2 text-right">單價</th><th className="px-4 py-2 text-right">總金額</th><th className="px-4 py-2 text-right">損益</th></tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">{stock.history.map((h, i) => (
                            <tr key={i} className="hover:bg-slate-50 dark:bg-slate-900/50">
                              <td className="px-4 py-2 text-slate-600 dark:text-slate-400">{formatDate(h['日期'])}</td>
                              <td className="px-4 py-2"><span className={`px-1.5 py-0.5 rounded font-medium ${h['類型'] === '買入' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>{h['類型']}</span></td>
                              <td className="px-4 py-2 text-right">{h['數量']}</td><td className="px-4 py-2 text-right">{h['單價']}</td><td className="px-4 py-2 text-right font-medium">{h['總金額']}</td><td className="px-4 py-2 text-right text-slate-500">{h['損益'] || '-'}</td>
                            </tr>
                          ))}</tbody>
                        </table>
                      </div>
                    </td></tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Mobile View Placeholder (Simplified for brevity) */}
      <div className="md:hidden p-4 text-center text-slate-400 text-sm">手機版請旋轉螢幕或查看桌面版以獲得完整體驗</div>
    </div>
  );
}
