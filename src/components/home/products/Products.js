import { useMemo } from 'react';

import { Box, Grid, CircularProgress, Typography } from '@mui/material';
import ProductsItem from './ProductsItem';

import { useSelector } from 'react-redux';
import { useGetProductsQuery } from '../../../slices/apiSlice';

import small404 from '../../../images/small404.gif';

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
            <CenteredWrapper>
               <CircularProgress />
            </CenteredWrapper>
         );
      } else if (isError) {
         return (
            <CenteredWrapper>
               <img
                  src={small404}
                  alt="error"
                  style={{ width: '150px', height: '150px' }}
               />
               <Typography variant="h5">Loading error</Typography>
            </CenteredWrapper>
         );
      } else {
         if (filteredProducts.length === 0) {
            return (
               <CenteredWrapper>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                     Not active products
                  </Typography>
               </CenteredWrapper>
            );
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

const CenteredWrapper = ({ children }) => {
   return (
      <Box
         sx={{
            display: 'flex',
            margin: 'auto 0',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '55vh',
         }}
      >
         {children}
      </Box>
   );
};

export default Products;
