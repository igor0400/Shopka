import { useState } from 'react';

import { Skeleton, Typography, Box, Divider } from '@mui/material';

const OrderPageItem = ({ name, imgs, price, amount, id }) => {
   const [imgLoad, setImgLoad] = useState(false);

   return (
      <Box>
         <img
            src={imgs[0]}
            alt={name}
            style={{
               width: '200px',
               height: '200px',
               display: imgLoad ? null : 'none',
            }}
            onLoad={() => setImgLoad(true)}
            className="animate__animated animate__fadeIn animate__faster"
         />
         {imgLoad ? null : (
            <Skeleton
               variant="rounded"
               animation="wave"
               width={200}
               height={200}
            />
         )}
         <Typography variant="subtitle1" sx={{ paddingTop: '10px' }}>
            {name}
         </Typography>
         <Divider sx={{ margin: '10px 0' }} />
         <Typography variant="h6" sx={{ fontWeight: 700 }}>
            ${price}
         </Typography>
         <Divider sx={{ margin: '10px 0' }} />
         <Typography variant="subtitle1">Amount: {amount}</Typography>
      </Box>
   );
};

export default OrderPageItem;
