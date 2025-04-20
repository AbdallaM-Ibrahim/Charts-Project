import type React from 'react';
import { NavLink } from 'react-router-dom';

interface NavButtonProps {
  children: React.ReactNode;
  to: string;
  activated?: boolean;
  className?: string;
}

const NavButton: React.FC<NavButtonProps> = ({
  children,
  to,
  activated,
  className = '',
}) => (
  <NavLink to={to} className='text-inherit'>
    {({ isActive }) => {
      isActive = activated ?? isActive;

      return (
        <button
          type='button'
          className={`
            px-4 py-2 rounded-md font-medium
            ${
              isActive
                ? 'text-black border border-[#EFF2F4] bg-[#EFF2F4]'
                : 'text-white border border-white bg-[#2C60EA] hover:bg-[#1A4B9A] cursor-pointer'
            }
            ${className}
          `}
        >
          {children}
        </button>
      );
    }}
  </NavLink>
);

export default NavButton;
