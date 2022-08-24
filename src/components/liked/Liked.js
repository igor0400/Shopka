import { useState, useEffect, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
   useGetUserLikedQuery,
   useDeleteOneUserLikeMutation,
   usePostOneUserCartMutation,
} from '../../slices/firebaseSlice';
import { useGetProductsQuery } from '../../slices/apiSlice';
import { removeFromDontAuthLiked, addDontAuthCart } from '../../slices/userSlice';

import { getSomethingItems } from '../../utils/supportFunctions';

import Grid from '@mui/material/Unstable_Grid2';

import LikedProduct from './LikedProduct';

import {
   Container,
   Box,
   Typography,
   CircularProgress,
   Stack,
} from '@mui/material';

const Liked = () => {
   const { user, userAuth, dontAuthLiked } = useSelector((state) => state.user);
   const [liked, setLiked] = useState([]);
   const [likedLoaded, setLikedLoaded] = useState(false);

   const userId = user ? user.localId : user;
   const {
      data: userLiked = {},
      isLikedLoading,
      isLikedError,
   } = useGetUserLikedQuery(userId);
   const {
      data: products = [],
      isProductsLoading,
      isProductsError,
   } = useGetProductsQuery();

   const dispatch = useDispatch();
   const [deleteOneUserLike] = useDeleteOneUserLikeMutation();
   const [postOneUserCart] = usePostOneUserCartMutation();

   useEffect(() => {
      if (likedLoaded) return;

      if (userAuth) {
         if (userLiked && products) {
            setLiked(getSomethingItems(products, userLiked));
         }
      } else {
         setLiked(getSomethingItems(products, dontAuthLiked));
      }

      setLikedLoaded(true);
   }, [products, userLiked, dontAuthLiked]);

   const deleteLikedItem = useCallback((value) => {
      deleteOneUserLike(value);
   }, []);
   const postCartItem = useCallback((value) => {
      postOneUserCart(value);
   }, []);

   const handleRemoveFromLiked = (id) => {
      if (userAuth) {
         deleteLikedItem({ userId, itemId: id });
      } else {
         dispatch(removeFromDontAuthLiked(id));
      }
      if (liked === 1) setLiked([]);
      setLikedLoaded(false);
   };

   const handleAddToCart = (id) => {
      if (userAuth) {
         postCartItem({ userId, itemId: id, data: { id, amount: 1 } });
      } else {
         dispatch(addDontAuthCart(id));
      }
   };

   const handleMoveToCart = (id) => {
      handleRemoveFromLiked(id);
      handleAddToCart(id);
   };

   if (isLikedLoading || isProductsLoading) {
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

   if (isLikedError || isProductsError) {
      return <p>Error :(</p>;
   }

   if (liked && liked.length !== 0) {
      return (
         <Container maxWidth="lg">
            <Typography
               variant="h4"
               sx={{ textAlign: 'center', fontWeight: '700' }}
            >
               Liked
            </Typography>
            <Grid
               container
               spacing={2}
               columns={{ xs: 4, sm: 8, md: 12 }}
               sx={{ marginTop: '20px' }}
            >
               {liked.map((item, i) => (
                  <Grid sx key={i}>
                     <LikedProduct
                        {...item}
                        key={i}
                        handleRemoveFromLiked={handleRemoveFromLiked}
                        handleMoveToCart={handleMoveToCart}
                     />
                  </Grid>
               ))}
            </Grid>
         </Container>
      );
   } else {
      return (
         <Container maxWidth="sm">
            <h3 style={{ textAlign: 'center' }}>Liked clear</h3>
         </Container>
      );
   }
};

export default Liked;
