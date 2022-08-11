import data from '../data.json';

const initialValue = {
   products: data.products,
   clearProducts: data.products,
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
      case 'RESET_FILTERS':
         return {
            ...state,
            products: state.clearProducts,
         };
      default:
         return state;
   }
};

export default reducer;
