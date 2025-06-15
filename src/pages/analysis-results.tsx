import type React from 'react';
import { useMemo } from 'react';
import AnalysisChart from '../components/analysis-chart';
import type { AnalysisResult, ChartData } from '../types/analysis';

interface AnalysisResultsProps {
  result: AnalysisResult;
  onBack: () => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  result,
  onBack,
}) => {
  const formattedDate = useMemo(() => {
    return new Date(result.createdAt).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, [result.createdAt]);

  const domainColors = {
    finance: 'text-green-600 bg-green-100',
    sales: 'text-blue-600 bg-blue-100',
    marketing: 'text-red-600 bg-red-100',
  };

  const renderChartSection = (
    title: string,
    charts: ChartData[],
    bgColor: string
  ) => {
    if (charts.length === 0) return null;

    return (
      <div className='space-y-6'>
        <div className='flex items-center gap-3'>
          <h2 className='text-2xl font-bold text-gray-900'>{title}</h2>
          <span className='bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium'>
            {charts.length} chart{charts.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
          {charts.map((chart) => (
            <div
              key={chart.chart_id}
              className={`${bgColor} rounded-xl p-6 border border-gray-200`}
            >
              <div className='mb-4'>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  {chart.chart_title}
                </h3>
                <p className='text-gray-600 text-sm leading-relaxed'>
                  {chart.description}
                </p>
              </div>
              <div className='bg-white rounded-lg p-4 h-64'>
                <AnalysisChart chart={chart} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className='p-6 max-w-7xl mx-auto'>
      {' '}
      {/* Back Button */}
      <div className='mb-6'>
        <button
          type='button'
          onClick={onBack}
          className='flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <title>Back</title>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
          Back to Home
        </button>
      </div>
      {/* Header Section */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8'>
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
          <div className='flex-1'>
            <div className='flex items-center gap-3 mb-3'>
              <h1 className='text-3xl font-bold text-gray-900'>
                {result.fileName}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  domainColors[result.domain as keyof typeof domainColors] ||
                  'text-gray-600 bg-gray-100'
                }`}
              >
                {result.domain}
              </span>
            </div>
            <p className='text-gray-600 text-lg'>
              Analysis completed • {formattedDate}
            </p>
          </div>

          <div className='flex items-center gap-4'>
            <div className='bg-green-50 rounded-lg p-4 text-center'>
              <div className='text-2xl font-bold text-green-600'>
                {result.explorationCharts.length + result.featureCharts.length}
              </div>
              <div className='text-sm text-green-600 font-medium'>
                Total Charts
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Charts Sections */}
      <div className='space-y-12'>
        {/* Exploration Charts */}
        {renderChartSection(
          'Exploration Charts',
          result.explorationCharts,
          'bg-blue-50'
        )}

        {/* Feature Charts */}
        {renderChartSection(
          'Feature Charts',
          result.featureCharts,
          'bg-purple-50'
        )}

        {/* Empty State */}
        {result.explorationCharts.length === 0 &&
          result.featureCharts.length === 0 && (
            <div className='text-center py-20'>
              <div className='max-w-md mx-auto'>
                <svg
                  className='mx-auto h-20 w-20 text-gray-400 mb-6'
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
                <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                  No charts generated
                </h3>
                <p className='text-gray-500 text-lg leading-relaxed'>
                  The analysis completed but no charts were generated from your
                  data.
                </p>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default AnalysisResults;
