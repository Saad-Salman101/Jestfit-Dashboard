import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
// import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import {
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { toast } from "react-toastify";
import DropzoneArea from "components/uploadImage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import areas from "data/data";
import { useSelector } from "react-redux";

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  addressLineOne: Yup.string().required("Address is required"),
  description: Yup.string().required("Description is required"),
  block: Yup.string().required("Block is required"),
  city: Yup.string().required("City is required"),
  // openingTime: Yup.string().required("Opening Time is required"),
  // closingTime: Yup.string().required("Closing Time is required"),
  locationUrl: Yup.string().required("Location URL is required"),
  // locationUrl: Yup.string().url('Invalid URL').required('Location URL is required'),
  vendorID: Yup.string().required("Vendor ID is required"),
  tags: Yup.array().of(Yup.string()).required("At least one tag is required"),
});

// Initial values

const tagOptions = ["cricket", "tennis", "swimming", "pool"];

const LocationCreation = () => {
  const user = useSelector((state) => state.user.userDetail);
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    addressLineOne: "",
    description: "",
    block: "",
    city: "",
    sportType: "",
    locationUrl: "",
    vendorID: user.role === "admin" ? "" : user.vendorID?.id,
    images: [],
    tags: [],
  };

  const fetchVendors = async () => {
    const res = await axios.get("/vendor", { params: { limit: 100 } });
    console.log(user.vendorID?.id);
    setVendors(res.data.result.results);
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const theme = useTheme();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        console.log("Wow");
        setSubmitting(true);
        console.log(values, "<==== values ");
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("addressLineOne", values.addressLineOne);
        formData.append("block", values.block);
        formData.append("city", values.city);
        formData.append("sportType", values.sportType);
        formData.append("openingTime", values.openingTime);
        formData.append("closingTime", values.closingTime);
        formData.append("locationUrl", values.locationUrl);
        formData.append("vendorID", values.vendorID);
        formData.append("description", values.description);

        console.log(values.images, "<=== images");
        if (values.images && values.images.length > 0) {
          for (let index = 0; index < values.images.length; index++) {
            formData.append(`images`, values.images[index]); // Ensure 'images' matches the field name in multer
          }
        }

        console.log(values.tags, "<=== tags");
        if (values.tags && values.tags.length > 0) {
          for (let index = 0; index < values.tags.length; index++) {
            formData.append(`tags`, values.tags[index]); // Ensure 'tags' matches the field name in multer
          }
        }

        try {
          const response = await axios.post("/location", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log(response, "<==== response");
          navigate("/location");
          toast.success("Submitted successfully!");
        } catch (e) {
          console.error(e, "<==== error");
          toast.error("Submission failed!");
        }

        setSubmitting(false);
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        touched,
        errors,
        setFieldValue,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={2}>
              <FormControl
                fullWidth
                error={Boolean(touched.name && errors.name)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-name-register">
                  Venue Name{" "}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-name-register"
                  value={values.name}
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.name && errors.name && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text--register"
                  >
                    {errors.name}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.description && errors.description)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-address-register">
                  {" "}
                  Description{" "}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-address-register"
                  value={values.description}
                  name="description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.description && errors.description && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text--register"
                  >
                    {errors.description}
                  </FormHelperText>
                )}
              </FormControl>
              {/* <FormControl fullWidth error={Boolean(touched.sportType && errors.sportType)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-sportType-register">Sports Type </InputLabel>
              <OutlinedInput
                id="outlined-adornment-sportType-register"
                value={values.sportType}
                name="sportType"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.sportType && errors.sportType && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.sportType}
                </FormHelperText>
              )}
            </FormControl> */}
              <FormControl
                fullWidth
                error={Boolean(touched.addressLineOne && errors.addressLineOne)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-addressLineOne-register">
                  Address{" "}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-addressLineOne-register"
                  value={values.addressLineOne}
                  name="addressLineOne"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.addressLineOne && errors.addressLineOne && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text--register"
                  >
                    {errors.addressLineOne}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ ...theme.typography.customSelect }}>
                <InputLabel id="tags-label">Block</InputLabel>
                <Select
                  labelId="vendor-ID"
                  id="VendorID"
                  value={values.block}
                  onChange={(event) =>
                    setFieldValue("block", event.target.value)
                  }
                  // renderValue={(selected) => selected.join(', ')}
                >
                  {areas.map((item, i) => (
                    <MenuItem key={i} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.city && errors.city)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-city-register">
                  City{" "}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-city-register"
                  value={values.city}
                  name="city"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.city && errors.city && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text--register"
                  >
                    {errors.city}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.locationUrl && errors.locationUrl)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-locationUrl-register">
                  Google Map Location URL
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-locationUrl-register"
                  value={values.locationUrl}
                  name="locationUrl"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.locationUrl && errors.locationUrl && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text--register"
                  >
                    {errors.locationUrl}
                  </FormHelperText>
                )}
              </FormControl>
              {/* <FormControl
                fullWidth
                error={Boolean(touched.openingTime && errors.openingTime)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-openingTime-register">
                  Opening Time{" "}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-openingTime-register"
                  value={values.openingTime}
                  name="openingTime"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.openingTime && errors.openingTime && (
                  <FormHelperText error id="standard-weight-helper-openingTime-register">
                    {errors.openingTime}
                  </FormHelperText>
                )}
              </FormControl> */}
              {/* <FormControl
                fullWidth
                error={Boolean(touched.closingTime && errors.closingTime)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-closing-register">
                  Closing Time{" "}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-closing-register"
                  value={values.closingTime}
                  name="closingTime"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.closingTime && errors.closingTime && (
                  <FormHelperText error id="standard-weight-helper-closingTime-register">
                    {errors.closingTime}
                  </FormHelperText>
                )}
              </FormControl> */}
              {/* this is the dfiferne ce between admin and vendor*/}
              {user.role === "admin" ? (
                <FormControl
                  fullWidth
                  sx={{ ...theme.typography.customSelect }}
                >
                  <InputLabel id="vendorID">Vendor</InputLabel>
                  <Select
                    labelId="vendorID"
                    id="VendorID"
                    value={values.vendorID}
                    onChange={(event) =>
                      setFieldValue("vendorID", event.target.value)
                    }
                    // renderValue={(selected) => selected.join(', ')}
                  >
                    {vendors.map((item, i) => (
                      <MenuItem key={i} value={item.id}>
                        {item.companyName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : null}

              <FormControl
                fullWidth
                sx={{ ...theme.typography.customMultiSelect }}
              >
                <InputLabel id="tags-label">Tags</InputLabel>
                <Select
                  labelId="tags-label"
                  id="tags"
                  multiple
                  value={values.tags}
                  onChange={(event) =>
                    setFieldValue("tags", event.target.value)
                  }
                  renderValue={(selected) => selected.join(", ")}
                >
                  {tagOptions.map((tag) => (
                    <MenuItem key={tag} value={tag}>
                      {tag}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <DropzoneArea setFieldValue={setFieldValue} values={values} />
              </FormControl>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  color="secondary"
                >
                  Create Location
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LocationCreation;
