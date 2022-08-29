import { addActiveFilter, removeActiveFilter } from '../slices/filtersSlice';

export const postFilter = (dispatch, filter) => {
   dispatch(addActiveFilter(filter));
};

export const removeFilter = (dispatch, filter) => {
   dispatch(removeActiveFilter(filter));
};
