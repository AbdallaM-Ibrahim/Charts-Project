import type React from 'react';
import { useAppSelector } from '../hooks/store.hooks';
import { selectUser } from '../store/features/user.slice';

const Profile: React.FC = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className='p-6'>
      <div className='bg-white rounded-lg shadow p-6'>
        <h2 className='text-xl font-semibold mb-4'>User Information</h2>
        <div className='space-y-2'>
          <p>
            <span className='font-medium'>Name:</span>{' '}
            {user.name || 'Not set'}
          </p>
          <p>
            <span className='font-medium'>Email:</span>{' '}
            {user.email || 'Not set'}
          </p>
          <p>
            <span className='font-medium'>Phone:</span>{' '}
            {user.phone || 'Not set'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
