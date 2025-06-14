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
    <div className='flex justify-center items-center py-20'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4' />
        <p className='text-gray-600 text-lg'>Loading dashboard data...</p>
      </div>
    </div>
  );

  const renderErrorState = () => (
    <div className='flex justify-center items-center py-20'>
      <div className='bg-red-50 border border-red-200 rounded-xl p-8 max-w-lg mx-auto text-center'>
        <svg
          className='mx-auto h-12 w-12 text-red-400 mb-4'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <title>Error Icon</title>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1.5}
            d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
        <h3 className='text-xl font-semibold text-red-800 mb-3'>
          Something went wrong
        </h3>
        <p className='text-red-600 mb-6'>{error}</p>
        <button
          type='button'
          onClick={selectedDashboard ? handleBackToDashboards : fetchDashboards}
          className='bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium'
        >
          Try Again
        </button>
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className='text-center py-20'>
      <div className='max-w-md mx-auto'>
        <svg
          className='mx-auto h-20 w-20 text-gray-400 mb-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <title>No Dashboards Found</title>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1.5}
            d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
          />
        </svg>
        <h3 className='text-2xl font-bold text-gray-900 mb-3'>
          No dashboards found
        </h3>
        <p className='text-gray-500 text-lg leading-relaxed'>
          Create your first dashboard to get started with your data analysis
          journey.
        </p>
      </div>
    </div>
  );

  const renderDashboardsList = () => (
    <div className='space-y-8'>
      {/* Header Section */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8'>
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>
              Data Analysis
            </h1>
            <p className='text-gray-600 text-lg'>
              Explore and analyze your dashboard data with interactive charts
            </p>
          </div>
          <div className='flex items-center gap-3'>
            <div className='bg-blue-50 rounded-lg px-4 py-2'>
              <div className='text-sm text-blue-600 font-medium'>
                {dashboards.length}{' '}
                {dashboards.length === 1 ? 'Dashboard' : 'Dashboards'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboards Grid */}
      {dashboards.length === 0 ? (
        renderEmptyState()
      ) : (
        <div className='space-y-6'>
          <h2 className='text-xl font-semibold text-gray-900'>
            Available Dashboards
          </h2>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {dashboards.map((dashboard) => (
              <DashboardCard
                key={dashboard.id}
                dashboard={dashboard}
                onClick={handleDashboardClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderDashboardDetail = () => (
    <div className='space-y-6'>
      {/* Dashboard Detail Content */}
      {detailLoading ? (
        renderLoadingState()
      ) : (
        <DashboardDetail
          dashboard={selectedDashboard!}
          onBack={handleBackToDashboards}
        />
      )}
    </div>
  );

  return (
    <div className='p-6 max-w-7xl mx-auto'>
      {/* Unified Back Button - Show appropriate back button based on current view */}
      {selectedDashboard ? (
        // Breadcrumb-style back button for detail view
        <div className='mb-6'>
          <button
            onClick={handleBackToDashboards}
            className='flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm'
          >
            <svg
              className='w-4 h-4 mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
            Back to Data Analysis
          </button>
        </div>
      ) : (
        // Main back button for dashboard list
        <BackButton text='Back' />
      )}

      {/* Main Content */}
      <div className='space-y-6'>
        {error
          ? renderErrorState()
          : selectedDashboard
          ? renderDashboardDetail()
          : loading
          ? renderLoadingState()
          : renderDashboardsList()}
      </div>
    </div>
  );
};

export default DataAnalysis;
