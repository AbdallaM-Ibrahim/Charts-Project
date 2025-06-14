import type React from 'react';
import { useState } from 'react';
import BackButton from '../../components/primitive/back-button';
import ChartRenderer from '../../components/charts/ChartRenderer';
import { allChartData, heatmapLabels } from './data/chartData';

const Demo: React.FC = () => {
  const [selectedChart, setSelectedChart] = useState<string | null>(null);

  const handleChartInteraction = (
    type: string,
    label: string,
    value: number | { x: number; y: number }
  ) => {
    let displayValue: string;

    if (typeof value === 'object') {
      displayValue = `(${value.x}, ${value.y})`;
    } else {
      displayValue = value.toString();
    }

    // Special handling for heatmap to show meaningful labels
    if (type === 'heatmap' && typeof value === 'number') {
      const coords = label.match(/\((\d+), (\d+)\)/);
      if (coords) {
        const x = Number.parseInt(coords[1]);
        const y = Number.parseInt(coords[2]);
        const xLabel = heatmapLabels.xLabels[x] || x;
        const yLabel = heatmapLabels.yLabels[y] || y;
        setSelectedChart(`${type}: ${yLabel} on ${xLabel} - ${value}`);
        return;
      }
    }

    setSelectedChart(`${type}: ${label} - ${displayValue}`);
  };

  return (
    <div className='p-6'>
      <BackButton text='Back' />

      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>
          Chart Components Demo
        </h1>
        <p className='text-gray-600'>
          Test and showcase different chart components with a generic renderer
          that automatically selects the appropriate chart type based on data
          configuration.
        </p>

        {selectedChart && (
          <div className='mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
            <p className='text-blue-800'>
              <strong>Last interaction:</strong> {selectedChart}
            </p>
            <button
              type='button'
              onClick={() => setSelectedChart(null)}
              className='mt-2 text-sm text-blue-600 hover:text-blue-800'
            >
              Clear
            </button>
          </div>
        )}
      </div>

      <div className='grid gap-8 lg:grid-cols-2 xl:grid-cols-3'>
        {allChartData.map((chartData, index) => (
          <div
            key={`${chartData.type}-${chartData.title}-${index}`}
            className={chartData.type === 'matrix' ? 'lg:col-span-2' : ''}
          >
            <ChartRenderer
              type={chartData.type}
              title={chartData.title}
              config={chartData.config}
              onChartInteraction={handleChartInteraction}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Demo;
