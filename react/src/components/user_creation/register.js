import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AlertDialogComponent from "../../shared/components/alertdialog";
import InputComponent from "../../shared/components/input";
import PhoneInputComponent from "../../shared/components/phoneInput";
import LabelComponent from "../../shared/components/label";
import PasswordInputComponent from "../../shared/components/passwordInput";
import { getOTPValidationValidation, getRegisterData } from "../../slices/registerSlice";
import Card from '@mui/material/Card';
import OTPInput from "react-otp-input";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logo = require('../../assets/images/snapterest_logo.png');
  const [AlertDialogOpen, setAlertDialogOpen] = useState(false);
  const [text, setText] = useState("");
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmpassword: ''
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmpassword: ''
  });
  const [enterOTP, setEnterOTP] = useState(false);
  const [otp, setOtp] = useState('');

  const handleFirstNameInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      firstName: event.target.value,
    }));
  };

  const handleLastNameInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      lastName: event.target.value,
    }));
  };

  const handleEmailIDInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      email: event.target.value,
    }));
  };

  const handlePasswordInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      password: event.target.value,
    }));
  };

  const handleConfirmPasswordInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      confirmpassword: event.target.value,
    }));
  };

  const validateFirstName = (values) => {
    let errors = {};
    if (!values.firstName) {
      errors.firstName = 'First Name is required';
    }
    if (values.firstName.length < 4) {
      errors.firstName = 'First Name must be 4 or more characters';
    }
    setErrors((values) => ({
      ...values,
      firstName: errors.firstName,
    }));
  };

  const validateLastName = (values) => {
    let errors = {};
    if (!values.lastName) {
      errors.lastName = 'Email address is required';
    }
    if (values.lastName.length < 3) {
      errors.lastName = 'Last Name must be 3 or more characters';
    }
    setErrors((values) => ({
      ...values,
      lastName: errors.lastName,
    }));
  };

  const handlePhoneNumberInputChange = (event) => {
    event.persist();
    const regex = /^[0-9\b]+$/;
    if (event.target.value === "" || regex.test(event.target.value)) {
      setValues((values) => ({
        ...values,
        phoneNumber: event.target.value,
      }));
    }
  };

  const validatePhoneNumber = (values) => {
    console.log(/^\d+$/.test(values.phoneNumber));
    let errors = {};
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
    }
    if (/^\d+$/.test(values.phoneNumber)) {
      if (values.phoneNumber.length < 10 || values.phoneNumber.length > 10) {
        errors.phoneNumber = 'Phone Number is Invalid';
      }
      else {

      }
    }
    setErrors((values) => ({
      ...values,
      phoneNumber: errors.phoneNumber,
    }));
  };


  const validateEmailID = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
    setErrors((values) => ({
      ...values,
      email: errors.email,
    }));
  };

  const validatePassword = (values) => {
    let errors = {};
    if (!values.password) {
      errors.password = 'Password is required';
    }
    if (values.password.length < 8) {
      errors.password = 'Password must be 8 or more characters';
    }
    if (values.password.length < 8 && (values.confirmpassword === values.password)) {
      errors.password = 'Password must be 8 or more characters';
    }
    if (values.confirmpassword && (values.confirmpassword !== values.password)) {
      errors.password = 'Password and Confirm Password does not match.';
    }
    setErrors((values) => ({
      ...values,
      password: errors.password,
    }));
  };

  const validateConfirmPassword = (values) => {
    let errors = {};
    if (!values.confirmpassword) {
      errors.confirmpassword = 'Confirm Password is required';
    }
    setErrors((values) => ({
      ...values,
      confirmpassword: errors.confirmpassword,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateFirstName(values);
    validateLastName(values);
    validatePhoneNumber(values);
    validateEmailID(values);
    validatePassword(values);
    validateConfirmPassword(values);
    if (errors.confirmpassword === undefined &&
      errors.email === undefined &&
      errors.firstName === undefined &&
      errors.lastName === undefined &&
      errors.password === undefined) {
      dispatch(getRegisterData(values)).then((data) => {
        if (data?.payload?.message == "OTP sent Successfully. Kindly enter the OTP") {
          setEnterOTP(true);
        }
      });
    }
  };

  const handleOTPSubmit = (event) => {
    event.preventDefault();
    dispatch(getOTPValidationValidation({
      phoneNumberOTP: otp
    })).then((data) => {
      if (data?.payload?.toastMessage === "User Registrated Successfully") {
        setText(data?.payload?.toastMessage);
        setAlertDialogOpen(true);
      }
    });
  };

  const handleAlertFeedClose = (value) => {
    setAlertDialogOpen(false);
    navigate("/login");
  }

  useEffect(() => {
    if (values.firstName !== '') {
      validateFirstName(values);
    }
    if (values.lastName !== '') {
      validateLastName(values);
    }
    if (values.phoneNumber !== '') {
      validatePhoneNumber(values);
    }
    if (values.email !== '') {
      validateEmailID(values);
    }
    if (values.password !== '') {
      validatePassword(values);
    }
    if (values.confirmpassword !== '') {
      validateConfirmPassword(values);
    }
  }, [values]);

  return (
    <Grid container sx={{
      justifyContent: 'center',
      margin: '90px 0px'
    }}>

      <Card sx={{
        width: "495px",
        padding: "16px 16px 0px 16px"
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: "center"
        }}>
          <img src={logo} alt={logo} style={{ width: "50px", margin: "0px 5px" }} />
          <Typography variant="h5" sx={{
            color: '#3b4a51ff',
            fontWeight: '600',
            padding: '0px'
          }}>Snapterest
          </Typography>
        </div>
        {
          enterOTP ?
            <Grid sx={{
              textAlign: 'left',
              margin: '40px 0px'
            }}>
              <Typography component="div" sx={{
                fontSize: '15px',
                margin: '10px 0',
              }}>
                Enter OTP sent to your mobile number
              </Typography>
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span style={{ margin: '0 5px' }}></span>}
                inputStyle={{
                  width: '40px',
                  textAlign: 'center',
                  height: '40px',
                  fontSize: '20px',
                }}
                renderInput={(props) => <input {...props} />}
              />
              <Button variant="contained" size="large" onClick={handleOTPSubmit} sx={{
                background: "#ffc003ff",
                color: '#3b4a51ff',
                margin: '10px 0',
              }}>Submit</Button>
            </Grid>
            :
            <>
              <Grid sx={{
                margin: '10px 0'
              }}>
                <InputComponent placeholder={"First Name"} value={values.firstName} handleChange={handleFirstNameInputChange} />
                {errors.firstName && <span className='login-error'>{errors.firstName}</span>}
              </Grid>
              <Grid sx={{
                margin: '10px 0'
              }}>
                <InputComponent placeholder={"Last Name"} value={values.lastName} handleChange={handleLastNameInputChange} />
                {errors.lastName && <span className='login-error'>{errors.lastName}</span>}
              </Grid>
              <Grid sx={{
                margin: '10px 0'
              }}>
                <PhoneInputComponent placeholder={"Phone Number"} value={values.phoneNumber} handleChange={handlePhoneNumberInputChange}
                  length={10} />
                {errors.phoneNumber && <span className='login-error'>{errors.phoneNumber}</span>}
              </Grid>
              <Grid sx={{
                margin: '10px 0'
              }}>
                <InputComponent placeholder={"Email ID"} value={values.email} handleChange={handleEmailIDInputChange} />
                {errors.email && <span className='login-error'>{errors.email}</span>}
              </Grid>
              <Grid sx={{
                margin: '10px 0'
              }}>
                <PasswordInputComponent placeholder={"Password"} value={values.password} handleChange={handlePasswordInputChange} />
                {errors.password && <span className='login-error'>{errors.password}</span>}
              </Grid>
              <Grid sx={{
                margin: '10px 0'
              }}>
                <PasswordInputComponent placeholder={"Confirm Password"} value={values.confirmpassword} handleChange={handleConfirmPasswordInputChange} />
                {errors.confirmpassword && <span className='login-error'>{errors.confirmpassword}</span>}
              </Grid>
              <Typography component="div" sx={{
                fontSize: '15px',
                margin: '10px 0'
              }}>
                To verify your number, we will send you a text message with a temporary code. Message and data rates may apply.
              </Typography>

              <Button variant="contained" size="large" onClick={handleSubmit} sx={{
                background: "#ffc003ff",
                color: '#3b4a51ff'
              }}>Register</Button>
              <h4 style={{
                color: 'lightslategray',
                fontWeight: '500',
                borderBottom: '1px solid lightslategray',
                lineHeight: '0.1em',
                margin: '20px 0 20px'
              }}><span style={{ background: '#fff' }}>Snapterest</span>
              </h4>
              <Grid sx={{
                margin: '10px 0'
              }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Link
                  to={{
                    pathname: "/login",
                    state: { fromDashboard: true }
                  }}
                ><LabelComponent value={"Already registered? Log In"} /></Link>
              </Grid>
            </>
        }

      </Card>

      <AlertDialogComponent
        open={AlertDialogOpen}
        onClose={handleAlertFeedClose}
        text={text}
        title={"Register"} />
    </Grid>

  );
};

export default Register;
