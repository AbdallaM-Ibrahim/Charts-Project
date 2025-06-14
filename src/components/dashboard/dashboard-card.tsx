import type React from 'react';
import ChartIcon from '../icons/ChartIcon';

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
    <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <div className='relative'>
            <ChartIcon className='w-12 h-12 text-blue-600' />
          </div>
          <div>
            <h3 className='font-semibold text-gray-900 text-lg'>
              {dashboard.name}
            </h3>
            <p className='text-sm text-gray-500'>
              Created: {formatDate(dashboard.createdAt)}
            </p>
          </div>
        </div>

        <div className='flex items-center'>
          <span className='inline-flex items-center px-3 py-1 rounded-full m-x-3 text-xs font-medium bg-blue-100 text-blue-800 mr-4'>
            Dashboard
          </span>
          <button
            type='button'
            className='text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center'
            onClick={() => onClick(dashboard.id)}
          >
            View Details
            <svg
              className='w-4 h-4 ml-1'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
