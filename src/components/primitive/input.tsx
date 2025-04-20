import type React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode | string; // Allow string for SVG paths
  containerClassName?: string; // For styling the outer container
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  icon,
  className = '',
  containerClassName = '',
  placeholder,
  ...props
}) => {
  return (
    <div
      className={`
        flex items-center border border-gray-300 rounded-xl
        focus-within:border-[#2C60EA] focus-within:ring-1 focus-within:ring-[#2C60EA] 
        hover:border-gray-400 
        transition-colors duration-200 ease-in-out
        bg-white // Default background, can be overridden by containerClassName
        ${containerClassName}
      `}
    >
      {icon && (
        <span className='flex items-center justify-center pl-3 pr-2 text-gray-500'>
          {' '}
          {/* Center icon */}
          {typeof icon === 'string' ? (
            <img src={icon} alt='input icon' className='w-5 h-5' /> // Render img if icon is a string path
          ) : (
            icon // Render ReactNode directly
          )}
        </span>
      )}
      <input
        className={`
          w-full py-2 bg-transparent 
          focus:outline-none 
          ${icon ? 'pl-2' : 'pl-3'} // Adjust padding based on icon presence
          pr-3 // Add padding to the right
          ${className} // Allow overriding input-specific styles
        `}
        {...props}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
