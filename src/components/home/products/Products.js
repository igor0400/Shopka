import { useMemo } from 'react';

import ProductsItem from './ProductsItem';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

import { useSelector } from 'react-redux';
import { useGetProductsQuery } from '../../../api/apiSlice';

const Products = () => {
   const {
      data: products = [],
      isFetching,
      isLoading,
      isError,
   } = useGetProductsQuery();

   const activeFilterBar = useSelector(
      (state) => state.filters.activeFilterBar
   );

   const filteredProducts = useMemo(() => {
      const filteredProducts = products.slice();

      if (activeFilterBar === 'all') {
         return filteredProducts;
      } else {
         return filteredProducts.filter(
            (item) => item.filtersType === activeFilterBar
         );
      }
   }, [products, activeFilterBar]);

   const renderProducts = () => {
      if (isLoading || isFetching) {
         return (
            <CircularProgress
               sx={{
                  display: 'flex',
                  width: '100%',
                  margin: '110px auto 150px',
               }}
            />
         );
      } else if (isError) {
         return <h3>loading error</h3>;
      } else {
         if (filteredProducts.length === 0) {
            return <h3>Not active products</h3>;
         } else {
            return (
               <Grid
                  container
                  spacing={2}
                  columns={{ xs: 2, sm: 8, md: 12 }}
                  sx={{ padding: '0 10px' }}
               >
                  {filteredProducts.map((item) => (
                     <Grid item xs={3} key={item.id}>
                        <ProductsItem {...item} />
                     </Grid>
                  ))}
               </Grid>
            );
         }
      }
   };

   return <>{renderProducts()}</>;
};

export default Products;
