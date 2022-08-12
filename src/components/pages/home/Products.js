import ProductsItem from './ProductsItem';
import Grid from '@mui/material/Grid';

const Products = ({ products }) => (
   <>
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
   </>
);

export default Products;
