import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Drawer } from "@mui/material";

const DrawerComponent = (props) => {
  const { onClose, open, anchorValue, list } = props;


  return (
    <div>
      {open &&
      <Drawer
        anchor={anchorValue}
        open={open}
        onClose={onClose}
      >
        <CloseIcon style={{
          position: 'absolute',
          float: 'right',
          right: '20px',
          top: '20px',
          padding: '2px',
          color: 'gray',
          cursor: 'pointer'
        }} onClick={onClose} />
        {list}
      </Drawer>}
    </div>
  )
}

export default DrawerComponent;