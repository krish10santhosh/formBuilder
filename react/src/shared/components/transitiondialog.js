import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useSelector } from 'react-redux';
import SearchComponent from '../../components/searchComponent';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlide = ({ open, handleClose, eventData }) => {
  return (
    <>
      {eventData &&
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
            }}>Event Intrested Persons</DialogTitle>
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
                These are the Persons Who are Intrested in the Event
                {
                  eventData?.map((data) => (
                    <CardHeader sx={{
                      padding: '15px 10px 0px 0'
                    }}
                      avatar={
                        <Avatar src={data.owner.profilepicture} sx={{
                          width: 40, height: 40, margin: '0px',
                          padding: '0px'
                        }} />
                      }
                      title={<>{data.owner.firstName} {data.owner.lastName}</>}
                    />
                  ))
                }
              </DialogContentText>
            </DialogContent>
          </Card>
        </Dialog>
      }
    </>
  );
}

export default AlertDialogSlide;
