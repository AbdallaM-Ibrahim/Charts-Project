import type React from 'react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  to?: string;
  text?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  to = '/',
  text,
  className = 'flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-4',
}) => {
  const navigate = useNavigate();

  return (
    <button type='button' onClick={() => navigate(to)} className={className}>
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
      {text && <span className='text-sm font-medium'>{text}</span>}
    </button>
  );
};

export default BackButton;
