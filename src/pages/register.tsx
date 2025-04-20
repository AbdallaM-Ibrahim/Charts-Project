import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { register } from '../store/features/user.actions';
import { useAppDispatch, useAppSelector } from '../hooks/store.hooks';
import type { User } from '../services/auth.service';
import { useEffect } from 'react';
import { selectToken } from '../store/features/user.slice';
import Input from '../components/primitive/input';
import RafikiSvg from '../assets/rafiki.svg';

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
      name: data.get('name') as string,
      email: data.get('email') as string,
      password: data.get('password') as string,
    };

    dispatch(register(user));
  };

  return (
    <div className='flex justify-center px-4 py-10 md:min-h-[700px] md:items-center'>
      <div className='flex flex-col md:flex-row max-w-7xl items-center justify-center w-full'>
        <div className='z-10 flex order-1 md:order-2 md:w-1/2'>
          <img
            src={RafikiSvg}
            alt='Illustration'
            className='w-full h-auto max-w-2xl'
          />
        </div>
        <div className='w-full max-w-md md:max-w-lg mx-auto order-2 md:order-1 md:w-1/2'>
          {' '}
          <div className='mt-2 flex flex-col items-center '>
            <h1 className='mb-2 text-2xl font-medium'>Register</h1>

            <form className='w-full mt-2' onSubmit={onSubmitHandle}>
              <div className='mb-4'>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium mb-1'
                >
                  Full Name
                </label>
                <Input
                  required
                  id='name'
                  name='name'
                  type='text'
                  autoComplete='name'
                  placeholder='Emil John'
                  autoFocus
                  icon='/src/assets/person.svg' // Use person SVG icon path
                />
              </div>

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
                  icon='/src/assets/email.svg' // Use email SVG icon path
                />
              </div>

              <div className='mb-4'>
                <label
                  htmlFor='phone'
                  className='block text-sm font-medium mb-1'
                >
                  Phone Number
                </label>
                <Input
                  id='phone'
                  name='phone'
                  type='tel'
                  autoComplete='tel'
                  placeholder='Phone number'
                  icon='/src/assets/phone.svg' // Use phone SVG icon path
                />
              </div>

              <div className='mb-4'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium mb-1'
                >
                  Create Password
                </label>
                <Input
                  required
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='new-password'
                  placeholder='Password'
                  icon='/src/assets/lock.svg' // Use lock SVG icon path
                />
              </div>

              <div className='mb-4'>
                <label
                  htmlFor='confirmPassword'
                  className='block text-sm font-medium mb-1'
                >
                  Confirm Password
                </label>
                <Input
                  required
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  autoComplete='new-password'
                  placeholder='Password'
                  icon='/src/assets/lock.svg' // Use lock SVG icon path
                />
              </div>

              <button
                type='submit'
                className='w-full text-white bg-[#2C60EA] py-2 px-4 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors'
              >
                Sign Up
              </button>

              <div className='mt-4 flex justify-end'>
                <RouterLink to='/signin' className='text-sm  hover:underline'>
                  Already have an account? Sign in
                </RouterLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
