import { addActiveFilter, removeActiveFilter } from '../slices/filtersSlice';

export const postFilter = (dispatch, filter) => {
   dispatch(addActiveFilter(filter));
};

export const removeFilter = (dispatch, filter) => {
   dispatch(removeActiveFilter(filter));
};

export const getProductsWithActiveFilters = (products, activeFilters) => {
   let productsWithActiveFilters = [];

   activeFilters.map((filter) => {
      const filteredArr = products.filter((product) => {
         const isItemChacked =
            productsWithActiveFilters.length > 0
               ? productsWithActiveFilters.map((e) => e.id).indexOf(product.id)
               : -1;

         if (
            filter.type !== 'rating' &&
            filter.name === product[filter.type] &&
            isItemChacked < 0
         ) {
            return true;
         } else if (
            filter.type === 'rating' &&
            +filter.name.slice(0, 1) === Math.floor(product[filter.type]) &&
            isItemChacked < 0
         ) {
            return true;
         }

         return false;
      });

      productsWithActiveFilters = [
         ...productsWithActiveFilters,
         ...filteredArr,
      ];
   });

   return productsWithActiveFilters;
};
