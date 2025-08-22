import { apiSlice } from './apiSlice'

export const uploadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImages: builder.mutation({
      query: (formData) => ({
        url: '/admin/upload/images',
        method: 'POST',
        body: formData,
        formData: true,
      }),
    }),
  }),
})

export const {
  useUploadImagesMutation,
} = uploadApiSlice
