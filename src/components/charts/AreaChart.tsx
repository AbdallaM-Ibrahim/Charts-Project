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
  xAxisLabel?: string;
  yAxisLabel?: string;
}

interface AreaChartProps {
  title: string;
  data: AreaChartData;
  className?: string;
  maxValue?: number;
  onPointClick?: (label: string, value: number) => void;
}

const AreaChart: React.FC<AreaChartProps> = ({
  title,
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
          backgroundColor: 'rgb(59, 130, 246)',
          fill: true,
          tension: 0.1,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: '#2563EB',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 2,
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
          title: {
            display: !!data.yAxisLabel,
            text: data.yAxisLabel || '',
            font: {
              size: 12,
              weight: 'bold',
            },
            color: '#374151',
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
          title: {
            display: !!data.xAxisLabel,
            text: data.xAxisLabel || '',
            font: {
              size: 12,
              weight: 'bold',
            },
            color: '#374151',
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
      <h3 className='text-lg text-gray-600 mb-1 text-center'>{title}</h3>
      <div className='relative h-48'>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default AreaChart;
