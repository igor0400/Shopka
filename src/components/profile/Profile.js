import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userLogout } from '../../firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import { Paper, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

//icons
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Profile = () => {
   const { user } = useSelector((state) => state.user);

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const getUserName = (name) => {
      if (name.length <= 12) {
         return `Hi, ${name}!`;
      } else {
         return `Hi, ${name.slice(0, 10)}...!`;
      }
   };

   return (
      <Container maxWidth="xl">
         <Paper
            elevation={3}
            sx={{
               maxWidth: { xs: 400, lg: 475 },
               margin: { xs: 0, md: '20px auto' },
               '& > *': {
                  flexGrow: 1,
                  flexBasis: '50%',
               },
               minHeight: '80vh',
            }}
         >
            <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>
               <Typography
                  variant="h4"
                  component="h4"
                  sx={{ textAlign: 'center', paddingBottom: '10px' }}
               >
                  {getUserName(user.displayName || user.email)}
               </Typography>
               <List>
                  <ListItem disablePadding>
                     <ListItemButton component={Link} to="/orders">
                        <ListItemIcon>
                           <LocalMallIcon />
                        </ListItemIcon>
                        <ListItemText primary="Orders" />
                     </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                     <ListItemButton component={Link} to="/cart">
                        <ListItemIcon>
                           <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cart" />
                     </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                     <ListItemButton component={Link} to="/liked">
                        <ListItemIcon>
                           <FavoriteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Liked" />
                     </ListItemButton>
                  </ListItem>
                  <Divider />
                  <ListItem disablePadding>
                     <ListItemButton
                        onClick={() => userLogout(dispatch, navigate)}
                     >
                        <ListItemIcon>
                           <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sign out" />
                     </ListItemButton>
                  </ListItem>
               </List>
            </Box>
         </Paper>
      </Container>
   );
};

export default Profile;
