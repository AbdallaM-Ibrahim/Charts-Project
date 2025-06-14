import type React from 'react';
import { getFileIconConfig } from './fileIconsConfig';

interface FileIconProps {
  type: string;
  className?: string;
}

export const FileIcon: React.FC<FileIconProps> = ({
  type,
  className = 'w-6 h-6',
}) => {
  const { bgColor, iconPath } = getFileIconConfig(type);

  return (
    <div
      className={`${bgColor} rounded-lg p-2 flex items-center justify-center ${className}`}
    >
      <img
        src={iconPath}
        alt={`${type} file icon`}
        className='w-6 h-6 object-contain'
        style={{ filter: 'brightness(0) invert(1)' }} // Makes the SVG white
      />
    </div>
  );
};
