import { createStore, combineReducers } from 'redux';
import products from '../reducers/products';
import filters from '../reducers/filters';

const store = createStore(
   combineReducers({ products, filters }),
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
