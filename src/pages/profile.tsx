import type React from 'react';
import { useAppSelector } from '../hooks/store.hooks';
import { selectUser } from '../store/features/user.slice';
import BackButton from '../components/primitive/back-button';

const Profile: React.FC = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className='p-6'>
      <BackButton text='Back' />

      <div className='bg-white rounded-lg shadow p-6'>
        <h2 className='text-xl font-semibold mb-4'>User Information</h2>
        <div className='space-y-2'>
          <p>
            <span className='font-medium'>Name:</span> {user.name || 'John Doe'}
          </p>
          <p>
            <span className='font-medium'>Email:</span>{' '}
            {user.email || 'john.doe@example.com'}
          </p>
          {user.phone && (
            <p>
              <span className='font-medium'>Phone:</span>{' '}
              {user.phone || "+20-123-456-7890"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
