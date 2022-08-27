import { Box, CircularProgress } from '@mui/material';

const RequirePage = ({ loading, error, children }) => {

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
      return <h4>Error</h4>;
   }

   return children;
};

export default RequirePage;
