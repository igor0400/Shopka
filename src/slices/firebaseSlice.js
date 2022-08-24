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
         query: (userId) => `/users/${userId}/orders.json`,
         providesTags: ['UserOrders'],
      }),
      postOneUserOrder: builder.mutation({
         query: ({ userId, itemId, data }) => ({
            url: `/users/${userId}/orders/${itemId}.json`,
            method: 'PUT',
            body: data,
         }),
         invalidatesTags: ['UserOrders'],
      }),
      getUserLiked: builder.query({
         query: (userId) => `/users/${userId}/liked.json`,
         providesTags: ['UserLiked'],
      }),
      postUserLiked: builder.mutation({
         query: ({ userId, data }) => ({
            url: `/users/${userId}/liked.json`,
            method: 'PUT',
            body: data,
         }),
         invalidatesTags: ['UserLiked'],
      }),
      postOneUserLike: builder.mutation({
         query: ({ userId, itemId, data }) => ({
            url: `/users/${userId}/liked/${itemId}.json`,
            method: 'PUT',
            body: data,
         }),
         invalidatesTags: ['UserLiked'],
      }),
      deleteUserLiked: builder.mutation({
         query: ({ userId }) => ({
            url: `/users/${userId}/liked.json`,
            method: 'DELETE',
         }),
         invalidatesTags: ['UserLiked'],
      }),
      deleteOneUserLike: builder.mutation({
         query: ({ userId, itemId }) => ({
            url: `/users/${userId}/liked/${itemId}.json`,
            method: 'DELETE',
         }),
         invalidatesTags: ['UserLiked'],
      }),
      getUserCart: builder.query({
         query: (userId) => `/users/${userId}/cart.json`,
         providesTags: ['UserCart'],
      }),
      postUserCart: builder.mutation({
         query: ({ userId, data }) => ({
            url: `/users/${userId}/cart.json`,
            method: 'PUT',
            body: data,
         }),
         invalidatesTags: ['UserCart'],
      }),
      postOneUserCart: builder.mutation({
         query: ({ userId, itemId, data }) => ({
            url: `/users/${userId}/cart/${itemId}.json`,
            method: 'PUT',
            body: data,
         }),
         invalidatesTags: ['UserCart'],
      }),
      postOneUserCartAmount: builder.mutation({
         query: ({ userId, itemId, data }) => ({
            url: `/users/${userId}/cart/${itemId}/amount.json`,
            method: 'PUT',
            body: data,
         }),
         invalidatesTags: ['UserCart'],
      }),
      deleteUserCart: builder.mutation({
         query: ({ userId }) => ({
            url: `/users/${userId}/cart.json`,
            method: 'DELETE',
         }),
         invalidatesTags: ['UserCart'],
      }),
      deleteOneUserCart: builder.mutation({
         query: ({ userId, itemId }) => ({
            url: `/users/${userId}/cart/${itemId}.json`,
            method: 'DELETE',
         }),
         invalidatesTags: ['UserCart'],
      }),
   }),
});

export const {
   useGetUserOrdersQuery,
   useGetUserLikedQuery,
   usePostUserLikedMutation,
   useGetUserCartQuery,
   usePostUserCartMutation,
   usePostOneUserOrderMutation,
   usePostOneUserLikeMutation,
   usePostOneUserCartMutation,
   useDeleteUserLikedMutation,
   useDeleteOneUserLikeMutation,
   useDeleteUserCartMutation,
   useDeleteOneUserCartMutation,
   usePostOneUserCartAmountMutation
} = firebaseSlice;
