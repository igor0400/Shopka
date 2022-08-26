import React from 'react';
import { Link } from 'react-router-dom';
import { returnArrfromObj } from '../../utils/supportFunctions';
import { Box, Typography, Divider, Stack, Button, Paper } from '@mui/material';
import OrdersItemImg from './OrdersItemImg';

const OrdersItem = ({ date, items, id, numberId }) => {
   const orderedItems = returnArrfromObj(items);
   const slicedItems = orderedItems.slice(0, 3);

   return (
      <Paper square sx={{ padding: '20px' }}>
         <Stack
            direction="row"
            sx={{ paddingBottom: '10px' }}
            spacing={2}
            component={Link}
            to={id}
         >
            {slicedItems.map((item, i) => (
               <OrdersItemImg
                  key={i}
                  {...item}
                  i={i}
                  orderedItems={orderedItems}
                  slicedItems={slicedItems}
               />
            ))}
         </Stack>

         <Divider />
         <Stack
            direction="row"
            sx={{ justifyContent: 'space-between', paddingTop: '10px' }}
         >
            <Box>
               <Typography variant="subtitle1">Order num.: {numberId}</Typography>
               <Typography variant="subtitle1">UTC date: {date}</Typography>
            </Box>
            <Button
               variant="outlined"
               size="medium"
               sx={{
                  padding: '0px 50px',
                  borderWidth: '2px',
                  borderRadius: 0,
                  ':hover': {
                     borderWidth: '2px',
                  },
               }}
               component={Link}
               to={id}
            >
               View order
            </Button>
         </Stack>
      </Paper>
   );
};

export default OrdersItem;
