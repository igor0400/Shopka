const initialValue = {
   activeFilterBar: 'all',
   filtersList: [],
   filtersListLoadingStatus: 'idle',
   activeFiltersList: [],
};

const filters = (state = initialValue, action) => {
   switch (action.type) {
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

export default filters;
