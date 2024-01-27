import React from "react";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import * as icons from '@mui/icons-material'
import { Typography } from '@mui/material';


const DialogComponent = (props) => {
  const { onClose, open, data, title } = props;

  return (
    <div>
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>{title}</DialogTitle>
        <Divider />
        <List sx={{ pt: 0 }}>
          {data.map((value) => {
            const Icon = icons[value.icon]
            return (
              <ListItem button onClick={() => onClose(value.title)} key={value.title}>
                <ListItemAvatar>
                  <Icon />
                </ListItemAvatar>
                <ListItemText primary={value.title} secondary={
                  <Typography sx={{ display: 'inline' }}
                    variant="body2"
                    color="text.primary">
                    {value.tooltip}
                  </Typography>
                } />
              </ListItem>
            )
          })}
        </List>
      </Dialog>
    </div>
  )
}

export default React.memo(DialogComponent);