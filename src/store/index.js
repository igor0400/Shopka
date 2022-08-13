import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import products from '../reducers/products';
import filters from '../reducers/filters';

const stringMiddleware = () => (next) => (action) => {
   if (typeof action === 'string') {
      return next({
         type: action,
      });
   }

   return next(action);
};

const store = createStore(
   combineReducers({ products, filters }),
   compose(applyMiddleware(ReduxThunk, stringMiddleware))
);

export default store;
