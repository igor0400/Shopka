import { configureStore } from '@reduxjs/toolkit';

import products from '../slices/productsSlice';
import filters from '../slices/filtersSlice';
import filtersList from '../slices/filtersListSlice';

const stringMiddleware = () => (next) => (action) => {
   if (typeof action === 'string') {
      return next({
         type: action,
      });
   }

   return next(action);
};

const store = configureStore({
   reducer: { products, filters, filtersList },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(stringMiddleware),
   devTools: process.env.NODE_ENV !== 'production',
});

export default store;
