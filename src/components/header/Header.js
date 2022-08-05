import { useState } from 'react';

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
import MenuItem from '@mui/material/MenuItem';
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
import Menu from '@mui/material/Menu';

const pages = ['Sell on shopka', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

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
   const [anchorElNav, setAnchorElNav] = useState(null);
   const [anchorElUser, setAnchorElUser] = useState(null);

   const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
   };
   const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };

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
                  component="a"
                  href="/"
                  sx={{
                     mr: 2,
                     display: { xs: 'none', md: 'flex' },
                     fontFamily: 'monospace',
                     fontWeight: 700,
                     letterSpacing: '.1rem',
                     color: 'inherit',
                     textDecoration: 'none',
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
                     onClick={handleOpenNavMenu}
                     color="inherit"
                  >
                     <MenuIcon />
                  </IconButton>
                  <Menu
                     id="menu-appbar"
                     anchorEl={anchorElNav}
                     anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                     }}
                     open={Boolean(anchorElNav)}
                     onClose={handleCloseNavMenu}
                     sx={{
                        display: { xs: 'block', md: 'none' },
                     }}
                  >
                     {pages.map((page) => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                           <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                     ))}
                  </Menu>
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
               <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {pages.map((page) => (
                     <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                     >
                        {page}
                     </Button>
                  ))}
               </Box>

               <Box
                  sx={{
                     alignItems: 'center',
                     display: { xs: 'none', md: 'flex' },
                     background: '#a3a3a3',
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
                  <ClearIcon fontSize="small" color="primary" />
               </Box>

               <Box
                  sx={{ flexGrow: 0.03, display: { xs: 'none', md: 'block' } }}
               >
                  <Link to="cart">
                     <IconButton aria-label="cart" sx={{ marginLeft: '5px' }}>
                        <StyledBadge badgeContent={1} color="secondary">
                           <ShoppingCartIcon sx={{ color: '#fff' }} />
                        </StyledBadge>
                     </IconButton>
                  </Link>
               </Box>
               <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                     <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                           alt="Remy Sharp"
                           src="/static/images/avatar/2.jpg"
                        />
                     </IconButton>
                  </Tooltip>
                  <Menu
                     sx={{ mt: '45px' }}
                     id="menu-appbar"
                     anchorEl={anchorElUser}
                     anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                     }}
                     open={Boolean(anchorElUser)}
                     onClose={handleCloseUserMenu}
                  >
                     {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                           <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                     ))}
                  </Menu>
               </Box>
            </Toolbar>
         </Container>
      </AppBar>
   );
};
export default Header;
