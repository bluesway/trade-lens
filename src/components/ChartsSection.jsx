import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Camera } from 'lucide-react';
import { TREND_RANGE_TRANSLATION_KEYS, normalizeLocale } from '../locales/config';
import { COLORS } from '../utils/constants';
import {
  formatLocalizedCompactNumber,
  formatLocalizedPercent
} from '../utils/localization';

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
);

// Returns a vertical canvas gradient for an area fill.
const makeAreaGradient = (ctx, chartArea, topColor, bottomColor) => {
  const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
  gradient.addColorStop(0, topColor);
  gradient.addColorStop(1, bottomColor);
  return gradient;
};

// Returns the dual-color (green/red split at zero) area fill gradient for P&L.
// gradientOffset: dataMax / (dataMax - dataMin) = fraction from chartArea.top where
// the zero line sits.  Matches the original Recharts SVG linearGradient offset logic.
const makePnlGradient = (ctx, chartArea, gradientOffset) => {
  const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);

  if (gradientOffset >= 1) {
    // All positive — pure green fade
    gradient.addColorStop(0, 'rgba(16,185,129,0.8)');
    gradient.addColorStop(1, 'rgba(16,185,129,0)');
  } else if (gradientOffset <= 0) {
    // All negative — pure red fade
    gradient.addColorStop(0, 'rgba(239,68,68,0)');
    gradient.addColorStop(1, 'rgba(239,68,68,0.8)');
  } else {
    // Mixed: gradientOffset is the zero line position from the top
    gradient.addColorStop(0, 'rgba(16,185,129,0.8)');
    gradient.addColorStop(gradientOffset, 'rgba(16,185,129,0.05)');
    gradient.addColorStop(gradientOffset, 'rgba(239,68,68,0.05)');
    gradient.addColorStop(1, 'rgba(239,68,68,0.8)');
  }
  return gradient;
};

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

  const gridColor = darkMode ? '#334155' : '#e2e8f0';
  const tickColor = darkMode ? '#94a3b8' : '#64748b';

  // Shared tooltip callback so both charts format numbers the same way
  const tooltipLabelCallback = useCallback(
    (item) => `${item.dataset.label}: ${formatBaseCurrency(item.parsed.y ?? item.parsed)}`,
    [formatBaseCurrency]
  );

  // ─── Trend chart ────────────────────────────────────────────────────────────

  const pnlGradientOffset = useMemo(() => {
    if (!trendData || trendData.length === 0) return 0;
    const dataMax = Math.max(...trendData.map((d) => d.realizedPnlBase));
    const dataMin = Math.min(...trendData.map((d) => d.realizedPnlBase));
    if (dataMax <= 0) return 0;
    if (dataMin >= 0) return 1;
    return dataMax / (dataMax - dataMin);
  }, [trendData]);

  const trendChartData = useMemo(() => ({
    labels: trendData.map((d) => d.displayDate),
    datasets: [
      {
        label: t('charts.costSeries'),
        data: trendData.map((d) => d.costBase),
        borderColor: '#818cf8',
        borderWidth: 3,
        backgroundColor: ({ chart: { ctx, chartArea } }) =>
          chartArea
            ? makeAreaGradient(ctx, chartArea, 'rgba(129,140,248,0.8)', 'rgba(129,140,248,0)')
            : 'transparent',
        fill: true,
        yAxisID: 'yLeft',
        pointRadius: 0,
        tension: 0.1
      },
      {
        label: t('charts.realizedSeries'),
        data: trendData.map((d) => d.realizedPnlBase),
        borderColor: '#10b981',
        borderWidth: 2,
        backgroundColor: ({ chart: { ctx, chartArea } }) =>
          chartArea ? makePnlGradient(ctx, chartArea, pnlGradientOffset) : 'transparent',
        fill: true,
        yAxisID: 'yRight',
        pointRadius: 0,
        tension: 0.1,
        segment: {
          borderColor: (ctx) => (ctx.p1.parsed.y < 0 ? '#ef4444' : '#10b981')
        }
      }
    ]
  }), [trendData, pnlGradientOffset, t]);

  const trendChartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        position: 'top',
        align: 'start',
        labels: {
          color: tickColor,
          boxWidth: 16,
          boxHeight: 16,
          borderRadius: 2,
          useBorderRadius: true,
          padding: 12
        }
      },
      tooltip: {
        callbacks: {
          label: tooltipLabelCallback
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          color: tickColor,
          maxTicksLimit: 8,
          font: { size: 12 }
        }
      },
      yLeft: {
        type: 'linear',
        position: 'left',
        grid: { color: gridColor },
        border: { display: false },
        ticks: {
          color: '#818cf8',
          font: { size: 11 },
          callback: (v) => formatLocalizedCompactNumber(v, activeLocale)
        }
      },
      yRight: {
        type: 'linear',
        position: 'right',
        grid: { drawOnChartArea: false },
        border: { display: false },
        ticks: {
          color: (ctx) => (ctx.tick.value < 0 ? '#ef4444' : '#10b981'),
          font: { size: 11 },
          callback: (v) => formatLocalizedCompactNumber(v, activeLocale)
        }
      }
    }
  }), [tickColor, gridColor, activeLocale, tooltipLabelCallback]);

  // ─── Bar chart ───────────────────────────────────────────────────────────────

  // Chart.js BarElement.draw() does not call setLineDash, so borderDash is
  // ignored natively.  This plugin post-draws dashed borders for any bar
  // dataset that has a non-empty `borderDash` array, after clearing Chart.js's
  // own (solid) border by setting borderWidth: 0 on those datasets.
  const barDashedBorderPlugin = useMemo(() => ({
    id: 'bar-dashed-border',
    afterDatasetsDraw(chart) {
      const { ctx } = chart;
      chart.data.datasets.forEach((dataset, datasetIndex) => {
        const dash = dataset.borderDash;
        if (!Array.isArray(dash) || !dash.length) return;
        const meta = chart.getDatasetMeta(datasetIndex);
        if (!meta.visible) return;

        const bw = 1.5;
        const radius = typeof dataset.borderRadius === 'number' ? dataset.borderRadius : 0;

        meta.data.forEach((bar, index) => {
          const { x, y, base, width } = bar;
          const barTop = Math.min(y, base);
          const barHeight = Math.abs(y - base);
          if (barHeight < 1) return;

          const bColor = Array.isArray(dataset.borderColor)
            ? (dataset.borderColor[index] ?? dataset.borderColor[0])
            : (dataset.borderColor ?? '#666');

          const half = bw / 2;
          ctx.save();
          ctx.strokeStyle = bColor;
          ctx.lineWidth = bw;
          ctx.setLineDash(dash);
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(x - width / 2 + half, barTop + half, width - bw, barHeight - bw, radius);
          } else {
            ctx.rect(x - width / 2 + half, barTop + half, width - bw, barHeight - bw);
          }
          ctx.stroke();
          ctx.restore();
        });
      });
    }
  }), []);

  const barChartDatasets = useMemo(() => ({
    labels: chartData.pnlData.map((d) => d.name),
    datasets: [
      {
        label: t('charts.ifSoldSeries'),
        data: chartData.pnlData.map((d) => d.ifSoldTodayPnlBase),
        backgroundColor: chartData.pnlData.map((d) =>
          d.ifSoldTodayPnlBase >= 0 ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)'
        ),
        borderColor: chartData.pnlData.map((d) =>
          d.ifSoldTodayPnlBase >= 0 ? '#10b981' : '#ef4444'
        ),
        borderWidth: 0,   // suppress Chart.js's solid border; plugin draws dashed
        borderDash: [4, 4],
        borderRadius: 4,
        barPercentage: 0.95,
        categoryPercentage: 0.8
      },
      {
        label: t('charts.actualSeries'),
        data: chartData.pnlData.map((d) => d.realizedPnlBase),
        backgroundColor: chartData.pnlData.map((d) =>
          d.realizedPnlBase >= 0 ? '#10b981' : '#ef4444'
        ),
        borderRadius: 4,
        barPercentage: 0.6,
        categoryPercentage: 0.8
      }
    ]
  }), [chartData.pnlData, t]);

  const barChartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        position: 'top',
        align: 'start',
        labels: {
          color: tickColor,
          boxWidth: 16,
          boxHeight: 16,
          borderRadius: 2,
          useBorderRadius: true,
          padding: 12,
          generateLabels: (chart) =>
            chart.data.datasets.map((ds, i) => ({
              text: t('charts.legendConverted', { label: ds.label }),
              fillStyle: Array.isArray(ds.backgroundColor) ? ds.backgroundColor[0] : ds.backgroundColor,
              strokeStyle: Array.isArray(ds.borderColor) ? ds.borderColor[0] : ds.borderColor,
              lineWidth: ds.borderWidth ?? 1,
              lineDash: ds.borderDash ?? [],
              hidden: !chart.isDatasetVisible(i),
              index: i,
              datasetIndex: i
            }))
        }
      },
      tooltip: {
        callbacks: {
          label: tooltipLabelCallback,
          title: (items) => {
            const fullName = chartData.pnlData[items[0]?.dataIndex]?.name || items[0]?.label || '';
            return fullName.length > 4 ? fullName : items[0]?.label || '';
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          color: tickColor,
          font: { size: 12 },
          callback: (_, i) => {
            const label = chartData.pnlData[i]?.name || '';
            return label.length > 4 ? `${label.substring(0, 4)}..` : label;
          }
        }
      },
      y: {
        grid: { color: gridColor },
        border: { display: false },
        ticks: {
          color: tickColor,
          font: { size: 12 },
          callback: (v) => formatLocalizedCompactNumber(v, activeLocale)
        }
      }
    }
  }), [tickColor, gridColor, activeLocale, tooltipLabelCallback, chartData.pnlData, t]);

  // ─── Doughnut chart ──────────────────────────────────────────────────────────

  const doughnutData = useMemo(() => ({
    labels: chartData.holdingData.map((d) => d.name),
    datasets: [{
      data: chartData.holdingData.map((d) => d.currentValueBase),
      backgroundColor: chartData.holdingData.map((_, i) => COLORS[i % COLORS.length]),
      borderWidth: 2,
      borderColor: darkMode ? '#0f172a' : '#ffffff',
      hoverOffset: 6
    }]
  }), [chartData.holdingData, darkMode]);

  // Inline plugin to draw external labels with connecting lines (replicates Recharts labelLine).
  // Recreated when tickColor or activeLocale changes so the closure stays fresh.
  const doughnutLabelPlugin = useMemo(() => ({
    id: 'doughnut-outside-labels',
    afterDraw(chart) {
      const { ctx } = chart;
      const meta = chart.getDatasetMeta(0);
      if (!meta?.data?.length) return;

      const total = chart.data.datasets[0].data.reduce((s, v) => s + v, 0);
      if (!total) return;

      meta.data.forEach((arc, index) => {
        const percent = chart.data.datasets[0].data[index] / total;
        if (percent < 0.04) return; // skip slivers

        const midAngle = arc.startAngle + (arc.endAngle - arc.startAngle) / 2;
        const outerR = arc.outerRadius;
        const cx = arc.x;
        const cy = arc.y;

        const cosA = Math.cos(midAngle);
        const sinA = Math.sin(midAngle);

        const lineX1 = cx + cosA * (outerR + 4);
        const lineY1 = cy + sinA * (outerR + 4);
        const lineX2 = cx + cosA * (outerR + 16);
        const lineY2 = cy + sinA * (outerR + 16);
        const textX = cx + cosA * (outerR + 22);
        const textY = cy + sinA * (outerR + 22);

        const label = String(chart.data.labels[index] ?? '').slice(0, 4);
        const pctStr = formatLocalizedPercent(percent * 100, activeLocale, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        });

        ctx.save();
        ctx.strokeStyle = tickColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(lineX1, lineY1);
        ctx.lineTo(lineX2, lineY2);
        ctx.stroke();

        ctx.fillStyle = tickColor;
        ctx.font = '11px sans-serif';
        ctx.textAlign = cosA > 0 ? 'left' : 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${label} ${pctStr}`, textX, textY);
        ctx.restore();
      });
    }
  }), [tickColor, activeLocale]);

  const doughnutOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    cutout: '55%',
    layout: { padding: 30 },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (item) => `${item.label}: ${formatBaseCurrency(item.parsed)}`
        }
      }
    }
  }), [formatBaseCurrency]);

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Trend chart */}
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
            <Line data={trendChartData} options={trendChartOptions} />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-400 dark:text-slate-500">
              {t('charts.noTrend')}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar chart */}
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
              <Bar data={barChartDatasets} options={barChartOptions} plugins={[barDashedBorderPlugin]} />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400 dark:text-slate-500">
                {t('charts.noPnlData')}
              </div>
            )}
          </div>
        </div>

        {/* Doughnut chart */}
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
              <Doughnut
                data={doughnutData}
                options={doughnutOptions}
                plugins={[doughnutLabelPlugin]}
              />
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
