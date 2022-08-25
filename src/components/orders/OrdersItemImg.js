import { useState } from 'react';
import { Box, Typography, Skeleton } from '@mui/material';

const OrdersItemImg = ({ imgs, name, id, i, orderedItems, slicedItems }) => {
   const [imgLoad, setImgLoad] = useState(false);

   return (
      <Box key={id} sx={{ position: 'relative' }}>
         {orderedItems.length >= 4 && i + 1 === slicedItems.length ? (
            <Box
               sx={{
                  position: 'absolute',
                  zIndex: 10,
                  right: 0,
                  top: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  background: 'rgba(0,0,0,0.4)',
               }}
            >
               <Typography
                  variant="h4"
                  sx={{
                     color: '#fff',
                     height: '100%',
                     margin: 'auto',
                     display: 'flex',
                     alignItems: 'center',
                     fontWeight: 700,
                  }}
               >
                  +{orderedItems.length - 3}
               </Typography>
            </Box>
         ) : null}
         <img
            src={imgs[0]}
            alt={name}
            style={{
               width: '120px',
               height: '120px',
               display: imgLoad ? null : 'none',
            }}
            onLoad={() => setImgLoad(true)}
            className="animate__animated animate__fadeIn animate__faster"
         />
         {imgLoad ? null : (
            <Skeleton
               variant="rounded"
               animation="wave"
               width={120}
               height={120}
            />
         )}
      </Box>
   );
};

export default OrdersItemImg;
