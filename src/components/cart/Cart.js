import { Container, Box, CircularProgress } from '@mui/material';
import {
   useGetUserOrdersQuery,
   usePostUserOrdersMutation,
   useGetUserCartQuery,
   usePostUserCartMutation,
} from '../../firebase/firebaseSlice';
import { useCallback } from 'react';

import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const Cart = () => {
   const { user, userAuth } = useSelector((state) => state.user);

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

   const [postUserOrders] = usePostUserOrdersMutation();
   const [postUserCart] = usePostUserCartMutation();

   const postOrder = useCallback((value) => {
      postUserOrders(value);
   }, []);
   const clearCart = useCallback((value) => {
      postUserCart(value);
   }, []);

   const postOrderData = () => {
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

   const renderCart = (orders) => {
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

      if (orders && orders.length !== 0) {
         return orders.map((item, i) => (
            <h4 key={i}>
               {i + 1}. {item.id}
            </h4>
         ));
      } else {
         return <p>Cart is clear</p>;
      }
   };

   return (
      <Container maxWidth="xl">
         <h1>Cart</h1>

         {renderCart(userCart)}

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
      </Container>
   );
};

export default Cart;
