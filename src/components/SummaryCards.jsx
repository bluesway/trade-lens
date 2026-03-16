import React from 'react';
import { useTranslation } from 'react-i18next';
import { Activity, DollarSign, Layers, TrendingDown, TrendingUp } from 'lucide-react';
import { normalizeLocale } from '../locales/config';
import { formatLocalizedNumber } from '../utils/localization';

export default function SummaryCards({
  formatBaseCurrency,
  formatPercent,
  holdingCount,
  overallRealizedPercent,
  overallUnrealizedPercent,
  summary
}) {
  const { t, i18n } = useTranslation();
  const activeLocale = normalizeLocale(i18n.resolvedLanguage || i18n.language);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-center gap-2 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 text-slate-50 opacity-50"><TrendingUp size={100} /></div>
        <div className="flex items-center gap-3 relative z-10">
          <div className={`p-3 rounded-full ${summary.totalRealizedPnl >= 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
            {summary.totalRealizedPnl >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('summary.totalRealized')}</p>
        </div>
        <div className="flex items-baseline gap-2 mt-2 relative z-10">
          <h3 className={`text-2xl font-bold ${summary.totalRealizedPnl >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {summary.totalRealizedPnl > 0 ? '+' : ''}
            {formatBaseCurrency(summary.totalRealizedPnl)}
          </h3>
          <span className={`text-sm font-semibold px-2 py-0.5 rounded-md ${summary.totalRealizedPnl >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            {formatPercent(overallRealizedPercent)}
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-center gap-2 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 text-slate-50 opacity-50"><Activity size={100} /></div>
        <div className="flex items-center gap-3 relative z-10">
          <div className={`p-3 rounded-full ${summary.totalUnrealizedPnl >= 0 ? 'bg-blue-100 text-blue-600' : 'bg-rose-100 text-rose-600'}`}>
            {summary.totalUnrealizedPnl >= 0 ? <Activity size={20} /> : <TrendingDown size={20} />}
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('summary.totalUnrealized')}</p>
        </div>
        <div className="flex items-baseline gap-2 mt-2 relative z-10">
          <h3 className={`text-2xl font-bold ${summary.totalUnrealizedPnl >= 0 ? 'text-blue-600' : 'text-rose-600'}`}>
            {summary.totalUnrealizedPnl > 0 ? '+' : ''}
            {formatBaseCurrency(summary.totalUnrealizedPnl)}
          </h3>
          <span className={`text-sm font-semibold px-2 py-0.5 rounded-md ${summary.totalUnrealizedPnl >= 0 ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-600'}`}>
            {formatPercent(overallUnrealizedPercent)}
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-center gap-2">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            <DollarSign size={20} />
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('summary.totalValue')}</p>
        </div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-2">
          {formatBaseCurrency(summary.totalValue)}
        </h3>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-center gap-2">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
            <Layers size={20} />
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('summary.holdingCount')}</p>
        </div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-2">
          {formatLocalizedNumber(holdingCount, activeLocale)} <span className="text-base font-normal text-slate-500 dark:text-slate-400">{t('summary.holdingUnit')}</span>
        </h3>
      </div>
    </div>
  );
}
