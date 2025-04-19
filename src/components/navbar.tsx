import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/store.hooks';
import { selectToken } from '../store/features/user.slice';
import { signOut } from '../store/features/user.actions';
import NavButton from './nav-button';
import { ElevationScroll } from './elevation-scroll';
import HeaderBackground from './icons/HeaderBackground';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);

  const onSignOutHandler = () => {
    dispatch(signOut());
  };

  return (
    <ElevationScroll>
      <>
        {/* Background container with fixed positioning */}
        <header className='sticky top-0 w-full'>
          <div className='fixed top-0 left-0 w-full h-[10rem] '>
            <HeaderBackground className='h-full z-0' />
          </div>
          {/* Content container with relative positioning to appear above the background */}
          <div className='relative z-10 container mx-auto px-4 py-4'>
            <div className='flex items-center justify-between flex-wrap'>
              <RouterLink
                to='/'
                className='text-xl font-semibold text-white hover:text-gray-100 transition-colors'
              >
                Authentication System
              </RouterLink>

              <nav className='flex items-center space-x-4'>
                {!token ? (
                  <>
                    <NavButton to='/register'>Register</NavButton>
                    <NavButton to='/signin'>Sign In</NavButton>
                  </>
                ) : (
                  <button
                    onClick={onSignOutHandler}
                    className='px-4 py-2 border border-white rounded-md bg-transparent text-white hover:bg-white hover:text-purple-700 transition-colors'
                  >
                    Log Out
                  </button>
                )}
              </nav>
            </div>
          </div>
        </header>
      </>
    </ElevationScroll>
  );
};

export default Navbar;
