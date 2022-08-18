import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const firebaseSlice = createApi({
   reducerPath: 'firebase',
   baseQuery: fetchBaseQuery({
      baseUrl:
         'https://shopka-2e282-default-rtdb.europe-west1.firebasedatabase.app',
   }),
   tagTypes: ['UserOrders', 'UserLiked', 'UserCart'],
   endpoints: (builder) => ({
      getUserOrders: builder.query({
         query: (url) => `/users/${url}/orders.json`,
         providesTags: ['UserOrders'],
      }),
      postUserOrders: builder.mutation({
         query: ({ url, data }) => ({
            url: `/users/${url}/orders.json`,
            method: 'PUT',
            body: data,
         }),
         invalidatesTags: ['UserOrders'],
      }),
      getUserLiked: builder.query({
         query: (url) => `/users/${url}/liked.json`,
         providesTags: ['UserLiked'],
      }),
      postUserLiked: builder.mutation({
         query: ({ url, data }) => ({
            url: `/users/${url}/liked.json`,
            method: 'PUT',
            body: data,
         }),
         invalidatesTags: ['UserLiked'],
      }),
      getUserCart: builder.query({
         query: (url) => `/users/${url}/cart.json`,
         providesTags: ['UserCart'],
      }),
      postUserCart: builder.mutation({
         query: ({ url, data }) => ({
            url: `/users/${url}/cart.json`,
            method: 'PUT',
            body: data,
         }),
         invalidatesTags: ['UserCart'],
      }),
   }),
});

export const {
   useGetUserOrdersQuery,
   usePostUserOrdersMutation,
   useGetUserLikedQuery,
   usePostUserLikedMutation,
   useGetUserCartQuery,
   usePostUserCartMutation,
} = firebaseSlice;
