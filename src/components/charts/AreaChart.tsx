import type React from 'react';
import { useChart } from '../../hooks/useChart';
import type { ChartConfiguration } from 'chart.js/auto';

interface AreaChartProps {
  title?: string;
  config: Partial<ChartConfiguration<'line'>>;
  className?: string;
  height?: string;
  onPointClick?: (label: string, value: number, datasetIndex: number) => void;
}

const AreaChart: React.FC<AreaChartProps> = ({
  title,
  config,
  className = '',
  height = 'h-64',
  onPointClick,
}) => {
  // Default configuration optimized for area charts
  const defaultConfig: ChartConfiguration<'line'> = {
    type: 'line',
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      scales: {
        x: {
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
          beginAtZero: true,
          grid: {
            display: true,
            color: 'rgba(107, 114, 128, 0.1)',
          },
          ticks: {
            color: '#6B7280',
            font: {
              size: 11,
            },
            padding: 8,
          },
          border: {
            display: false,
          },
        },
      },
      elements: {
        line: {
          tension: 0.4,
          borderWidth: 2,
        },
        point: {
          radius: 0,
          hoverRadius: 6,
          hoverBorderWidth: 2,
          hoverBorderColor: '#FFFFFF',
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
          displayColors: true,
          callbacks: {
            label: (context) => {
              return `${context.dataset.label}: ${context.parsed.y}`;
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
          const dataIndex = element.index;
          const datasetIndex = element.datasetIndex;
          const labels = chart.data.labels;
          const dataset = chart.data.datasets[datasetIndex];

          if (dataset && labels && labels[dataIndex]) {
            onPointClick(
              labels[dataIndex] as string,
              dataset.data[dataIndex] as number,
              datasetIndex
            );
          }
        }
      },
    },
  };

  // Deep merge configurations
  const mergedConfig: ChartConfiguration<'line'> = {
    ...defaultConfig,
    ...config,
    data: {
      ...defaultConfig.data,
      ...config.data,
      datasets:
        config.data?.datasets?.map((dataset) => ({
          fill: true,
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderColor: '#3B82F6',
          pointBackgroundColor: '#3B82F6',
          pointHoverBackgroundColor: '#2563EB',
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
    </div>
  );
};

export default AreaChart;
