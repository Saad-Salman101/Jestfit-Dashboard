import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import DropzoneArea from "components/uploadImage";
import { useTheme } from "@emotion/react";
import AnimateButton from "ui-component/extended/AnimateButton";

const UpdateLocation = () => {
  const [locationData, setLocationData] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const tagOptions = ["cricket", "tennis", "swimming", "pool"];
  const [changeOccured, setChangeOccured] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};
  const theme = useTheme();

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await axios.get(`/location/${id}`);
        console.log(response.data.result.tags)
        setLocationData(response.data.result);
      } catch (error) {
        console.error("Error fetching location data:", error);
        toast.error("Failed to fetch location data!");
      }
    };

    fetchLocationData();
  }, [id, changeOccured]);

  const handleDropzoneChange = (images) => {
    setNewImages(images);
  };
  const deleteImage = async (index) => {
    try {
      const result = await axios.delete(`/location/image/${id}/`, { params: { link: index } });
      toast.success("Image deleted successfully!");
      setLocationData(result.data.result);
      setChangeOccured(!changeOccured);
    } catch (error) {
      console.error("Image delete failed:", error);
      toast.error("Failed to delete image!");
    }
  };

  if (!locationData) return <div>Loading...</div>;

  return (
    <Formik
      initialValues={{
        name: locationData.name,
        description: locationData.description,
        block: locationData.block || "",
        city: locationData.city || "",
        tags: locationData.tags || [],
        images: [],
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Name is required"),
        description: Yup.string().required("Description is required"),
        block: Yup.string().required("Block is required"),
        city: Yup.string().required("City is required"),
        tags: Yup.array().of(Yup.string()).required("Tags are required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          const formData = new FormData();
          formData.append("name", values.name);
          formData.append("description", values.description);
          formData.append("block", values.block);
          formData.append("city", values.city);
          formData.append("tags", JSON.stringify(values.tags));
          newImages.forEach((file) => formData.append("images", file));

          await axios.put(`/location/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          toast.success("Location updated successfully!");
          setChangeOccured(!changeOccured);
          setNewImages([]);
          //   navigate("/locations");
        } catch (error) {
          console.error("Update failed:", error);
          toast.error("Failed to update location!");
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
                  Update Location:
                </Typography>
              </Grid>
            </Grid>

            {/* Location Name */}
            <FormControl
              fullWidth
              error={Boolean(touched.name && errors.name)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="name">Location Name</InputLabel>
              <OutlinedInput
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.name && errors.name && <FormHelperText>{errors.name}</FormHelperText>}
            </FormControl>

            {/* Description */}
            <FormControl
              fullWidth
              error={Boolean(touched.description && errors.description)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="description">Description</InputLabel>
              <OutlinedInput
                id="description"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                // multiline
                rows={3}
              />
              {touched.description && errors.description && (
                <FormHelperText>{errors.description}</FormHelperText>
              )}
            </FormControl>

            {/* Block */}
            <FormControl
              fullWidth
              error={Boolean(touched.block && errors.block)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="block">Block</InputLabel>
              <OutlinedInput
                id="block"
                name="block"
                value={values.block}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.block && errors.block && (
                <FormHelperText>{errors.block}</FormHelperText>
              )}
            </FormControl>

            {/* City */}
            <FormControl
              fullWidth
              error={Boolean(touched.city && errors.city)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="city">City</InputLabel>
              <OutlinedInput
                id="city"
                name="city"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.city && errors.city && <FormHelperText>{errors.city}</FormHelperText>}
            </FormControl>

            {/* Tags */}
            <FormControl
              fullWidth
              error={Boolean(touched.tags && errors.tags)}
              sx={{ ...theme.typography.customMultiSelect }}
            >
              <InputLabel id="tags-label">Tags</InputLabel>
              <Select
                labelId="tags-label"
                id="tags"
                multiple
                value={values.tags}
                onChange={(event) => setFieldValue("tags", event.target.value)}
                renderValue={(selected) => selected.join(", ")}
              >
                {tagOptions.map((tag) => (
                  <MenuItem key={tag} value={tag}>
                    {tag}
                  </MenuItem>
                ))}
              </Select>
              {touched.tags && errors.tags && <FormHelperText>{errors.tags}</FormHelperText>}
            </FormControl>
            <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
              {locationData.images.map((image, index) => (
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
            {/* Dropzone */}
            <Box mt={2}>
              <Typography variant="subtitle1">Upload New Images</Typography>
              <DropzoneArea
                setFieldValue={(key, value) => {
                  if (key === "images") handleDropzoneChange(value);
                }}
                values={{ images: newImages }}
              />
            </Box>

            {/* Submit Button */}
            <Box mt={2}>
              <AnimateButton>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={isSubmitting}
                >
                  Update Location
                </Button>
              </AnimateButton>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateLocation;
