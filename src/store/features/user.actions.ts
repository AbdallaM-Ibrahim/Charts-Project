import { Dispatch, PayloadAction } from "@reduxjs/toolkit";

import AuthService, { User } from "../../services/auth.service";
import { AppThunk } from "../index";
import { UserState, setToken, setUser, removeUser } from "./user.slice";

export const getSelf =
  (token: string): AppThunk =>
  async (dispatch: Dispatch<PayloadAction<Partial<UserState>>>) => {
    const user = await AuthService.getProfile(token);
    dispatch(setUser(user));
  };

export const signIn =
  (username: string, password: string): AppThunk =>
  async (dispatch: Dispatch<PayloadAction<string | Partial<UserState>>>) => {
    const token = await AuthService.signin({ username, password });
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
