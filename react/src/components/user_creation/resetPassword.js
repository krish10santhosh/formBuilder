import { Button } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AlertDialogComponent from "../../shared/components/alertdialog";
import InputComponent from "../../shared/components/input";
import LabelComponent from "../../shared/components/label";
import PasswordInputComponent from "../../shared/components/passwordInput";
import { getResetPassword, getResetPasswordData } from "../../slices/resetPasswordSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation().search;
  const params = new URLSearchParams(location);
  const [AlertDialogOpen, setAlertDialogOpen] = useState(false);
  const [text, setText] = useState("");
  const [values, setValues] = useState({
    emailid: '',
    password: '',
    confirmpassword: ''
  });
  const [errors, setErrors] = useState({
    emailid: '',
    password: '',
    confirmpassword: ''
  });

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

  const handleConfirmPasswordInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      confirmpassword: event.target.value,
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
    validateEmailID(values);
    validatePassword(values);
    validateConfirmPassword(values);
    if (errors.email === undefined && errors.confirmpassword !== undefined &&
      errors.password !== undefined) {
      const data = {
        "email": values.emailid,
        "redirectUrl": window.location.href
      }
      dispatch(getResetPasswordData(data)).then((data) => {
        if (data.payload.message != null) {
          setText(data.payload.message);
          setAlertDialogOpen(true);
        }
      });
    }
    if (errors.confirmpassword === undefined &&
      errors.password === undefined && errors.email === undefined) {
      const data = {
        "newPassword": values.password,
        "resetString": params.get("resetString"),
        "userid": params.get("_id")
      }
      dispatch(getResetPassword(data)).then((data) => {
        if (data.payload.message) {
          setText(data.payload.message);
          setAlertDialogOpen(true);
        }
      });
    }
  };

  useEffect(() => {
    if (values.emailid !== '') {
      validateEmailID(values);
    }
    if (values.password !== '') {
      validatePassword(values);
    }
    if (values.confirmpassword !== '') {
      validateConfirmPassword(values);
    }
  }, [values]);

  const handleAlertFeedClose = (value) => {
    if (value === "Agree") {
      navigate('/login');
    }
    else {
      navigate('/resetpassword');
    }
    setText(null);
    setAlertDialogOpen(false);
  }

  const logo = require('../../assets/images/interact.png');

  return (
    <div className="App wrapper">
      <div className="outer">
        <div className="inner">
          <form style={{ textAlign: "center" }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0px 0px 15px 0'
            }}>
              <img src={logo} alt={logo} style={{ width: "50px" }} />
              <h3 style={{
                color: '#3f51b5',
                fontWeight: '600',
                padding: '0px'
              }}>Interact Reset Password</h3>
            </div>
            {location === "" &&
              <div className="form-group">
                <InputComponent placeholder={"Email ID"} value={values.emailid} handleChange={handleEmailIDInputChange} />
                {errors.emailid && <span className='login-error'>{errors.emailid}</span>}
              </div>
            }
            {location !== "" &&
              <>
                <div className="form-group">
                  <PasswordInputComponent placeholder={"Password"} value={values.password} handleChange={handlePasswordInputChange} />
                  {errors.password && <span className='login-error'>{errors.password}</span>}
                </div>
                <div className="form-group">
                  <PasswordInputComponent placeholder={"Confirm Password"} value={values.confirmpassword} handleChange={handleConfirmPasswordInputChange} />
                  {errors.confirmpassword && <span className='login-error'>{errors.confirmpassword}</span>}
                </div>
              </>
            }
            <div className="form-group" style={{
              display: 'flex',
              justifyContent: 'end',
              margin: '0px'
            }}>
              <Link
                to={{
                  pathname: "/login",
                  state: { fromDashboard: true }
                }}
              ><LabelComponent value={"back to login"}/></Link>
            </div>
            <Button variant="contained" size="large" onClick={handleSubmit}>Reset</Button>
          </form>
        </div>
      </div>
      <AlertDialogComponent
        open={AlertDialogOpen}
        onClose={handleAlertFeedClose}
        text={text}
        title={"Password Reset"} />
    </div>
  );
};

export default ResetPassword;
