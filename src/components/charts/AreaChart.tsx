import type React from 'react';
import { useChart } from '../../hooks/useChart';
import type { ChartConfiguration } from 'chart.js/auto';

export interface AreaChartData {
  labels: string[];
  data: number[];
  label: string;
  backgroundColor?: string;
  borderColor?: string;
  pointBackgroundColor?: string;
}

interface AreaChartProps {
  title: string;
  subtitle: string;
  data: AreaChartData;
  className?: string;
  maxValue?: number;
  onPointClick?: (label: string, value: number) => void;
}

const AreaChart: React.FC<AreaChartProps> = ({
  title,
  subtitle,
  data,
  className = '',
  maxValue = 2000,
  onPointClick,
}) => {
  const chartConfig: ChartConfiguration<'line'> = {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: data.label,
          data: data.data,
          backgroundColor: data.backgroundColor || 'rgba(59, 130, 246, 0.1)',
          borderColor: data.borderColor || '#3B82F6',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: data.pointBackgroundColor || '#3B82F6',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: '#2563EB',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      scales: {
        y: {
          beginAtZero: true,
          max: maxValue,
          grid: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)',
          },
          ticks: {
            font: {
              size: 10,
            },
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 10,
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          borderColor: '#3B82F6',
          borderWidth: 2,
          cornerRadius: 8,
          displayColors: true,
          callbacks: {
            label: (context) =>
              `${context.dataset.label}: ${context.parsed.y} units`,
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
          const labels = chart.data.labels;
          const dataset = chart.data.datasets[0];
          if (dataset && labels && labels[dataIndex]) {
            onPointClick(
              labels[dataIndex] as string,
              dataset.data[dataIndex] as number
            );
          }
        }
      },
    },
  };

  const { canvasRef } = useChart(chartConfig);

  return (
    <div className={`bg-gray-50 rounded-xl p-6 ${className}`}>
      <h3 className='text-lg font-semibold text-gray-900 mb-1'>{title}</h3>
      <h4 className='text-md text-gray-600 mb-6'>{subtitle}</h4>
      <div className='relative h-48'>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default AreaChart;
