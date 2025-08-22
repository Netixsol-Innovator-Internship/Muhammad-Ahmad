import { apiSlice } from './apiSlice'

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => '/cart',
      providesTags: ['Cart'],
    }),
    addToCart: builder.mutation({
      query: ({ productId, qty = 1 }) => ({
        url: '/cart',
        method: 'POST',
        body: { productId, qty },
      }),
      invalidatesTags: ['Cart'],
    }),
    updateCartItem: builder.mutation({
      query: ({ itemId, qty }) => ({
        url: `/cart/item/${itemId}`,
        method: 'PUT',
        body: { qty },
      }),
      invalidatesTags: ['Cart'],
    }),
    removeCartItem: builder.mutation({
      query: (itemId) => ({
        url: `/cart/item/${itemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: '/cart',
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
})

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
} = cartApiSlice
