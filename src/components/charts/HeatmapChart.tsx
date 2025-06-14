import type React from 'react';
import { useChart } from '../../hooks/useChart';
import type {
  ChartConfiguration,
  TooltipItem,
  ScriptableContext,
} from 'chart.js/auto';
import 'chartjs-chart-matrix';

interface MatrixDataPoint {
  x: number;
  y: number;
  v: number;
}

interface HeatmapChartProps {
  title?: string;
  config: Partial<ChartConfiguration<'matrix'>>;
  className?: string;
  height?: string;
  showColorScale?: boolean;
  onCellClick?: (x: string | number, y: string | number, value: number) => void;
}

const HeatmapChart: React.FC<HeatmapChartProps> = ({
  title,
  config,
  className = '',
  height = 'h-64',
  showColorScale = true,
  onCellClick,
}) => {
  // Extract data for color scale calculation
  const datasets = config.data?.datasets || [];
  const allValues = datasets.flatMap(
    (dataset) =>
      (dataset.data as MatrixDataPoint[])?.map((point) => point.v) || []
  );
  const minValue = allValues.length > 0 ? Math.min(...allValues) : 0;
  const maxValue = allValues.length > 0 ? Math.max(...allValues) : 100;

  const getColor = (value: number) => {
    const normalized =
      allValues.length > 1 ? (value - minValue) / (maxValue - minValue) : 0.5;

    if (normalized < 0.2) return 'rgba(219, 234, 254, 0.8)';
    if (normalized < 0.4) return 'rgba(147, 197, 253, 0.9)';
    if (normalized < 0.6) return 'rgba(59, 130, 246, 0.8)';
    if (normalized < 0.8) return 'rgba(37, 99, 235, 0.9)';
    return 'rgba(29, 78, 216, 1.0)';
  };

  const defaultConfig: ChartConfiguration<'matrix'> = {
    type: 'matrix',
    data: {
      datasets: [],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'linear',
          grid: {
            display: false,
          },
          ticks: {
            color: '#6B7280',
            font: {
              size: 11,
            },
          },
          border: {
            display: false,
          },
        },
        y: {
          type: 'linear',
          grid: {
            display: false,
          },
          ticks: {
            color: '#6B7280',
            font: {
              size: 11,
            },
          },
          border: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(17, 24, 39, 0.95)',
          titleColor: '#F9FAFB',
          bodyColor: '#F9FAFB',
          borderColor: 'rgba(59, 130, 246, 0.5)',
          borderWidth: 1,
          cornerRadius: 8,
          padding: 12,
          callbacks: {
            title: () => '',
            label: (context: TooltipItem<'matrix'>) => {
              const point = context.raw as MatrixDataPoint;
              return [`Value: ${point.v}`];
            },
          },
        },
      },
      onHover: (_, activeElements, chart) => {
        const canvas = chart.canvas;
        if (canvas) {
          canvas.style.cursor =
            activeElements.length > 0 ? 'pointer' : 'default';
        }
      },
      onClick: (_, activeElements, chart) => {
        if (activeElements.length > 0 && onCellClick) {
          const element = activeElements[0];
          const dataIndex = element.index;
          const dataset = chart.data.datasets[element.datasetIndex];
          const point = (dataset.data as MatrixDataPoint[])[dataIndex];

          if (point) {
            onCellClick(point.x, point.y, point.v);
          }
        }
      },
    },
  };

  // Apply default matrix styling to datasets
  const mergedConfig: ChartConfiguration<'matrix'> = {
    ...defaultConfig,
    ...config,
    data: {
      ...defaultConfig.data,
      ...config.data,
      datasets:
        config.data?.datasets?.map((dataset) => ({
          backgroundColor: (ctx: ScriptableContext<'matrix'>) => {
            const point = ctx.parsed as MatrixDataPoint;
            return getColor(point?.v || 0);
          },
          borderColor: 'rgba(255, 255, 255, 0.3)',
          borderWidth: 1,
          width: ({ chart }: { chart: { chartArea: { width: number } } }) => {
            const chartArea = chart.chartArea || { width: 0 };
            return Math.max(20, chartArea.width / 10);
          },
          height: ({ chart }: { chart: { chartArea: { height: number } } }) => {
            const chartArea = chart.chartArea || { height: 0 };
            return Math.max(20, chartArea.height / 10);
          },
          ...dataset,
        })) || defaultConfig.data.datasets,
    },
    options: {
      ...defaultConfig.options,
      ...config.options,
      scales: {
        ...defaultConfig.options?.scales,
        ...config.options?.scales,
      },
      plugins: {
        ...defaultConfig.options?.plugins,
        ...config.options?.plugins,
      },
    },
  };

  const { canvasRef } = useChart(mergedConfig);

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}
    >
      {title && (
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>{title}</h3>
      )}
      <div className={`relative ${height}`}>
        <canvas ref={canvasRef} />
      </div>
      {showColorScale && allValues.length > 0 && (
        <div className='mt-4 space-y-2'>
          <div className='flex items-center justify-center space-x-2'>
            <span className='text-xs text-gray-500 font-medium'>Low</span>
            <div className='flex space-x-1'>
              <div className='w-4 h-3 bg-blue-100 rounded-sm' />
              <div className='w-4 h-3 bg-blue-200 rounded-sm' />
              <div className='w-4 h-3 bg-blue-400 rounded-sm' />
              <div className='w-4 h-3 bg-blue-600 rounded-sm' />
              <div className='w-4 h-3 bg-blue-800 rounded-sm' />
            </div>
            <span className='text-xs text-gray-500 font-medium'>High</span>
          </div>
          <div className='flex items-center justify-center space-x-4 text-xs text-gray-600'>
            <span>{minValue}</span>
            <span>
              Range: {minValue} - {maxValue}
            </span>
            <span>{maxValue}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeatmapChart;
