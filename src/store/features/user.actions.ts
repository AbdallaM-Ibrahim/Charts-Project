import type { Dispatch, PayloadAction } from "@reduxjs/toolkit";

import AuthService, { type User } from "../../services/auth.service";
import type { AppThunk } from "../index";
import { type UserState, setToken, setUser, removeUser } from "./user.slice";

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
    localStorage.setItem("token", token);
    dispatch(setUser(user));
  };

export const register =
  (newUser: Partial<User>): AppThunk =>
  async (dispatch: Dispatch<PayloadAction<string>>) => {
    const token = await AuthService.register(newUser);
    dispatch(setToken(token));
    };
  
export const signOut = (): AppThunk => async (dispatch: Dispatch) => {
  localStorage.removeItem("token");
  dispatch(removeUser());
}
