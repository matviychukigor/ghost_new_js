import React, {useState, useContext} from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import { NavLink } from 'react-router-dom';

import {FAQ_LINK, NEWS, MAIN_PAGE, LOGIN, REGISTRATION, SHOP_ROUTE, MY_PROXY, PAYMENTS } from '../utils/const';
import { Context } from '..';
import { observer } from 'mobx-react-lite';

const NavBar = observer(() => {

    const {user} = useContext(Context)

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

    const logout = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem("token")
        setAnchorElUser(null);
        setAnchorElNav(null);
    }

  return (
    <AppBar elevation={6} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavLink
            to={MAIN_PAGE}
            style={{ 
                color:"white", 
                textDecoration: "none", 
                fontSize: 30, 
                fontFamily: "sans-serif", 
                fontWeight: 700, 
                marginRight: 25, 
                display: { xs: 'none', md: 'flex' } }
            }
          >
            Ghost Proxy
          </NavLink>

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
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">News</Typography>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">FAQ</Typography>
                </MenuItem>              
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
                <NavLink style={{color: "white", textDecoration: "none", marginRight: 30, fontFamily: "sans-serif", fontWeight: 700}} to={NEWS}> News</NavLink>
                <NavLink style={{color: "white", textDecoration: "none", marginRight: 30, fontFamily: "sans-serif", fontWeight: 700}} to={FAQ_LINK}> FAQ</NavLink>
                {user.isAuth ? (<>
                    <NavLink style={{color: "white", textDecoration: "none", marginRight: 30, fontFamily: "sans-serif", fontWeight: 700}} to={SHOP_ROUTE}> Proxy Shop</NavLink>
                    <NavLink style={{color: "white", textDecoration: "none", marginRight: 30, fontFamily: "sans-serif", fontWeight: 700}} to={MY_PROXY}> My proxy</NavLink>
                    <NavLink style={{color: "white", textDecoration: "none", marginRight: 5, fontFamily: "sans-serif", fontWeight: 700}} to={PAYMENTS}> Payments</NavLink>
                </>) : ""}
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex" }}>
              {user.isAuth ? (
                  <>
                    <Typography sx={{display: "flex", fontWeight: 700, alignItems: "center", justifyContent: "center", mr: 1}} textAlign="center">{user.userName}:</Typography>
                    <Typography sx={{display: "flex", alignItems: "center", justifyContent: "center", mr: 2}} textAlign="center">{user.balance.toFixed(2)}$</Typography>
                  </>
                ): ""}
          
              {user.isAuth ? (
                  
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                </Tooltip> ) : (
                    <>
                      <NavLink style={{textDecoration: "none", color: "inherit"}} to={LOGIN}>
                        <Button sx={{mr:2}} color="inherit" variant="outlined" > Login</Button>
                      </NavLink>
                      <NavLink style={{textDecoration: "none", color: "inherit"}} to={REGISTRATION}>
                      <Button color="inherit" variant="outlined">Registration</Button>
                      </NavLink>
                    </>
                ) 
            }
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
            <MenuItem onClick={() => logout()}>
                <Typography textAlign="center">Logout</Typography>
            </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
});

export default NavBar;