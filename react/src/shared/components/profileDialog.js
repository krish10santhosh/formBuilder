import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from "@mui/material/Avatar";
import TextBoxComponent from './textbox';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaUserEdit } from 'react-icons/fa';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { HiInformationCircle } from 'react-icons/hi';
import CakeIcon from '@mui/icons-material/Cake';
import InputComponent from './forminput';
import RadioButtonComponent from './radio';
import DatePickerComponent from './datepicker';
import PhoneInput from 'react-phone-input-2'
import { SnapterestProfile, UserDetails, Update, Cancel, AddBio, genderData } from '../constants/constants';
import CloseIcon from '@mui/icons-material/Close';
import 'react-phone-input-2/lib/style.css'
import '../css/profileDialog.css';

const ProfileDialog = ({ open, handleClose, handleProfileClick, handleChangeOpenBio, handleSubmit,
    handleChangeDialogText, profiledata, profileimgSrc, descriptionElementRef, onError, scroll, openBio, values,
    handleFirstNameInputChange, handleLastNameInputChange, handleGenderInputChange, handleUserNameInputChange,
    handlePrimaryEmailIDInputChange, handleSecondaryEmailIDInputChange,
    handleDOBInputChange, handlePhoneInputChange }) => {

    return (
        <>
            {profiledata &&
                <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}
                >
                    <DialogTitle className="scroll-dialog-title">{SnapterestProfile}
                    <IconButton aria-label="settings" className='closeIcon' onClick={handleClose}>
                        <CloseIcon />
                    </IconButton></DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                        <DialogContentText
                            id="scroll-dialog-description"
                            ref={descriptionElementRef}
                            tabIndex={-1}
                        >
                            <Card variant="outlined">
                                <CardContent>
                                    <div className='centeredProfileDiv'>
                                        {profileimgSrc != null && profileimgSrc?.formData !== undefined ? <Avatar
                                            src={URL.createObjectURL(profileimgSrc?.formData?.full)}
                                            imgProps={{
                                                onError: onError,
                                            }}
                                            onClick={handleProfileClick}
                                            sx={{ width: 165, height: 165, cursor: 'pointer' }}
                                        /> :
                                            <Avatar
                                                src={values?.profilepicture}
                                                imgProps={{
                                                    onError: onError,
                                                }}
                                                onClick={handleProfileClick}
                                                sx={{ width: 165, height: 165, border: '1px solid rgba(0, 0, 0, 0.12)', cursor: 'pointer' }}
                                            />
                                        }
                                    </div>
                                    {
                                        !openBio ?
                                            <div className='bioDiv'>
                                                <Typography
                                                    variant="h6"
                                                    gutterBottom
                                                    component="div"
                                                    onClick={handleChangeOpenBio}
                                                >
                                                    {AddBio}
                                                </Typography>
                                            </div> :
                                            <div className='bioDivText'>
                                                <TextBoxComponent placeholder={"Describe yourself"} handleChange={handleChangeDialogText} value={values.bio} />
                                            </div>
                                    }
                                    <Grid container item xs={12} md={12} className="Intro">
                                        <Grid container item xs={4} md={4}>
                                            <DriveFileRenameOutlineIcon className="IntroProfileIcon" />
                                            <Typography
                                                gutterBottom
                                                component="div"
                                            >
                                                {UserDetails.UserName}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8} md={8}>
                                            <InputComponent disabled={false} handleChange={handleUserNameInputChange} value={values?.userName} />
                                        </Grid>
                                    </Grid>

                                    <Grid container item xs={12} md={12} className="Intro">
                                        <Grid container item xs={4} md={4}>
                                            <HiInformationCircle className="IntroProfileIcon" />
                                            <Typography
                                                gutterBottom
                                                component="div"
                                            >
                                                {UserDetails.FirstName}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8} md={8}>
                                            {
                                                values?.firstName !== "" ?
                                                    <Typography
                                                        gutterBottom
                                                        component="div"
                                                    >
                                                        {values?.firstName}
                                                    </Typography> :
                                                    <InputComponent disabled={false} handleChange={handleFirstNameInputChange} value={values?.firstName} />
                                            }
                                        </Grid>
                                    </Grid>

                                    <Grid container item xs={12} md={12} className="Intro">
                                        <Grid container item xs={4} md={4}>
                                            <HiInformationCircle className="IntroProfileIcon" />
                                            <Typography
                                                gutterBottom
                                                component="div"
                                            >
                                                {UserDetails.LastName}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8} md={8}>
                                            {
                                                values?.lastName !== "" ?
                                                    <Typography
                                                        gutterBottom
                                                        component="div"
                                                    >
                                                        {values?.lastName}
                                                    </Typography> :
                                                    <InputComponent disabled={false} handleChange={handleLastNameInputChange} value={values?.lastName} />
                                            }
                                        </Grid>
                                    </Grid>

                                    <Grid container item xs={12} md={12} className="Intro">
                                        <Grid container item xs={4} md={4}>
                                            <MdOutlineMarkEmailRead className="IntroProfileIcon" />
                                            <Typography
                                                gutterBottom
                                                component="div"
                                            >
                                                {UserDetails.PrimaryEmailID}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8} md={8}>
                                            {
                                                values?.primaryemail ?
                                                    <Typography
                                                        gutterBottom
                                                        component="div"
                                                    >
                                                        {values?.primaryemail}
                                                    </Typography> :
                                                    <InputComponent disabled={true} handleChange={handlePrimaryEmailIDInputChange} value={values?.primaryemail} />
                                            }
                                        </Grid>
                                    </Grid>

                                    <Grid container item xs={12} md={12} className="Intro">
                                        <Grid container item xs={4} md={4}>
                                            <MdOutlineMarkEmailUnread className="IntroProfileIcon" />
                                            <Typography
                                                gutterBottom
                                                component="div"
                                            >
                                                {UserDetails.SecondaryEmailID}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8} md={8}>
                                            {
                                                values?.secondaryemailemail ?
                                                    <Typography
                                                        gutterBottom
                                                        component="div"
                                                    >
                                                        {values?.secondaryemailemail}
                                                    </Typography> :
                                                    <InputComponent disabled={false} handleChange={handleSecondaryEmailIDInputChange} value={values?.secondaryemail} />
                                            }
                                        </Grid>
                                    </Grid>

                                    <Grid container item xs={12} md={12} className="Intro">
                                        <Grid container item xs={4} md={4}>
                                            <BsFillTelephoneFill className="IntroProfileIcon" />
                                            <Typography
                                                gutterBottom
                                                component="div"
                                            >
                                                {UserDetails.PhoneNumber}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={8} md={8}>
                                            <PhoneInput
                                                country={'in'}
                                                countryCodeEditable={false}
                                                value={values?.phone?.number}
                                                onChange={(value, country) => handlePhoneInputChange(value, country)}
                                                specialLabel={""}
                                                enableSearch={true}
                                                isValid={(value, country) => {
                                                    if (value.length === 0) {
                                                        return false;
                                                    } else {
                                                        return true;
                                                    }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container item xs={12} md={12} className="Intro">
                                        <Grid container item xs={4} md={4}>
                                            <CakeIcon className="IntroProfileIcon" />
                                            <Typography
                                                gutterBottom
                                                component="div"
                                            >
                                                {UserDetails.DOB}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8} md={8}>
                                            <DatePickerComponent placeholder={""} value={values.dateOfBirth} handleChange={handleDOBInputChange} />
                                        </Grid>
                                    </Grid>

                                    <Grid container item xs={12} md={12} className="Intro">
                                        <Grid container item xs={4} md={4}>
                                            <FaUserEdit className="IntroProfileIcon" />
                                            <Typography
                                                gutterBottom
                                                component="div"
                                            >
                                                {UserDetails.Gender}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8} md={8}>
                                            <RadioButtonComponent handleChange={handleGenderInputChange} value={values?.gender} data={genderData} />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSubmit}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                                className='buttonDiv'
                            >
                                {Update}
                            </Typography>
                        </Button>
                        <Button onClick={handleClose}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                                className='buttonDiv'
                            >
                                {Cancel}
                            </Typography>
                        </Button>
                    </DialogActions>
                </Dialog>}
        </>
    )
}

export default React.memo(ProfileDialog);