import { apiSlice } from './apiSlice'

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => '/admin/users',
      providesTags: ['User'],
    }),
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/admin/users/${userId}/role`,
        method: 'PUT',
        body: { role },
      }),
      invalidatesTags: ['User'],
    }),
    toggleUserBlock: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/${userId}/block`,
        method: 'PUT',
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useToggleUserBlockMutation,
} = adminApiSlice
