import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { moviesApi } from '../features/movies/moviesApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
