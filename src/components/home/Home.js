import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import FiltersBar from './filters/FiltersBar';
import FiltersList from './filters/FiltersList';
import FiltersAccordion from './filters/FiltersAccordion';
import ChangeCardsModeSwitch from './filters/ChangeCardsModeSwitch';
import FiltersSelects from './filters/FiltersSelects';
import ProductsRelated from './products/ProductsRelated';
import Products from './products/Products';

const Home = () => {
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
