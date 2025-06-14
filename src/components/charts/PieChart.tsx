import type React from 'react';
import { useChart } from '../../hooks/useChart';
import type { ChartConfiguration } from 'chart.js/auto';

interface PieChartProps {
  title?: string;
  config: Partial<ChartConfiguration<'pie'>>;
  className?: string;
  height?: string;
  onSegmentClick?: (label: string, value: number, datasetIndex: number) => void;
}

const PieChart: React.FC<PieChartProps> = ({
  title,
  config,
  className = '',
  height = 'h-48',
  onSegmentClick,
}) => {
  // Default configuration with UX best practices
  const defaultConfig: ChartConfiguration<'pie'> = {
    type: 'pie',
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            color: '#4B5563',
            font: {
              size: 12,
              weight: 500,
            },
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 15,
            boxWidth: 8,
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
          displayColors: true,
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.parsed;
              const total = context.dataset.data.reduce(
                (a, b) => Number(a) + Number(b),
                0
              );
              const percentage = ((value / Number(total)) * 100).toFixed(1);
              return `${label}: ${value} (${percentage}%)`;
            },
          },
        },
      },
      elements: {
        arc: {
          borderWidth: 2,
          borderColor: '#FFFFFF',
          hoverBorderWidth: 3,
          hoverBorderColor: '#FFFFFF',
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
        if (activeElements.length > 0 && onSegmentClick) {
          const element = activeElements[0];
          const dataIndex = element.index;
          const datasetIndex = element.datasetIndex;
          const labels = chart.data.labels;
          const dataset = chart.data.datasets[datasetIndex];

          if (dataset && labels && labels[dataIndex]) {
            onSegmentClick(
              labels[dataIndex] as string,
              dataset.data[dataIndex] as number,
              datasetIndex
            );
          }
        }
      },
    },
  };

  // Deep merge configurations with user config taking precedence
  const mergedConfig: ChartConfiguration<'pie'> = {
    ...defaultConfig,
    ...config,
    data: {
      ...defaultConfig.data,
      ...config.data,
    },
    options: {
      ...defaultConfig.options,
      ...config.options,
      plugins: {
        ...defaultConfig.options?.plugins,
        ...config.options?.plugins,
        legend: {
          ...defaultConfig.options?.plugins?.legend,
          ...config.options?.plugins?.legend,
        },
        tooltip: {
          ...defaultConfig.options?.plugins?.tooltip,
          ...config.options?.plugins?.tooltip,
        },
      },
    },
  };

  const { canvasRef } = useChart(mergedConfig);

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}
    >
      {title && (
        <h3 className='text-lg font-semibold text-gray-800 mb-4 text-center'>
          {title}
        </h3>
      )}
      <div className={`relative ${height}`}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default PieChart;
