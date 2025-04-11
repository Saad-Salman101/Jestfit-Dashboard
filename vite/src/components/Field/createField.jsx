import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, FieldArray, Field } from "formik";
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
  Typography,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { toast } from "react-toastify";
import DropzoneArea from "components/uploadImage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { IconQrcode } from "@tabler/icons-react";

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  sportTypeID: Yup.string().required("Sport Type is required"),
  locationID: Yup.string().required("Location ID is required"),
  vendorID: Yup.string().required("Vendor ID is required"),
  price: Yup.number("price must be a number")
    .integer("price must be a full number")
    .required("price is required"),
  discount: Yup.number("base discount must be a number")
    .integer("base discount must be a full number")
    .required("base discount is required"),
});

// Initial values

const CreateField = () => {
  const user = useSelector((state) => state.user.userDetail);
  const [location, setLocation] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [vendor, setVendor] = useState("");
  const [sportType, setSportType] = useState([]);
  const navigate = useNavigate();

  const generateSlots = (startTime, endTime, durationMinutes, costPerSlot) => {
    const slots = [];
    let currentTime = new Date();
    currentTime.setHours(startTime, 0, 0, 0); // Set to start time (e.g., 12:00 AM)

    const endTimeDate = new Date();
    endTimeDate.setHours(endTime, 0, 0, 0); // Set to end time (e.g., 12:00 PM)

    while (currentTime < endTimeDate) {
      const start = new Date(currentTime); // Start time for the slot
      currentTime.setMinutes(currentTime.getMinutes() + durationMinutes); // Increment by slot duration
      const end = new Date(currentTime); // End time for the slot

      slots.push({
        to: start.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        from: end.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        price: costPerSlot,
        isEnabled: true,
      });
    }

    return slots;
  };
  const initialValues = {
    name: null,
    description: null,
    price: null,
    discount: null,
    vendorID: user.role === "vendor" ? user?.vendorID?.id : "",
    locationID: "",
    sportTypeID: sportType.length !== 0 ? sportType[0].id : null,
    slots: generateSlots(0, 24, 30, 2000),
    images: [],
  };

  const fetchData = async () => {
    const fetchVendors = await axios.get("/vendor", { params: { limit: 100 } });
    console.log(fetchVendors.data.result.results, "<== =vendorrrr");
    setVendors(fetchVendors.data.result.results);

    const location = await axios.get("/location", {
      params: {
        vendorID: user.role === "vendor" ? user.vendorID.id : vendor,
      },
    });
    const sportType = await axios.get("/sportType");
    setSportType(sportType.data.result.results);
    console.log(location, "<== =location");
    // setLocation(location.data.result.results);
    setLocation([
      { name: "Gulshan-e-Iqbal", id: 1 },
      { name: "Gulshan-e-Iqbal", id: 2 },
      { name: "Korangi", id: 3 },
      { name: "DHA", id: 4 },
      { name: "Clifton", id: 5 },
      { name: "Gulistan-e-Johar", id: 6 },
      { name: "Nazimabad", id: 7 },
      { name: "North Nazimabad", id: 8 },
      { name: "Malir", id: 9 },
      { name: "Landhi", id: 10 },
      { name: "Lyari", id: 11 },
      { name: "Saddar", id: 12 },
      { name: "Garden", id: 13 },
      { name: "Shah Faisal", id: 14 },
      { name: "New Karachi", id: 15 },
      { name: "North Karachi", id: 16 },
      { name: "Orangi Town", id: 17 },
      { name: "Baldia Town", id: 18 },
      { name: "Site Area", id: 19 },
      { name: "Hawksbay", id: 20 },
      { name: "Paradise Point", id: 21 },
      { name: "French Beach", id: 22 },
      { name: "Sandspit", id: 23 },
      { name: "Hawkes Bay", id: 24 },
      { name: "Cape Monze", id: 25 },
      { name: " Mubarak Village", id: 26 },
      { name: "Paradise Point", id: 27 },
      { name: "French Beach", id: 28 },
      { name: "Sandspit", id: 29 },
      { name: "Hawkes Bay", id: 30 },
      { name: "Cape Monze", id: 31 },
      { name: " Mubarak Village", id: 32 },
      { name: "Paradise Point", id: 33 },
      { name: "French Beach", id: 34 },
      { name: "Sandspit", id: 35 },
      { name: "Hawkes Bay", id: 36 },
      { name: "Cape Monze", id: 37 },
      { name: " Mubarak Village", id: 38 },
      { name: "Paradise Point", id: 39 },
      { name: "French Beach", id: 40 },
      { name: "Sandspit", id: 41 },
      { name: "Hawkes Bay", id: 42 },
      { name: "Cape Monze", id: 43 },
      { name: " Mubarak Village", id: 44 },
      { name: "Paradise Point", id: 45 },
      { name: "French Beach", id: 46 },
      { name: "Sandspit", id: 47 },
      { name: "Hawkes Bay", id: 48 },
      { name: "Cape Monze", id: 49 },
      { name: " Mubarak Village", id: 50 },
      { name: "Paradise Point", id: 51 },
      { name: "French Beach", id: 52 },
      { name: "Sandspit", id: 53 },
      { name: "Hawkes Bay", id: 54 },
      { name: "Cape Monze", id: 55 },
      { name: " Mubarak Village", id: 56 },
      { name: "Paradise Point", id: 57 },
      { name: "French Beach", id: 58 },
      { name: "Sandspit", id: 59 },
      { name: "Hawkes Bay", id: 60 },
      { name: "Cape Monze", id: 61 },
      { name: " Mubarak Village", id: 62 },
      { name: "Paradise Point", id: 63 },
      { name: "French Beach", id: 64 },
      { name: "Sandspit", id: 65 },
      { name: "Hawkes Bay", id: 66 },
      { name: "Cape Monze", id: 67 },
      { name: " Mubarak Village", id: 68 },
    ]);
  };

  useEffect(() => {
    fetchData();
  }, [vendor]);

  const theme = useTheme();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        if (values.images.length === 0) {
          toast.error("At least One Image Is Required For The Field");
          setSubmitting(false);
          return;
        }
        console.log(values, "<==== values ");
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("sportTypeID", values.sportTypeID);
        formData.append("price", values.price);
        formData.append("vendorID", values.vendorID);
        formData.append("priceDiscount", values.discount);
        formData.append("locationID", values.locationID);
        formData.append("slots", JSON.stringify(values.slots));
        for (let index = 0; index < values.images.length; index++) {
          formData.append(`images`, values.images[index]);
        }
        try {
          const response = await axios.post("/field", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log(response, "<==== response");
          toast.success("Successfully Created!");
          navigate("/field");
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
                  Field Name{" "}
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
              <FormControl fullWidth sx={{ ...theme.typography.customSelect }}>
                <InputLabel id="sportTypeID">Sport Type</InputLabel>
                <Select
                  labelId="tags-sportType"
                  id="sportTypeID"
                  value={values.sportTypeID}
                  onChange={(event) =>
                    setFieldValue("sportTypeID", event.target.value)
                  }
                  // renderValue={(selected) => selected.join(', ')}
                >
                  {sportType.map((item, i) => (
                    <MenuItem key={i} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                {touched.sportType && errors.sportType && (
                  <FormHelperText error id="sportTypeID">
                    {errors.sportType}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                error={Boolean(touched.price && errors.price)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-block-register">
                  Price{" "}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-block-register"
                  value={values.price}
                  name="price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.price && errors.price && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text--register"
                  >
                    {errors.price}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.discount && errors.discount)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-city-register">
                  Discount (In Percentage){" "}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-discount-register"
                  value={values.discount}
                  name="discount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.discount && errors.discount && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text--register"
                  >
                    {errors.city}
                  </FormHelperText>
                )}
              </FormControl>
              {user.role === "admin" ? (
                <FormControl
                  fullWidth
                  sx={{ ...theme.typography.customSelect }}
                >
                  <InputLabel id="tags-label">Vendor</InputLabel>
                  <Select
                    labelId="vendor-ID"
                    id="vendorID"
                    value={values.id}
                    onChange={(event) => {
                      setFieldValue("vendorID", event.target.value);
                      setVendor(event.target.value);
                    }}
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

              <FormControl fullWidth sx={{ ...theme.typography.customSelect }}>
                <InputLabel id="location-ID">Location</InputLabel>
                <Select
                  labelId="location-ID"
                  id="locationID"
                  value={values.id}
                  onChange={(event) =>
                    setFieldValue("locationID", event.target.value)
                  }
                >
                  {location.map((item, i) => (
                    <MenuItem key={i} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                fullWidth
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ ...theme.typography.customInput }}
                >
                  Slots
                </Typography>
                <FieldArray name="slots">
                  {({ push, remove }) => (
                    <div>
                      {values.slots.map((field, index) => (
                        <Box
                          key={index}
                          mb={2}
                          gap={1}
                          display="flex"
                          alignItems="center"
                        >
                          <FormControl>
                            <InputLabel htmlFor={`slots[${index}].to`}>
                              To
                            </InputLabel>
                            <Field
                              id={`slots[${index}].to`}
                              as={OutlinedInput}
                              name={`slots[${index}].to`}
                              label="To"
                              variant="outlined"
                              margin="normal"
                              disabled
                            />
                            <ErrorMessage
                              name={`slots[${index}].to`}
                              component="div"
                            />
                          </FormControl>
                          <FormControl>
                            <InputLabel htmlFor={`slots[${index}].from`}>
                              From
                            </InputLabel>
                            <Field
                              id={`slots[${index}].from`}
                              as={OutlinedInput}
                              name={`slots[${index}].from`}
                              label="From"
                              variant="outlined"
                              margin="normal"
                              disabled
                            />
                            <ErrorMessage
                              name={`slots[${index}].from`}
                              component="div"
                            />
                          </FormControl>
                          <FormControl>
                            <InputLabel htmlFor={`slots[${index}].price`}>
                              Price
                            </InputLabel>
                            <Field
                              id={`slots[${index}].price`}
                              as={OutlinedInput}
                              name={`slots[${index}].price`}
                              label="Price"
                              variant="outlined"
                              margin="normal"
                            />
                            <ErrorMessage
                              name={`slots[${index}].price`}
                              component="div"
                            />
                          </FormControl>
                          <FormControl>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={field.isEnabled} // Provide a default value of `false` if `isEnabled` is undefined
                                  onChange={(event) =>
                                    setFieldValue(
                                      `slots[${index}].isEnabled`,
                                      event.target.checked
                                    )
                                  }
                                  color="primary"
                                />
                              }
                              label={
                                field.isEnabled ? "Slot Open" : "Slot Closed"
                              }
                            />
                          </FormControl>
                        </Box>
                      ))}
                    </div>
                  )}
                </FieldArray>
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
                  Create Field
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default CreateField;
