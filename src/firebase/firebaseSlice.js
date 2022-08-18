import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const firebaseSlice = createApi({
   reducerPath: 'firebase',
   baseQuery: fetchBaseQuery({
      baseUrl:
         'https://shopka-2e282-default-rtdb.europe-west1.firebasedatabase.app',
   }),
   tagTypes: ['UserOrders'],
   endpoints: (builder) => ({
      getUserOrders: builder.query({
         query: (url) => `/users/${url}/orders.json`,
         providesTags: ['UserOrders'],
      }),
      postUserOrder: builder.mutation({
         query: ({ url, data }) => ({
            url: `/users/${url}.json`,
            method: 'PUT',
            body: data,
         }),
         invalidatesTags: ['UserOrders'],
      }),
   }),
});

export const { useGetUserOrdersQuery, usePostUserOrderMutation } = firebaseSlice;