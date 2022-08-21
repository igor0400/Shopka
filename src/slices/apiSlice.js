import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
   reducerPath: 'api',
   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3100' }),
   endpoints: (builder) => ({
      getProducts: builder.query({
         query: () => '/products',
      }),
      getProductById: builder.query({
         query: (id) => `/products/${id}`,
      }),
      getFiltersList: builder.query({
         query: () => '/filtersList',
      }),
   }),
});

export const {
   useGetProductsQuery,
   useGetProductByIdQuery,
   useGetFiltersListQuery,
} = apiSlice;
