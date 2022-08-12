const initialValue = {
   products: [],
   clearProducts: [],
   productsLoadingStatus: 'idle',
   filters: [],
};

const reducer = (state = initialValue, action) => {
   switch (action.type) {
      case 'FILTER_BY_TYPE':
         return {
            ...state,
            products: state.products.filter(
               (item) => item.filtersType === action.itemType
            ),
         };
      case 'FILTER_BY_UP_PRICE':
         return {
            ...state,
            products: state.products.sort((a, b) => a.price - b.price),
         };
      case 'RESET_CHAPTER_FILTERS':
         return {
            ...state,
            products: state.clearProducts,
         };
      case 'PRODUCTS_FETCHING':
         return {
            ...state,
            productsLoadingStatus: 'loading',
         };
      case 'PRODUCTS_FETCHED':
         return {
            ...state,
            products: action.payload,
            clearProducts: action.payload,
            productsLoadingStatus: 'idle',
         };
      case 'PRODUCTS_FETCHING_ERROR':
         return {
            ...state,
            productsLoadingStatus: 'error',
         };
      default:
         return state;
   }
};

export default reducer;
