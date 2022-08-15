import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
   activeFilterBar: 'all',
});

const filtersSlice = createSlice({
   name: 'filters',
   initialState,
   reducers: {
      activeFilterBarChanged: (state, action) => {
         state.activeFilterBar = action.payload;
      },
   },
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const { activeFilterBarChanged } = actions;

export const { selectAll } = filtersAdapter.getSelectors(
   (state) => state.filters
);
