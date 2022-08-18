// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Button, Stack } from '@mui/material';

// icons
import Google from '../../../images/icons/google.svg';
import GitHubIcon from '@mui/icons-material/GitHub';
import Facebook from '../../../images/icons/facebook.svg';

// redux

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userAuthGoogle, userAuthGithub } from '../../../firebase/auth';

const FirebaseSocial = () => {
   const theme = useTheme();
   const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const googleHandler = async () => {
      await userAuthGoogle(dispatch, navigate);
   };

   const githubHandler = async () => {
      await userAuthGithub(dispatch, navigate);
   };

   const facebookHandler = async () => {
      // login || singup
   };

   return (
      <Stack
         direction="row"
         spacing={matchDownSM ? 1 : 2}
         justifyContent={matchDownSM ? 'space-around' : 'space-between'}
         sx={{
            '& .MuiButton-startIcon': {
               mr: matchDownSM ? 0 : 1,
               ml: matchDownSM ? 0 : -0.5,
            },
         }}
      >
         <Button
            variant="outlined"
            color="secondary"
            fullWidth={!matchDownSM}
            startIcon={<img src={Google} alt="Google" />}
            onClick={googleHandler}
         >
            {!matchDownSM && 'Google'}
         </Button>
         <Button
            variant="outlined"
            color="secondary"
            fullWidth={!matchDownSM}
            startIcon={<GitHubIcon sx={{ color: '#000' }} />}
            onClick={githubHandler}
         >
            {!matchDownSM && 'GitHub'}
         </Button>
         <Button
            variant="outlined"
            color="secondary"
            fullWidth={!matchDownSM}
            startIcon={<img src={Facebook} alt="Facebook" />}
            onClick={facebookHandler}
         >
            {!matchDownSM && 'Facebook'}
         </Button>
      </Stack>
   );
};

export default FirebaseSocial;
