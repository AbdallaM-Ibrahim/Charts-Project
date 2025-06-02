import type React from 'react';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from './icons/HomeIcon';
import AnalyticsIcon from './icons/AnalyticsIcon';
import DatabaseIcon from './icons/DatabaseIcon';
import UserIcon from './icons/UserIcon';
import SettingsIcon from './icons/SettingsIcon';
import DoorArrowIcon from './icons/DoorArrowIcon';
import MenuIcon from './icons/MenuIcon';

interface DrawerItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
}

const DrawerItem: React.FC<DrawerItemProps> = ({
  to,
  icon,
  label,
  isCollapsed,
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 hover:bg-[#EAF1FB] transition-all duration-200 rounded-lg mx-3 group relative ${
          isActive ? 'bg-[#EAF1FB] font-semibold' : ''
        }`
      }
      title={isCollapsed ? label : undefined}
    >
      <span className='flex-shrink-0 w-6 h-6 flex items-center justify-center text-[#2C60EA]'>
        {icon}
      </span>
      {!isCollapsed && (
        <span className='ml-4 text-[15px] whitespace-nowrap overflow-hidden'>
          {label}
        </span>
      )}
    </NavLink>
  );
};

const Drawer: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Collapse drawer by default on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    // Check on mount
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDrawer = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    { to: '/', icon: <HomeIcon className='w-5 h-5' />, label: 'Home' },
    {
      to: '/data-analysis',
      icon: <AnalyticsIcon className='w-5 h-5' />,
      label: 'Data Analysis',
    },
    {
      to: '/data-source',
      icon: <DatabaseIcon className='w-5 h-5' />,
      label: 'Data Source',
    },
    {
      to: '/profile',
      icon: <UserIcon className='w-5 h-5' />,
      label: 'Profile',
    },
    {
      to: '/settings',
      icon: <SettingsIcon className='w-5 h-5' />,
      label: 'Settings',
    },
  ];

  return (
    <div
      className={`bg-[#F9FBFD] transition-all duration-300 ease-in-out flex flex-col ${
        isCollapsed ? 'w-24' : 'w-72'
      }`}
    >
      {/* Header */}
      <div className='flex items-center px-4 py-3 mx-3 mt-8 mb-4'>
        {!isCollapsed && (
          <>
            <MenuIcon className='w-5 h-5 text-[#2C60EA]' />
            <h1 className='text-3xl font-bold text-[#2C60EA] tracking-tight flex-1 pl-2'>
              Instalyze
            </h1>
          </>
        )}
        <button
          onClick={toggleDrawer}
          className='p-2 rounded-lg hover:bg-gray-100 transition-colors'
          aria-label='Toggle drawer'
        >
          <DoorArrowIcon
            className='w-5 h-5 text-[#2C60EA]'
            isCollapsed={isCollapsed}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className='flex flex-1 pt-4'>
        <div className='space-y-5 px-2 flex-1'>
          {menuItems.map((item) => (
            <DrawerItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </nav>
      {/* No footer or user info */}
    </div>
  );
};

export default Drawer;
