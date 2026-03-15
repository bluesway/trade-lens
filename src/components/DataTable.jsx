import React from 'react';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Edit2,
  Save,
  X
} from 'lucide-react';
import { formatDate } from '../utils/helpers';

export default function DataTable({
  availableMarkets,
  cancelEditingStock,
  displayData,
  editingStockSymbol,
  expandedStock,
  formatOriginalCurrency,
  formatPercent,
  handleSaveManualStock,
  historySortConfig,
  marketFilter,
  requestSort,
  setExpandedStock,
  setMarketFilter,
  setTempStockEdit,
  startEditingStock,
  tempStockEdit
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            各股歷史交易記錄
          </h3>
          <span className="text-xs font-normal text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded w-fit">
            點擊列可查看買賣明細，金額皆為該市場原幣別
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {['全部', ...availableMarkets].map((market) => (
            <button
              key={market}
              onClick={() => setMarketFilter(market)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                marketFilter === market
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {market}
            </button>
          ))}
        </div>
      </div>

      <div className="hidden md:block overflow-auto max-h-[calc(100vh-100px)] custom-scrollbar">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 z-30 shadow-sm">
            <tr>
              <th className="w-10 sticky top-0 bg-slate-50 dark:bg-slate-800 z-30" />
              <th
                className="px-6 py-4 font-semibold cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors sticky top-0 bg-slate-50 dark:bg-slate-800 z-30"
                onClick={() => requestSort('代號')}
              >
                <div className="flex items-center gap-1">
                  代號 / 股名 (市場·幣別)
                  {historySortConfig?.key === '代號'
                    ? (historySortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)
                    : <ArrowUpDown size={14} className="opacity-50" />}
                </div>
              </th>
              <th
                className="px-6 py-4 font-semibold text-right cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors sticky top-0 bg-slate-50 dark:bg-slate-800 z-30"
                onClick={() => requestSort('持股數')}
              >
                <div className="flex items-center justify-end gap-1">
                  當前持股數
                  {historySortConfig?.key === '持股數'
                    ? (historySortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)
                    : <ArrowUpDown size={14} className="opacity-50" />}
                </div>
              </th>
              <th
                className="px-6 py-4 font-semibold text-right cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors sticky top-0 bg-slate-50 dark:bg-slate-800 z-30"
                onClick={() => requestSort('市值')}
              >
                <div className="flex items-center justify-end gap-1">
                  目前股價 / 市值(原幣)
                  {historySortConfig?.key === '市值'
                    ? (historySortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)
                    : <ArrowUpDown size={14} className="opacity-50" />}
                </div>
              </th>
              <th
                className="px-6 py-4 font-semibold text-right cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors sticky top-0 bg-slate-50 dark:bg-slate-800 z-30"
                onClick={() => requestSort('未實現')}
              >
                <div className="flex items-center justify-end gap-1">
                  未實現損益(原幣)
                  {historySortConfig?.key === '未實現'
                    ? (historySortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)
                    : <ArrowUpDown size={14} className="opacity-50" />}
                </div>
              </th>
              <th
                className="px-6 py-4 font-semibold text-right cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors sticky top-0 bg-slate-50 dark:bg-slate-800 z-30"
                onClick={() => requestSort('已實現')}
              >
                <div className="flex items-center justify-end gap-1">
                  實際已實現(原幣)
                  {historySortConfig?.key === '已實現'
                    ? (historySortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)
                    : <ArrowUpDown size={14} className="opacity-50" />}
                </div>
              </th>
              <th className="px-6 py-4 font-semibold text-right border-l border-slate-200 dark:border-slate-700 sticky top-0 bg-slate-50 dark:bg-slate-800 z-30">
                若今天才賣(原幣)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {displayData.map((stock) => {
              const percentDiff = stock.realizedPnlPercent - stock.ifSoldTodayPnlPercent;
              const hasSold = stock.totalSoldQty > 0;
              const currencySymbol = stock.currencySymbol;
              const isExpanded = expandedStock === stock.symbol;

              return (
                <React.Fragment key={stock.symbol}>
                  <tr
                    className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${
                      isExpanded ? 'bg-slate-50 dark:bg-slate-900/50' : ''
                    }`}
                    onClick={() => setExpandedStock(isExpanded ? null : stock.symbol)}
                  >
                    <td className="pl-4 text-slate-400">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2" onClick={(event) => event.stopPropagation()}>
                        {editingStockSymbol === stock.symbol ? (
                          <div className="flex flex-col gap-1">
                            <input
                              type="text"
                              value={tempStockEdit.name}
                              onChange={(event) => setTempStockEdit({ ...tempStockEdit, name: event.target.value })}
                              className="px-2 py-1 border border-slate-300 dark:border-slate-600 rounded text-xs w-28 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                              placeholder="手動股名"
                            />
                            <div className="flex gap-1">
                              <button onClick={() => handleSaveManualStock(stock.symbol)} className="bg-blue-600 text-white p-1 rounded hover:bg-blue-700">
                                <Save size={14} />
                              </button>
                              <button
                                onClick={cancelEditingStock}
                                className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 p-1 rounded hover:bg-slate-300 dark:hover:bg-slate-600"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            {stock.symbol}
                            <span className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded">
                              {stock.market} &middot; {stock.currency}
                            </span>
                            <button onClick={(event) => {
                              event.stopPropagation();
                              startEditingStock(stock);
                            }}
                            className="text-slate-300 hover:text-blue-500 ml-1"
                            >
                              <Edit2 size={12} />
                            </button>
                          </>
                        )}
                      </div>
                      {editingStockSymbol !== stock.symbol && (
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1 group/name relative cursor-help">
                          {stock.name}
                          {stock.isManualName && (
                            <span className="px-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded text-[10px]">
                              手動
                            </span>
                          )}
                          <div className="absolute left-0 bottom-full mb-1 hidden group-hover/name:block bg-slate-800 dark:bg-slate-700 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-50 shadow-lg border border-white/10">
                            {stock.isManualName ? '手動修改於: ' : 'API 最後更新: '}
                            {stock.lastUpdateTimestamp ? new Date(stock.lastUpdateTimestamp).toLocaleString() : '尚未更新'}
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-slate-700 dark:text-slate-300">
                      {stock.holdingQty.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-medium text-slate-800 dark:text-slate-200">
                        {stock.currentValueOriginal > 0 ? formatOriginalCurrency(stock.currentValueOriginal, currencySymbol) : '-'}
                      </div>
                      <div
                        className="text-xs text-slate-400 dark:text-slate-500 mt-1 flex items-center justify-end gap-1 group/price relative cursor-help"
                        onClick={(event) => event.stopPropagation()}
                      >
                        {editingStockSymbol === stock.symbol ? (
                          <input
                            type="number"
                            value={tempStockEdit.price}
                            onChange={(event) => setTempStockEdit({ ...tempStockEdit, price: event.target.value })}
                            className="px-1 py-1 border border-slate-300 dark:border-slate-600 rounded w-20 text-right text-xs bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="現價"
                          />
                        ) : (
                          <>
                            {stock.isManualPrice && (
                              <span className="px-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded text-[10px] mr-1">
                                手動
                              </span>
                            )}
                            <span>{stock.currentPrice > 0 ? `@ ${currencySymbol}${stock.currentPrice.toFixed(2)}` : '-'}</span>
                            <div className="absolute right-0 bottom-full mb-1 hidden group-hover/price:block bg-slate-800 dark:bg-slate-700 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-50 shadow-lg border border-white/10">
                              {stock.isManualPrice ? '手動修改於: ' : 'API 最後更新: '}
                              {stock.lastUpdateTimestamp ? new Date(stock.lastUpdateTimestamp).toLocaleString() : '尚未更新'}
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {stock.holdingQty > 0 ? (
                        <div className={`flex flex-col items-end ${
                          stock.unrealizedPnlOriginal > 0
                            ? 'text-blue-600 dark:text-blue-400'
                            : stock.unrealizedPnlOriginal < 0
                              ? 'text-rose-600 dark:text-rose-400'
                              : 'text-slate-500 dark:text-slate-400'
                        }`}
                        >
                          <span className="font-bold">
                            {stock.unrealizedPnlOriginal > 0 ? '+' : ''}
                            {formatOriginalCurrency(stock.unrealizedPnlOriginal, currencySymbol)}
                          </span>
                          <span className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded mt-1">
                            {formatPercent(stock.unrealizedPnlPercent)}
                          </span>
                        </div>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {(stock.realizedPnlOriginal !== 0 || stock.tradeCount > 0) ? (
                        <div className={`flex flex-col items-end ${
                          stock.realizedPnlOriginal > 0
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : stock.realizedPnlOriginal < 0
                              ? 'text-rose-600 dark:text-rose-400'
                              : 'text-slate-500 dark:text-slate-400'
                        }`}
                        >
                          <span className="font-bold">
                            {stock.realizedPnlOriginal > 0 ? '+' : ''}
                            {stock.realizedPnlOriginal !== 0 ? formatOriginalCurrency(stock.realizedPnlOriginal, currencySymbol) : '-'}
                          </span>
                          {stock.realizedPnlPercent !== 0 && (
                            <span className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded mt-1">
                              {formatPercent(stock.realizedPnlPercent)}
                            </span>
                          )}
                        </div>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 text-right border-l border-slate-200 dark:border-slate-700">
                      {hasSold ? (
                        <div className={`flex flex-col items-end ${
                          stock.ifSoldTodayPnlOriginal > 0
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : stock.ifSoldTodayPnlOriginal < 0
                              ? 'text-rose-600 dark:text-rose-400'
                              : 'text-slate-500 dark:text-slate-400'
                        }`}
                        >
                          <span className="font-bold opacity-75">
                            {stock.ifSoldTodayPnlOriginal > 0 ? '+' : ''}
                            {formatOriginalCurrency(stock.ifSoldTodayPnlOriginal, currencySymbol)}
                          </span>
                          <div className="mt-1 flex items-center gap-1">
                            {percentDiff > 7 ? (
                              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded font-medium whitespace-nowrap">
                                成功避險 (+{percentDiff.toFixed(2)}%)
                              </span>
                            ) : percentDiff < -7 ? (
                              <span className="text-[10px] bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 px-1.5 py-0.5 rounded font-medium whitespace-nowrap">
                                少賺賣飛 ({percentDiff.toFixed(2)}%)
                              </span>
                            ) : null}
                          </div>
                        </div>
                      ) : '-'}
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr className="bg-slate-50 dark:bg-slate-800/50">
                      <td colSpan="8" className="px-6 py-4 p-0 border-b border-slate-200 dark:border-slate-700">
                        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden shadow-sm m-2">
                          <table className="w-full text-xs text-left">
                            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              <tr>
                                <th className="px-4 py-2 font-semibold">日期</th>
                                <th className="px-4 py-2 font-semibold">類型</th>
                                <th className="px-4 py-2 font-semibold text-right">數量</th>
                                <th className="px-4 py-2 font-semibold text-right">單價</th>
                                <th className="px-4 py-2 font-semibold text-right">總金額</th>
                                <th className="px-4 py-2 font-semibold text-right">損益</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                              {stock.history.map((historyRow, index) => (
                                <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                                  <td className="px-4 py-2 text-slate-600 dark:text-slate-400">{formatDate(historyRow['日期'])}</td>
                                  <td className="px-4 py-2">
                                    <span
                                      className={`px-1.5 py-0.5 rounded font-medium ${
                                        historyRow['類型'] === '買入'
                                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                                          : 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                                      }`}
                                    >
                                      {historyRow['類型']}
                                    </span>
                                  </td>
                                  <td className="px-4 py-2 text-right text-slate-700 dark:text-slate-300">{historyRow['數量']}</td>
                                  <td className="px-4 py-2 text-right text-slate-700 dark:text-slate-300">{historyRow['單價']}</td>
                                  <td className="px-4 py-2 text-right font-medium text-slate-800 dark:text-slate-200">{historyRow['總金額']}</td>
                                  <td className="px-4 py-2 text-right text-slate-500 dark:text-slate-400">{historyRow['損益'] || '-'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="md:hidden flex flex-col bg-slate-50 dark:bg-slate-900/50 p-3 gap-3">
        {displayData.map((stock) => {
          const currencySymbol = stock.currencySymbol;
          const isExpanded = expandedStock === stock.symbol;

          return (
            <div key={stock.symbol} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden">
              <div
                className="p-4 flex flex-col gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                onClick={() => setExpandedStock(isExpanded ? null : stock.symbol)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-slate-800 dark:text-slate-200 text-lg flex items-center gap-2">
                      {stock.symbol}
                      <span className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded">
                        {stock.market} &middot; {stock.currency}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{stock.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-800 dark:text-slate-200 text-lg">
                      {stock.currentValueOriginal > 0 ? formatOriginalCurrency(stock.currentValueOriginal, currencySymbol) : '-'}
                    </div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      {stock.currentPrice > 0 ? `@ ${currencySymbol}${stock.currentPrice.toFixed(2)}` : '-'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-sm pt-3 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">持股數</span>
                    <span className="font-medium text-slate-700 dark:text-slate-200 mt-0.5">{stock.holdingQty.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">未實現損益</span>
                    {stock.holdingQty > 0 ? (
                      <div className={`flex flex-col items-end mt-0.5 ${
                        stock.unrealizedPnlOriginal > 0
                          ? 'text-blue-600 dark:text-blue-400'
                          : stock.unrealizedPnlOriginal < 0
                            ? 'text-rose-600 dark:text-rose-400'
                            : 'text-slate-500 dark:text-slate-400'
                      }`}
                      >
                        <span className="font-bold text-xs">
                          {stock.unrealizedPnlOriginal > 0 ? '+' : ''}
                          {formatOriginalCurrency(stock.unrealizedPnlOriginal, currencySymbol)}
                        </span>
                        <span className="text-[10px] leading-none mt-1">{formatPercent(stock.unrealizedPnlPercent)}</span>
                      </div>
                    ) : <span className="mt-0.5 text-slate-400 dark:text-slate-500">-</span>}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">已實現損益</span>
                    {(stock.realizedPnlOriginal !== 0 || stock.tradeCount > 0) ? (
                      <div className={`flex flex-col items-end mt-0.5 ${
                        stock.realizedPnlOriginal > 0
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : stock.realizedPnlOriginal < 0
                            ? 'text-rose-600 dark:text-rose-400'
                            : 'text-slate-500 dark:text-slate-400'
                      }`}
                      >
                        <span className="font-bold text-xs">
                          {stock.realizedPnlOriginal > 0 ? '+' : ''}
                          {stock.realizedPnlOriginal !== 0 ? formatOriginalCurrency(stock.realizedPnlOriginal, currencySymbol) : '-'}
                        </span>
                        {stock.realizedPnlPercent !== 0 && (
                          <span className="text-[10px] leading-none mt-1">{formatPercent(stock.realizedPnlPercent)}</span>
                        )}
                      </div>
                    ) : <span className="mt-0.5 text-slate-400 dark:text-slate-500">-</span>}
                  </div>
                </div>

                <div className="flex justify-center mt-1 text-slate-300 dark:text-slate-600">
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {isExpanded && (
                <div className="bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-700 p-3">
                  <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                    交易明細
                  </div>
                  <div className="flex flex-col gap-2">
                    {stock.history.map((historyRow, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs flex justify-between items-center shadow-sm"
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-1.5 py-0.5 text-[10px] rounded font-medium ${
                                historyRow['類型'] === '買入'
                                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                                  : 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                              }`}
                            >
                              {historyRow['類型']}
                            </span>
                            <span className="text-slate-500 dark:text-slate-400">{formatDate(historyRow['日期'])}</span>
                          </div>
                          <div className="text-slate-600 dark:text-slate-400">
                            <span className="font-medium">{historyRow['數量']}</span> 股 @ <span>{historyRow['單價']}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="font-bold text-slate-700 dark:text-slate-200">{historyRow['總金額']}</span>
                          {historyRow['類型'] === '賣出' && historyRow['損益'] && (
                            <span className={`font-medium ${parseFloat(historyRow['損益']) > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                              {parseFloat(historyRow['損益']) > 0 ? '+' : ''}
                              {historyRow['損益']}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
