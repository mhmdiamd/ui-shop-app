import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { apiSlice } from './api/authApi';
import categoriesReducer from './reducer/categoriesSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: true,
});

// setupListeners(store.dispatch);
