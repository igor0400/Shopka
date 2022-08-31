import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Skeleton, Button, Typography, Stack, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const LikedProduct = ({
   name,
   imgs,
   description,
   price,
   rating,
   subDescription,
   id,
   handleRemoveFromLiked,
   handleMoveToCart,
   isPostCartLoading,
}) => {
   const [imgLoad, setImgLoad] = useState(false);

   return (
      <Stack sx={{ width: '275px', position: 'relative' }}>
         <IconButton
            aria-label="delete"
            size="large"
            sx={{
               position: 'absolute',
               top: 15,
               right: 15,
               color: 'gray',
               zIndex: 10,
               background: '#fff',
               padding: '5px',
            }}
            onClick={() => handleRemoveFromLiked(id)}
         >
            <DeleteIcon fontSize="inherit" />
         </IconButton>
         <Link
            to={`/products/${id}`}
            style={{ cursor: 'pointer', width: '275px', height: '300px' }}
         >
            <img
               src={imgs ? imgs[0] : null}
               alt={name}
               style={{
                  display: imgLoad ? null : 'none',
                  width: '275px',
                  height: '300px',
               }}
               onLoad={() => setImgLoad(true)}
               className="animate__animated animate__fadeIn animate__faster"
            />

            {imgLoad ? null : (
               <Skeleton
                  variant="rounded"
                  width={275}
                  height={300}
                  animation="wave"
                  style={{ borderRadius: '3px' }}
               />
            )}
         </Link>
         <Typography sx={{ margin: '10px 0 auto 0', wordWrap: 'break-word' }}>
            {name}
         </Typography>
         <Typography sx={{ fontWeight: 700 }}>${price}</Typography>
         <Button
            disabled={isPostCartLoading}
            variant="outlined"
            color="success"
            size="madium"
            sx={{
               width: '100%',
               marginTop: '30px',
               borderWidth: '3px',
               borderRadius: 0,
               color: '#000',
               ':hover': {
                  borderWidth: '3px',
               },
            }}
            onClick={() =>
               handleMoveToCart({
                  name,
                  imgs,
                  description,
                  price,
                  rating,
                  subDescription,
                  id,
               })
            }
         >
            Move to cart
         </Button>
      </Stack>
   );
};

export default LikedProduct;
