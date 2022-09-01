import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
   reducerPath: 'api',
   baseQuery: fetchBaseQuery({
      baseUrl:
         'https://shopka-2e282-default-rtdb.europe-west1.firebasedatabase.app/',
   }),
   endpoints: (builder) => ({
      getProducts: builder.query({
         query: () => 'products.json',
      }),
      getProductById: builder.query({
         query: (id) => `products/${id}.json`,
      }),
   }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = apiSlice;
