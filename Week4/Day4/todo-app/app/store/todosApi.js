import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    // Get only first 10 todos from API for initial load
    getTodos: builder.query({
      query: () => 'todos?_limit=10',
      providesTags: ['Todo'],
    }),
    // Update API todo (for existing API todos only)
    updateTodo: builder.mutation({
      query: ({ id, ...updatedTodo }) => ({
        url: `todos/${id}`,
        method: 'PUT',
        body: updatedTodo,
      }),
      // Optimistic update for API todos
      async onQueryStarted({ id, ...updatedData }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
            const todo = draft.find(todo => todo.id === id);
            if (todo) {
              Object.assign(todo, updatedData);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Todo', id }],
    }),
    // Delete API todo (for existing API todos only)
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      // Optimistic update for API todos
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
            const index = draft.findIndex(todo => todo.id === id);
            if (index !== -1) {
              draft.splice(index, 1);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Todo'],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi;
