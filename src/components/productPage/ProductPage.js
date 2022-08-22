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
} from '../../slices/userSlice';
import { useGetProductByIdQuery } from '../../slices/apiSlice';
import {
   useGetUserCartQuery,
   usePostUserCartMutation,
   useGetUserLikedQuery,
   usePostUserLikedMutation,
} from '../../slices/firebaseSlice';

import { postItemToSome } from '../../utils/posted';

const ProductPage = () => {
   const [isItemInCart, setIsItemInCart] = useState(false);
   const [isItemInLiked, setIsItemInLiked] = useState(false);

   const location = useLocation();
   const productId = location.pathname.split('/')[2];

   const { user, userAuth, dontAuthCart, dontAuthLiked } = useSelector(
      (state) => state.user
   );
   const userId = user ? user.localId : user;

   const {
      data: product = {},
      isProductUninitialized,
      isProductLoading,
      isProductError,
   } = useGetProductByIdQuery(productId);
   const {
      data: userCart = [],
      isCartLoading,
      isCartError,
   } = useGetUserCartQuery(userId);
   const {
      data: userLiked = [],
      isLikedLoading,
      isLikedError,
   } = useGetUserLikedQuery(userId);

   useEffect(() => {
      if (userAuth) {
         if (userCart) {
            userCart.forEach((item) =>
               item.id === productId ? setIsItemInCart(true) : null
            );
         }

         if (userLiked) {
            userLiked.forEach((item) =>
               item === productId ? setIsItemInLiked(true) : null
            );
         }
      } else {
         dontAuthCart.forEach((item) =>
            item.id === productId ? setIsItemInCart(true) : null
         );

         dontAuthLiked.forEach((item) =>
            item === productId ? setIsItemInLiked(true) : null
         );
      }
   }, []);

   const dispatch = useDispatch();
   const [postUserCart] = usePostUserCartMutation();
   const [postUserLiked] = usePostUserLikedMutation();

   const postCart = useCallback((value) => {
      postUserCart(value);
   }, []);
   const postLiked = useCallback((value) => {
      postUserLiked(value);
   }, []);

   const handleAddToCart = (id) => {
      if (userAuth) {
         postItemToSome('cart', userCart, id, postCart, userId);
      } else {
         dispatch(addDontAuthCart(id));
      }
      setIsItemInCart(true);
   };

   const handleAddToLiked = (id) => {
      if (userAuth) {
         postItemToSome('liked', userLiked, id, postLiked, userId);
      } else {
         dispatch(addDontAuthLiked(id));
      }
      setIsItemInLiked(true);
   };

   const handleRemoveFromCart = (id) => {
      if (userAuth) {
         postCart({
            url: userId,
            data: userCart.filter((item) => item.id !== id),
         });
      } else {
         dispatch(removeFromDontAuthCart(id));
      }
      setIsItemInCart(false);
   };

   const handleRemoveFromLiked = (id) => {
      if (userAuth) {
         postLiked({
            url: userId,
            data: userLiked.filter((item) => item.id !== id),
         });
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
               {imgs
                  ? imgs.map((item, i) => (
                       <SwiperSlide
                          key={i}
                          style={{
                             display: 'flex',
                             justifyContent: 'center',
                          }}
                       >
                          <div className="swiper-zoom-container">
                             <img src={item} style={{ width: '500px' }} />
                          </div>
                       </SwiperSlide>
                    ))
                  : null}
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
                        value={rating ? rating : 0}
                        precision={0.5}
                        size="small"
                        sx={{ marginRight: '5px' }}
                        readOnly
                     />
                     <Typography style={{ fontSize: '14px', fontWeight: 500 }}>
                        {rating}
                     </Typography>
                  </Box>
               </Box>
               <Typography variant="h5" sx={{ fontWeight: 500 }}>
                  {price}$
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
                           : handleAddToCart(id)
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
                           : handleAddToLiked(id)
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
