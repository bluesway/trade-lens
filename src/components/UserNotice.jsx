import React from 'react';
import { useTranslation } from 'react-i18next';
import { Info, ShieldCheck, Key, Database, Activity, X } from 'lucide-react';

export default function UserNotice({ show, onDismiss }) {
  const { t } = useTranslation();

  if (!show) return null;
  
  return (
    <div className="bg-blue-600 dark:bg-blue-700 text-white p-6 rounded-2xl shadow-lg border border-blue-400/30 relative overflow-hidden group">
      <button 
        onClick={onDismiss}
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-20"
        title={t('notice.dismiss')}
      >
        <X size={20} />
      </button>
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center relative z-10">
        <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm hidden md:block">
          <Info size={32} className="text-blue-100" />
        </div>
        <div className="flex-1 space-y-2">
          <h2 className="text-xl font-bold flex items-center gap-2">
            {t('notice.title')}
          </h2>
          <p className="text-blue-50 text-sm leading-relaxed max-w-4xl">
            {t('notice.body')}
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <ShieldCheck size={14} className="text-emerald-300" />
              <span>{t('notice.privacy')}</span>
            </div>
            <div className="flex items-center gap-2 text-xs bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <Key size={14} className="text-amber-300" />
              <span>{t('notice.apiKey')}</span>
            </div>
            <a 
              href="https://github.com/bluesway/trade-lens/"
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg border border-white/20 transition-colors cursor-pointer"
            >
              <Database size={14} className="text-blue-200" />
              <span>{t('notice.sourceCode')}</span>
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
