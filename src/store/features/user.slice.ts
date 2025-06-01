import { createSelector, type PayloadAction } from '@reduxjs/toolkit';

import { createAppSlice } from '../create-slice';

export interface UserState {
  id: number | null;
  email: string | null;
  fullName: string | null;
  phone?: string | null;
  token: string | null;
}

const initialState: UserState = {
  id: null,
  email: null,
  fullName: null,
  phone: null,
  token: null,
};

export const userSlice = createAppSlice({
  name: 'user',
  initialState,
  reducers: (create) => ({
    setUser: create.reducer(
      (state, action: PayloadAction<Partial<UserState>>) => {
        state.id = action.payload.id ?? state.id;
        state.email = action.payload.email ?? state.email;
        state.fullName = action.payload.fullName ?? state.fullName;
        state.phone = action.payload.phone ?? state.phone;
        state.token = action.payload.token ?? state.token;
      }
    ),
    removeUser: create.reducer((state) => {
      state.id = initialState.id;
      state.email = initialState.email;
      state.fullName = initialState.fullName;
      state.phone = initialState.phone;
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
    // Select the entire user slice state
    _selectUserState: (userSlice) => userSlice,

    // Memoized selector for user data without the token
    selectUser: createSelector<[(state: UserState) => UserState], Omit<UserState, 'token'>>(
      // Input selector(s)
      [(state) => state], // Select the whole user slice state directly
      // Result function: receives the result of input selectors
      (userSlice) => {
        // This computation now only runs if userSlice changes
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { token: _token, ...userWithoutToken } = userSlice;
        return userWithoutToken;
      }
    ),
    selectEmail: (userSlice) => userSlice.email,
    selectToken: (userSlice) => userSlice.token,
    selectPhone: (userSlice) => userSlice.phone,
  },
});

export const { setUser, removeUser, setToken, removeToken } = userSlice.actions;

export const { selectUser, selectEmail, selectToken, selectPhone } = userSlice.selectors;

export default userSlice.reducer;
