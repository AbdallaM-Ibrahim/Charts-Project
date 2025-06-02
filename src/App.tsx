import type React from 'react';
import { useEffect } from 'react';
// import './App.css';
import { MyRouter } from './MyRouter';
import { useAppDispatch, useAppSelector } from './hooks/store.hooks';
import { getSelf } from './store/features/user.actions';
import { setToken } from './store/features/user.slice';
import { selectToken, selectUser } from './store/features/user.slice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!token) {
      dispatch(setToken(localStorage.getItem('token') || ''));
    }
    if (token && !user.id) {
      dispatch(getSelf(token));
    }
  }, [token, user.id, dispatch]);

  return (
    <div className='flex flex-col min-h-screen bg-[#EFF2F4] text-gray-900'>
      <MyRouter />
      <footer className='text-center my-auto text-sm max-h-[70px]'>
        <p>
          Made with{' '}
          <span role='img' aria-label='React'>
            ⚛️
          </span>{' '}
          by{' '}
          <a
            href='mailto:futuresolve.tech@gmail.com?subject=Contact from Charts Project'
            className='hover:underline text-inherit'
          >
            FutureSolve
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
