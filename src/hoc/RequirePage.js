import { Box, CircularProgress, Typography } from '@mui/material';

const RequirePage = ({
   loading,
   error,
   message = 'Loading error :(',
   children,
}) => {
   if (loading) {
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

   if (error) {
      return (
         <Box
            sx={{
               height: '80vh',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               flexDirection: 'column',
            }}
         >
            <Typography variant="h2" sx={{ fontWeight: 500 }}>
               {message}
            </Typography>
         </Box>
      );
   }

   return children;
};

export default RequirePage;
