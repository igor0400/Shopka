export const fetchProducts = (request) => (dispatch) => {
   dispatch(productsFetching());
   request('http://localhost:3100/products')
      .then((res) => dispatch(productsFetched(res.data)))
      .catch(() => dispatch(productsFetchingError()));
};

export const fetchFiltersList = (request) => (dispatch) => {
   dispatch(filtersListFetching());
   request('http://localhost:3100/filtersList')
      .then((res) => {
         dispatch(filtersListFetched(res.data));
      })
      .catch(() => dispatch(filtersListFetchingError()));
};

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

export const filtersListFetching = () => ({
   type: 'FILTERS_LIST_FETCHING',
});

export const filtersListFetched = (filters) => ({
   type: 'FILTERS_LIST_FETCHED',
   payload: filters,
});

export const filtersListFetchingError = () => ({
   type: 'FILTERS_LIST_FETCHING_ERROR',
});

export const activeFilterBarChanged = (activeFilter) => ({
   type: 'ACTIVE_FILTER_BAR_CHANGED',
   payload: activeFilter,
});
