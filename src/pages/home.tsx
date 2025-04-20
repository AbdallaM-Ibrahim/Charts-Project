import { useAppSelector } from '../hooks/store.hooks';
import { selectUser } from '../store/features/user.slice';

const Home: React.FC = () => {
  const user = useAppSelector(selectUser);

  // useEffect(() => {}, [user.token, user.name]);

  return (
    <div className='w-full max-w-md mx-auto px-4'>
      <div className='mt-16 flex flex-col items-center'>
        <h1 className='text-2xl font-medium mb-4'>Home Page</h1>
        <h2 className='text-xl'>Hello, {user.name || 'User'}!</h2>
      </div>
    </div>
  );
};

export default Home;
