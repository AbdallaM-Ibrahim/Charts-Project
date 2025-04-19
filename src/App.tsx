import type React from 'react';
import { useEffect } from 'react';
import './App.css';
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
    <div className='min-h-screen bg-white text-gray-900'>
      <MyRouter />
      <footer className='text-center mt-8 py-4'>
        <p>
          Made with{' '}
          <span role='img' aria-label='React'>
            ⚛️
          </span>{' '}
          by{' '}
          <a
            href='mailto:futuresolve.tech@gmail.com?subject=Contact from Charts Project'
            className='text-purple-600 hover:underline'
          >
            FutureSolve
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
