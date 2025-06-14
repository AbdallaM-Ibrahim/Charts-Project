import type React from 'react';
import { useAppDispatch } from '../hooks/store.hooks';
import { signOut } from '../store/features/user.actions';
import BackButton from '../components/primitive/back-button';

const Settings: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <div className='p-6'>
      <BackButton text='Back' />

      <h1 className='text-3xl font-bold text-gray-800 mb-4'>Settings</h1>
      <div className='bg-white rounded-lg shadow p-6'>
        <h2 className='text-xl font-semibold mb-4'>Account Settings</h2>
        <div className='space-y-4'>
          <button
            type='button'
            onClick={handleSignOut}
            className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
