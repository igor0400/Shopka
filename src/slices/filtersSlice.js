import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../hooks/http.hook';

const initialState = {
   activeFilterBar: 'all',
   filtersList: [],
   filtersListLoadingStatus: 'idle',
   activeFiltersList: [],
};

export const fetchFiltersList = createAsyncThunk(
   'filters/fetchFiltersList',
   async () => {
      const { request } = useHttp();
      return await request('http://localhost:3100/filtersList');
   }
);

const filtersSlice = createSlice({
   name: 'filters',
   initialState,
   reducers: {
      activeFilterBarChanged: (state, action) => {
         state.activeFilterBar = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchFiltersList.pending, (state) => {
            state.filtersListLoadingStatus = 'loading';
         })
         .addCase(fetchFiltersList.fulfilled, (state, action) => {
            state.filtersList = action.payload;
            state.filtersListLoadingStatus = 'idle';
         })
         .addCase(fetchFiltersList.rejected, (state) => {
            state.filtersListLoadingStatus = 'error';
         })
         .addDefaultCase(() => {});
   },
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const {
   filtersListFetching,
   filtersListFetched,
   filtersListFetchingError,
   activeFilterBarChanged,
} = actions;
