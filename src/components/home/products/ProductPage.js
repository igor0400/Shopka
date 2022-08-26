import { useCallback, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Zoom } from 'swiper';
import {
   Container,
   CircularProgress,
   Box,
   Typography,
   Rating,
   Stack,
   Button,
} from '@mui/material';

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
   const [postOneUserCart] = usePostOneUserCartMutation();
   const [postOneUserLike] = usePostOneUserLikeMutation();
   const [deleteOneUserCart] = useDeleteOneUserCartMutation();
   const [deleteOneUserLike] = useDeleteOneUserLikeMutation();

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
      }
      setIsItemInCart(true);
   };

   const handleAddToLiked = () => {
      if (userAuth) {
         postLikedItem({ userId, itemId: product.id, data: product });
      } else {
         dispatch(addDontAuthLiked({ ...product, amount: 1 }));
      }
      setIsItemInLiked(true);
   };

   const handleRemoveFromCart = (id) => {
      if (userAuth) {
         deleteCartItem({ userId, itemId: id });
      } else {
         dispatch(removeFromDontAuthCart(id));
      }
      setIsItemInCart(false);
   };

   const handleRemoveFromLiked = (id) => {
      if (userAuth) {
         deleteLikedItem({ userId, itemId: id });
      } else {
         dispatch(removeFromDontAuthLiked(id));
      }
      setIsItemInLiked(false);
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
      if (isProductLoading || isProductUninitialized) {
         return (
            <Box
               sx={{
                  height: '80vh',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
               }}
            >
               <CircularProgress />
            </Box>
         );
      }

      if (isProductError || !product) {
         return <h4>Error</h4>;
      }

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
               {/* это для проверки загрузились ли сообщения */}
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
                  <Button
                     variant="contained"
                     disabled={isCartLoading || isCartError}
                     onClick={() =>
                        isItemInCart
                           ? handleRemoveFromCart(id)
                           : handleAddToCart()
                     }
                  >
                     {isItemInCart ? 'Remove from cart' : 'To cart'}
                  </Button>
                  <Button
                     variant="outlined"
                     disabled={isLikedLoading || isLikedError}
                     onClick={() =>
                        isItemInLiked
                           ? handleRemoveFromLiked(id)
                           : handleAddToLiked()
                     }
                  >
                     {isItemInLiked ? 'Remove from liked' : 'To liked'}
                  </Button>
               </Stack>
            </Box>
         </Box>
      );
   };

   return <Container maxWidth="xl">{renderProduct(product)}</Container>;
};

export default ProductPage;
