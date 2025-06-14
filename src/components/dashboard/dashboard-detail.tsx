import type React from 'react';
import type { HistoryEntry } from '../../services/history.service';

interface DashboardDetailProps {
  dashboard: HistoryEntry;
  onBack: () => void;
}

const DashboardDetail: React.FC<DashboardDetailProps> = ({
  dashboard,
  onBack,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center space-x-4'>
        <button
          type='button'
          onClick={onBack}
          className='flex items-center text-blue-600 hover:text-blue-800 font-medium'
        >
          <svg
            className='w-5 h-5 mr-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <title>Back Icon</title>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
          Back to Dashboards
        </button>
      </div>

      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
        <div className='flex justify-between items-start mb-4'>
          <div>
            <h2 className='text-2xl font-bold text-gray-800'>
              {dashboard.name}
            </h2>
            <p className='text-gray-600 mt-1'>
              Created: {formatDate(dashboard.createdAt)}
            </p>
          </div>
          <div className='text-right'>
            <div className='text-sm text-gray-500'>Dashboard ID</div>
            <div className='font-mono text-sm text-gray-800'>
              {dashboard.id}
            </div>
          </div>
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-xl font-semibold text-gray-800'>
          Charts ({dashboard.data?.charts?.length || 0})
        </h3>

        {dashboard.data?.charts && dashboard.data.charts.length > 0 ? (
          <div className='grid gap-6 md:grid-cols-1 lg:grid-cols-2'>
            {dashboard.data.charts.map((chart, index) => (
              <div
                key={`${dashboard.id}-chart-${chart.title}-${index}`}
                className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'
              >
                <div className='flex justify-between items-start mb-4'>
                  <h3 className='text-lg font-semibold text-gray-800'>
                    {chart.title}
                  </h3>
                  <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                    {chart.type}
                  </span>
                </div>

                <div className='space-y-3'>
                  <div>
                    <h4 className='text-sm font-medium text-gray-700 mb-2'>
                      Labels:
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {chart.data.labels.map((label, idx) => (
                        <span
                          key={`${chart.title}-label-${label}-${idx}`}
                          className='inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700'
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className='text-sm font-medium text-gray-700 mb-2'>
                      Datasets:
                    </h4>
                    <div className='space-y-2'>
                      {chart.data.datasets.map((dataset, idx) => (
                        <div
                          key={`${chart.title}-dataset-${dataset.label}-${idx}`}
                          className='bg-gray-50 rounded p-3'
                        >
                          <div className='font-medium text-sm text-gray-800 mb-1'>
                            {dataset.label}
                          </div>
                          <div className='text-xs text-gray-600'>
                            Data points: [{dataset.data.join(', ')}]
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center py-12 bg-gray-50 rounded-lg'>
            <svg
              className='mx-auto h-12 w-12 text-gray-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <title>No Charts Available</title>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
              />
            </svg>
            <h3 className='mt-2 text-sm font-medium text-gray-900'>
              No charts available
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              This dashboard doesn't contain any charts yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardDetail;
