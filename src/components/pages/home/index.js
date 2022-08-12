import { useEffect } from 'react';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import {
   productsFetching,
   productsFetched,
   productsFetchingError,
} from '../../../actions';

import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import FiltersBar from './FiltersBar';
import FiltersList from './FiltersList';
import FiltersAccordion from './FiltersAccordion';
import ChangeCardsModeSwitch from './ChangeCardsModeSwitch';
import ChangeProductsType from './ChangeProductsType';
import FiltersSelects from './FiltersSelects';
import ProductsRelated from './ProductsRelated';
import Products from './Products';

// ОБРАБОТАТЬ ЗАГРУСКУ КАРТОЧКИ И СДЕЛАТЬ СКЕЛЕТОН 

const Home = () => {
   const { products, productsLoadingStatus } = useSelector((state) => state);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(productsFetching());
      axios
         .get('http://localhost:3100/products')
         .then((res) => dispatch(productsFetched(res.data)))
         .catch(() => dispatch(productsFetchingError()));
   }, []);

   const renderProducts = (status) => {
      if (status === 'loading') {
         return (
            <CircularProgress
               sx={{
                  display: 'flex',
                  width: '100%',
                  margin: '50px auto',
               }}
            />
         );
      } else if (status === 'error') {
         return <h3>loading error</h3>;
      } else {
         return <Products products={products} />;
      }
   };

   return (
      <Container maxWidth="xl">
         <FiltersBar />
         <div className="main" style={{ padding: '40px 0', display: 'flex' }}>
            <div className="filters">
               <FiltersList />
               <FiltersAccordion />
            </div>
            <Paper
               elevation={2}
               className="products"
               style={{
                  padding: '20px 10px',
                  marginLeft: '50px',
                  width: '100%',
               }}
            >
               <div
                  className="products__filters flex"
                  style={{
                     justifyContent: 'space-between',
                     paddingBottom: '40px',
                  }}
               >
                  <FiltersSelects />
                  <div className="products__filters__switches flex">
                     <ChangeProductsType />
                     <ChangeCardsModeSwitch />
                  </div>
               </div>

               <ProductsRelated />

               {renderProducts(productsLoadingStatus)}
            </Paper>
         </div>
      </Container>
   );
};

export default Home;
