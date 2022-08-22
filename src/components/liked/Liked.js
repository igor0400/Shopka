import { Container, Box, Typography, CircularProgress } from '@mui/material';
import { useGetUserLikedQuery } from '../../slices/firebaseSlice';

import { useSelector } from 'react-redux';

const Liked = () => {
   const { user, userAuth, dontAuthLiked } = useSelector((state) => state.user);

   const userId = user ? user.localId : user;
   const {
      data: userLiked = [],
      isLoading,
      isError,
   } = useGetUserLikedQuery(userId);

   const renderLiked = (liked) => {
      if (isLoading) {
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

      if (isError) {
         return <p>Error :(</p>;
      }

      if (liked && liked.length !== 0) {
         return liked.map((item, i) => (
            <h4 key={i}>
               {i + 1}. {item}
            </h4>
         ));
      } else {
         return 'not liked yet';
      }
   };

   return (
      <Container maxWidth="xl">
         <Box
            sx={{
               p: { xs: 2, sm: 3, md: 4, xl: 5 },
               maxWidth: { xs: 400, lg: 700 },
               margin: { xs: 0, md: '20px auto' },
               '& > *': {
                  flexGrow: 1,
                  flexBasis: '50%',
               },
               minHeight: '80vh',
            }}
         >
            <Typography
               variant="h4"
               component="h4"
               sx={{ textAlign: 'center' }}
            >
               Liked
            </Typography>
            {renderLiked(userAuth ? userLiked : dontAuthLiked)}
         </Box>
      </Container>
   );
};

export default Liked;