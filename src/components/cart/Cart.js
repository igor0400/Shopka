import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import {
   useGetUserCartQuery,
   useDeleteUserCartMutation,
   useDeleteOneUserCartMutation,
} from '../../slices/firebaseSlice';
import {
   removeFromDontAuthCart,
   clearDontAuthCart,
} from '../../slices/userSlice';
import { changePayedOrder } from '../../slices/payOrderSlice';

import {
   Container,
   Box,
   CircularProgress,
   Paper,
   Typography,
   Stack,
   Divider,
   Button,
} from '@mui/material';

import CartProduct from './CartProduct';
import InfoIcon from '@mui/icons-material/Info';

import { returnArrfromObj } from '../../utils/supportFunctions';

const Cart = () => {
   const [subTotal, setSubTotal] = useState(0);
   const [cartProducts, setCartProducts] = useState([]);
   const [cartProductsLoaded, setCartProductsLoaded] = useState(false);
   const { user, userAuth, dontAuthCart } = useSelector((state) => state.user);

   const userId = user ? user.localId : user;

   const {
      data: userCart = {},
      isLoading: isCartLoading,
      isError: isCartError,
   } = useGetUserCartQuery(userId);

   const dispatch = useDispatch();
   const location = useLocation();
   const navigate = useNavigate();

   const [deleteOneUserCart] = useDeleteOneUserCartMutation();
   const [deleteUserCart] = useDeleteUserCartMutation();

   useEffect(() => {
      if (cartProductsLoaded) return;

      if (userAuth) {
         if (userCart && !isCartLoading) {
            setCartProducts(returnArrfromObj(userCart));
            setCartProductsLoaded(true);
         }
      } else {
         setCartProducts(returnArrfromObj(dontAuthCart));
         setCartProductsLoaded(true);
      }
   }, [userCart, dontAuthCart]);

   useEffect(() => {
      let sum = 0;
      cartProducts.forEach((item) => (sum += item.price));
      if (sum !== 0) {
         setSubTotal(sum.toFixed(2));
      }
   }, [cartProducts]);

   const deleteCartItem = useCallback((value) => {
      deleteOneUserCart(value);
   }, []);
   const deleteCart = useCallback((value) => {
      deleteUserCart(value);
   }, []);

   const handleRemoveFromCart = (id) => {
      if (userAuth) {
         deleteCartItem({ userId, itemId: id });
      } else {
         dispatch(removeFromDontAuthCart(id));
      }
      if (cartProducts.length === 1) setCartProducts([]);
      setCartProductsLoaded(false);
   };

   const handleClearCart = () => {
      if (userAuth) {
         deleteCart({ userId, data: {} });
      } else {
         dispatch(clearDontAuthCart());
      }
      setCartProducts([]);
   };

   const checkoutCart = () => {
      if (userAuth) {
         dispatch(changePayedOrder(userCart));
         navigate('/payorder', { state: { from: location } });
      } else {
         navigate('/login', { state: { from: location } });
      }
   };

   // render cart
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

   if (cartProducts && cartProducts.length !== 0) {
      return (
         <Container maxWidth="lg">
            <Stack direction="row" spacing={2}>
               <Box sx={{ width: '70%' }}>
                  <PaperWrapper>
                     <Stack
                        direction="row"
                        sx={{ justifyContent: 'space-between' }}
                     >
                        <Typography variant="h5" sx={{ fontWeight: '700' }}>
                           Cart
                        </Typography>
                        <Button variant="outlined" onClick={handleClearCart}>
                           Clear cart
                        </Button>
                     </Stack>
                  </PaperWrapper>
                  <PaperWrapper sx={{ margin: '20px 0' }}>
                     <Stack spacing={3}>
                        {cartProducts.map((item, i) => (
                           <React.Fragment key={i}>
                              <CartProduct
                                 {...item}
                                 removeItem={handleRemoveFromCart}
                              />
                              {i + 1 === cartProducts.length ? null : (
                                 <Divider />
                              )}
                           </React.Fragment>
                        ))}
                     </Stack>
                  </PaperWrapper>
                  <PaperWrapper>
                     <Stack
                        direction="row"
                        sx={{ justifyContent: 'space-between' }}
                     >
                        <Typography variant="h6" sx={{ fontWeight: '500' }}>
                           Items: {cartProducts.length}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: '500' }}>
                           Sub-total: ${subTotal}
                        </Typography>
                     </Stack>
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
                        sx={{
                           fontWeight: '700',
                           paddingTop: '20px',
                           display: 'flex',
                           justifyContent: 'space-between',
                        }}
                     >
                        Sub-total: <span>${subTotal}</span>
                     </Typography>
                     <Typography
                        variant="h6"
                        sx={{
                           fontWeight: '700',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'space-between',
                        }}
                     >
                        Delivery{' '}
                        <InfoIcon
                           fontSize="small"
                           color="disabled"
                           sx={{ cursor: 'pointer' }}
                        />
                     </Typography>
                     <Button
                        variant="contained"
                        color="success"
                        size="large"
                        sx={{ width: '100%', marginTop: '30px' }}
                        onClick={checkoutCart}
                     >
                        Checkout
                     </Button>
                  </PaperWrapper>
               </Box>
            </Stack>
         </Container>
      );
   } else {
      return (
         <Container maxWidth="sm">
            <h3 style={{ textAlign: 'center' }}>Cart is clear</h3>
         </Container>
      );
   }
};

const PaperWrapper = ({ children, sx }) => {
   return (
      <Paper elevation={2} sx={sx}>
         <Box
            sx={{
               p: 3,
               maxWidth: { xs: 400, lg: 800 },
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
