import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import { Box, Paper, Typography } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlide = ({ open, handleClose, data, title, content, handleClickForms }) => {
  return (
    <>
      {data &&
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          className='AlertDialogSlide'
        >
          <Card>
            <DialogTitle sx={{
              padding: '15px 15px'
            }}>{title}</DialogTitle>
            <CloseIcon style={{
              position: 'absolute',
              float: 'right',
              right: '20px',
              top: '20px',
              padding: '2px',
              color: 'gray',
              cursor: 'pointer'
            }} onClick={handleClose} />
            <DialogContent sx={{
              padding: '0px 15px 15px 15px'
            }}>
              <DialogContentText id="alert-dialog-slide-description">
                {content}
              </DialogContentText>
              <Box
                    sx={{
                        display: 'flex',
                        textAlign: 'center',
                        '& > :not(style)': {
                            padding: '15px',
                            width: '160px',
                            margin: '15px',
                            cursor: 'pointer'
                        },
                    }}
                >
              {
                data?.map((data) => (
                  <Paper variant="outlined" square onClick={() => handleClickForms(data.tabTitle)}>
                    <Typography variant="subtitle1" style={{ fontWeight: '600' }}>{data.tabTitle}</Typography>
                  </Paper>
                ))
              }
              </Box>
            </DialogContent>
          </Card>
        </Dialog>
      }
    </>
  );
}

export default AlertDialogSlide;
