import React from "react";
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
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  paymentStatus: Yup.string().required("Payment Status is required"),
  bookingStatus: Yup.string().required("Booking Status is required"),
  //   firstName: Yup.string().required('First Name is required'),
  //   lastName: Yup.string().required('Last Name is required'),
  //   email: Yup.string().email('Invalid email').required('Email is required'),
  //   phoneNumber: Yup.string().required('Phone Number is required'),
});

const UpdateOrderForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};
  return (
    <Formik
      initialValues={{
        paymentStatus: data.paymentStatus,
        bookingStatus: data.bookingStatus,
        // firstName: data.customerID.firstName,
        // lastName: data.customerID.lastName,
        // email: data.customerID.email,
        // phoneNumber: data.customerID.phoneNumber,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const updatedOrder = {
          paymentStatus: values.paymentStatus,
          bookingStatus: values.bookingStatus,
        };
        const response = await axios.put("order/" + data.id, updatedOrder);
        if (response.status === 200) {
          toast.success("Successfully updated Order");
          navigate("/booking");
        }

        // const response = await axios.
        // onUpdate(updatedOrder);
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
        <Form
          onSubmit={handleSubmit}
          style={{ width: "100%", maxWidth: 600, margin: "auto", padding: 16 }}
        >
          <Typography variant="h6" gutterBottom>
            Update Order Information
          </Typography>

          <FormControl
            fullWidth
            margin="normal"
            error={touched.paymentStatus && !!errors.paymentStatus}
          >
            <InputLabel>Payment Status</InputLabel>
            <Select
              name="paymentStatus"
              value={values.paymentStatus}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Payment Status"
            >
              <MenuItem value="verifying">Verifying</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
            {touched.paymentStatus && errors.paymentStatus ? (
              <FormHelperText>{errors.paymentStatus}</FormHelperText>
            ) : null}
          </FormControl>

          <FormControl
            fullWidth
            margin="normal"
            error={touched.bookingStatus && !!errors.bookingStatus}
          >
            <InputLabel>Booking Status</InputLabel>
            <Select
              name="bookingStatus"
              value={values.bookingStatus}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Booking Status"
            >
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
              <MenuItem value="dispute">Dispute</MenuItem>
            </Select>
            {touched.bookingStatus && errors.bookingStatus ? (
              <FormHelperText>{errors.bookingStatus}</FormHelperText>
            ) : null}
          </FormControl>

          {/* <TextField
            label="First Name"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            margin="normal"
            error={touched.firstName && !!errors.firstName}
            helperText={touched.firstName && errors.firstName}
          /> */}
          {/* <TextField
            label="Last Name"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            margin="normal"
            error={touched.lastName && !!errors.lastName}
            helperText={touched.lastName && errors.lastName}
          /> */}
          {/* <TextField
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            margin="normal"
            error={touched.email && !!errors.email}
            helperText={touched.email && errors.email}
          /> */}
          {/* <TextField
            label="Phone Number"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            margin="normal"
            error={touched.phoneNumber && !!errors.phoneNumber}
            helperText={touched.phoneNumber && errors.phoneNumber}
          /> */}

          <Button type="submit" variant="contained" color="secondary" sx={{ mt: 2 }}>
            Update Order
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateOrderForm;
