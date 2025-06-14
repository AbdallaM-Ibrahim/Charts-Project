import type React from 'react';
import { useState } from 'react';
import type { HistoryEntry, ChartData } from '../../services/history.service';
import ChartRenderer from '../charts/ChartRenderer';

interface DashboardDetailProps {
  dashboard: HistoryEntry;
  onBack: () => void;
}

const DashboardDetail: React.FC<DashboardDetailProps> = ({ dashboard }) => {
  const [selectedChart, setSelectedChart] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderChart = (chart: ChartData, index: number) => {
    return (
      <div key={`${dashboard.id}-chart-${chart.title}-${index}`}>
        <ChartRenderer
          chartData={chart}
          height='h-80'
        />
      </div>
    );
  };

  // Filter charts into supported and unsupported
  const charts = dashboard.data?.charts || [];
  const supportedChartTypes = [
    'pie',
    'doughnut',
    'line',
    'area',
    'scatter',
    'bar',
    'histogram',
    'column',
    'heatmap',
    'matrix',
  ];
  const supportedCharts = charts.filter((chart) =>
    supportedChartTypes.includes(chart.type.toLowerCase())
  );

  return (
    <div className='space-y-8'>
      {/* Chart Interaction Feedback */}
      {selectedChart && (
        <div className='p-4 bg-blue-50 border border-blue-200 rounded-xl'>
          <div className='flex items-center justify-between'>
            <p className='text-blue-800'>
              <span className='font-semibold'>Chart interaction:</span>{' '}
              {selectedChart}
            </p>
            <button
              type='button'
              onClick={() => setSelectedChart(null)}
              className='text-blue-600 hover:text-blue-800 text-sm font-medium'
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Dashboard Header */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8'>
        <div className='flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6'>
          <div className='flex-1'>
            <h1 className='text-3xl font-bold text-gray-900 mb-3'>
              {dashboard.name}
            </h1>
            <div className='flex flex-col sm:flex-row sm:items-center gap-4 text-gray-600'>
              <div className='flex items-center'>
                <svg
                  className='w-5 h-5 mr-2 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <title>Calendar Icon</title>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h2a2 2 0 002-2z'
                  />
                </svg>
                Created: {formatDate(dashboard.createdAt)}
              </div>
              <div className='flex items-center'>
                <svg
                  className='w-5 h-5 mr-2 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <title>Chart Icon</title>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                  />
                </svg>
                {charts.length} {charts.length === 1 ? 'Chart' : 'Charts'}
              </div>
            </div>
          </div>
          <div className='bg-gray-50 rounded-lg p-4 lg:text-right'>
            <div className='text-sm text-gray-500 mb-1'>Dashboard ID</div>
            <div className='font-mono text-sm text-gray-800 break-all'>
              {dashboard.id}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold text-gray-900'>Dashboard Charts</h2>
          <div className='flex items-center gap-2 text-sm text-gray-500'>
            <div className='w-2 h-2 bg-green-400 rounded-full' />
            {supportedCharts.length} Active Charts
          </div>
        </div>

        {charts.length === 0 ? (
          <div className='text-center py-16 bg-white rounded-xl border border-gray-200'>
            <svg
              className='mx-auto h-16 w-16 text-gray-400 mb-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <title>No Charts Available</title>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
              />
            </svg>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
              No charts available
            </h3>
            <p className='text-gray-500 max-w-md mx-auto'>
              This dashboard doesn't contain any charts yet. Charts will appear
              here once they're added to the dashboard.
            </p>
          </div>
        ) : (
          <div className='grid gap-8 xl:grid-cols-2 2xl:grid-cols-3'>
            {supportedCharts.map(renderChart)}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardDetail;
