export const filterByType = (itemType) => ({
   type: 'FILTER_BY_TYPE',
   itemType,
});

export const filterByUpPrice = () => ({
   type: 'FILTER_BY_UP_PRICE',
});

export const resetFilters = () => ({
   type: 'RESET_FILTERS',
});
