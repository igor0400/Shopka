import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useGetUserOrdersQuery } from '../../slices/firebaseSlice';

import { returnArrfromObj } from '../../utils/supportFunctions';
import { Container, Typography, Stack } from '@mui/material';
import OrdersItem from './OrdersItem';
import RequirePage from '../../hoc/RequirePage';

import LocalMallIcon from '@mui/icons-material/LocalMall';

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
         setOrders(
            returnArrfromObj(userOrders).sort(
               (a, b) =>
                  +a.date.replace(/:|\.|\ /g, '') -
                  +b.date.replace(/:|\.|\ /g, '')
            )
         );
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
               <Stack
                  sx={{
                     justifyContent: 'center',
                     alignItems: 'center',
                     height: '80vh',
                  }}
               >
                  <LocalMallIcon sx={{ fontSize: 40, paddingBottom: '20px' }} />
                  <Typography variant="h4" sx={{ fontWeight: 500 }}>
                     Orders is clear
                  </Typography>
               </Stack>
            </Container>
         )}
      </RequirePage>
   );
};

export default Orders;
