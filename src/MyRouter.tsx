import type React from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import Navbar from './components/navbar';
import Signin from './pages/signin';
import Register from './pages/register';
import Home from './pages/home';
import { useAppSelector } from './hooks/store.hooks';
import { selectToken } from './store/features/user.slice';

export const MyRouter: React.FC<React.PropsWithChildren> = () => {
  const token = useAppSelector(selectToken);

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route
          path='/*'
          element={token ? <Home /> : <Navigate replace to='/signin' />}
        />
        <Route path='/signin' element={<Signin />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  );
};
