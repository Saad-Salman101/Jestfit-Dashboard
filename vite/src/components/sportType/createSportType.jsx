import React from 'react';
import { Formik, Form,} from 'formik';
import * as Yup from 'yup';
// import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {  InputLabel, FormControl, OutlinedInput, FormHelperText,  } from '@mui/material';
import { useTheme } from '@emotion/react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
});

// Initial values



const CreateSportType = () => {
 
  const navigate=useNavigate()

  const initialValues = {
    name: "",
    description:"",
  };



  const theme = useTheme();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        console.log(values, "<==== values ");
        try {
          const response = await axios.post("/sportType", values,);
          console.log(response, "<==== response");
          toast.success("Successfully Created!");
          navigate("/sportType")
        } catch (e) {
          console.error(e.response.data.message, "<==== error");
          if(e?.response?.data?.message){
            toast.error(e?.response?.data?.message);
          }
          toast.error("Submission failed!");
        }
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting,touched,errors, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={2}>
            <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-name-register">Sport's Name </InputLabel>
              <OutlinedInput
                id="outlined-adornment-name-register"
                value={values.name}
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.name && errors.name && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.name}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.description && errors.description)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-address-register">Sport's Description </InputLabel>
              <OutlinedInput
                id="outlined-adornment-address-register"
                value={values.description}
                name="description"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.description && errors.description && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.description}
                </FormHelperText>
              )}
            </FormControl>
              <Grid item xs={12}>
                <Button type="submit" size="large" variant="contained"  color="secondary">
                  Create Sports Type
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default CreateSportType;
