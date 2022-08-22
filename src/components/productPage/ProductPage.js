import { useLocation } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../slices/apiSlice';
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
import { addDontAuthCart, addDontAuthLiked } from '../../slices/userSlice';

const ProductPage = () => {
   const location = useLocation();
   const id = location.pathname.split('/')[2];

   const { userAuth } = useSelector((state) => state.user);

   const {
      data: product = {},
      isUninitialized,
      isLoading,
      isError,
   } = useGetProductByIdQuery(id);

   const dispatch = useDispatch();

   const handleAddToCart = (id) => {
      if (userAuth) {
         // post cart
      } else {
         dispatch(addDontAuthCart(id));
      }
   };

   const handleAddToLiked = () => {
      if (userAuth) {
         // post liked
      } else {
         dispatch(addDontAuthLiked(id));
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
      if (isLoading || isUninitialized) {
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

      if (isError || !product) {
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
               {imgs.map((item, i) => (
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
               ))}
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
                        value={rating}
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
                  <Button variant="contained" onClick={() => handleAddToCart(id)}>
                     To cart
                  </Button>
                  <Button variant="outlined" onClick={handleAddToLiked}>
                     To liked
                  </Button>
               </Stack>
            </Box>
         </Box>
      );
   };

   return <Container maxWidth="xl">{renderProduct(product)}</Container>;
};

export default ProductPage;
