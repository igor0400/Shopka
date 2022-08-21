import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
   Box,
   Skeleton,
   Checkbox,
   Rating,
   Typography,
   CardContent,
   Card,
} from '@mui/material';

import { Favorite, FavoriteBorder } from '@mui/icons-material';

const ProductsItem = ({
   name,
   imgs,
   description,
   price,
   rating,
   subDescription,
   id,
}) => {
   const [cardElevation, setCardElevation] = useState(0);
   const [imgLoad, setImgLoad] = useState(false);

   return (
      <Card
         sx={{ maxWidth: 280, height: '100%' }}
         elevation={cardElevation}
         onMouseEnter={() => setCardElevation(3)}
         onMouseLeave={() => setCardElevation(0)}
      >
         <CardContent
            className="flex"
            sx={{ flexDirection: 'column', height: '95%' }}
         >
            <Link to={`/products/${id}`} style={{ cursor: 'pointer' }}>
               <img
                  src={imgs[0]}
                  alt={name}
                  style={{
                     display: imgLoad ? null : 'none',
                     width: '220px',
                     height: '220px',
                     animationDuration: '0.5s',
                  }}
                  onLoad={() => setImgLoad(true)}
                  className="animate__animated animate__fadeIn"
               />
            </Link>

            {imgLoad ? null : (
               <Link to={`/products/${id}`} style={{ cursor: 'pointer' }}>
                  <Skeleton
                     variant="rounded"
                     width={'100%'}
                     height={220}
                     animation="wave"
                     style={{ borderRadius: '3px' }}
                  />
               </Link>
            )}

            <Typography sx={{ margin: '10px 0 auto' }}>
               {description}
            </Typography>
            <Typography variant="h6">${price}</Typography>
            <Typography
               variant="p"
               color="text.secondary"
               sx={{ fontSize: '14px' }}
            >
               {subDescription}
            </Typography>
            <Box
               className="flex"
               style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
               }}
            >
               <Box className="flex">
                  <Rating
                     name="rating"
                     value={rating}
                     precision={0.5}
                     size="small"
                     sx={{ marginRight: '5px' }}
                     readOnly
                  />
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>
                     {rating}
                  </span>
               </Box>
               <Checkbox
                  icon={<FavoriteBorder sx={{ fontSize: 23 }} />}
                  checkedIcon={<Favorite sx={{ fontSize: 23 }} />}
               />
            </Box>
         </CardContent>
      </Card>
   );
};

export default ProductsItem;
