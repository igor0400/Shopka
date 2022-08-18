import { useState } from 'react';

import { useSelector } from 'react-redux';

// icons
import MenuIcon from '@mui/icons-material/Menu';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

// components
import { Link } from 'react-router-dom';

/* mui components*/
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const StyledBadge = styled(Badge)(() => ({
   '& .MuiBadge-badge': {
      right: -2,
      top: 5,
      border: `2px solid #1976d2`,
      padding: '0 4px',
      background: 'red',
   },
}));

const Header = () => {
   const { user, userAuth } = useSelector((state) => state.user);

   return (
      <AppBar component="nav">
         <Container maxWidth="xl">
            <Toolbar disableGutters>
               <StorefrontIcon
                  sx={{ display: { xs: 'none', md: 'flex' }, mr: 0.3 }}
               />
               <Typography
                  variant="h6"
                  noWrap
                  component={Link}
                  to="/"
                  sx={{
                     mr: 2,
                     display: { xs: 'none', md: 'flex' },
                     fontFamily: 'monospace',
                     fontWeight: 700,
                     letterSpacing: '.1rem',
                     color: 'inherit',
                     textDecoration: 'none',
                     flexGrow: 1,
                  }}
               >
                  shopka
               </Typography>

               <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                     size="large"
                     aria-label="account of current user"
                     aria-controls="menu-appbar"
                     aria-haspopup="true"
                     color="inherit"
                  >
                     <MenuIcon />
                  </IconButton>
               </Box>

               <StorefrontIcon
                  sx={{ display: { xs: 'flex', md: 'none' }, mr: 0.3 }}
               />
               <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href=""
                  sx={{
                     mr: 2,
                     display: { xs: 'flex', md: 'none' },
                     flexGrow: 1,
                     fontFamily: 'monospace',
                     fontWeight: 700,
                     letterSpacing: '.1rem',
                     color: 'inherit',
                     textDecoration: 'none',
                  }}
               >
                  shopka
               </Typography>

               <Box
                  sx={{
                     alignItems: 'center',
                     display: { xs: 'none', md: 'flex' },
                     border: '2px solid #bdbdbd',
                     padding: '0 10px',
                     borderRadius: '50px',
                  }}
               >
                  <SearchIcon fontSize="small" />
                  <InputBase
                     sx={{ ml: 1, flex: 1, color: '#fff' }}
                     placeholder="Search..."
                     inputProps={{ 'aria-label': 'search...' }}
                  />
                  <ClearIcon fontSize="small" />
               </Box>

               <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Link to="cart">
                     <IconButton
                        aria-label="cart"
                        sx={{ margin: '0 15px 0 10px' }}
                     >
                        <StyledBadge badgeContent={1} color="secondary">
                           <ShoppingCartIcon sx={{ color: '#fff' }} />
                        </StyledBadge>
                     </IconButton>
                  </Link>
               </Box>

               {userAuth ? (
                  <Tooltip title="Open profile">
                     <IconButton component={Link} to="profile" sx={{ p: 0 }}>
                        <Avatar
                           alt={user.displayName || user.email}
                           src={user.photoUrl}
                        />
                     </IconButton>
                  </Tooltip>
               ) : (
                  <Box>
                     <Link to="register" style={{ textDecoration: 'none' }}>
                        <Button
                           variant="contained"
                           sx={{ marginRight: '10px' }}
                        >
                           Sign up
                        </Button>
                     </Link>

                     <Link to="login" style={{ textDecoration: 'none' }}>
                        <Button variant="outlined" sx={{ color: '#fff' }}>
                           Sign in
                        </Button>
                     </Link>
                  </Box>
               )}
            </Toolbar>
         </Container>
      </AppBar>
   );
};
export default Header;
