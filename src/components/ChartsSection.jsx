import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { Camera } from 'lucide-react';
import { TREND_RANGE_TRANSLATION_KEYS, normalizeLocale } from '../locales/config';
import { COLORS } from '../utils/constants';
import {
  formatLocalizedCompactNumber,
  formatLocalizedPercent
} from '../utils/localization';

export default function ChartsSection({
  barChartRef,
  baseCurrency,
  chartData,
  darkMode,
  exportChartAsImage,
  formatBaseCurrency,
  pieChartRef,
  setTrendTimeRange,
  trendChartRef,
  trendData,
  trendTimeRange
}) {
  const { t, i18n } = useTranslation();
  const activeLocale = normalizeLocale(i18n.resolvedLanguage || i18n.language);
  const timeRangeKeys = ['1週', '1月', '3月', '半年', 'YTD', '1年', '5年', '全部'];

  const pnlGradientOffset = useMemo(() => {
    if (!trendData || trendData.length === 0) return 0;

    const dataMax = Math.max(...trendData.map((item) => item.realizedPnlBase));
    const dataMin = Math.min(...trendData.map((item) => item.realizedPnlBase));

    if (dataMax <= 0) return 0;
    if (dataMin >= 0) return 1;

    return dataMax / (dataMax - dataMin);
  }, [trendData]);

  const CustomTooltip = ({ active, label, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-900 p-3 border border-slate-200 dark:border-slate-700 shadow-lg rounded-lg z-50">
          <p className="font-bold text-slate-800 dark:text-slate-200 mb-2 border-b border-slate-200 dark:border-slate-700 pb-1">
            {label}
          </p>
          {payload.map((entry, index) => (
            <p
              key={index}
              className="text-sm flex justify-between gap-4 font-medium"
              style={{ color: entry.color || entry.fill }}
            >
              <span>{entry.name}:</span>
              <span>{formatBaseCurrency(entry.value)}</span>
            </p>
          ))}
        </div>
      );
    }

    return null;
  };

  const renderCustomLegend = ({ payload }) => (
    <ul className="flex justify-center gap-6 pt-4">
      {payload.map((entry, index) => {
        const isIfSoldToday = entry.dataKey === 'ifSoldTodayPnlBase';

        return (
          <li key={`item-${index}`} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
            <div
              className={`w-4 h-4 rounded-[2px] ${
                isIfSoldToday ? 'border-2 border-dashed border-slate-400 bg-slate-200/50 dark:bg-slate-700/50' : ''
              }`}
              style={{ backgroundColor: isIfSoldToday ? undefined : entry.color || entry.fill }}
            />
            <span>{t('charts.legendConverted', { label: entry.value })}</span>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800" ref={trendChartRef}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            {t('charts.trendTitle')}
            <button
              onClick={() => exportChartAsImage(trendChartRef, 'net_worth_trend')}
              className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-md transition-all"
              title={t('charts.saveImage')}
            >
              <Camera size={16} />
            </button>
          </h3>
          <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {timeRangeKeys.map((timeRange) => (
              <button
                key={timeRange}
                onClick={() => setTrendTimeRange(timeRange)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                  trendTimeRange === timeRange
                    ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                {t(TREND_RANGE_TRANSLATION_KEYS[timeRange])}
              </button>
            ))}
          </div>
        </div>
        <div className="h-72">
          {trendData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPnlSplit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset={pnlGradientOffset} stopColor="#10b981" stopOpacity={0.1} />
                    <stop offset={pnlGradientOffset} stopColor="#ef4444" stopOpacity={0.1} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? '#334155' : '#E2E8F0'} />
                <XAxis
                  dataKey="displayDate"
                  tick={{ fontSize: 12, fill: darkMode ? '#94a3b8' : '#64748b' }}
                  tickMargin={10}
                  minTickGap={30}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="left"
                  tickFormatter={(value) => formatLocalizedCompactNumber(value, activeLocale)}
                  tick={{ fontSize: 11, fill: '#818cf8' }}
                  orientation="left"
                  stroke="#818cf8"
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                    tick={(props) => {
                      const { payload, x, y } = props;
                      const value = payload.value;
                      const isNegative = value < 0;
                      const fill = isNegative ? '#ef4444' : '#10b981';
                      const formattedValue = formatLocalizedCompactNumber(value, activeLocale);

                      return (
                        <text x={x} y={y} dy={4} fill={fill} fontSize={11} textAnchor="start">
                        {formattedValue}
                      </text>
                    );
                  }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: darkMode ? '#1e293b' : '#f1f5f9' }} />
                <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '20px' }} />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="costBase"
                  name={t('charts.costSeries')}
                  stroke="#818cf8"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorCost)"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="realizedPnlBase"
                  name={t('charts.realizedSeries')}
                  stroke="url(#colorPnlSplit)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPnlSplit)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-slate-400 dark:text-slate-500">
              {t('charts.noTrend')}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800" ref={barChartRef}>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {t('charts.realizedTitle')}
              <button
                onClick={() => exportChartAsImage(barChartRef, 'realized_pnl_chart')}
                className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-md transition-all"
                title={t('charts.saveImage')}
              >
                <Camera size={16} />
              </button>
            </div>
            <span className="text-xs font-normal text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
              {t('charts.convertedNote', { currency: baseCurrency })}
            </span>
          </h3>
          <div className="h-80">
            {chartData.pnlData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.pnlData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? '#334155' : '#E2E8F0'} />
                  <XAxis
                    xAxisId={0}
                    dataKey="name"
                    tick={{ fontSize: 12, fill: darkMode ? '#94a3b8' : '#64748b' }}
                    tickFormatter={(value) => (value.length > 4 ? `${value.substring(0, 4)}..` : value)}
                  />
                  <XAxis xAxisId={1} dataKey="name" hide />
                  <YAxis
                    tickFormatter={(value) => formatLocalizedCompactNumber(value, activeLocale)}
                    tick={{ fontSize: 12, fill: darkMode ? '#94a3b8' : '#64748b' }}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: darkMode ? '#1e293b' : '#f1f5f9' }} />
                  <Legend content={renderCustomLegend} verticalAlign="top" wrapperStyle={{ paddingBottom: '20px' }} />
                  <Bar xAxisId={1} dataKey="ifSoldTodayPnlBase" name={t('charts.ifSoldSeries')} radius={[4, 4, 0, 0]}>
                    {chartData.pnlData.map((entry, index) => (
                      <Cell
                        key={`cell-if-${index}`}
                        fill={entry.ifSoldTodayPnlBase >= 0 ? '#10B981' : '#EF4444'}
                        fillOpacity={0.25}
                        stroke={entry.ifSoldTodayPnlBase >= 0 ? '#10B981' : '#EF4444'}
                        strokeDasharray="4 4"
                        strokeWidth={1.5}
                      />
                    ))}
                  </Bar>
                  <Bar xAxisId={0} dataKey="realizedPnlBase" name={t('charts.actualSeries')} radius={[4, 4, 0, 0]}>
                    {chartData.pnlData.map((entry, index) => (
                      <Cell key={`cell-actual-${index}`} fill={entry.realizedPnlBase >= 0 ? '#10B981' : '#EF4444'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400 dark:text-slate-500">
                {t('charts.noPnlData')}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800" ref={pieChartRef}>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {t('charts.distributionTitle')}
              <button
                onClick={() => exportChartAsImage(pieChartRef, 'portfolio_distribution')}
                className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-md transition-all"
                title={t('charts.saveImage')}
              >
                <Camera size={16} />
              </button>
            </div>
            <span className="text-xs font-normal text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
              {t('charts.convertedNote', { currency: baseCurrency })}
            </span>
          </h3>
          <div className="h-80">
            {chartData.holdingData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData.holdingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="currentValueBase"
                    nameKey="name"
                    labelLine
                    label={({ name, percent }) => `${String(name).slice(0, 4)} ${formatLocalizedPercent(percent * 100, activeLocale, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    })}`}
                  >
                    {chartData.holdingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400 dark:text-slate-500">
                {t('charts.noHoldings')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
