import { useState, useEffect, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
   useGetUserLikedQuery,
   useDeleteOneUserLikeMutation,
   usePostOneUserCartMutation,
} from '../../slices/firebaseSlice';
import {
   removeFromDontAuthLiked,
   addDontAuthCart,
} from '../../slices/userSlice';

import LikedProduct from './LikedProduct';
import RequirePage from '../../hoc/RequirePage';

import { Container, Typography, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { returnArrfromObj } from '../../utils/supportFunctions';

const Liked = () => {
   const { user, userAuth, dontAuthLiked } = useSelector((state) => state.user);
   const [liked, setLiked] = useState([]);
   const [likedLoaded, setLikedLoaded] = useState(false);

   const userId = user ? user.localId : null;
   const {
      data: userLiked = {},
      isLoading: isLikedLoading,
      isError: isLikedError,
   } = useGetUserLikedQuery(userId);

   const dispatch = useDispatch();
   const [deleteOneUserLike] = useDeleteOneUserLikeMutation();
   const [postOneUserCart] = usePostOneUserCartMutation();

   useEffect(() => {
      if (userAuth) {
         if (userLiked && !isLikedLoading) {
            setLiked(returnArrfromObj(userLiked));
         }
      } else {
         if (!likedLoaded) {
            setLiked(returnArrfromObj(dontAuthLiked));
            setLikedLoaded(true);
         }
      }
   }, [userLiked, dontAuthLiked]);

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
      if (liked.length === 1) setLiked([]);
      setLikedLoaded(false);
   };

   const handleAddToCart = (item) => {
      if (userAuth) {
         postCartItem({
            userId,
            itemId: item.id,
            data: { ...item, amount: 1 },
         });
      } else {
         dispatch(addDontAuthCart(item.id));
      }
   };

   const handleMoveToCart = (item) => {
      handleRemoveFromLiked(item.id);
      handleAddToCart(item);
   };

   return (
      <RequirePage loading={isLikedLoading} error={isLikedError}>
         {liked.length > 0 ? (
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
                     <Grid key={i}>
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
         ) : (
            <Container maxWidth="sm">
               <Stack
                  sx={{
                     justifyContent: 'center',
                     alignItems: 'center',
                     height: '80vh',
                  }}
               >
                  <FavoriteIcon sx={{ fontSize: 40, paddingBottom: '20px' }} />
                  <Typography variant="h4" sx={{ fontWeight: 500 }}>
                     Liked is clear
                  </Typography>
               </Stack>
            </Container>
         )}
      </RequirePage>
   );
};

export default Liked;
