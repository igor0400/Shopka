import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const firebaseSlice = createApi({
   reducerPath: 'firebase',
   baseQuery: fetchBaseQuery({
      baseUrl:
         'https://shopka-2e282-default-rtdb.europe-west1.firebasedatabase.app',
   }),
   tagTypes: ['UserData'],
   endpoints: (builder) => ({
      getUserData: builder.query({
         query: (url) => `${url}.json`,
         providesTags: ['UserData'],
      }),
      postUserData: builder.mutation({
         query: ({ url, data }) => ({
            url: `${url}.json`,
            method: 'PUT',
            body: data,
         }),
         invalidatesTags: ['UserData'],
      }),
   }),
});

export const { useGetUserDataQuery, usePostUserDataMutation } = firebaseSlice;
