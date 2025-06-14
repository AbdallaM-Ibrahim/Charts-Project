import type React from 'react';
import { useChart } from '../../hooks/useChart';
import type { ChartConfiguration } from 'chart.js/auto';

interface ScatterChartProps {
  title?: string;
  config: Partial<ChartConfiguration<'scatter'>>;
  className?: string;
  height?: string;
  onPointClick?: (
    label: string,
    x: number,
    y: number,
    datasetIndex: number
  ) => void;
}

const ScatterChart: React.FC<ScatterChartProps> = ({
  title,
  config,
  className = '',
  height = 'h-64',
  onPointClick,
}) => {
  const defaultConfig: ChartConfiguration<'scatter'> = {
    type: 'scatter',
    data: {
      datasets: [],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          grid: {
            display: true,
            color: 'rgba(107, 114, 128, 0.1)',
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
            display: true,
            color: 'rgba(107, 114, 128, 0.1)',
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
      elements: {
        point: {
          radius: 5,
          hoverRadius: 8,
          borderWidth: 2,
          hoverBorderWidth: 3,
          borderColor: '#FFFFFF',
          hoverBorderColor: '#FFFFFF',
        },
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: '#4B5563',
            font: {
              size: 12,
            },
            usePointStyle: true,
            padding: 15,
          },
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
            label: (context) => {
              const point = context.parsed as { x: number; y: number };
              return `${context.dataset.label}: (${point.x}, ${point.y})`;
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
        if (activeElements.length > 0 && onPointClick) {
          const element = activeElements[0];
          const datasetIndex = element.datasetIndex;
          const dataIndex = element.index;
          const dataset = chart.data.datasets[datasetIndex];
          const point = dataset.data[dataIndex] as { x: number; y: number };

          if (dataset && point) {
            onPointClick(dataset.label || '', point.x, point.y, datasetIndex);
          }
        }
      },
    },
  };

  // Deep merge with default colors for datasets
  const mergedConfig: ChartConfiguration<'scatter'> = {
    ...defaultConfig,
    ...config,
    data: {
      ...defaultConfig.data,
      ...config.data,
      datasets:
        config.data?.datasets?.map((dataset, index) => {
          const colors = [
            '#3B82F6',
            '#10B981',
            '#F59E0B',
            '#EF4444',
            '#8B5CF6',
          ];
          const color = colors[index % colors.length];
          return {
            backgroundColor: color,
            borderColor: color,
            pointBackgroundColor: color,
            pointHoverBackgroundColor: color,
            ...dataset,
          };
        }) || defaultConfig.data.datasets,
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
    </div>
  );
};

export default ScatterChart;
