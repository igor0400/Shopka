import { Container, Paper } from '@mui/material';

import Filters from './filters';
import FiltersBar from './filters/FiltersBar';
import FiltersSelects from './filters/FiltersSelects';
import ChangeCardsModeSwitch from './filters/ChangeCardsModeSwitch';
import ProductsRelated from './products/ProductsRelated';
import Products from './products/Products';

const Home = () => {
   return (
      <Container maxWidth="xl">
         <FiltersBar />
         <div className="main" style={{ padding: '40px 0', display: 'flex' }}>
            <Filters />
            <Paper
               elevation={2}
               className="products"
               style={{
                  padding: '20px 10px',
                  marginLeft: '20px',
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
                     <ChangeCardsModeSwitch />
                  </div>
               </div>

               <ProductsRelated />

               <Products />
            </Paper>
         </div>
      </Container>
   );
};

export default Home;
