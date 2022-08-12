export const filterByType = (itemType) => ({
   type: 'FILTER_BY_TYPE',
   itemType,
});

export const filterByUpPrice = () => ({
   type: 'FILTER_BY_UP_PRICE',
});

export const resetChapterFilters = () => ({
   type: 'RESET_CHAPTER_FILTERS',
});

export const productsFetching = () => ({
   type: 'PRODUCTS_FETCHING',
});

export const productsFetched = (products) => ({
   type: 'PRODUCTS_FETCHED',
   payload: products,
});

export const productsFetchingError = () => ({
   type: 'PRODUCTS_FETCHING_ERROR',
});