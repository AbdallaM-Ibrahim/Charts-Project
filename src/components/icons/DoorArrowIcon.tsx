import type React from 'react';

interface DoorArrowIconProps {
  className?: string;
  isCollapsed?: boolean;
}

const DoorArrowIcon: React.FC<DoorArrowIconProps> = ({
  className = '',
  isCollapsed = false,
}) => {
  return (
    <svg
      className={`${className} transition-transform duration-500 ${
        !isCollapsed ? '' : 'rotate-180'
      }`}
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M11 19l-7-7 7-7m8 14l-7-7 7-7'
      />
    </svg>
  );
};

export default DoorArrowIcon;
