import type React from 'react';
import PieChart from './PieChart';
import AreaChart from './AreaChart';
import ScatterChart from './ScatterChart';
import HistogramChart from './HistogramChart';
import HeatmapChart from './HeatmapChart';
import type { ChartConfiguration } from 'chart.js/auto';

export interface ChartRendererProps {
  type: 'pie' | 'line' | 'scatter' | 'bar' | 'matrix';
  title?: string;
  config: Partial<ChartConfiguration>;
  className?: string;
  height?: string;
  onChartInteraction?: (
    type: string,
    label: string,
    value: number | { x: number; y: number },
    datasetIndex?: number
  ) => void;
}

const ChartRenderer: React.FC<ChartRendererProps> = ({
  type,
  title,
  config,
  className,
  height,
  onChartInteraction,
}) => {
  const handlePieClick = (
    label: string,
    value: number,
    datasetIndex: number
  ) => {
    onChartInteraction?.('pie', label, value, datasetIndex);
  };

  const handleAreaClick = (
    label: string,
    value: number,
    datasetIndex: number
  ) => {
    onChartInteraction?.('area', label, value, datasetIndex);
  };

  const handleScatterClick = (
    label: string,
    x: number,
    y: number,
    datasetIndex: number
  ) => {
    onChartInteraction?.('scatter', label, { x, y }, datasetIndex);
  };

  const handleBarClick = (
    label: string,
    value: number,
    datasetIndex: number
  ) => {
    onChartInteraction?.('bar', label, value, datasetIndex);
  };

  const handleHeatmapClick = (
    x: string | number,
    y: string | number,
    value: number
  ) => {
    onChartInteraction?.('heatmap', `(${x}, ${y})`, value);
  };

  switch (type) {
    case 'pie':
      return (
        <PieChart
          title={title}
          config={config as Partial<ChartConfiguration<'pie'>>}
          className={className}
          height={height}
          onSegmentClick={handlePieClick}
        />
      );

    case 'line':
      return (
        <AreaChart
          title={title}
          config={config as Partial<ChartConfiguration<'line'>>}
          className={className}
          height={height}
          onPointClick={handleAreaClick}
        />
      );

    case 'scatter':
      return (
        <ScatterChart
          title={title}
          config={config as Partial<ChartConfiguration<'scatter'>>}
          className={className}
          height={height}
          onPointClick={handleScatterClick}
        />
      );

    case 'bar':
      return (
        <HistogramChart
          title={title}
          config={config as Partial<ChartConfiguration<'bar'>>}
          className={className}
          height={height}
          onBarClick={handleBarClick}
        />
      );

    case 'matrix':
      return (
        <HeatmapChart
          title={title}
          config={config as Partial<ChartConfiguration<'matrix'>>}
          className={className}
          height={height}
          onCellClick={handleHeatmapClick}
        />
      );

    default:
      return (
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
          <div className='text-center text-gray-500'>
            <p>Unsupported chart type: {type}</p>
          </div>
        </div>
      );
  }
};

export default ChartRenderer;
