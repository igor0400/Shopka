import { useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useGetOneUserOrderQuery } from '../../slices/firebaseSlice';

import { returnArrfromObj } from '../../utils/supportFunctions';

import {
   Container,
   Typography,
   Paper,
   Stack,
   Box,
   CircularProgress,
   Divider,
   Grid,
} from '@mui/material';
import OrderPageItem from './OrderPageItem';

const OrderPage = () => {
   const { user } = useSelector((state) => state.user);

   const userId = user ? user.localId : null;
   const location = useLocation();
   const orderId = location.pathname.split('/')[2];

   const {
      data: order = {},
      isLoading,
      isError,
   } = useGetOneUserOrderQuery({
      userId,
      orderId,
   });

   if (isLoading) {
      return (
         <Box
            sx={{
               height: '80vh',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
            }}
         >
            <CircularProgress />
         </Box>
      );
   }

   if (isError) {
      return <h4>Error</h4>;
   }

   const {
      numberId,
      address: objAddress,
      status,
      items,
      paymentMethod,
      sum,
   } = order;
   const { firstName, lastName, address, city, postCode, country, phone } =
      objAddress;

   const arrOfItems = returnArrfromObj(items);

   return (
      <Container maxWidth="md">
         <Stack spacing={2}>
            <PaperWrapper>
               <Typography
                  variant="h5"
                  sx={{
                     textTransform: 'uppercase',
                     fontWeight: 700,
                     paddingBottom: '5px',
                  }}
               >
                  Order details
               </Typography>
               <Typography variant="body2" color="GrayText">
                  Thanks for your order! Check out the details below.
               </Typography>
            </PaperWrapper>
            <PaperWrapper>
               <Typography
                  variant="subtitle1"
                  color="GrayText"
                  sx={{ fontWeight: 500 }}
               >
                  Order num.: {numberId}
               </Typography>
            </PaperWrapper>
            <PaperWrapper>
               <Typography
                  variant="h6"
                  sx={{ textTransform: 'uppercase', fontWeight: 700 }}
               >
                  Delivery address:
               </Typography>
               <Divider sx={{ borderBottomWidth: '2px', margin: '10px 0' }} />
               <Typography variant="body2" color="GrayText">
                  {firstName} {lastName}
               </Typography>
               <Typography variant="body2" color="GrayText">
                  {address}
               </Typography>
               <Typography variant="body2" color="GrayText">
                  {city}, {postCode}
               </Typography>
               <Typography variant="body2" color="GrayText">
                  {country}
               </Typography>
               <Typography variant="body2" color="GrayText">
                  {phone}
               </Typography>
            </PaperWrapper>
            <PaperWrapper>
               <Stack
                  direction="row"
                  sx={{ justifyContent: 'space-between', alignItems: 'center' }}
               >
                  <Typography
                     variant="h6"
                     sx={{ textTransform: 'uppercase', fontWeight: 700 }}
                  >
                     Order {status}
                  </Typography>
                  <Typography variant="body1" color="GrayText">
                     {arrOfItems.length} items
                  </Typography>
               </Stack>

               <Divider sx={{ borderBottomWidth: '2px', margin: '10px 0' }} />

               <Grid container spacing={3}>
                  {arrOfItems.map((item, i) => (
                     <Grid item>
                        <OrderPageItem {...item} key={i} />
                     </Grid>
                  ))}
               </Grid>
            </PaperWrapper>
            <PaperWrapper>
               <Typography
                  variant="h6"
                  sx={{ textTransform: 'uppercase', fontWeight: 700 }}
               >
                  Payment method
               </Typography>
               <Divider sx={{ borderBottomWidth: '2px', margin: '10px 0' }} />
               <Typography variant="subtitle1" color="GrayText">
                  {paymentMethod}
               </Typography>
            </PaperWrapper>
            <PaperWrapper>
               <Typography
                  variant="h6"
                  sx={{ textTransform: 'uppercase', fontWeight: 700 }}
               >
                  Order total
               </Typography>
               <Divider sx={{ borderBottomWidth: '2px', margin: '10px 0' }} />
               <Typography
                  variant="subtitle1"
                  color="GrayText"
                  sx={{
                     fontWeight: 500,
                     textTransform: 'uppercase',
                     paddingBottom: '10px'
                  }}
               >
                  Sub-total: ${sum.subTotal}
               </Typography>
               <Typography
                  variant="subtitle1"
                  color="GrayText"
                  sx={{
                     fontWeight: 500,
                     textTransform: 'uppercase',
                  }}
               >
                  Delivery: $10
               </Typography>
               <Divider sx={{ borderBottomWidth: '2px', margin: '10px 0' }} />
               <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, textTransform: 'uppercase' }}
               >
                  Total: ${sum.total}
               </Typography>
            </PaperWrapper>
         </Stack>
      </Container>
   );
};

const PaperWrapper = ({ children }) => {
   return (
      <Paper sx={{ padding: '25px' }} square>
         {children}
      </Paper>
   );
};

export default OrderPage;
