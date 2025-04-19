import { PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "../create-slice";

export interface UserState {
  id: number | null;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  token: string | null;
}

const initialState: UserState = {
  id: null,
  username: null,
  firstName: null,
  lastName: null,
  token: null,
};

export const userSlice = createAppSlice({
  name: "user",
  initialState,
  reducers: (create) => ({
    setUser: create.reducer((state, action: PayloadAction<Partial<UserState>>) => {
      state.id = action.payload.id ?? state.id;
      state.username = action.payload.username ?? state.username;
      state.firstName = action.payload.firstName ?? state.firstName;
      state.lastName = action.payload.lastName ?? state.lastName;
      state.token = action.payload.token ?? state.token;
    }),
    removeUser: create.reducer((state) => {
      state.id = initialState.id;
      state.username = initialState.username;
      state.firstName = initialState.firstName;
      state.lastName = initialState.lastName;
      state.token = initialState.token;
    }),
    setToken: create.reducer((state, action: PayloadAction<string>) => {
      state.token = action.payload;
    }),
    removeToken: create.reducer((state) => {
      state.token = null;
    }),
  }),
  selectors: {
    selectUser: (userSlice) => {
      return { ...userSlice, token: undefined };
    },
    selectUsername: (userSlice) => userSlice.username,
    selectToken: (userSlice) => userSlice.token,
  },
});

export const { setUser, removeUser, setToken, removeToken } = userSlice.actions;

export const { selectUser, selectUsername, selectToken } = userSlice.selectors;

export default userSlice.reducer;
