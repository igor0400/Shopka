import {
   createSlice,
   createAsyncThunk,
   createEntityAdapter,
} from '@reduxjs/toolkit';
import { useHttp } from '../hooks/http.hook';

const filtersListAdapter = createEntityAdapter();

const initialState = filtersListAdapter.getInitialState({
   filtersListLoadingStatus: 'idle',
});

export const fetchFiltersList = createAsyncThunk(
   'filtersList/fetchFiltersList',
   async () => {
      const { request } = useHttp();
      return await request('http://localhost:3100/filtersList');
   }
);

const filtersListSlice = createSlice({
   name: 'filtersList',
   initialState,
   extraReducers: (builder) => {
      builder
         .addCase(fetchFiltersList.pending, (state) => {
            state.filtersListLoadingStatus = 'loading';
         })
         .addCase(fetchFiltersList.fulfilled, (state, action) => {
            state.filtersListLoadingStatus = 'idle';
            filtersListAdapter.setAll(state, action.payload);
         })
         .addCase(fetchFiltersList.rejected, (state) => {
            state.filtersListLoadingStatus = 'error';
         })
         .addDefaultCase(() => {});
   },
});

const { reducer } = filtersListSlice;

export default reducer;

export const { selectAll } = filtersListAdapter.getSelectors(
   (state) => state.filtersList
);
