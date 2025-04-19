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
            ${
              isActive
                ? 'text-white font-medium border border-white px-4 py-2 rounded-md'
                : 'px-4 py-2 border border-white rounded-md bg-transparent text-white hover:bg-white hover:text-purple-700 transition-colors'
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
