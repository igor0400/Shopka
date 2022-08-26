import { configureStore } from '@reduxjs/toolkit';

import filters from '../slices/filtersSlice';
import user from '../slices/userSlice';
import payOrder from '../slices/payOrderSlice';
import { apiSlice } from '../slices/apiSlice';
import { firebaseSlice } from '../slices/firebaseSlice';

const stringMiddleware = () => (next) => (action) => {
   if (typeof action === 'string') {
      return next({
         type: action,
      });
   }

   return next(action);
};

const store = configureStore({
   reducer: {
      filters,
      user,
      payOrder,
      [apiSlice.reducerPath]: apiSlice.reducer,
      [firebaseSlice.reducerPath]: firebaseSlice.reducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
         stringMiddleware,
         apiSlice.middleware,
         firebaseSlice.middleware,
      ),
   devTools: process.env.NODE_ENV !== 'production',
});

export default store;
