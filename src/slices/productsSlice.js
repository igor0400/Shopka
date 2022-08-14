import {
   createSlice,
   createAsyncThunk,
   createEntityAdapter,
} from '@reduxjs/toolkit';
import { useHttp } from '../hooks/http.hook';

const productsAdapter = createEntityAdapter();

const initialState = productsAdapter.getInitialState({
   productsLoadingStatus: 'idle',
});

export const fetchProducts = createAsyncThunk(
   'products/fetchProducts',
   async () => {
      const { request } = useHttp();
      return await request('http://localhost:3100/products');
   }
);

const productsSlice = createSlice({
   name: 'products',
   initialState,
   extraReducers: (builder) => {
      builder
         .addCase(fetchProducts.pending, (state) => {
            state.productsLoadingStatus = 'loading';
         })
         .addCase(fetchProducts.fulfilled, (state, action) => {
            state.productsLoadingStatus = 'idle';
            productsAdapter.setAll(state, action.payload);
         })
         .addCase(fetchProducts.rejected, (state) => {
            state.productsLoadingStatus = 'error';
         })
         .addDefaultCase(() => {});
   },
});

const { reducer } = productsSlice;

export default reducer;

export const { selectAll } = productsAdapter.getSelectors(
   (state) => state.products
);
