import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
   activeFilterBar: 'all',
   activeFilters: [],
   filterPrice: { from: 0, to: 0 },
   sortedBy: null,
   productsItemMode: 'small',
});

const filtersSlice = createSlice({
   name: 'filters',
   initialState,
   reducers: {
      activeFilterBarChanged: (state, action) => {
         state.activeFilterBar = action.payload;
      },
      addActiveFilter: (state, action) => {
         state.activeFilters.push(action.payload);
      },
      removeActiveFilter: (state, action) => {
         state.activeFilters = state.activeFilters.filter(
            (item) => item.name !== action.payload.name
         );
      },
      setFilterPrice: (state, action) => {
         state.filterPrice = action.payload;
      },
      setSortedBy: (state, action) => {
         state.sortedBy = action.payload;
      },
      setProductsItemMode: (state, action) => {
         state.productsItemMode = action.payload;
      },
   },
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const {
   activeFilterBarChanged,
   addActiveFilter,
   removeActiveFilter,
   setFilterPrice,
   setSortedBy,
   setProductsItemMode,
} = actions;

export const { selectAll } = filtersAdapter.getSelectors(
   (state) => state.filters
);
