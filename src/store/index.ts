import { userSlice } from './features/user.slice';
import { Action, ThunkAction, combineSlices, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineSlices(userSlice,);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });
  return store;
};

const store = makeStore();

export default store;

export type AppStore = typeof store;

export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
  >;

