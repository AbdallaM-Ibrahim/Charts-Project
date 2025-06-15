import type React from 'react';
import { useEffect } from 'react';
import type { AnalysisStatus } from '../types/analysis';

interface AnalysisLoadingModalProps {
  isVisible: boolean;
  status: AnalysisStatus;
  progress: number;
  onCancel?: () => void;
}

const AnalysisLoadingModal: React.FC<AnalysisLoadingModalProps> = ({
  isVisible,
  status,
  progress,
  onCancel,
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  // Prevent page unload during analysis
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isVisible && status !== 'completed') {
        event.preventDefault();
        event.returnValue =
          'Analysis is in progress. Are you sure you want to leave?';
        return event.returnValue;
      }
    };

    if (isVisible) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isVisible, status]);

  if (!isVisible) return null;
  const getStatusMessage = () => {
    switch (status) {
      case 'uploading':
        return 'Uploading your file...';
      case 'analyzing':
        return 'Analyzing your data...';
      case 'completed':
        return 'Analysis completed!';
      case 'error':
        return 'Analysis failed';
      default:
        return 'Processing...';
    }
  };

  const getStatusIcon = () => {
    if (status === 'completed') {
      return (
        <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6'>
          <svg
            className='w-8 h-8 text-green-600'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M5 13l4 4L19 7'
            />
          </svg>
        </div>
      );
    }

    return (
      <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6'>
        <div className='animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent' />
      </div>
    );
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center'>
        {/* Status Icon */}
        <div className='flex justify-center'>{getStatusIcon()}</div>

        {/* Status Message */}
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>
          {getStatusMessage()}
        </h2>

        {/* Progress Bar */}
        <div className='mb-6'>
          <div className='flex justify-between text-sm text-gray-600 mb-2'>
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-3'>
            <div
              className='bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out'
              ref={(el) => {
                if (el) {
                  el.style.width = `${Math.min(progress, 100)}%`;
                }
              }}
            />
          </div>
        </div>

        {/* Status Description */}
        <p className='text-gray-600 mb-6 leading-relaxed'>
          {status === 'uploading' &&
            'Your file is being uploaded to our secure servers.'}
          {status === 'analyzing' &&
            'Our AI is processing your data and generating insights. This usually takes 3-5 minutes.'}
          {status === 'completed' &&
            'Your analysis is ready! Redirecting you to the results...'}
        </p>

        {/* Time Estimate */}
        {status === 'analyzing' && (
          <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6'>
            <div className='flex items-center justify-center text-yellow-800'>
              <svg
                className='w-5 h-5 mr-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <span className='text-sm font-medium'>
                Estimated time: 3-5 minutes
              </span>
            </div>
          </div>
        )}

        {/* Warning */}
        {status !== 'completed' && (
          <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-6'>
            <div className='flex items-center justify-center text-red-800'>
              <svg
                className='w-5 h-5 mr-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <span className='text-sm font-medium'>
                Please don't close this tab
              </span>
            </div>
          </div>
        )}

        {/* Cancel Button (only during upload) */}
        {status === 'uploading' && onCancel && (
          <button
            type='button'
            onClick={onCancel}
            className='text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors'
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default AnalysisLoadingModal;
