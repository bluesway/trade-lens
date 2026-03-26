import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Trash2, ArrowRight, AlertTriangle } from 'lucide-react';
import { MANUAL_MARKET_OPTIONS } from '../utils/helpers';
import { DEFAULT_SYMBOL_OVERRIDES } from '../utils/constants';

const EMPTY_FORM = {
  type: 'alias',
  sourceCode: '',
  sourceMarket: '',
  aliasCode: '',
  aliasMarket: '',
  delistDate: '',
  delistPrice: '',
  note: '',
};

export default function SymbolOverridesPanel({ symbolOverrides, addSymbolOverride, deleteSymbolOverride }) {
  const { t } = useTranslation();
  const [form, setForm] = useState(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const isFormValid = () => {
    if (!form.sourceCode.trim()) return false;
    if (form.type === 'alias') return Boolean(form.aliasCode.trim());
    if (form.type === 'delist') return Boolean(form.delistDate) && Number(form.delistPrice) > 0;
    return false;
  };

  const handleAdd = () => {
    if (!isFormValid()) return;
    addSymbolOverride({
      type: form.type,
      sourceCode: form.sourceCode.trim().toUpperCase(),
      sourceMarket: form.sourceMarket,
      aliasCode: form.type === 'alias' ? form.aliasCode.trim().toUpperCase() : '',
      aliasMarket: form.type === 'alias' ? form.aliasMarket : '',
      delistDate: form.type === 'delist' ? form.delistDate : '',
      delistPrice: form.type === 'delist' ? Number(form.delistPrice) : 0,
      note: form.note.trim(),
    });
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  const inputCls = 'px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500';
  const selectCls = `${inputCls} cursor-pointer`;

  const renderOverrideDescription = (o) => {
    if (o.type === 'alias') {
      return (
        <span className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
          <span className="font-mono font-bold">{o.sourceCode}</span>
          {o.sourceMarket && <span className="text-xs text-slate-400">({o.sourceMarket})</span>}
          <ArrowRight size={14} className="text-slate-400" />
          <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{o.aliasCode}</span>
          {o.aliasMarket && <span className="text-xs text-slate-400">({o.aliasMarket})</span>}
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
        <span className="font-mono font-bold">{o.sourceCode}</span>
        {o.sourceMarket && <span className="text-xs text-slate-400">({o.sourceMarket})</span>}
        <span className="text-xs text-slate-400 mx-1">
          → {t('manager.symbolOverrides.delistLabel', { defaultValue: 'delist close' })}
        </span>
        <span className="font-mono text-rose-600 dark:text-rose-400">{o.delistDate}</span>
        <span className="text-xs text-slate-400">@ {o.delistPrice}</span>
      </span>
    );
  };

  const hasAnyDelist = DEFAULT_SYMBOL_OVERRIDES.some((o) => o.type === 'delist')
    || symbolOverrides.some((o) => o.type === 'delist');

  return (
    <div className="mt-6 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/60">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <ArrowRight size={15} className="text-amber-500" />
          {t('manager.symbolOverrides.title', { defaultValue: 'Symbol Override Rules' })}
          {symbolOverrides.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-semibold">
              {symbolOverrides.length}
            </span>
          )}
        </h3>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          <Plus size={14} />
          {t('manager.symbolOverrides.addRule', { defaultValue: 'Add Rule' })}
        </button>
      </div>

      {showForm && (
        <div className="px-4 py-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex flex-wrap gap-3">
            <div className="flex-none">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                {t('manager.symbolOverrides.ruleType', { defaultValue: 'Rule Type' })}
              </label>
              <select
                value={form.type}
                onChange={(e) => setField('type', e.target.value)}
                className={selectCls}
              >
                <option value="alias">{t('manager.symbolOverrides.typeAlias', { defaultValue: 'Alias (rename)' })}</option>
                <option value="delist">{t('manager.symbolOverrides.typeDelist', { defaultValue: 'Delist (force close)' })}</option>
              </select>
            </div>
            <div className="flex-1 min-w-[100px]">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                {t('manager.symbolOverrides.sourceCode', { defaultValue: 'Source Symbol' })} *
              </label>
              <input
                type="text"
                placeholder="e.g. 2412"
                value={form.sourceCode}
                onChange={(e) => setField('sourceCode', e.target.value)}
                className={`${inputCls} w-full uppercase`}
              />
            </div>
            <div className="flex-1 min-w-[100px]">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                {t('manager.symbolOverrides.sourceMarket', { defaultValue: 'Source Market (optional)' })}
              </label>
              <select
                value={form.sourceMarket}
                onChange={(e) => setField('sourceMarket', e.target.value)}
                className={`${selectCls} w-full`}
              >
                <option value="">{t('manager.symbolOverrides.anyMarket', { defaultValue: 'Any market' })}</option>
                {MANUAL_MARKET_OPTIONS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          {form.type === 'alias' && (
            <div className="flex flex-wrap gap-3">
              <div className="flex-1 min-w-[100px]">
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  {t('manager.symbolOverrides.targetCode', { defaultValue: 'Target Symbol' })} *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3682"
                  value={form.aliasCode}
                  onChange={(e) => setField('aliasCode', e.target.value)}
                  className={`${inputCls} w-full uppercase`}
                />
              </div>
              <div className="flex-1 min-w-[100px]">
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  {t('manager.symbolOverrides.targetMarket', { defaultValue: 'Target Market (optional)' })}
                </label>
                <select
                  value={form.aliasMarket}
                  onChange={(e) => setField('aliasMarket', e.target.value)}
                  className={`${selectCls} w-full`}
                >
                  <option value="">{t('manager.symbolOverrides.sameAsSource', { defaultValue: 'Same as source' })}</option>
                  {MANUAL_MARKET_OPTIONS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {form.type === 'delist' && (
            <div className="flex flex-wrap gap-3 items-end">
              <div className="flex-1 min-w-[130px]">
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  {t('manager.symbolOverrides.delistDate', { defaultValue: 'Delist Date' })} *
                </label>
                <input
                  type="date"
                  value={form.delistDate}
                  onChange={(e) => setField('delistDate', e.target.value)}
                  className={`${inputCls} w-full`}
                />
              </div>
              <div className="flex-1 min-w-[100px]">
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  {t('manager.symbolOverrides.delistPrice', { defaultValue: 'Last Trade Price' })} *
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  min="0"
                  step="any"
                  value={form.delistPrice}
                  onChange={(e) => setField('delistPrice', e.target.value)}
                  className={`${inputCls} w-full`}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              {t('manager.symbolOverrides.note', { defaultValue: 'Note (optional)' })}
            </label>
            <input
              type="text"
              placeholder="e.g. acquired, renamed..."
              value={form.note}
              onChange={(e) => setField('note', e.target.value)}
              className={`${inputCls} w-full`}
            />
          </div>

          <div className="flex gap-2 justify-end pt-1">
            <button
              onClick={() => { setForm(EMPTY_FORM); setShowForm(false); }}
              className="px-3 py-1.5 text-sm rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {t('common.cancel')}
            </button>
            <button
              onClick={handleAdd}
              disabled={!isFormValid()}
              className="px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('manager.symbolOverrides.add', { defaultValue: 'Add' })}
            </button>
          </div>
        </div>
      )}

      {symbolOverrides.length === 0 && DEFAULT_SYMBOL_OVERRIDES.length === 0 ? (
        <div className="px-4 py-5 text-center text-xs text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900">
          {t('manager.symbolOverrides.emptyHint', { defaultValue: 'No rules yet. Click "Add Rule" to set up ticker aliases or delist close-outs.' })}
        </div>
      ) : (
        <ul className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
          {DEFAULT_SYMBOL_OVERRIDES.map((o) => (
            <li key={o.id} className="flex items-center justify-between px-4 py-3 gap-3 opacity-70">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                    o.type === 'alias'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                      : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
                  }`}
                >
                  {o.type === 'alias' ? 'alias' : 'delist'}
                </span>
                <div className="truncate">{renderOverrideDescription(o)}</div>
                {o.note && (
                  <span className="text-xs text-slate-400 dark:text-slate-500 truncate hidden sm:inline">
                    — {o.note}
                  </span>
                )}
              </div>
              <span className="shrink-0 text-[10px] font-semibold text-slate-400 dark:text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                {t('manager.symbolOverrides.builtIn', { defaultValue: 'built-in' })}
              </span>
            </li>
          ))}
          {symbolOverrides.length === 0 && (
            <li className="px-4 py-3 text-center text-xs text-slate-400 dark:text-slate-500">
              {t('manager.symbolOverrides.noCustomRules', { defaultValue: 'No custom rules yet. Click "Add Rule" to add one.' })}
            </li>
          )}
          {symbolOverrides.map((o) => (
            <li key={o.id} className="flex items-center justify-between px-4 py-3 gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                    o.type === 'alias'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                      : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
                  }`}
                >
                  {o.type === 'alias' ? 'alias' : 'delist'}
                </span>
                <div className="truncate">{renderOverrideDescription(o)}</div>
                {o.note && (
                  <span className="text-xs text-slate-400 dark:text-slate-500 truncate hidden sm:inline">
                    — {o.note}
                  </span>
                )}
              </div>
              <button
                onClick={() => deleteSymbolOverride(o.id)}
                className="shrink-0 text-slate-400 hover:text-rose-500 transition-colors p-1"
                title={t('manager.symbolOverrides.deleteRule', { defaultValue: 'Delete this rule' })}
              >
                <Trash2 size={15} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {hasAnyDelist && (
        <div className="px-4 py-2 bg-amber-50 dark:bg-amber-950/30 border-t border-amber-100 dark:border-amber-900/40 flex items-start gap-2">
          <AlertTriangle size={13} className="text-amber-500 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-700 dark:text-amber-400">
            {t('manager.symbolOverrides.delistAutoNote', { defaultValue: 'Delist rules auto-inject a "sell all" record when computing P&L. Your original data is not modified.' })}
          </p>
        </div>
      )}
    </div>
  );
}
