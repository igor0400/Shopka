import PropTypes from 'prop-types';

// material-ui
import { Box, Grid } from '@mui/material';

// project import
import AuthCard from './AuthCard';

const AuthWrapper = ({ children }) => (
   <Box sx={{ minHeight: '90vh' }}>
      <Grid
         container
         direction="column"
         justifyContent="flex-end"
         sx={{
            minHeight: '90vh',
         }}
      >
         <Grid item xs={12}>
            <Grid
               item
               xs={12}
               container
               justifyContent="center"
               alignItems="center"
               sx={{
                  minHeight: {
                     xs: 'calc(100vh - 134px)',
                     md: 'calc(100vh - 112px)',
                  },
               }}
            >
               <Grid item>
                  <AuthCard>{children}</AuthCard>
               </Grid>
            </Grid>
         </Grid>
      </Grid>
   </Box>
);

AuthWrapper.propTypes = {
   children: PropTypes.node,
};

export default AuthWrapper;
