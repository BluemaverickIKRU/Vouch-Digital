import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import Container from '@mui/material/Container';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';
import { useCookies } from 'react-cookie';

import './ClientAddingForm.css';
import { setTableData } from '../../store/userSlice';

const ClientAddForm = () => {
  // Cookies
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  // State for alert
  const [isAlert, setIsAlert] = useState({});

  const dispatch = useDispatch();

  // Yup schema for inputs
  const validateTask = Yup.object().shape({
    companyName: Yup.string().required('Company Name is required'),
    companyMail: Yup.string()
      .email('Email should be a valid one!')
      .required('Company Mail is required'),
    phoneNumber: Yup.string()
      .min(10, 'Invalid phone number!')
      .max(10, 'Invalid phone number!')
      .required('Phone Number is required'),
    contactPerson: Yup.string().required('Contact Person is required'),
  });

  // Formil for validation
  const validateFormik = useFormik({
    initialValues: {
      companyName: '',
      companyMail: '',
      phoneNumber: '',
      contactPerson: '',
    },
    validationSchema: validateTask,
    onSubmit: (values, { resetForm }) => {
      handleSubmitForm(values);
      resetForm({ values: '' });
    },
  });

  // Sending the sign in data to the backend for validation and authentication
  const handleSubmitForm = async (values) => {
    dispatch(setTableData(values));
    const value = { ...values, token: cookies.token };
    const addClientReq = await fetch('http://localhost:3001/api/addClient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    });
    const addClientRes = await addClientReq.json();
    addClientRes.statusCode === 401
      ? setIsAlert(() => {
          return { message: addClientRes.message, type: 'error', alert: true };
        })
      : setIsAlert(() => {
          return {
            message: addClientRes.message,
            type: 'success',
            alert: true,
          };
        });

    handleAlert();
  };

  // Alert Function
  const handleAlert = () => {
    setTimeout(() => {
      setIsAlert(() => {
        return { alert: false };
      });
    }, 3000);
  };

  return (
    <Container component={'main'} onSubmit={validateFormik.handleSubmit}>
      <div className="client-form-container">
        <div style={{ marginLeft: '0', marginTop: '1.2em' }} className="title">
          <h1>Add Client</h1>
          <p>Client master / Add Client</p>
        </div>
        {isAlert.alert ? (
          <Alert
            style={{
              position: 'absolute',
              width: '70vw',
              top: '7em',
              marginLeft: 'auto',
              marginRight: 'auto',
              left: '0',
              right: '0',
              textAlign: 'center',
            }}
            variant="filled"
            severity={isAlert.type}
          >
            {isAlert.message}
          </Alert>
        ) : null}
        <Box component={'form'}>
          <div className="add-client-form">
            <div>
              <div className="input">
                <TextField
                  fullWidth
                  id="companyName"
                  label="Company Name"
                  variant="outlined"
                  name="companyName"
                  value={validateFormik.values.companyName}
                  onChange={validateFormik.handleChange}
                  error={
                    validateFormik.touched.companyName &&
                    Boolean(validateFormik.errors.companyName)
                  }
                  helperText={
                    validateFormik.touched.companyName &&
                    validateFormik.errors.companyName
                  }
                />
              </div>
              <div className="input">
                <TextField
                  fullWidth
                  id="companyMail"
                  label="Company Mail"
                  variant="outlined"
                  name="companyMail"
                  value={validateFormik.values.companyMail}
                  onChange={validateFormik.handleChange}
                  error={
                    validateFormik.touched.companyMail &&
                    Boolean(validateFormik.errors.companyMail)
                  }
                  helperText={
                    validateFormik.touched.companyMail &&
                    validateFormik.errors.companyMail
                  }
                />
              </div>
            </div>
            <div>
              <div className="input">
                <TextField
                  fullWidth
                  type={'number'}
                  id="phone"
                  label="Phone Number"
                  variant="outlined"
                  name="phoneNumber"
                  value={validateFormik.values.phoneNumber}
                  onChange={validateFormik.handleChange}
                  error={
                    validateFormik.touched.phoneNumber &&
                    Boolean(validateFormik.errors.phoneNumber)
                  }
                  helperText={
                    validateFormik.touched.phoneNumber &&
                    validateFormik.errors.phoneNumber
                  }
                />
              </div>
              <div className="input">
                <TextField
                  fullWidth
                  id="contactPerson"
                  label="Contact Person"
                  variant="outlined"
                  name="contactPerson"
                  value={validateFormik.values.contactPerson}
                  onChange={validateFormik.handleChange}
                  error={
                    validateFormik.touched.contactPerson &&
                    Boolean(validateFormik.errors.contactPerson)
                  }
                  helperText={
                    validateFormik.touched.contactPerson &&
                    validateFormik.errors.contactPerson
                  }
                />
              </div>
            </div>
          </div>
          <div className="btn">
            <Button
              type="submit"
              style={{ backgroundColor: 'blue' }}
              variant="contained"
            >
              Submit
            </Button>
          </div>
        </Box>
      </div>
    </Container>
  );
};

export default ClientAddForm;
