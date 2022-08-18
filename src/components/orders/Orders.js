import { Container, Paper, Box, Typography } from '@mui/material';
import { useGetUserOrdersQuery } from '../../firebase/firebaseSlice';

import { useSelector } from 'react-redux';

const Orders = () => {
   // auth data post to user
   const { user } = useSelector((state) => state.user);

   const userId = user ? user.localId : user;
   const {
      data: userOrders = [],
      isLoading,
      isError,
   } = useGetUserOrdersQuery(userId);

   const renderOrders = (orders) => {
      if (isLoading) {
         return 'Loading...';
      }

      if (isError) {
         return 'Error :(';
      }

      if (orders.length === 0) {
         return 'not orders yet';
      } else {
         return orders.map((item, i) => (
            <h4 key={i}>
               {i + 1}. {item.id}
            </h4>
         ));
      }
   };

   return (
      <Container maxWidth="xl">
         <Paper
            elevation={3}
            sx={{
               maxWidth: { xs: 400, lg: 700 },
               margin: { xs: 0, md: '20px auto' },
               '& > *': {
                  flexGrow: 1,
                  flexBasis: '50%',
               },
            }}
         >
            <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>
               <Typography
                  variant="h4"
                  component="h4"
                  sx={{ textAlign: 'center' }}
               >
                  Orders
               </Typography>
               {renderOrders(userOrders)}
            </Box>
         </Paper>
      </Container>
   );
};

export default Orders;
