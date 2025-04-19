import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { register } from '../store/features/user.actions';
import { useAppDispatch, useAppSelector } from '../hooks/store.hooks';
import { User } from '../services/auth.service';
import { useEffect } from 'react';
import { selectToken } from '../store/features/user.slice';
import LockIcon from '../components/icons/LockIcon';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(selectToken);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const onSubmitHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user: Partial<User> = {
      firstName: data.get('firstName') as string,
      lastName: data.get('lastName') as string,
      username: data.get('username') as string,
      password: data.get('password') as string,
    };

    dispatch(register(user));
  };

  return (
    <div className='w-full max-w-md mx-auto px-4'>
      <div className='mt-8 flex flex-col items-center'>
        <div className='w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white'>
          <LockIcon />
        </div>

        <h1 className='mt-4 text-2xl font-medium'>Register</h1>

        <form className='w-full mt-6' onSubmit={onSubmitHandle}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='mb-4'>
              <label
                htmlFor='firstName'
                className='block text-sm font-medium mb-1'
              >
                First Name
              </label>
              <input
                required
                id='firstName'
                name='firstName'
                type='text'
                autoComplete='given-name'
                autoFocus
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='lastName'
                className='block text-sm font-medium mb-1'
              >
                Last Name
              </label>
              <input
                required
                id='lastName'
                name='lastName'
                type='text'
                autoComplete='family-name'
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
              />
            </div>
          </div>

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
              autoComplete='new-password'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
            />
          </div>

          <div className='flex items-center mb-4'>
            <input
              id='allowExtraEmails'
              name='allowExtraEmails'
              type='checkbox'
              className='h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded'
            />
            <label htmlFor='allowExtraEmails' className='ml-2 block text-sm'>
              I want to receive inspiration, marketing promotions and updates
              via email.
            </label>
          </div>

          <button
            type='submit'
            className='w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors'
          >
            Sign Up
          </button>

          <div className='mt-4 flex justify-end'>
            <RouterLink
              to='/signin'
              className='text-sm text-purple-600 hover:underline'
            >
              Already have an account? Sign in
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
