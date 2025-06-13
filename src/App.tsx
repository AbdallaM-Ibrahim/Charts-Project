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
    </div>
  );
};

export default App;
