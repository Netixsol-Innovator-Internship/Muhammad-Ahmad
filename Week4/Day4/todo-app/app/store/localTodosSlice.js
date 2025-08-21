import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userTodos: [], // User-created todos
  nextId: 1001, // Start user IDs from 1001 to avoid conflicts with API IDs
};

const localTodosSlice = createSlice({
  name: 'localTodos',
  initialState,
  reducers: {
    addUserTodo: (state, action) => {
      const newTodo = {
        id: state.nextId,
        title: action.payload.title,
        completed: false,
        userId: 1,
        isUserCreated: true, // Flag to identify user-created todos
      };
      state.userTodos.unshift(newTodo); // Add to the beginning
      state.nextId += 1;
    },
    updateUserTodo: (state, action) => {
      const { id, ...updates } = action.payload;
      const todo = state.userTodos.find(todo => todo.id === id);
      if (todo) {
        Object.assign(todo, updates);
      }
    },
    deleteUserTodo: (state, action) => {
      state.userTodos = state.userTodos.filter(todo => todo.id !== action.payload);
    },
    toggleUserTodo: (state, action) => {
      const todo = state.userTodos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addUserTodo, updateUserTodo, deleteUserTodo, toggleUserTodo } = localTodosSlice.actions;
export default localTodosSlice.reducer;
