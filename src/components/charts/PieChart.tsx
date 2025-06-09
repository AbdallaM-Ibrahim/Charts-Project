import type React from 'react';
import { useChart } from '../../hooks/useChart';
import type { ChartConfiguration } from 'chart.js/auto';

export interface PieChartData {
  labels: string[];
  data: number[];
  backgroundColor: string[];
  hoverBackgroundColor: string[];
}

interface PieChartProps {
  title: string;
  data: PieChartData;
  className?: string;
  showLabels?: boolean;
  onSegmentClick?: (label: string, value: number) => void;
}

const PieChart: React.FC<PieChartProps> = ({
  title,
  data,
  className = '',
  showLabels = false,
  onSegmentClick,
}) => {
  const chartConfig: ChartConfiguration<'pie'> = {
    type: 'pie',
    data: {
      labels: data.labels,
      datasets: [
        {
          data: data.data,
          backgroundColor: data.backgroundColor,
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverOffset: 8,
          hoverBorderWidth: 3,
          hoverBackgroundColor: data.hoverBackgroundColor,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: showLabels,
          position: 'bottom',
          labels: {
            color: '#4a5568', // Tailwind gray-700
            font: {
              size: 14,
              weight: 500,
            },
            usePointStyle: true,
            pointStyle: 'circle',
          },
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          borderColor: '#ffffff',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: true,
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.parsed;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: ${value}% (${percentage}% of total)`;
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
        if (activeElements.length > 0 && onSegmentClick) {
          const element = activeElements[0];
          const dataIndex = element.index;
          const labels = chart.data.labels;
          const dataset = chart.data.datasets[0];
          if (dataset && labels && labels[dataIndex]) {
            onSegmentClick(
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
      <h3 className='text-lg  text-gray-600 mb-1 text-center'>{title}</h3>
      {/* <h4 className='text-md text-gray-600 mb-6'>{subtitle}</h4> */}
      <div className='relative h-48'>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default PieChart;
