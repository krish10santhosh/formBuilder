import React, { useState } from 'react'
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Avatar, Box, InputBase, Popover } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const HeaderComponent = ({
    showAdd = true,
    openDrawer = true,
    setOpenDrawer
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [notificationEl, setNotificationEl] = useState(null);
    const openNotificationEl = Boolean(notificationEl);
    const notification_Id = openNotificationEl ? 'notification-popover' : undefined;

    const handleClickNotifications = (event) => {
        setNotificationEl(event.currentTarget);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMenuProfileOpen = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
        navigate('/profile');
    }

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleProfileMenuLogOut = (event) => {
        // navigate('/login');
    };

    const menuId = 'primary-search-account-menu';
    const mobileMenuId = 'primary-search-account-menu-mobile';

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuProfileOpen}>
                Profile</MenuItem>
            <MenuItem onClick={handleProfileMenuLogOut}>Log Out</MenuItem>
        </Menu>
    );

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                    aria-describedby={notification_Id} variant="contained" onClick={(e) => handleClickNotifications(e)}
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleMenuProfileOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuLogOut}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Log Out</p>
            </MenuItem>
        </Menu>
    );

    const onError = (e) => {
        // e.target.src = require('../../assets/images/avatar.jpg')
    }

    const handleClickAdd = () => {
        setOpenDrawer(true)
    }

    return (
        <>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {
                            showAdd ?
                                <IconButton size="large" aria-label="show 0 new mails" color="inherit" onClick={(e) => handleClickAdd(e)}>
                                    <AddCircleIcon sx={{
                                        color: "rgb(231, 44, 72)"
                                    }} />
                                </IconButton> : null
                        }
                        <IconButton size="large" aria-label="show 0 new mails" color="inherit">
                            <MailIcon sx={{
                                color: "rgb(231, 44, 72)"
                            }} />
                        </IconButton>
                        <IconButton onClick={(e) => handleClickNotifications(e)}
                            size="large"
                            aria-label={"0"}
                            color="inherit"
                        >
                            <NotificationsIcon sx={{
                                color: "rgb(231, 44, 72)"
                            }} />
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <Avatar src={null} sx={{ width: 40, height: 40, margin: "0 5px" }} imgProps={{
                                onError: onError,
                            }} />
                            {/* <Typography><>{tokenData ? tokenData.firstName : null} {tokenData ? tokenData.lastName : null}</></Typography> */}
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                    {renderMenu}
                    {renderMobileMenu}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default HeaderComponent;