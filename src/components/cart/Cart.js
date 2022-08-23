import { useCallback, useState, useEffect } from 'react';
import {
   useGetUserOrdersQuery,
   usePostUserOrdersMutation,
   useGetUserCartQuery,
   usePostUserCartMutation,
} from '../../slices/firebaseSlice';
import { useGetProductsQuery } from '../../slices/apiSlice';

import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getCartItems } from '../../utils/supportFunctions';

import {
   Container,
   Box,
   CircularProgress,
   Paper,
   Typography,
   Stack,
   Divider,
} from '@mui/material';

const Cart = () => {
   const [subTotal, setSubTotal] = useState(0);
   const [cartProducts, setCartProducts] = useState([]);
   const { user, userAuth, dontAuthCart } = useSelector((state) => state.user);

   const userId = user ? user.localId : user;

   const {
      data: userOrders = [],
      isOrdersLoading,
      isOrdersError,
   } = useGetUserOrdersQuery(userId);
   const {
      data: userCart = [],
      isCartLoading,
      isCartError,
   } = useGetUserCartQuery(userId);
   const {
      data: products = [],
      isProductsLoading,
      isProductsError,
   } = useGetProductsQuery();

   useEffect(() => {
      if (userAuth) {
         if (userCart) {
            setCartProducts(getCartItems(products, userCart));
         }
      } else {
         setCartProducts(getCartItems(products, dontAuthCart));
      }
   }, [products, userCart, dontAuthCart]);

   useEffect(() => {
      let sum = 0;
      cartProducts.forEach((item) => (sum += item.price));
      setSubTotal(sum.toFixed(2));
   }, [cartProducts]);

   const [postUserOrders] = usePostUserOrdersMutation();
   const [postUserCart] = usePostUserCartMutation();

   const postOrder = useCallback((value) => {
      postUserOrders(value);
   }, []);
   const clearCart = useCallback((value) => {
      postUserCart(value);
   }, []);

   const postOrderData = () => {
      // поместить эту функцию в utils/posted
      // отследить есть ли userOrders
      postOrder({
         url: userId,
         data: [
            ...userOrders,
            {
               id: uuidv4(),
               email: user.email,
            },
         ],
      });
      clearCart({ url: userId, data: [] });
   };

   const renderCart = (products) => {
      if (isCartLoading) {
         return (
            <Box
               sx={{
                  display: 'flex',
                  margin: '100px auto',
                  justifyContent: 'center',
               }}
            >
               <CircularProgress />
            </Box>
         );
      }

      if (isCartError) {
         return <p>Error :(</p>;
      }

      if (products && products.length !== 0) {
         return products.map((item, i) => (
            <h4 key={i}>
               {item.id} amount {item.amount}
            </h4>
         ));
      } else {
         return <p>Cart is clear</p>;
      }
   };

   return (
      <Container maxWidth="lg">
         <Stack direction="row" spacing={2}>
            <Box sx={{ width: '70%' }}>
               <PaperWrapper>
                  <Typography variant="h5" sx={{ fontWeight: '700' }}>
                     Cart
                  </Typography>
               </PaperWrapper>
               <PaperWrapper sx={{ margin: '20px 0' }}>
                  {renderCart(cartProducts)}
               </PaperWrapper>
               <PaperWrapper>
                  <Typography variant="h6" sx={{ fontWeight: '500' }}>
                     Sub-total: ${subTotal}
                  </Typography>
               </PaperWrapper>
            </Box>
            <Box sx={{ width: '30%' }}>
               <PaperWrapper>
                  <Typography
                     variant="h5"
                     sx={{ fontWeight: '700', paddingBottom: '20px' }}
                  >
                     Total
                  </Typography>
                  <Divider />
                  <Typography
                     variant="h6"
                     sx={{ fontWeight: '500', paddingTop: '20px' }}
                  >
                     Sub-total: ${subTotal}
                  </Typography>
                  {userAuth ? (
                     <button
                        disabled={isOrdersLoading || isOrdersError}
                        onClick={postOrderData}
                     >
                        buy now
                     </button>
                  ) : (
                     <p>Auth to make order</p>
                  )}
               </PaperWrapper>
            </Box>
         </Stack>
      </Container>
   );
};

const PaperWrapper = ({ children, sx }) => {
   return (
      <Paper elevation={2} sx={sx}>
         <Box
            sx={{
               p: 3,
               maxWidth: { xs: 400, lg: 700 },
               '& > *': {
                  flexGrow: 1,
                  flexBasis: '50%',
               },
            }}
         >
            {children}
         </Box>
      </Paper>
   );
};

export default Cart;
