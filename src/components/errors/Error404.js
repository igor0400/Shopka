import { Box, Typography } from '@mui/material';

import img404 from '../../images/img404.gif';

const Error404 = () => {
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
         <img src={img404} alt="404 image" />
         <Typography variant="h3" sx={{ fontWeight: 500 }}>
            Page not found
         </Typography>
      </Box>
   );
};

export default Error404;
