import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { signIn } from '../store/features/user.actions';
import { useAppDispatch, useAppSelector } from '../hooks/store.hooks';
import { useEffect } from 'react';
import { selectToken } from '../store/features/user.slice';
import Input from '../components/primitive/input'; // Import the custom Input component
import RafikiSvg from '../assets/rafiki.svg'; // Import the SVG

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
    <div className='flex justify-center px-4 py-10 md:min-h-[700px] md:items-center'>
      <div className='flex flex-col md:flex-row max-w-7xl items-center justify-center w-full'>
        <div className='z-10 flex order-1 md:order-2 md:w-1/2'>
          <img
            src={RafikiSvg}
            alt='Illustration'
            className='md:w-full h-auto max-w-2xl'
          />
        </div>
        <div className='w-full max-w-md md:max-w-lg mx-auto order-2 md:order-1 md:w-1/2'>
          <div className='mt-2 flex flex-col items-center'>
            <h1 className='mt-2 text-2xl font-medium'>Sign in</h1>

            <form className='w-full mt-2' onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium mb-1'
                >
                  Email
                </label>
                <Input
                  required
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  placeholder='Enter your email'
                  autoFocus
                  icon='/src/assets/email.svg' // Use email SVG icon path
                />
              </div>

              <div className='mb-4'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium mb-1'
                >
                  Password
                </label>
                <Input
                  required
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  placeholder='Password'
                  icon='/src/assets/lock.svg' // Use lock SVG icon path
                />
              </div>

              <button
                type='submit'
                className='w-full bg-[#2C60EA] text-white py-2 px-4 rounded-xl hover:bg-[#1A4B9A] focus:outline-none cursor-pointer focus:ring-1 focus:ring-[#2C60EA] focus:ring-offset-2 transition-colors'
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
      </div>
    </div>
  );
};

export default Signin;
