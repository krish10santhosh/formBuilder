import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import InputComponent from "../../shared/components/input";
import LabelComponent from "../../shared/components/label";
import PasswordInputComponent from "../../shared/components/passwordInput";
import TokenUtill from "../../shared/utils/tokenUtill";
import { getLoginData } from "../../slices/loginSlice";
import TokenService from "../../shared/utils/tokenUtillService";
import { TokenDetails } from "../../slices/dashbaordSlice";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import OtpInput from 'react-otp-input';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logo = require('../../assets/images/snapterest_logo.png');
  const loginData = useSelector((state) => state.loginreducer.logindata);
  const [values, setValues] = useState({
    emailid: '',
    password: '',
    ipAddress: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState({
    emailid: '',
    password: '',
    phoneNumber: ''
  });
  const [enterOTP, setEnterOTP] = useState(false);
  const [enterPassword, setEnterPassword] = useState(false);
  const [otp, setOtp] = useState('');

  const getData = async () => {
    const response = await fetch(process.env.REACT_APP_IP_ADDRESS_DEV)
    const data = await response.json()
    setValues((values) => ({
      ...values,
      ipAddress: data.ip,
    }));
  }

  const handlePhoneNumberInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      emailid: event.target.value,
    }));
  };

  const handleEmailIDInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      emailid: event.target.value,
    }));
  };

  const handlePasswordInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      password: event.target.value,
    }));
  };

  const validatePhoneNumber = (values) => {
    console.log(/^\d+$/.test(values.phoneNumber));
    let errors = {};
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Phone Number or Email address is required';
    }
    if (/^\d+$/.test(values.phoneNumber)) {
      if (values.phoneNumber.length < 10 || values.phoneNumber.length > 10) {
        errors.phoneNumber = 'Phone Number is Invalid';
      }
      else {

      }
    }
    else {
      if (!/\S+@\S+\.\S+/.test(values.phoneNumber)) {
        errors.phoneNumber = 'Email address is invalid';
      }
    }
    setErrors((values) => ({
      ...values,
      phoneNumber: errors.phoneNumber,
    }));
  };

  const validateEmailID = (values) => {
    let errors = {};
    if (!values.emailid) {
      errors.emailid = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.emailid)) {
      errors.emailid = 'Email address is invalid';
    }
    setErrors((values) => ({
      ...values,
      emailid: errors.emailid,
    }));
  };

  const validatePassword = (values) => {
    let errors = {};
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be 8 or more characters';
    }
    setErrors((values) => ({
      ...values,
      password: errors.password,
    }));
  };

  const handlePhoneNumberSubmit = (event) => {
    event.preventDefault();
    validatePhoneNumber(values);
    if (/^\d+$/.test(values.emailid)) {
      setEnterOTP(true);
    }
    else if (/\S+@\S+\.\S+/.test(values.emailid)) {
      setEnterPassword(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateEmailID(values);
    validatePassword(values);
    dispatch(getLoginData(values)).then((data) => {
      if (data?.payload?.toastMessage === "Login Successfull") {
        TokenUtill.getUserName(values.emailid);
        TokenService.setUser(data.payload.data);
        dispatch(TokenDetails(data.payload.data));
        navigate('/dashboard');
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (values.emailid !== '') {
      validateEmailID(values);
    }
    if (values.password !== '') {
      validatePassword(values);
    }
  }, [values]);

  return (
    <>
      {
        loginData.isloading ? (<CircularProgress className="centered" />) : null
      }
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
            !enterPassword && !enterOTP ?
              <>
                <CardContent sx={{
                  padding: "16px 16px 0px 16px"
                }}>
                  <Grid sx={{
                    margin: '10px 0'
                  }}>
                    <InputComponent placeholder={"Enter Mobile Number or Email ID"} value={values.emailid} handleChange={handlePhoneNumberInputChange} />
                    {errors.emailid && <span className='login-error'>{errors.emailid}</span>}
                  </Grid>
                </CardContent>
                <CardActions sx={{
                  justifyContent: 'center'
                }}>
                  <Button variant="contained" size="large" onClick={handlePhoneNumberSubmit} sx={{
                    background: "#ffc003ff",
                    color: '#3b4a51ff'
                  }}>Continue</Button>
                </CardActions>
                <div>
                  <h4 style={{
                    color: 'lightslategray',
                    fontWeight: '500',
                    borderBottom: '1px solid lightslategray',
                    lineHeight: '0.1em',
                    margin: '10px 0 10px'
                  }}><span style={{ background: '#fff' }}>Snapterest</span>
                  </h4>
                  <Button variant="outlined" size="small"
                    onClick={() => navigate('/register')}
                    sx={{ color: '#3b4a51ff', borderColor: '#3b4a51ff', margin: '10px 0px', textTransform: 'none' }}>Create a Snapterest Account</Button>
                </div>
              </>
              : null
          }
          {
            enterOTP ?
              <>
                <CardContent sx={{
                  padding: "16px 16px 0px 16px"
                }}>
                  <Grid sx={{
                    margin: '10px 0'
                  }}>
                    <InputComponent placeholder={"Mobile Number"} value={values.phoneNumber} handleChange={handleEmailIDInputChange} disabled={true} />
                    {errors.phoneNumber && <span className='login-error'>{errors.phoneNumber}</span>}
                  </Grid>
                  <Typography component="div" sx={{
                    fontSize: '15px',
                    margin: '10px 0'
                  }}>
                    Enter OTP sent to your mobile number.
                  </Typography>
                  <Grid sx={{
                    margin: '10px 0'
                  }}>
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      renderSeparator={<span style={{ margin: '0 5px' }}></span>}
                      inputStyle={{
                        width: '40px',
                        textAlign: 'center',
                        height: '40px',
                        fontSize: '20px'
                      }}
                      renderInput={(props) => <input {...props} />}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Button onClick={() => setEnterOTP(false)} sx={{ textTransform: 'none' }}>back</Button>
                  </Grid>
                </CardContent>
                <CardActions sx={{
                  justifyContent: 'center'
                }}>
                  <Button variant="contained" size="large" onClick={handleSubmit} sx={{
                    background: "#ffc003ff",
                    color: '#3b4a51ff'
                  }}>Log In</Button>
                </CardActions>
              </>
              : null
          }
          {
            enterPassword ?
              <>
                <CardContent sx={{
                  padding: "16px 16px 0px 16px"
                }}>
                  <Grid sx={{
                    margin: '10px 0'
                  }}>
                    <InputComponent placeholder={"Email ID"} value={values.emailid} handleChange={handleEmailIDInputChange} disabled={true} />
                    {errors.emailid && <span className='login-error'>{errors.emailid}</span>}
                  </Grid>
                  <Grid sx={{
                    margin: '10px 0'
                  }}>
                    <PasswordInputComponent placeholder={"Password"} value={values.password} handleChange={handlePasswordInputChange} />
                    {errors.password && <span className='login-error'>{errors.password}</span>}
                  </Grid>
                  <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Button onClick={() => setEnterPassword(false)} sx={{ textTransform: 'none' }}>back</Button>
                    <Link
                      to={{
                        pathname: "/resetpassword",
                        state: { fromDashboard: true }
                      }}
                    ><LabelComponent value={"forget password?"} /></Link>
                  </Grid>
                </CardContent>
                <CardActions sx={{
                  justifyContent: 'center'
                }}>
                  <Button variant="contained" size="large" onClick={handleSubmit} sx={{
                    background: "#ffc003ff",
                    color: '#3b4a51ff'
                  }}>Log In</Button>
                </CardActions>
              </>
              : null
          }
        </Card>
      </Grid>
    </>
  );
};

export default Login;
