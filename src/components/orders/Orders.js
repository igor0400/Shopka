import { Container, Box, Typography, CircularProgress } from '@mui/material';
import { useGetUserOrdersQuery } from '../../slices/firebaseSlice';

import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { returnArrfromObj } from '../../utils/supportFunctions';

const Orders = () => {
   const { user } = useSelector((state) => state.user);
   const [orders, setOrders] = useState([]);

   const userId = user ? user.localId : user;
   const {
      data: userOrders = {},
      isLoading,
      isError,
   } = useGetUserOrdersQuery(userId);

   useEffect(() => {
      setOrders(returnArrfromObj(userOrders));
   }, []);

   const renderOrders = (orders) => {
      if (isLoading) {
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

      if (isError) {
         return <p>Error :(</p>;
      }

      if (orders && orders.length !== 0) {
         return orders.map((item, i) => (
            <h4 key={i}>
               {i + 1}. {item.id}
            </h4>
         ));
      } else {
         return 'not orders yet';
      }
   };

   return (
      <Container maxWidth="xl">
         <Box
            sx={{
               p: { xs: 2, sm: 3, md: 4, xl: 5 },
               maxWidth: { xs: 400, lg: 700 },
               margin: { xs: 0, md: '20px auto' },
               '& > *': {
                  flexGrow: 1,
                  flexBasis: '50%',
               },
               minHeight: '80vh',
            }}
         >
            <Typography
               variant="h4"
               component="h4"
               sx={{ textAlign: 'center' }}
            >
               Orders
            </Typography>
            {renderOrders(orders)}
         </Box>
      </Container>
   );
};

export default Orders;
