import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import todoReducer from './todosSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer
  },
});

// Типи для RootState та AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
