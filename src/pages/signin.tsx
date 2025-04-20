import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { signIn } from '../store/features/user.actions';
import { useAppDispatch, useAppSelector } from '../hooks/store.hooks';
import { useEffect } from 'react';
import { selectToken } from '../store/features/user.slice';

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
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    dispatch(signIn(email, password));
  };

  return (
    <div className='w-full max-w-md mx-auto px-4'>
      <div className='mt-8 flex flex-col items-center'>
        <h1 className='mt-4 text-2xl font-medium'>Sign in</h1>

        <form className='w-full mt-4' onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-sm font-medium mb-1'
            >
              Email
            </label>
            <input
              required
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              // biome-ignore lint/a11y/noAutofocus: <explanation>
              autoFocus
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  focus:border-transparent'
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
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent'
            />
          </div>

          <div className='flex items-center mb-4'>
            <input
              id='remember'
              name='remember'
              type='checkbox'
              className='h-4 w-4 border-gray-300 rounded'
            />
            <label htmlFor='remember' className='ml-2 block text-sm'>
              Remember me
            </label>
          </div>

          <button
            type='submit'
            className='w-full bg-[#2C60EA] text-white py-2 px-4 rounded-md hover:bg-[#1A4B9A] focus:outline-none cursor-pointer focus:ring-1 focus:ring-[#2C60EA] focus:ring-offset-2 transition-colors'
          >
            Sign In
          </button>

          <div className='mt-4 flex justify-between'>
            <RouterLink to='/' className='text-sm hover:underline'>
              Forgot password?
            </RouterLink>
            <RouterLink to='/register' className='text-sm hover:underline'>
              Don't have an account? Sign Up
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
