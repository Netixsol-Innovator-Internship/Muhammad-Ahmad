import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Base query with auth token injection
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // Get token from localStorage (we'll integrate with auth context later)
    const token = localStorage.getItem('token')
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

// Base query with error handling
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  
  if (result.error && result.error.status === 401) {
    // Token expired or invalid - clear local storage and redirect to login
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  }
  
  return result
}

// Create the API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Product', 'Cart', 'Auth'],
  endpoints: (builder) => ({
    // We'll add specific endpoints in separate files
  }),
})

export default apiSlice
