import PropTypes from 'prop-types';

// material-ui
import { Box, Paper } from '@mui/material';

const AuthCard = ({ children }) => (
   <Paper
      elevation={3}
      sx={{
         maxWidth: { xs: 400, lg: 475 },
         margin: { xs: 2.5, md: 3 },
         '& > *': {
            flexGrow: 1,
            flexBasis: '50%',
         },
      }}
   >
      <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>{children}</Box>
   </Paper>
);

AuthCard.propTypes = {
   children: PropTypes.node,
};

export default AuthCard;
