import type { Dispatch, PayloadAction } from '@reduxjs/toolkit';

import AuthService, { type UserRegister } from '../../services/auth.service';
import type { AppThunk } from '../index';
import { type UserState, setToken, setUser, removeUser } from './user.slice';

export const getSelf =
  (token: string): AppThunk =>
  async (dispatch: Dispatch<PayloadAction<Partial<UserState>>>) => {
    const user = await AuthService.getProfile(token);
    dispatch(setUser(user));
  };

export const signIn =
  (email: string, password: string): AppThunk =>
  async (dispatch: Dispatch<PayloadAction<string | Partial<UserState>>>) => {
    const token = await AuthService.signin({ email, password });
    const user = await AuthService.getProfile(token);
    dispatch(setToken(token));
    localStorage.setItem('token', token);
    dispatch(setUser(user));
  };

export const register =
  (newUser: UserRegister): AppThunk =>
  async (dispatch: Dispatch<PayloadAction<string | Partial<UserState>>>) => {
    const token = await AuthService.register(newUser);
    dispatch(setToken(token));
    localStorage.setItem('token', token);
    // Since the API doesn't return user data, we'll set placeholder data
    const userData = {
      id: 1,
      email: newUser.email,
      fullName: newUser.fullName,
      phone: newUser.phone || null,
      token,
    } as Partial<UserState>;
    dispatch(setUser(userData));
  };

export const signOut = (): AppThunk => async (dispatch: Dispatch) => {
  localStorage.removeItem('token');
  // Clear stored user data from auth service
  const AuthService = (await import('../../services/auth.service')).default;
  AuthService.clearUserData();
  dispatch(removeUser());
};
