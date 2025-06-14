import type React from 'react';

interface DashboardCardProps {
  dashboard: {
    id: string;
    name: string;
    createdAt: string;
  };
  onClick: (id: string) => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  dashboard,
  onClick,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className='bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200'
      onClick={() => onClick(dashboard.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(dashboard.id);
        }
      }}
    >
      <div className='flex justify-between items-start mb-3'>
        <h3 className='text-xl font-semibold text-gray-800 truncate'>
          {dashboard.name}
        </h3>
        <div className='flex items-center text-sm text-gray-500 ml-4'>
          <svg className='w-4 h-4 mr-1' fill='currentColor' viewBox='0 0 20 20'>
            <title>Check Circle</title>
            <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
          </svg>
        </div>
      </div>

      <div className='text-sm text-gray-600 mb-4'>
        Created: {formatDate(dashboard.createdAt)}
      </div>

      <div className='flex justify-between items-center'>
        <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
          Dashboard
        </span>
        <button
          type='button'
          className='text-blue-600 hover:text-blue-800 text-sm font-medium'
        >
          View Details →
        </button>
      </div>
    </div>
  );
};

export default DashboardCard;
