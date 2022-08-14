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

// ОБРАБОТАТЬ ЗАГРУЗКУ КАРТОЧКИ И СДЕЛАТЬ СКЕЛЕТОН

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
                     <ChangeProductsType />
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
