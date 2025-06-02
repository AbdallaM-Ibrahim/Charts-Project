import { useAppSelector } from '../hooks/store.hooks';
import { selectUser } from '../store/features/user.slice';

const Home: React.FC = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold text-gray-800 mb-4'>Home</h1>
      <div className='bg-white rounded-lg shadow p-6'>
        <h2 className='text-xl font-semibold mb-2'>
          Welcome back, {user.fullName || 'User'}!
        </h2>
        <p className='text-gray-600'>
          Welcome to your dashboard. Use the navigation menu to explore
          different sections.
        </p>
      </div>
    </div>
  );
};

export default Home;
