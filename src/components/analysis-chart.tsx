import type React from 'react';
import {
  PieChart,
  AreaChart,
  ScatterChart,
  HistogramChart,
  HeatmapChart,
} from './charts';
import type { ChartData } from '../types/analysis';
import type { ChartConfiguration } from 'chart.js/auto';

interface AnalysisChartProps {
  chart: ChartData;
}

// Convert analysis chart data to the format expected by our chart components
const convertToPieConfig = (
  chart: ChartData
): Partial<ChartConfiguration<'pie'>> => ({
  data: {
    labels: chart.x_axis_data.map(
      (_, index) => `${chart.x_axis_title} ${index + 1}`
    ),
    datasets: [
      {
        data: chart.y_axis_data,
        backgroundColor: [
          '#3B82F6',
          '#EF4444',
          '#10B981',
          '#F59E0B',
          '#8B5CF6',
          '#F97316',
          '#06B6D4',
          '#84CC16',
          '#EC4899',
          '#6366F1',
        ],
        hoverBackgroundColor: [
          '#2563EB',
          '#DC2626',
          '#059669',
          '#D97706',
          '#7C3AED',
          '#EA580C',
          '#0891B2',
          '#65A30D',
          '#DB2777',
          '#4F46E5',
        ],
      },
    ],
  },
});

const convertToLineConfig = (
  chart: ChartData
): Partial<ChartConfiguration<'line'>> => ({
  data: {
    labels: chart.x_axis_data.map(
      (_, index) => `${chart.x_axis_title} ${index + 1}`
    ),
    datasets: [
      {
        label: chart.y_axis_title,
        data: chart.y_axis_data,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  },
});

const convertToBarConfig = (
  chart: ChartData
): Partial<ChartConfiguration<'bar'>> => ({
  data: {
    labels: chart.x_axis_data.map(
      (_, index) => `${chart.x_axis_title} ${index + 1}`
    ),
    datasets: [
      {
        label: chart.y_axis_title,
        data: chart.y_axis_data,
        backgroundColor: '#3B82F6',
        borderColor: '#1F2937',
        borderWidth: 1,
      },
    ],
  },
});

const AnalysisChart: React.FC<AnalysisChartProps> = ({ chart }) => {
  // Render the appropriate chart based on chart_name
  switch (chart.chart_name) {
    case 'chart_pie':
      return (
        <PieChart
          title={chart.chart_title}
          config={convertToPieConfig(chart)}
        />
      );

    case 'chart_line':
      return (
        <AreaChart
          title={chart.chart_title}
          config={convertToLineConfig(chart)}
        />
      );

    case 'chart_bar':
    case 'chart_histogram':
      return (
        <HistogramChart
          title={chart.chart_title}
          config={convertToBarConfig(chart)}
        />
      );
    case 'chart_scatter': {
      // For scatter charts, we need to convert the data format
      const scatterData = chart.x_axis_data.map((x, index) => ({
        x,
        y: chart.y_axis_data[index] || 0,
      }));

      const scatterConfig: Partial<ChartConfiguration<'scatter'>> = {
        data: {
          datasets: [
            {
              label: chart.chart_title,
              data: scatterData,
              backgroundColor: '#3B82F6',
              borderColor: '#1F2937',
            },
          ],
        },
      };
      return <ScatterChart title={chart.chart_title} config={scatterConfig} />;
    }

    case 'chart_heatmap': {
      // For heatmap, we need to create matrix data
      const heatmapData = chart.x_axis_data.map((x, index) => ({
        x,
        y: chart.y_axis_data[index] || 0,
        v: chart.z_axis_data?.[index] || chart.y_axis_data[index] || 0,
      }));

      const heatmapConfig: Partial<ChartConfiguration<'matrix'>> = {
        data: {
          datasets: [
            {
              label: chart.chart_title,
              data: heatmapData,
              backgroundColor: '#3B82F6',
            },
          ],
        },
      };
      return <HeatmapChart title={chart.chart_title} config={heatmapConfig} />;
    }
    default:
      return (
        <div className='flex items-center justify-center h-full text-gray-500'>
          <div className='text-center'>
            <svg
              className='w-12 h-12 mx-auto mb-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
              />
            </svg>
            <p>Unsupported chart type: {chart.chart_name}</p>
          </div>
        </div>
      );
  }
};

export default AnalysisChart;
