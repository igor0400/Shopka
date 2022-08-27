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

import { returnArrfromObj } from '../../utils/supportFunctions';

import Grid from '@mui/material/Unstable_Grid2';

import LikedProduct from './LikedProduct';

import { Container, Typography } from '@mui/material';
import RequirePage from '../../hoc/RequirePage';

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
               <h3 style={{ textAlign: 'center' }}>Liked is clear</h3>
            </Container>
         )}
      </RequirePage>
   );
};

export default Liked;
