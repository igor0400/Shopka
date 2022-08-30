import { useState, useCallback, useEffect } from 'react';
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

import { useSelector, useDispatch } from 'react-redux';
import {
   useGetUserLikedQuery,
   usePostOneUserLikeMutation,
   useDeleteOneUserLikeMutation,
} from '../../../slices/firebaseSlice';
import {
   addDontAuthLiked,
   removeFromDontAuthLiked,
} from '../../../slices/userSlice';

const ProductsItem = (product) => {
   const [cardElevation, setCardElevation] = useState(0);
   const [imgLoad, setImgLoad] = useState(false);
   const [isItemInLiked, setIsItemInLiked] = useState(false);

   const { user, userAuth, dontAuthLiked } = useSelector((state) => state.user);
   const userId = user ? user.localId : null;
   const { name, imgs, description, price, rating, subDescription, id } =
      product;

   const {
      data: userLiked = {},
      isLikedLoading,
      isLikedError,
   } = useGetUserLikedQuery(userId);

   const dispatch = useDispatch();
   const [postOneUserLike] = usePostOneUserLikeMutation();
   const [deleteOneUserLike] = useDeleteOneUserLikeMutation();

   useEffect(() => {
      if (userAuth) {
         if (userLiked) {
            for (let key in userLiked) {
               if (key === id) setIsItemInLiked(true);
            }
         }
      } else {
         for (let key in dontAuthLiked) {
            if (key === id) setIsItemInLiked(true);
         }
      }
   }, [userLiked]);

   const postLikedItem = useCallback((value) => {
      postOneUserLike(value);
   }, []);
   const deleteLikedItem = useCallback((value) => {
      deleteOneUserLike(value);
   }, []);

   const handleAddToLiked = (id) => {
      if (userAuth) {
         postLikedItem({
            userId,
            itemId: id,
            data: product,
         });
      } else {
         dispatch(addDontAuthLiked(product));
      }
      setIsItemInLiked(true);
   };

   const handleRemoveFromLiked = (id) => {
      if (userAuth) {
         deleteLikedItem({ userId, itemId: id });
      } else {
         dispatch(removeFromDontAuthLiked(id));
      }
      setIsItemInLiked(false);
   };

   return (
      <Card
         sx={{ width: 252, height: '100%' }}
         elevation={cardElevation}
         onMouseEnter={() => setCardElevation(3)}
         onMouseLeave={() => setCardElevation(0)}
      >
         <CardContent
            className="flex"
            sx={{ flexDirection: 'column', height: '95%' }}
         >
            <Link
               to={`/products/${id}`}
               style={{ cursor: 'pointer', width: '220px', height: '220px' }}
            >
               <img
                  src={imgs[0]}
                  alt={name}
                  style={{
                     display: imgLoad ? null : 'none',
                     width: '220px',
                     height: '220px',
                  }}
                  onLoad={() => setImgLoad(true)}
                  className="animate__animated animate__fadeIn animate__faster"
               />

               {imgLoad ? null : (
                  <Skeleton
                     variant="rounded"
                     width={220}
                     height={220}
                     animation="wave"
                     style={{ borderRadius: '3px' }}
                  />
               )}
            </Link>

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
                  onClick={() =>
                     isItemInLiked
                        ? handleRemoveFromLiked(id)
                        : handleAddToLiked(id)
                  }
                  checked={isItemInLiked}
                  disabled={isLikedLoading || isLikedError}
               />
            </Box>
         </CardContent>
      </Card>
   );
};

export default ProductsItem;
