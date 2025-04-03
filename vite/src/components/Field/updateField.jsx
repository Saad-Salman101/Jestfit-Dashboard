import React, { useEffect, useState } from "react";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  Box,
  Typography,
  TextField,
  Switch,
  FormGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Grid,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import DropzoneArea from "components/uploadImage";
import { useTheme } from "@emotion/react";
import AppBlockingIcon from "@mui/icons-material/AppBlocking";
import AnimateButton from "ui-component/extended/AnimateButton";
const UpdateField = () => {
  const [fieldData, setFieldData] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [changeOccured, setChangeOccured] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};
  const theme = useTheme();
  useEffect(() => {
    const fetchFieldData = async () => {
      try {
        const response = await axios.get(`/field/${id}`);
        setFieldData(response.data.result);
      } catch (error) {
        console.error("Error fetching field data:", error);
        toast.error("Failed to fetch field data!");
      }
    };

    fetchFieldData();
  }, [id, changeOccured]);

  const deleteImage = async (index) => {
    try {
      const result = await axios.delete(`/field/image/${id}/`, { params: { link: index } });
      toast.success("Image deleted successfully!");
      setFieldData(result.data.result);
      setChangeOccured(!changeOccured);
    } catch (error) {
      console.error("Image delete failed:", error);
      toast.error("Failed to delete image!");
    }
  };

  const handleDropzoneChange = (images) => {
    setNewImages(images);
  };

  if (!fieldData) return <div>Loading...</div>;

  return (
    <Formik
      initialValues={{
        name: fieldData.name,
        description: fieldData.description,
        price: fieldData.price,
        discount: fieldData.priceDiscount,
        slots: fieldData.slots || [],
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Name is required"),
        description: Yup.string().required("Description is required"),
        price: Yup.number().required("Price is required"),
        discount: Yup.number().required("Discount is required"),
        slots: Yup.array()
          .of(
            Yup.object({
              price: Yup.number().required("Price is required"),
              isEnabled: Yup.boolean().required(),
            })
          )
          .required("Slots are required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          const formData = new FormData();
          formData.append("name", values.name);
          formData.append("description", values.description);
          formData.append("price", values.price);
          formData.append("priceDiscount", values.discount);
          formData.append("slots", JSON.stringify(values.slots));
          newImages.forEach((file) => formData.append("images", file));

          await axios.put(`/field/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          toast.success("Field updated successfully!");
          setNewImages([]);
          setChangeOccured(!changeOccured);
        } catch (error) {
          console.error("Update failed:", error);
          toast.error("Failed to update field!");
        }

        setSubmitting(false);
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        touched,
        errors,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Box>
            <Grid container justifyContent="space-between" width="100%">
              <Grid item>
                <Typography variant="h3" mb={2}>
                  Update Your Field:
                </Typography>
              </Grid>

              {/* Right: Text and Icon */}
              <Grid item>
                <Box display="flex" alignItems="center">
                  <AnimateButton>
                    <Button
                      fullWidth
                      size="small"
                      onClick={() => {
                        navigate(`/disableSlot/${id}`);
                      }}
                      variant="contained"
                      color="secondary"
                    >
                      Disable Slots on daily basis
                      <AppBlockingIcon color="primary" />
                    </Button>
                  </AnimateButton>
                </Box>
              </Grid>
            </Grid>

            <FormControl
              fullWidth
              error={Boolean(touched.name && errors.name)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-name-register">Field Name </InputLabel>
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
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.description}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.price && errors.price)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-block-register">Price </InputLabel>
              <OutlinedInput
                id="outlined-adornment-block-register"
                value={values.price}
                name="price"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.price && errors.price && (
                <FormHelperText error id="standard-weight-helper-text--register">
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
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.city}
                </FormHelperText>
              )}
            </FormControl>

            <Typography variant="h6" mt={4}>
              Current Images
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
              {fieldData.images.map((image, index) => (
                <Box key={index} sx={{ position: "relative" }}>
                  <img
                    src={image.uri}
                    alt={`Field ${index + 1}`}
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "8px",
                    }}
                  />
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      minWidth: "unset",
                    }}
                    onClick={() => deleteImage(image.uri)}
                  >
                    ×
                  </Button>
                </Box>
              ))}
            </Box>

            <Typography variant="h6" mt={4}>
              Add New Images
            </Typography>
            <DropzoneArea
              setFieldValue={(key, value) => {
                if (key === "images") handleDropzoneChange(value);
              }}
              values={{ images: newImages }}
            />

            <Typography variant="h6" mt={4}>
              Manage Slots
            </Typography>
            <FieldArray name="slots">
              {({ push, remove }) => (
                <Box>
                  {values.slots.map((slot, index) => (
                    <Box
                      key={slot._id}
                      display="flex"
                      alignItems="center"
                      gap={1}
                      sx={{
                        // border: "1px solid #ccc",
                        // p: 2,
                        borderRadius: 2,
                      }}
                    >
                      {/* To (Disabled Field) */}
                      <FormControl sx={{ ...theme.typography.customInput }}>
                        <InputLabel shrink htmlFor={`slots[${index}].to`}>
                          To
                        </InputLabel>
                        <OutlinedInput
                          id={`slots[${index}].to`}
                          value={slot.to}
                          disabled
                          margin="dense"
                        />
                      </FormControl>

                      {/* From (Disabled Field) */}
                      <FormControl sx={{ ...theme.typography.customInput }}>
                        <InputLabel shrink htmlFor={`slots[${index}].from`}>
                          From
                        </InputLabel>
                        <OutlinedInput
                          id={`slots[${index}].from`}
                          value={slot.from}
                          disabled
                          margin="dense"
                        />
                      </FormControl>

                      {/* Price (Editable) */}
                      <FormControl sx={{ ...theme.typography.customInput }}>
                        <InputLabel shrink htmlFor={`slots[${index}].price`}>
                          Price
                        </InputLabel>
                        <OutlinedInput
                          name={`slots[${index}].price`}
                          label="Price"
                          type="number"
                          value={values.slots[index].price}
                          onChange={(e) =>
                            setFieldValue(`slots[${index}].price`, e.target.value)
                          }
                          onBlur={handleBlur}
                          margin="normal"
                          sx={{ width: 120 }}
                        />
                      </FormControl>

                      {/* Enabled Switch */}
                      <FormControlLabel
                        control={
                          <Switch
                            checked={values.slots[index].isEnabled}
                            onChange={(e) =>
                              setFieldValue(`slots[${index}].isEnabled`, e.target.checked)
                            }
                          />
                        }
                        label="Enabled"
                      />

                      {/* Optional Remove Button for Slots */}
                      {/* <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </Button> */}
                    </Box>
                  ))}
                </Box>
              )}
            </FieldArray>
            <Box sx={{ mt: 2 }} width={"95px"}>
              <AnimateButton>
                <Button size="large" type="submit" variant="contained" color="secondary">
                  Update
                </Button>
              </AnimateButton>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateField;
