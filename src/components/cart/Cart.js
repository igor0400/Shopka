import Container from '@mui/material/Container';
import {
   useGetUserOrdersQuery,
   usePostUserOrderMutation,
} from '../../firebase/firebaseSlice';
import { useCallback } from 'react';

import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const Cart = () => {
   const { user, userAuth } = useSelector((state) => state.user);

   const userId = user ? user.localId : user;
   const {
      data: userOrders = [],
      isLoading,
      isError,
   } = useGetUserOrdersQuery(userId);

   const [postUserOrder] = usePostUserOrderMutation();

   const postUserEmail = useCallback((value) => {
      postUserOrder(value);
   }, []);

   const postData = () => {
      postUserEmail({
         url: `${userId}/orders`,
         data: [
            ...userOrders,
            {
               id: uuidv4(),
               email: user.email,
            },
         ],
      });
   };

   return (
      <Container maxWidth="xl">
         <h1>Cart</h1>
         {userAuth ? (
            <button disabled={isLoading || isError} onClick={postData}>
               Post data
            </button>
         ) : (
            <p>Auth to make order</p>
         )}
      </Container>
   );
};

export default Cart;
