import { useCallback, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Zoom } from 'swiper';

import { useDispatch, useSelector } from 'react-redux';
import {
   addDontAuthCart,
   addDontAuthLiked,
   removeFromDontAuthCart,
   removeFromDontAuthLiked,
} from '../../../slices/userSlice';
import { useGetProductByIdQuery } from '../../../slices/apiSlice';
import {
   useGetUserCartQuery,
   useGetUserLikedQuery,
   usePostOneUserCartMutation,
   usePostOneUserLikeMutation,
   useDeleteOneUserCartMutation,
   useDeleteOneUserLikeMutation,
} from '../../../slices/firebaseSlice';

import {
   Container,
   CircularProgress,
   Box,
   Typography,
   Rating,
   Stack,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import RequirePage from '../../../hoc/RequirePage';
import { toast } from 'react-toastify';

const ProductPage = () => {
   const [isItemInCart, setIsItemInCart] = useState(false);
   const [isImagesLoad, setIsImagesLoad] = useState(false);
   const [isItemInLiked, setIsItemInLiked] = useState(false);

   const location = useLocation();
   const productId = location.pathname.split('/')[2];

   const { user, userAuth, dontAuthCart, dontAuthLiked } = useSelector(
      (state) => state.user
   );
   const userId = user ? user.localId : null;

   const {
      data: product = {},
      isUninitialized: isProductUninitialized,
      isLoading: isProductLoading,
      isError: isProductError,
   } = useGetProductByIdQuery(productId);
   const {
      data: userCart = [],
      isLoading: isCartLoading,
      isError: isCartError,
   } = useGetUserCartQuery(userId);
   const {
      data: userLiked = [],
      isLoading: isLikedLoading,
      isError: isLikedError,
   } = useGetUserLikedQuery(userId);

   useEffect(() => {
      if (userAuth && userCart) {
         for (let key in userCart) {
            if (key === productId) setIsItemInCart(true);
         }
      } else {
         for (let key in dontAuthCart) {
            if (key === productId) setIsItemInCart(true);
         }
      }
   }, [userCart]);

   useEffect(() => {
      if (userAuth && userLiked) {
         for (let key in userLiked) {
            if (key === productId) setIsItemInLiked(true);
         }
      } else {
         for (let key in dontAuthLiked) {
            if (key === productId) setIsItemInLiked(true);
         }
      }
   }, [userLiked]);

   const dispatch = useDispatch();
   const [
      postOneUserCart,
      {
         isError: isPostCartError,
         isLoading: isPostCartLoading,
         isSuccess: isPostCartSuccess,
      },
   ] = usePostOneUserCartMutation();
   const [
      postOneUserLike,
         {
            isError: isPostLikeError,
            isLoading: isPostLikeLoading,
            isSuccess: isPostLikeSuccess,
         },
   ] = usePostOneUserLikeMutation();
   const [
      deleteOneUserCart,
      {
         isError: isDeleteCartError,
         isLoading: isDeleteCartLoading,
         isSuccess: isDeleteCartSuccess,
      },
   ] = useDeleteOneUserCartMutation();
   const [
      deleteOneUserLike,
      {
         isError: isDeleteLikeError,
         isLoading: isDeleteLikeLoading,
         isSuccess: isDeleteLikeSuccess,
      },
   ] = useDeleteOneUserLikeMutation();

   useEffect(() => {
      if (isPostCartSuccess) setIsItemInCart(true);
      if (isPostCartError) toast.error('Post error, try again later');

      if (isPostLikeSuccess) setIsItemInLiked(true);
      if (isPostLikeError) toast.error('Post error, try again later');

      if (isDeleteCartSuccess) setIsItemInCart(false);
      if (isDeleteCartError) toast.error('Delete error, try again later');

      if (isDeleteLikeSuccess) setIsItemInLiked(false);
      if (isDeleteLikeError) toast.error('Delete error, try again later');
   }, [
      isPostCartSuccess,
      isPostCartError,
      isPostLikeSuccess,
      isPostLikeError,
      isDeleteCartSuccess,
      isDeleteCartError,
      isDeleteLikeSuccess,
      isDeleteLikeError,
   ]);

   const postCartItem = useCallback((value) => {
      postOneUserCart(value);
   }, []);
   const postLikedItem = useCallback((value) => {
      postOneUserLike(value);
   }, []);
   const deleteCartItem = useCallback((value) => {
      deleteOneUserCart(value);
   }, []);
   const deleteLikedItem = useCallback((value) => {
      deleteOneUserLike(value);
   }, []);

   const handleAddToCart = () => {
      if (userAuth) {
         postCartItem({
            userId,
            itemId: product.id,
            data: { ...product, amount: 1 },
         });
      } else {
         dispatch(addDontAuthCart({ ...product, amount: 1 }));
         setIsItemInCart(true);
      }
   };

   const handleAddToLiked = () => {
      if (userAuth) {
         postLikedItem({ userId, itemId: product.id, data: product });
      } else {
         dispatch(addDontAuthLiked({ ...product, amount: 1 }));
         setIsItemInLiked(true);
      }
   };

   const handleRemoveFromCart = (id) => {
      if (userAuth) {
         deleteCartItem({ userId, itemId: id });
      } else {
         dispatch(removeFromDontAuthCart(id));
         setIsItemInCart(false);
      }
   };

   const handleRemoveFromLiked = (id) => {
      if (userAuth) {
         deleteLikedItem({ userId, itemId: id });
      } else {
         dispatch(removeFromDontAuthLiked(id));
         setIsItemInLiked(false);
      }
   };

   const renderProduct = ({
      name,
      imgs,
      description,
      price,
      rating,
      subDescription,
      id,
   }) => {
      return (
         <Box className="flex">
            <Swiper
               loop={true}
               zoom={true}
               pagination={{
                  clickable: true,
               }}
               navigation={true}
               modules={[Pagination, Navigation, Zoom]}
               className="mySwiper"
               style={{ maxWidth: '800px', margin: 0 }}
            >
               {/* это для проверки загрузились ли изображения */}
               {imgs ? (
                  <img
                     src={imgs[0]}
                     style={{ display: 'none' }}
                     onLoad={() => setIsImagesLoad(true)}
                  />
               ) : null}

               {isImagesLoad ? (
                  imgs.map((item, i) => (
                     <SwiperSlide
                        key={i}
                        style={{
                           display: 'flex',
                           justifyContent: 'center',
                        }}
                     >
                        <div className="swiper-zoom-container">
                           <img
                              src={item}
                              style={{ width: '500px', height: '500px' }}
                           />
                        </div>
                     </SwiperSlide>
                  ))
               ) : (
                  <SwiperSlide>
                     <Box
                        sx={{
                           display: 'flex',
                           margin: 'auto',
                           justifyContent: 'center',
                           alignItems: 'center',
                           width: '500px',
                           height: '500px',
                        }}
                     >
                        <CircularProgress />
                     </Box>
                  </SwiperSlide>
               )}
            </Swiper>

            <Box
               sx={{ padding: '20px 0 0 20px', flexDirection: 'column' }}
               className="flex"
            >
               <Box className="flex">
                  <Typography variant="h4" sx={{ fontWeight: 500 }}>
                     {name}
                  </Typography>
                  <Box
                     className="flex"
                     sx={{ alignItems: 'center', marginLeft: '10px' }}
                  >
                     <Rating
                        name="rating"
                        value={rating || 0}
                        precision={0.5}
                        size="small"
                        sx={{ marginRight: '5px' }}
                        readOnly
                     />
                     <Typography style={{ fontSize: '14px', fontWeight: 500 }}>
                        {rating || '0'}
                     </Typography>
                  </Box>
               </Box>
               <Typography variant="h5" sx={{ fontWeight: 500 }}>
                  ${price || '0'}
               </Typography>
               <Typography
                  variant="body2"
                  component="p"
                  sx={{
                     fontSize: '18px',
                     paddingTop: '30px',
                     maxWidth: '500px',
                  }}
               >
                  <b style={{ color: 'gray', marginRight: '5px' }}>
                     Description:
                  </b>
                  {description}
               </Typography>
               <Typography
                  variant="p"
                  color="text.secondary"
                  sx={{
                     fontSize: '16px',
                     padding: '5px 0 0',
                  }}
               >
                  {subDescription}
               </Typography>

               <Stack spacing={2} direction="row" sx={{ margin: 'auto 0 0' }}>
                  <LoadingButton
                     variant="contained"
                     disabled={isCartLoading || isCartError}
                     onClick={() =>
                        isItemInCart
                           ? handleRemoveFromCart(id)
                           : handleAddToCart()
                     }
                     loading={isPostCartLoading || isDeleteCartLoading}
                  >
                     {isItemInCart ? 'Remove from cart' : 'To cart'}
                  </LoadingButton>
                  <LoadingButton
                     variant="outlined"
                     disabled={isLikedLoading || isLikedError}
                     onClick={() =>
                        isItemInLiked
                           ? handleRemoveFromLiked(id)
                           : handleAddToLiked()
                     }
                     loading={isPostLikeLoading || isDeleteLikeLoading}
                  >
                     {isItemInLiked ? 'Remove from liked' : 'To liked'}
                  </LoadingButton>
               </Stack>
            </Box>
         </Box>
      );
   };

   return (
      <RequirePage
         loading={isProductLoading || isProductUninitialized}
         error={isProductError || !product}
         message="Product not found :("
      >
         <Container maxWidth="xl">{renderProduct(product)}</Container>
      </RequirePage>
   );
};

export default ProductPage;
