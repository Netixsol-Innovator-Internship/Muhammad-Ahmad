import { configureStore } from '@reduxjs/toolkit';
import { todosApi } from './todosApi';
import localTodosReducer from './localTodosSlice';

export const store = configureStore({
  reducer: {
    [todosApi.reducerPath]: todosApi.reducer,
    localTodos: localTodosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
});
