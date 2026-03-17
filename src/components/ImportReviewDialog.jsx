import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, ArrowRightLeft, Plus, X } from 'lucide-react';
import { normalizeLocale } from '../locales/config';
import { formatLocalizedNumber } from '../utils/localization';

export default function ImportReviewDialog({
  backupBeforeApply,
  currentRowCount,
  onAppend,
  onCancel,
  onReplace,
  pendingImport,
  setBackupBeforeApply
}) {
  const { t, i18n } = useTranslation();
  const activeLocale = normalizeLocale(i18n.resolvedLanguage || i18n.language);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onCancel]);

  if (!pendingImport) {
    return null;
  }

  const getLocalizedProfileLabel = () => (
    pendingImport.meta.profileLabelKey
      ? t(pendingImport.meta.profileLabelKey, { defaultValue: pendingImport.meta.profileLabel })
      : pendingImport.meta.profileLabel
  );
  const getLocalizedImportKindLabel = () => (
    pendingImport.meta.importKind === 'positions'
      ? t('header.importKindPositions', { defaultValue: 'Positions snapshot' })
      : t('header.importKindTrades', { defaultValue: 'Trades' })
  );
  const getLocalizedDelimiterLabel = () => (
    pendingImport.meta.delimiterLabel === 'tab'
      ? t('header.csvDelimiters.tab', { defaultValue: 'tab' })
      : pendingImport.meta.delimiterLabel
  );
  const getLocalizedSelectionModeLabel = () => (
    pendingImport.meta.selectionMode === 'manual'
      ? t('header.importModeManualOverride', { defaultValue: 'Manual preset' })
      : t('header.importModeAutoDetected', { defaultValue: 'Auto-detected' })
  );

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 px-6 py-5">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-amber-50 dark:bg-amber-900/20 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
              <AlertTriangle size={14} />
              {t('app.importReviewBadge', { defaultValue: 'Import review' })}
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {t('app.importReviewTitle', { defaultValue: 'How should this CSV be applied?' })}
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {t('app.importReviewIntro', {
                defaultValue: 'You already have portfolio data in this browser. Choose whether to replace it or append only the new rows.'
              })}
            </p>
          </div>

          <button
            onClick={onCancel}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            title={t('common.close')}
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-6 px-6 py-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 p-4">
              <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-sm">
                <span className="text-slate-500 dark:text-slate-400">{t('app.importReviewFile', { defaultValue: 'File' })}</span>
                <span className="truncate text-right font-medium text-slate-700 dark:text-slate-200">{pendingImport.fileName || 'CSV'}</span>

                <span className="text-slate-500 dark:text-slate-400">{t('app.importReviewProfile', { defaultValue: 'Detected parser' })}</span>
                <span className="text-right font-medium text-slate-700 dark:text-slate-200">{getLocalizedProfileLabel()}</span>

                <span className="text-slate-500 dark:text-slate-400">{t('app.importReviewMode', { defaultValue: 'Parser mode' })}</span>
                <span className="text-right font-medium text-slate-700 dark:text-slate-200">{getLocalizedSelectionModeLabel()}</span>

                <span className="text-slate-500 dark:text-slate-400">{t('app.importReviewKind', { defaultValue: 'Import kind' })}</span>
                <span className="text-right font-medium text-slate-700 dark:text-slate-200">{getLocalizedImportKindLabel()}</span>

                <span className="text-slate-500 dark:text-slate-400">{t('app.importReviewDelimiter', { defaultValue: 'Delimiter' })}</span>
                <span className="text-right font-medium text-slate-700 dark:text-slate-200">{getLocalizedDelimiterLabel()}</span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  {t('app.importReviewExistingRows', { defaultValue: 'Current rows' })}
                </div>
                <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {formatLocalizedNumber(currentRowCount, activeLocale)}
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                  {t('app.importReviewIncomingRows', { defaultValue: 'Incoming rows' })}
                </div>
                <div className="mt-2 text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                  {formatLocalizedNumber(pendingImport.meta.importedRowCount, activeLocale)}
                </div>
              </div>

              <div className="rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-300">
                  {t('app.importReviewSkippedRows', { defaultValue: 'Parser skipped' })}
                </div>
                <div className="mt-2 text-2xl font-bold text-amber-700 dark:text-amber-300">
                  {formatLocalizedNumber(pendingImport.meta.skippedRowCount || 0, activeLocale)}
                </div>
              </div>
            </div>

            <label className="flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 p-4">
              <input
                type="checkbox"
                checked={backupBeforeApply}
                onChange={(event) => setBackupBeforeApply(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <div className="font-medium text-slate-800 dark:text-slate-100">
                  {t('app.importReviewBackupLabel', { defaultValue: 'Export current data as a CSV backup first' })}
                </div>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {t('app.importReviewBackupHelp', {
                    defaultValue: 'If this import turns out weird, you can re-import the backup instead of digging through browser storage.'
                  })}
                </p>
              </div>
            </label>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 text-sm text-blue-900 dark:text-blue-100">
              <div className="font-semibold">{t('app.importReviewAppendTitle', { defaultValue: 'Append unique rows' })}</div>
              <p className="mt-2 leading-6">
                {t('app.importReviewAppendHelp', {
                  defaultValue: 'Adds new rows after your current dataset. Exact duplicate rows are skipped during append instead of being imported twice.'
                })}
              </p>
            </div>

            <div className="rounded-2xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 p-4 text-sm text-rose-900 dark:text-rose-100">
              <div className="font-semibold">{t('app.importReviewReplaceTitle', { defaultValue: 'Replace current data' })}</div>
              <p className="mt-2 leading-6">
                {t('app.importReviewReplaceHelp', {
                  defaultValue: 'Replaces the active dataset with only the rows from this CSV. Use this when the file is meant to become the new source of truth.'
                })}
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={onAppend}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700"
              >
                <Plus size={18} />
                {t('app.importReviewAppendAction', { defaultValue: 'Append unique rows' })}
              </button>

              <button
                onClick={onReplace}
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-medium text-white transition-colors hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
              >
                <ArrowRightLeft size={18} />
                {t('app.importReviewReplaceAction', { defaultValue: 'Replace current data' })}
              </button>

              <button
                onClick={onCancel}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 font-medium text-slate-700 dark:text-slate-300 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                {t('app.importReviewCancel', { defaultValue: 'Cancel' })}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
