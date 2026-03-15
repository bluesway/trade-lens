import React, { useState } from 'react';
import { Settings, Save, X, Plus, Trash2, Edit2, Database, Key } from 'lucide-react';
import { formatDate } from '../utils/helpers';

export default function ManagerPanel({ 
  apiKey, 
  setApiKey, 
  baseCurrency, 
  setBaseCurrency, 
  rawData, 
  setRawData, 
  showToast,
  onClose
}) {
  const [newRecord, setNewRecord] = useState({ date: '', type: '買入', code: '', market: '美股', qty: '', amount: '', pnl: '' });
  const [editingIdx, setEditingIdx] = useState(null);

  const handleAddRecord = () => {
    if (!newRecord.date || !newRecord.code || !newRecord.qty || !newRecord.amount) {
      showToast('請填寫完整必填欄位');
      return;
    }
    const updated = [...rawData];
    const record = { ...newRecord, 單價: (parseFloat(newRecord.amount) / parseFloat(newRecord.qty)).toFixed(4) };
    if (editingIdx !== null) {
      updated[editingIdx] = record;
      setEditingIdx(null);
      showToast('紀錄已更新');
    } else {
      updated.push(record);
      showToast('紀錄已新增');
    }
    setRawData(updated);
    setNewRecord({ date: '', type: '買入', code: '', market: '美股', qty: '', amount: '', pnl: '' });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-8">
      <div className="bg-slate-800 dark:bg-slate-950 p-4 text-white flex justify-between items-center">
        <h3 className="font-bold flex items-center gap-2"><Settings size={20} /> 管理面板</h3>
        <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors"><X size={20} /></button>
      </div>
      
      <div className="p-6 space-y-8">
        {/* Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2"><Key size={18} /> API 設定</h4>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">yfapi.net API Key</label>
              <div className="flex gap-2">
                <input type="password" value={apiKey} onChange={e=>setApiKey(e.target.value)} placeholder="輸入您的 API Key" className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2">※ 此金鑰僅儲存於您的瀏覽器本地，用於獲取即時股價與匯率。</p>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2"><Database size={18} /> 偏好設定</h4>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">基準幣別 (換算目標)</label>
              <select value={baseCurrency} onChange={e=>setBaseCurrency(e.target.value)} className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none">
                {['TWD', 'USD', 'HKD', 'CNY', 'JPY'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Add/Edit Form */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
            {editingIdx !== null ? <Edit2 size={18} /> : <Plus size={18} />} 
            {editingIdx !== null ? '編輯交易紀錄' : '手動新增交易紀錄'}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">日期</label>
              <input type="date" value={newRecord.date} onChange={e=>setNewRecord({...newRecord, date: e.target.value})} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">類型</label>
              <select value={newRecord.type} onChange={e=>setNewRecord({...newRecord, type: e.target.value})} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                <option value="買入">買入</option><option value="賣出">賣出</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">代號</label>
              <input type="text" value={newRecord.code} onChange={e=>setNewRecord({...newRecord, code: e.target.value.toUpperCase()})} placeholder="如: 2330" className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">市場</label>
              <select value={newRecord.market} onChange={e=>setNewRecord({...newRecord, market: e.target.value})} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                {['台股', '美股', '港股', '陸股', '日股'].map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">數量</label>
              <input type="number" value={newRecord.qty} onChange={e=>setNewRecord({...newRecord, qty: e.target.value})} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">總金額</label>
              <input type="number" value={newRecord.amount} onChange={e=>setNewRecord({...newRecord, amount: e.target.value})} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
            </div>
            <div className="flex items-end gap-2">
              <button onClick={handleAddRecord} className="flex-1 bg-slate-800 dark:bg-blue-600 hover:bg-slate-900 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium h-[38px]">
                {editingIdx !== null ? '儲存' : '新增'}
              </button>
              {editingIdx !== null && <button onClick={()=>{setEditingIdx(null); setNewRecord({date:'',type:'買入',code:'',market:'美股',qty:'',amount:'',pnl:''})}} className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-2 rounded-lg text-sm h-[38px]"><X size={18}/></button>}
            </div>
          </div>
        </div>

        {/* History Records List */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
           <h4 className="font-bold text-slate-800 dark:text-white mb-4">交易紀錄清單 ({rawData.length})</h4>
           <div className="max-h-96 overflow-y-auto border border-slate-100 dark:border-slate-800 rounded-xl custom-scrollbar">
             <table className="w-full text-left text-sm">
               <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 sticky top-0 shadow-sm">
                 <tr><th className="px-4 py-3">日期</th><th className="px-4 py-3">類型</th><th className="px-4 py-3">代號 (市場)</th><th className="px-4 py-3 text-right">數量</th><th className="px-4 py-3 text-right">總金額</th><th className="px-4 py-3 text-center">操作</th></tr>
               </thead>
               <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                 {rawData.map((r, i) => (
                   <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                     <td className="px-4 py-2 text-slate-600 dark:text-slate-400">{formatDate(r['日期'])}</td>
                     <td className="px-4 py-2"><span className={`px-2 py-0.5 rounded text-[10px] font-medium ${r['類型']==='買入'?'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400':'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'}`}>{r['類型']}</span></td>
                     <td className="px-4 py-2 font-bold text-slate-800 dark:text-white">{r['代號']} <span className="text-[10px] font-normal text-slate-400">({r['市場']})</span></td>
                     <td className="px-4 py-2 text-right text-slate-700 dark:text-slate-300">{r['數量']}</td>
                     <td className="px-4 py-2 text-right text-slate-900 dark:text-white font-medium">{r['總金額']}</td>
                     <td className="px-4 py-2 text-center">
                       <div className="flex justify-center gap-2">
                         <button onClick={()=>{setEditingIdx(i); setNewRecord(r)}} className="text-slate-400 hover:text-blue-500 p-1"><Edit2 size={16}/></button>
                         <button onClick={()=>{if(window.confirm('確定刪除？')){const u=[...rawData]; u.splice(i,1); setRawData(u); showToast('紀錄已刪除')}}} className="text-slate-400 hover:text-rose-500 p-1"><Trash2 size={16}/></button>
                       </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </div>
    </div>
  );
}
