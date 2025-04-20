import type React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/store.hooks';
import { selectToken } from '../store/features/user.slice';
import { signOut } from '../store/features/user.actions';
import NavButton from './nav-button';
import HeaderBackground from './icons/HeaderBackground';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);

  const onSignOutHandler = () => {
    dispatch(signOut());
  };

  return (
    /* Fixed height container with grid layout for proper scaling */
    <header className='w-full relative min-h-[80px] grid grid-rows-1 grid-cols-1'>
      {/* Background with proper sizing - fills the entire area */}
      <div className='row-span-full col-span-full relative overflow-hidden w-full h-full'>
        <HeaderBackground className='w-full h-full' />
      </div>

      {/* Content layer - same grid area with higher z-index */}
      <div className='z-10 container mx-auto px-4 pt-4 pb-8 row-span-full col-span-full relative'>
        <div className='flex items-center justify-between flex-wrap'>
          <RouterLink
            to='/'
            className='text-2xl font-bold text-white hover:text-gray-100'
          >
            Instalyze
          </RouterLink>

          <nav className='flex items-center space-x-4'>
            {token ? (
              <button
                type='button'
                onClick={onSignOutHandler}
                className='px-4 py-2 border border-white rounded-md bg-transparent text-white hover:bg-white hover:text-purple-700 transition-colors'
              >
                Log Out
              </button>
            ) : (
              <>
                <NavButton to='/register'>Register</NavButton>
                <NavButton to='/signin'>Sign In</NavButton>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
