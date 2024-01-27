import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Collapse } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { hasChildren } from '../utils/listUtil';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 100,
    padding: 5,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const DropdownListComponent = ({ listItem, handleClick, anchorEl, handleClose }) => {
  const openIcon = Boolean(anchorEl);

  const MenuItem = ({ item }) => {
    const Component = hasChildren(item) ? MultiLevel : SingleLevel;
    return <Component item={item} handleClick={handleClick} />;
  };

  const SingleLevel = ({ item, handleClick }) => {
    return (
      <ListItem button onClick={(event) => { handleClick(event, item.title); handleClose(); }}>
        {item.icon ? <ListItemIcon className='ListIcon'>{item.icon}</ListItemIcon>: null}
        <ListItemText primary={item.title} secondary={item.tooltip} />
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
        <ListItem button onClick={(event) => { handleClick(event)}}>
          {item.icon ? <ListItemIcon className='ListIcon'>{item.icon}</ListItemIcon>: null}
          <ListItemText primary={item.title} />
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
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

  return (
    <div>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={openIcon}
        onClose={handleClose}
      >
        {listItem.map((item, index) => (<MenuItem item={item} key={index} handleClick={handleClick} />))}

      </StyledMenu>
    </div>
  );
}

export default DropdownListComponent;