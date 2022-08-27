import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useGetUserOrdersQuery } from '../../slices/firebaseSlice';

import { returnArrfromObj } from '../../utils/supportFunctions';
import { Container, Typography, Stack } from '@mui/material';
import OrdersItem from './OrdersItem';
import RequirePage from '../../hoc/RequirePage';

const Orders = () => {
   const { user } = useSelector((state) => state.user);
   const [orders, setOrders] = useState([]);
   const [ordersLoaded, setOrdersLoaded] = useState(false);

   const userId = user ? user.localId : null;
   const {
      data: userOrders = {},
      isLoading: isOrdersLoading,
      isError: isOrdersError,
   } = useGetUserOrdersQuery(userId);

   useEffect(() => {
      if (ordersLoaded) return;
      if (userOrders && !isOrdersLoading) {
         setOrders(returnArrfromObj(userOrders));
         setOrdersLoaded(true);
      }
   }, [userOrders]);

   return (
      <RequirePage loading={isOrdersLoading} error={isOrdersError}>
         {orders.length > 0 ? (
            <Container maxWidth="sm">
               <Typography
                  variant="h4"
                  sx={{
                     textAlign: 'center',
                     fontWeight: 700,
                     paddingBottom: '30px',
                  }}
               >
                  Orders
               </Typography>
               <Stack spacing={2}>
                  {orders.map((item) => (
                     <OrdersItem key={item.id} {...item} />
                  ))}
               </Stack>
            </Container>
         ) : (
            <Container maxWidth="sm">
               <h3 style={{ textAlign: 'center' }}>Orders is clear</h3>
            </Container>
         )}
      </RequirePage>
   );
};

export default Orders;
