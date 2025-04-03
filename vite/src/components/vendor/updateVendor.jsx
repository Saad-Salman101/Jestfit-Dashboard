import React from 'react';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateVendor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    companyName: Yup.string().required('Company Name is required'),
    companyPhoneNumber: Yup.string().required('Company Phone Number is required'),
    status: Yup.string().required('Status is required'),
    slogan: Yup.string().required('Slogan is required'),
    customMonthlyCharges:Yup.number(),
  });

  const initialValues = {
    firstName: data.firstName || '',
    lastName: data?.lastName || '',
    email: data?.email || '',
    phoneNumber: data.phoneNumber || '',
    companyName: data?.vendorID?.companyName || '',
    companyPhoneNumber: data?.vendorID?.companyPhoneNumber || '',
    status: data?.vendorID?.status || '',
    slogan: data?.vendorID?.slogan || '',
    customerMonthlyCharges:data?.customerMonthlyCharges || '',
  };

  const handleSubmit = async (values) => {
    try {
      const updatedData = {
        ...values,
      };
      const response = await axios.put(`/user/${data.id}`, updatedData);
      if (response.status === 200) {
        toast.success('Successfully Updated Vendor Details');
        navigate('/vendor');
      }
    } catch (error) {
      toast.error('Failed to update Order');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
        <Form
          onSubmit={handleSubmit}
          style={{ width: '100%', maxWidth: 600, margin: 'auto', padding: 16 }}
        >
          <Typography variant="h6" gutterBottom>
            Update Vendor Information
          </Typography>

          {/* Dynamically generate TextFields based on validation schema */}
          {Object.keys(initialValues).map((field) => {
            if (field === 'status') return null; // Skip 'status' field here as it will be handled separately

            return (
              <TextField
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                value={values[field]}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                margin="normal"
                error={touched[field] && !!errors[field]}
                helperText={touched[field] && errors[field]}
              />
            );
          })}

          {/* Dropdown for 'status' field */}
          <FormControl fullWidth margin="normal" error={touched.status && !!errors.status}>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={values.status}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Status"
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="suspended">Suspended</MenuItem>
            </Select>
            {touched.status && errors.status ? (
              <FormHelperText>{errors.status}</FormHelperText>
            ) : null}
          </FormControl>

          <Button type="submit" variant="contained" color="secondary" sx={{ mt: 2 }}>
            Update Vendor
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateVendor;
