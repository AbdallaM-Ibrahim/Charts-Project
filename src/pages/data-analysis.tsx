import type React from 'react';
import { useState, useEffect } from 'react';
import BackButton from '../components/primitive/back-button';
import DashboardCard from '../components/dashboard/dashboard-card';
import DashboardDetail from '../components/dashboard/dashboard-detail';
import HistoryService, { type HistoryEntry } from '../services/history.service';

const DataAnalysis: React.FC = () => {
  const [dashboards, setDashboards] = useState<HistoryEntry[]>([]);
  const [selectedDashboard, setSelectedDashboard] =
    useState<HistoryEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboards();
  }, []);

  const fetchDashboards = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await HistoryService.getHistory();
      setDashboards(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch dashboards'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDashboardClick = async (dashboardId: string) => {
    try {
      setDetailLoading(true);
      setError(null);
      const dashboardDetail = await HistoryService.getChartHistory(dashboardId);
      setSelectedDashboard(dashboardDetail);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch dashboard details'
      );
    } finally {
      setDetailLoading(false);
    }
  };

  const handleBackToDashboards = () => {
    setSelectedDashboard(null);
    setError(null);
  };

  const renderLoadingState = () => (
    <div className='flex justify-center items-center py-12'>
      <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600' />
      <span className='ml-3 text-gray-600'>Loading...</span>
    </div>
  );

  const renderErrorState = () => (
    <div className='text-center py-12'>
      <div className='bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto'>
        <svg
          className='mx-auto h-8 w-8 text-red-400 mb-4'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <title>Error Icon</title>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
        <h3 className='text-lg font-medium text-red-800 mb-2'>Error</h3>
        <p className='text-red-600 mb-4'>{error}</p>
        <button
          type='button'
          onClick={selectedDashboard ? handleBackToDashboards : fetchDashboards}
          className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors'
        >
          Try Again
        </button>
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className='text-center py-12'>
      <svg
        className='mx-auto h-12 w-12 text-gray-400'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <title>No Dashboards Found</title>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
        />
      </svg>
      <h3 className='mt-2 text-lg font-medium text-gray-900'>
        No dashboards found
      </h3>
      <p className='mt-1 text-gray-500'>
        Create your first dashboard to get started with your data analysis.
      </p>
    </div>
  );

  const renderDashboardsList = () => (
    <>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-3xl font-bold text-gray-800'>Data Analysis</h1>
          <p className='text-gray-600 mt-2'>
            Explore and analyze your dashboard data
          </p>
        </div>
        <div className='text-sm text-gray-500'>
          {dashboards.length}{' '}
          {dashboards.length === 1 ? 'Dashboard' : 'Dashboards'}
        </div>
      </div>

      {dashboards.length === 0 ? (
        renderEmptyState()
      ) : (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {dashboards.map((dashboard) => (
            <DashboardCard
              key={dashboard.id}
              dashboard={dashboard}
              onClick={handleDashboardClick}
            />
          ))}
        </div>
      )}
    </>
  );

  return (
    <div className='p-6'>
      <BackButton text='Back' />

      {error ? (
        renderErrorState()
      ) : selectedDashboard ? (
        detailLoading ? (
          renderLoadingState()
        ) : (
          <DashboardDetail
            dashboard={selectedDashboard}
            onBack={handleBackToDashboards}
          />
        )
      ) : loading ? (
        renderLoadingState()
      ) : (
        renderDashboardsList()
      )}
    </div>
  );
};

export default DataAnalysis;
