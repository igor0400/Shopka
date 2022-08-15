import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
   reducerPath: 'api',
   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3100' }),
   endpoints: (builder) => ({
      getProducts: builder.query({
         query: () => '/products',
      }),
      getFiltersList: builder.query({
         query: () => '/filtersList',
      }),
   }),
});

export const { useGetProductsQuery, useGetFiltersListQuery } = apiSlice;
