import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import ProductsItem from './ProductsItem';
import Grid from '@mui/material/Grid';

import { connect } from 'react-redux';
import * as actions from '../../../redux/actions';

import FiltersBar from './FiltersBar';
import FiltersList from './FiltersList';
import FiltersAccordion from './FiltersAccordion';
import ChangeCardsModeSwitch from './ChangeCardsModeSwitch';
import ChangeProductsType from './ChangeProductsType';
import FiltersSelects from './FiltersSelects';
import ProductsRelated from './ProductsRelated';

const Home = ({ products }) => {
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
               style={{ padding: '20px 10px', marginLeft: '50px', width: '100%' }}
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

               {products.length === 0 ? (
                  <h3>Not active products</h3>
               ) : (
                  <Grid
                     container
                     spacing={2}
                     columns={{ xs: 2, sm: 8, md: 12 }}
                     sx={{ padding: '0 10px' }}
                  >
                     {products.map((item) => (
                        <Grid item xs={3} key={item.id}>
                           <ProductsItem {...item} />
                        </Grid>
                     ))}
                  </Grid>
               )}
            </Paper>
         </div>
      </Container>
   );
};

const mapStateToProps = (state) => {
   return {
      products: state.products,
   };
};

export default connect(mapStateToProps, actions)(Home);
