import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { useState } from 'react';
import Skeleton from '@mui/material/Skeleton';

const ProductsItem = ({
   name,
   url,
   description,
   price,
   rating,
   subDescription,
}) => {
   const [cardElevation, setCardElevation] = useState(0);
   const [imgLoad, setImgLoad] = useState(false);

   return (
      <Card
         sx={{ maxWidth: 280, cursor: 'pointer', height: '100%' }}
         elevation={cardElevation}
         onMouseEnter={() => setCardElevation(3)}
         onMouseLeave={() => setCardElevation(0)}
      >
         <CardContent
            className="flex"
            sx={{ flexDirection: 'column', height: '95%' }}
         >
            <img
               src={url}
               alt={name}
               style={{
                  display: imgLoad ? null : 'none',
                  width: '220px',
                  height: '220px',
                  animationDuration: '0.5s'
               }}
               onLoad={() => setImgLoad(true)}
               className="animate__animated animate__fadeIn"
            />
            {imgLoad ? null : (
               <Skeleton
                  variant="rounded"
                  width={'100%'}
                  height={220}
                  animation="wave"
                  style={{ borderRadius: '3px' }}
               />
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
            <div
               className="flex"
               style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
               }}
            >
               <div className="flex">
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
               </div>
               <Checkbox
                  icon={<FavoriteBorder sx={{ fontSize: 23 }} />}
                  checkedIcon={<Favorite sx={{ fontSize: 23 }} />}
               />
            </div>
         </CardContent>
      </Card>
   );
};

export default ProductsItem;