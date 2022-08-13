const initialValue = {
   products: [],
   productsLoadingStatus: 'idle',
   activeFilterBar: 'all',
   filtersList: [],
   filtersListLoadingStatus: 'idle',
   activeFiltersList: [],
};

const reducer = (state = initialValue, action) => {
   switch (action.type) {
      case 'PRODUCTS_FETCHING':
         return {
            ...state,
            productsLoadingStatus: 'loading',
         };
      case 'PRODUCTS_FETCHED':
         return {
            ...state,
            products: action.payload,
            productsLoadingStatus: 'idle',
         };
      case 'PRODUCTS_FETCHING_ERROR':
         return {
            ...state,
            productsLoadingStatus: 'error',
         };
      case 'FILTERS_LIST_FETCHING':
         return {
            ...state,
            filtersListLoadingStatus: 'loading',
         };
      case 'FILTERS_LIST_FETCHED':
         return {
            ...state,
            filtersList: action.payload,
            filtersListLoadingStatus: 'idle',
         };
      case 'FILTERS_LIST_FETCHING_ERROR':
         return {
            ...state,
            filtersListLoadingStatus: 'error',
         };
      case 'ACTIVE_FILTER_BAR_CHANGED':
         return {
            ...state,
            activeFilterBar: action.payload,
         };
      default:
         return state;
   }
};

export default reducer;
