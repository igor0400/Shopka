import { useState, useEffect, useCallback } from 'react';
import {
   useGetUserCartQuery,
   usePostUserCartMutation,
} from '../../slices/firebaseSlice';
import { useGetProductsQuery } from '../../slices/apiSlice';
import { removeFromDontAuthCart } from '../../slices/userSlice';

import { useSelector, useDispatch } from 'react-redux';
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

import CartProduct from './CartProduct';

const Cart = () => {
   const [subTotal, setSubTotal] = useState(0);
   const [cartProducts, setCartProducts] = useState([]);
   const { user, userAuth, dontAuthCart } = useSelector((state) => state.user);

   const userId = user ? user.localId : user;

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

   const dispatch = useDispatch();
   const [postUserCart] = usePostUserCartMutation();

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

   const postCart = useCallback((value) => {
      postUserCart(value);
   }, []);

   const handleRemoveFromCart = (id, itemDeleted) => {
      if (userAuth) {
         postCart({
            url: userId,
            data: userCart.filter((item) => item.id !== id),
         });
      } else {
         dispatch(removeFromDontAuthCart(id));
      }
      if (cartProducts.length === 1) setCartProducts([]);
      itemDeleted(true);
   };

   const renderCart = () => {
      if (isCartLoading || isProductsLoading) {
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

      if (isCartError || isProductsError) {
         return <p>Error :(</p>;
      }

      if (cartProducts && cartProducts.length !== 0) {
         return cartProducts.map((item, i) => {
            return (
               <>
                  <CartProduct
                     key={i}
                     {...item}
                     removeItem={handleRemoveFromCart}
                  />
                  {i + 1 === cartProducts.length ? null : <Divider />}
               </>
            );
         });
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
                  <Stack spacing={3}>{renderCart()}</Stack>
               </PaperWrapper>
               <PaperWrapper>
                  <Typography
                     variant="h6"
                     sx={{ fontWeight: '500', textAlign: 'right' }}
                  >
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
                     <button>Checkout</button>
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
