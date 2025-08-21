import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    // Get all todos
    getTodos: builder.query({
      query: () => 'todos',
      providesTags: ['Todo'],
    }),
    // Get single todo
    getTodo: builder.query({
      query: (id) => `todos/${id}`,
      providesTags: (result, error, id) => [{ type: 'Todo', id }],
    }),
    // Create new todo
    createTodo: builder.mutation({
      query: (newTodo) => ({
        url: 'todos',
        method: 'POST',
        body: newTodo,
      }),
      invalidatesTags: ['Todo'],
    }),
    // Update todo
    updateTodo: builder.mutation({
      query: ({ id, ...updatedTodo }) => ({
        url: `todos/${id}`,
        method: 'PUT',
        body: updatedTodo,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Todo', id }],
    }),
    // Delete todo
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todo'],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodoQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi;
