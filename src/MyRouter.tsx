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
import DataAnalysis from './pages/data-analysis';
import DataSource from './pages/data-source';
import Profile from './pages/profile';
import Settings from './pages/settings';
import { useAppSelector } from './hooks/store.hooks';
import { selectToken } from './store/features/user.slice';
import Drawer from './components/drawer';

export const MyRouter: React.FC<React.PropsWithChildren> = () => {
  const token = useAppSelector(selectToken);

  // Layout component for authenticated users
  const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    return (
      // height should be screen minus footer height
      <div className='flex min-h-[calc(100vh_-_70px)] bg-[#EFF2F4]'>
        <Drawer />
        <main className='flex-1 overflow-y-auto'>{children}</main>
      </div>
    );
  };

  return (
    <Router>
      {!token && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route path='/signin' element={<Signin />} />
        <Route path='/register' element={<Register />} />

        {/* Protected routes */}
        {token ? (
          <>
            <Route
              path='/'
              element={
                <AuthenticatedLayout>
                  <Home />
                </AuthenticatedLayout>
              }
            />
            <Route
              path='/data-analysis'
              element={
                <AuthenticatedLayout>
                  <DataAnalysis />
                </AuthenticatedLayout>
              }
            />
            <Route
              path='/data-source'
              element={
                <AuthenticatedLayout>
                  <DataSource />
                </AuthenticatedLayout>
              }
            />
            <Route
              path='/profile'
              element={
                <AuthenticatedLayout>
                  <Profile />
                </AuthenticatedLayout>
              }
            />
            <Route
              path='/settings'
              element={
                <AuthenticatedLayout>
                  <Settings />
                </AuthenticatedLayout>
              }
            />
            <Route path='/*' element={<Navigate replace to='/' />} />
          </>
        ) : (
          <Route path='/*' element={<Navigate replace to='/signin' />} />
        )}
      </Routes>
    </Router>
  );
};
