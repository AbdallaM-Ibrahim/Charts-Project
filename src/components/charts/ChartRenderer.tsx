import type React from 'react';
import PieChart from './PieChart';
import AreaChart from './AreaChart';
import ScatterChart from './ScatterChart';
import HistogramChart from './HistogramChart';
import HeatmapChart from './HeatmapChart';
import type { ChartConfiguration } from 'chart.js/auto';
import type { ChartData } from '../../services/history.service';

export interface ChartRendererProps {
  chartData: ChartData;
  className?: string;
  height?: string;
  onChartInteraction?: (
    type: string,
    label: string,
    value: number | { x: number; y: number },
    datasetIndex?: number
  ) => void;
}

// Mapping from API chart types to our internal chart types
const CHART_TYPE_MAPPING: Record<
  string,
  'pie' | 'line' | 'scatter' | 'bar' | 'matrix' | null
> = {
  pie: 'pie',
  doughnut: 'pie',
  line: 'line',
  area: 'line',
  scatter: 'scatter',
  bar: 'bar',
  histogram: 'bar',
  column: 'bar',
  heatmap: 'matrix',
  matrix: 'matrix',
};

const ChartRenderer: React.FC<ChartRendererProps> = ({
  chartData,
  className,
  height = 'h-72', // Increased default height for better visibility
}) => {
  // Map API chart type to our internal type
  const mappedType = CHART_TYPE_MAPPING[chartData.type.toLowerCase()];

  // If chart type is not supported, return null (ignore)
  if (!mappedType) {
    console.warn(`Unsupported chart type: ${chartData.type}`);
    return null;
  }

  // Convert API data to Chart.js configuration
  const convertToChartConfig = (): Partial<ChartConfiguration> => {
    const baseConfig = {
      data: {
        labels: chartData.data.labels,
        datasets: chartData.data.datasets.map((dataset, index) => {
          // Default colors for datasets
          const colors = [
            '#3B82F6',
            '#10B981',
            '#F59E0B',
            '#EF4444',
            '#8B5CF6',
          ];
          const color = colors[index % colors.length];

          return {
            ...dataset,
            backgroundColor:
              dataset.backgroundColor ||
              (mappedType === 'pie'
                ? [color, '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
                : mappedType === 'line'
                ? `${color}20`
                : color),
            borderColor: dataset.borderColor || color,
            hoverBackgroundColor:
              dataset.hoverBackgroundColor ||
              (mappedType === 'pie'
                ? ['#2563EB', '#059669', '#D97706', '#DC2626', '#7C3AED']
                : color),
          };
        }),
      },
    };

    return baseConfig;
  };

  const config = convertToChartConfig();


  switch (mappedType) {
    case 'pie':
      return (
        <PieChart
          title={chartData.title}
          config={config as Partial<ChartConfiguration<'pie'>>}
          className={className}
          height={height}
        />
      );

    case 'line':
      return (
        <AreaChart
          title={chartData.title}
          config={config as Partial<ChartConfiguration<'line'>>}
          className={className}
          height={height}        />
      );

    case 'scatter':
      return (
        <ScatterChart
          title={chartData.title}
          config={config as Partial<ChartConfiguration<'scatter'>>}
          className={className}
          height={height}
        />
      );

    case 'bar':
      return (
        <HistogramChart
          title={chartData.title}
          config={config as Partial<ChartConfiguration<'bar'>>}
          className={className}
          height={height}
        />
      );

    case 'matrix':
      return (
        <HeatmapChart
          title={chartData.title}
          config={config as Partial<ChartConfiguration<'matrix'>>}
          className={className}
          height={height}
        />
      );

    default:
      return null;
  }
};

export default ChartRenderer;
