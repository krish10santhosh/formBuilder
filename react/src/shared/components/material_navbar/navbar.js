import React from 'react';
import { useDispatch } from "react-redux";
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Avatar, IconButton, ListItemButton, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { Collapse } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { hasChildren } from '../../utils/listUtil';
import MenuIcon from '@mui/icons-material/Menu';
import SpeedIcon from '@mui/icons-material/Speed';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import { FormBuilder } from '../../constants/constants';

const drawerWidth = 300;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const openedMixin = (theme) => ({
    width: drawerWidth,
    background: 'rgb(240, 242, 245) !important',
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    border: 'none !important',
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const NavBarComponent = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [open, setOpen] = React.useState(true);
    const logo = require('../../../assets/images/icon.png');
    // const componentData = useSelector((state) => state.homereducer.feeddata.drawerData);
    // const components = {

    // };
    // const SpecificStory = components[componentData?.value];
    // const handleClick = () => {

    // }

    const itemsList = [
        {
            text: "Dashboard",
            onClick: () => navigate('/dashboard'),
            icon: <SpeedIcon />
        },
        {
            text: "Form Builder",
            onClick: () => navigate('/forms'),
            icon: <BrandingWatermarkIcon />
        },
    ];

    const MenuItem = ({ item }) => {
        const Component = hasChildren(item) ? MultiLevel : SingleLevel;
        return <Component item={item} handleClick={item.onClick} />;
    };

    const SingleLevel = ({ item, handleClick }) => {

        return (
            <ListItem button key={item.text} onClick={handleClick} sx={{
                padding: 0
            }}>
                <ListItemButton
                    sx={{
                        minHeight: 28,
                        justifyContent: open ? 'initial' : 'left',
                    }}
                >
                    {item.icon &&
                        <ListItemIcon className={item.iconText}
                            sx={{
                                minWidth: 0,
                                mr: open ? 2 : 'auto',
                                justifyContent: 'left',
                                color: "rgb(231, 44, 72)"
                            }}>
                            {item.icon}
                        </ListItemIcon>
                    }
                    <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0, margin: 0 }} />
                </ListItemButton>
            </ListItem>
        );
    };

    const MultiLevel = ({ item }) => {
        const { items: children } = item;
        const [open, setOpen] = React.useState(false);
        const handleClick = (event) => {
            event.stopPropagation();
            setOpen((prev) => !prev);
        };

        return (
            <>
                <ListItem button key={item.text} onClick={(event) => { handleClick(event) }}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'left',
                            px: 0.5,
                        }}
                    >
                        <ListItemText primary={item.text} />
                        {open ? <ExpandLessIcon className="verticalIcon" /> : <ExpandMoreIcon className="verticalIcon" />}
                    </ListItemButton>
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {children.map((child, key, index) => (
                            <MenuItem key={index} item={child} />
                        ))}
                    </List>
                </Collapse>
            </>
        );
    }

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    return (
        <Drawer variant="permanent"
            open={open}>
            <DrawerHeader sx={{
                background: '#fff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgb(240, 242, 245)!important'
            }}>
                {open ?
                    <NavLink
                        to="/dashboard"
                        style={{
                            textDecoration: 'none',
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Avatar src={logo} sx={{ width: 40, height: 40, margin: "0 5px" }} />
                        <Typography variant="h6" noWrap component="div"
                            style={{
                                fontWeight: 'bold',
                                fontSize: '25px',
                                color: "#ed1b24"
                            }}>
                            {FormBuilder}
                        </Typography>
                    </NavLink> : null
                }
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                    edge="start"
                >
                    <MenuIcon />
                </IconButton>
            </DrawerHeader>
            <Divider />
            {/* {SpecificStory != undefined ?
                    <SpecificStory /> :
                    <>{itemsList.map((item, index) => (<MenuItem item={item} key={index} />))}</>
                } */}
            <>{itemsList.map((item, index) => (<MenuItem item={item} key={index} />))}</>
        </Drawer>
    );
}

export default NavBarComponent;
