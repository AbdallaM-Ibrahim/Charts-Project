import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { signIn } from '../store/features/user.actions';
import { useAppDispatch, useAppSelector } from '../hooks/store.hooks';
import { useEffect } from 'react';
import { selectToken } from '../store/features/user.slice';
import LockIcon from '../components/icons/LockIcon';

const Signin: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(selectToken);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username') as string;
    const password = data.get('password') as string;

    dispatch(signIn(username, password));
  };

  return (
    <div className='w-full max-w-md mx-auto px-4'>
      <div className='mt-8 flex flex-col items-center'>
        <div className='w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white'>
          <LockIcon />
        </div>

        <h1 className='mt-4 text-2xl font-medium'>Sign in</h1>

        <form className='w-full mt-4' onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='username'
              className='block text-sm font-medium mb-1'
            >
              Username
            </label>
            <input
              required
              id='username'
              name='username'
              type='text'
              autoComplete='username'
              autoFocus
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-sm font-medium mb-1'
            >
              Password
            </label>
            <input
              required
              id='password'
              name='password'
              type='password'
              autoComplete='current-password'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
            />
          </div>

          <div className='flex items-center mb-4'>
            <input
              id='remember'
              name='remember'
              type='checkbox'
              className='h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded'
            />
            <label htmlFor='remember' className='ml-2 block text-sm'>
              Remember me
            </label>
          </div>

          <button
            type='submit'
            className='w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors'
          >
            Sign In
          </button>

          <div className='mt-4 flex justify-between'>
            <RouterLink
              to='/'
              className='text-sm text-purple-600 hover:underline'
            >
              Forgot password?
            </RouterLink>
            <RouterLink
              to='/register'
              className='text-sm text-purple-600 hover:underline'
            >
              Don't have an account? Sign Up
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
