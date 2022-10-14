import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import HttpsIcon from '@mui/icons-material/Https';
import Button from '@mui/material/Button';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

import './Form.css';
import { handleAlert } from '../../utility';
import { updateUser, logOnOff } from '../../store/userSlice';

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Cookies
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  // State to check if password to be visible or not
  const [isVisible, setIsVisible] = useState(false);
  // For the loader animation
  const [isSigned, setIsSigned] = useState(false);
  // For alert box
  const [isAlert, setIsAlert] = useState({});

  // To show password while clicking the eye icon in the text field
  const handleClickShowPassword = () => {
    setIsVisible(!isVisible);
  };

  // Yup schema for inputs
  const validateTask = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  // Formil for validation
  const validateFormik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validateTask,
    onSubmit: (values) => {
      handleSubmitForm(values);
    },
  });

  // Sending the sign in data to the backend for validation and authentication
  const handleSubmitForm = async (values) => {
    setIsSigned(true);
    const signInReq = await fetch('http://localhost:3001/api/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    const signInRes = await signInReq.json();
    setCookie('token', signInRes.token);
    setIsSigned(false);
    if (signInRes.statusCode !== 200) {
      // If there is an issue
      setIsAlert((prev) => {
        return { message: signInRes.message, type: 'error', alert: true };
      });
    } else {
      // if the response if cleared, the data from the backend is stored in the store
      dispatch(
        updateUser({
          userName: signInRes.data.userName,
          userMail: signInRes.data.userMail,
        })
      );
      // Set logged in true in store
      dispatch(logOnOff(true));
      // Navigating to the dashboard route after successfull authentication
      navigate('/dashboard');
    }
  };

  return (
    <Container component={'main'} onSubmit={validateFormik.handleSubmit}>
      <div className="titleBox">
        <h2>Welcome</h2>
        <p>Enter your Username and Password</p>
      </div>
      <Box component={'form'} className="inputContainer">
        {/* Username input field */}
        <TextField
          margin="normal"
          id="username"
          name="username"
          style={{ width: '23em' }}
          label="Username"
          placeholder="Your username"
          variant="outlined"
          value={validateFormik.values.username}
          onChange={validateFormik.handleChange}
          error={
            validateFormik.touched.username &&
            Boolean(validateFormik.errors.username)
          }
          helperText={
            validateFormik.touched.username && validateFormik.errors.username
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        {/* Password input field */}
        <TextField
          margin="normal"
          id="password"
          name="password"
          style={{ width: '23em' }}
          type={isVisible ? 'text' : 'password'}
          label="Password"
          placeholder="Your password"
          variant="outlined"
          value={validateFormik.values.password}
          onChange={validateFormik.handleChange}
          error={
            validateFormik.touched.password &&
            Boolean(validateFormik.errors.password)
          }
          helperText={
            validateFormik.touched.password && validateFormik.errors.password
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <HttpsIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => handleClickShowPassword()}>
                  {isVisible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {/* If any alert to be notified */}
        {isAlert.alert
          ? handleAlert(isAlert.message, isAlert.type, setIsAlert)
          : null}
        <Button
          type="submit"
          style={
            isSigned
              ? {
                  width: '26em',
                  marginTop: '0.5em',
                  border: '2px solid black',
                  backgroundColor: 'white',
                }
              : {
                  width: '26em',
                  background: 'linear-gradient(to right, #5691c8, #457fca)',
                  marginTop: '0.5em',
                }
          }
          variant="contained"
        >
          {/* Loader animation */}
          {isSigned ? <CircularProgress size={20} /> : 'Submit'}
        </Button>
      </Box>
      {/* Footer */}
      <div className="footer1">
        <p>Terms of Use</p>
        <p>Privacy Policy</p>
      </div>
      <div className="footer2">
        <p>©️ Punctualiti 2022. All rights reserved</p>
      </div>
    </Container>
  );
};

export default Form;
