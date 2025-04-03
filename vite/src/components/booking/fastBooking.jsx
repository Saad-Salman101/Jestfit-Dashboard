import React, { useState, useEffect, useMemo } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@emotion/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { IconShoppingCartFilled } from "@tabler/icons-react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconShoppingCartCancel } from "@tabler/icons-react";
import ConflictModal from "components/cart/conflict.modal";

const FastBooking = () => {
  const [selectedSlot, setSelectedSlot] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [bookings, setBookings] = useState([]);
  const [cart, setCart] = useState([]);
  const [changeOccured, setChangeOccured] = useState(true);
  const groupedItems = useMemo(() => groupCartItems(cart), [cart]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [openConflictModal, setOpenConlictModal] = useState(false);
  const [conflictData, setConflictData] = useState([]);

  const user = useSelector((state) => state.user.userDetail);
  const theme = useTheme();
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    locationID: Yup.string().required("Location is required"),
    fieldID: Yup.string().required("Field is required"),
    customerName: Yup.string().required("Customer's name is required"),
  });
  const [locations, setLocations] = useState([]);
  const [fields, setFields] = useState([]);
  const [field, setField] = useState();

  // Fetch fields based on selected location
  const fetchFieldsByLocation = async (location) => {
    try {
      const response = await axios.get(`/field?locationID=${location}`); // Replace with your API endpoint
      setFields(response.data.result.results);
    } catch (error) {
      console.error("Error fetching fields", error);
    }
  };

  const totalAmount = useMemo(() => {
    return cart?.reduce((acc, item) => acc + item.price, 0);
  }, [cart]);

  const fetchBookings = async (field) => {
    const jsDate = selectedDate.toDate();
    jsDate.setHours(0, 0, 0, 0);
    jsDate.setHours(jsDate.getHours() + 5); // Adjust for timezone if needed
    const bookingsResponse = await axios.get("/booking", {
      params: {
        date: jsDate,
        limit: 100,
        fieldID: field.id,
      },
    });
    console.log(bookingsResponse.data.result.results, "<==== booking jo hogae");
    setBookings(bookingsResponse.data.result.results);
  };

  const handleSlotSelection = (slot) => {
    if (selectedSlot.some((obj) => obj._id === slot._id)) {
      setSelectedSlot(selectedSlot.filter((obj) => obj._id !== slot._id));
    } else {
      setSelectedSlot([
        ...selectedSlot,
        {
          locationID: field.locationID,
          fieldID: field.id,
          name: field.name,
          date: selectedDate.startOf("day").toDate(),
          ...slot,
        },
      ]);
    }
  };

  const handleAddToCart = () => {
    // Create a copy of the existing cart
    let newCart = [...cart];

    // Iterate over the selected slots and add only the new ones to the cart
    selectedSlot.forEach((newSlot) => {
      const slotExists = newCart.some(
        (existingSlot) =>
          existingSlot.slotID === newSlot._id && existingSlot.date === newSlot.date
      );

      // If the slot doesn't exist, add it to the cart
      if (!slotExists) {
        newCart.push({
          ...newSlot,
          vendorID: field.vendorID,
          slotID: newSlot._id, // Add slotID to new slot
        });
      }
    });

    // Set the updated cart
    setCart(newCart);
    toast.success(`Successfully Added ${selectedSlot.length} slots to booking`);
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("/location", {
          params: { vendorID: user.vendorID.id, limit: 100 },
        }); // Replace with your API endpoint
        setLocations(response.data.result.results);
      } catch (error) {
        console.error("Error fetching locations", error);
      }
    };

    fetchLocations();
  }, []);

  const fetchData = async () => {
    const newField = await axios.get(`/field/${field?.id}`);
    const jsDate = selectedDate.toDate();
    jsDate.setHours(0, 0, 0, 0);
    jsDate.setHours(jsDate.getHours() + 5); // Adjust for timezone if needed
    const bookingsResponse = await axios.get("/booking", {
      params: {
        date: jsDate,
        limit: 100,
        fieldID: newField.data.result.id,
      },
    });
    setBookings(bookingsResponse.data.result.results);
    setField(newField?.data?.result);
  };

  useEffect(() => {
    fetchData();
  }, [changeOccured]);
  let initialValues = {
    locationID: "",
    fieldID: "",
    customerName: "",
    slots: [],
  };

  const handleRemoveItem = (_id) => {
    const updatedItems = cart.filter((item) => item._id !== _id);
    setCart(updatedItems);
    setChangeOccured(!changeOccured);
  };

  const handleCartVerification = async (values) => {
    const payload = {
      cart,
      customerName: values.customerName,
      type: "fastBooking",
    };
    try {
      const response = await axios.post("/order", payload);
      if (response.status === 201) {
        console.log(response.data.result, "<==== saman");
        setOrderDetail(response.data.result.order);
      }
      console.log(response.data, "<== res");
      console.log(response.cart, "<== res");
      return { isTrue: true, orderID: response.data.result.order.id };
    } catch (e) {
      console.log(e, "<=======");
      if (e.response.status === 400) {
        //show modal ,=>
        setOpenConlictModal(true);
        //show slots
        setConflictData(e?.response?.data?.data?.conflicts);
        //remove slot =>
      }
      return { isTrue: false };
    }
  };

  const removeBookedSlotAndContinue = () => {
    // Create a Set of conflict keys for faster lookups
    const conflictKeySet = new Set(
      conflictData.map(
        ({ bookingData }) =>
          `${bookingData.slotID}_${new Date(bookingData.date).toISOString()}`
      )
    );
    // Filter the cart by checking if the key exists in the conflictKeySet
    const filteredCart = cart.filter((cartItem) => {
      const cartKey = `${cartItem._id}_${new Date(cartItem.date).toISOString()}`;
      return !conflictKeySet.has(cartKey);
    });

    // Update the cart
    setCart(filteredCart);
  };

  const handleConfirmPayment = async (orderID) => {
    try {
      // const cartData = JSON.stringify(cartItems.data);
      const response = await axios.put("/order/fast", {
        orderID: orderID,
      });
      console.log(response.data);
      if (response.status === 200) {
        toast.success("Your Booking has been placed");
        setCart([]);
        setSelectedSlot([]);
        // You can navigate or do additional actions here
      }
    } catch (error) {
      console.log(error);
      toast.error("Oops something went wrong");
      toast.error(error?.response?.data?.data?.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          let cart = await handleCartVerification(values);
          console.log(cart, "<=================== cart bhek l loruet");
          if (cart.isTrue) {
            await handleConfirmPayment(cart.orderID);
          }
        } catch (e) {
          console.log(e);
          toast.error(e?.response?.data?.message);
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
                error={Boolean(touched.customerName && errors.customerName)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-name-register">
                  Customer Name
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-name-register"
                  value={values.customerName}
                  name="customerName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.customerName && errors.customerName && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.customerName}
                  </FormHelperText>
                )}
              </FormControl>
              {/* //Location */}
              <FormControl sx={{ ...theme.typography.customSelect }} fullWidth>
                <InputLabel id="LocationID">Location</InputLabel>
                <Select
                  label="Location"
                  labelId="LocationID"
                  id="locationID"
                  value={values.locationID}
                  onChange={(event) => {
                    setBookings([]);
                    setField({});
                    setFieldValue("locationID", event.target.value);
                    setFieldValue("field", ""); // Reset field dropdown when location changes
                    fetchFieldsByLocation(event.target.value);
                  }}
                  // renderValue={(selected) => selected.join(', ')}
                >
                  {locations.map((item, i) => (
                    <MenuItem key={i} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                {touched.locationID && errors.locationID && (
                  <FormHelperText error id="locationID">
                    {errors.locationID}
                  </FormHelperText>
                )}
              </FormControl>
              {/* this is Field */}
              <FormControl fullWidth sx={{ ...theme.typography.customSelect }}>
                <InputLabel id="fieldID">Field</InputLabel>
                <Select
                  label="Field"
                  labelId="fieldID"
                  id="fieldID"
                  value={values.fieldID}
                  onChange={(event) => {
                    setFieldValue("fieldID", event.target.value);
                    let field = fields.find((item) => item.id === event.target.value);
                    console.log(field, "<=== field");
                    setField(field);
                    fetchBookings(field);
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {fields.map((item, i) => (
                    <MenuItem key={i} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                {touched.fieldID && errors.fieldID && (
                  <FormHelperText error id="sportTypeID">
                    {errors.fieldID}
                  </FormHelperText>
                )}
              </FormControl>

              <Grid width={"100%"} item xs={12}>
                <Card>
                  <CardContent>
                    <Typography
                      textTransform={"capitalize"}
                      variant="h1"
                      component="h2"
                      gutterBottom
                      textAlign={"center"}
                      onClick={() => {
                        console.log(cart, "<====");
                      }}
                    >
                      {field?.name}
                    </Typography>

                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DatePicker
                        minDate={moment()}
                        label="Select Booking Date"
                        value={selectedDate}
                        onChange={(newValue) => {
                          setCart([]);
                          setSelectedSlot([]);
                          setSelectedDate(newValue);
                          setChangeOccured(!changeOccured);
                        }}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />
                    </LocalizationProvider>

                    <Typography
                      onClick={() => console.log(cart, "<=== cart wow")}
                      variant="h3"
                      mt={4}
                      mb={4}
                      component="h3"
                      gutterBottom
                    >
                      Available Slots:
                    </Typography>
                    <Grid container spacing={2}>
                      {field?.slots?.map((slot) => {
                        const isBooked = bookings.some(
                          (booking) => booking.slotID === slot._id
                        );
                        return (
                          <Grid item xs={12} sm={6} md={3} key={slot._id}>
                            <Box
                              sx={{
                                padding: 2,
                                border: "1px solid",
                                borderColor: selectedSlot.some((obj) => obj._id === slot._id)
                                  ? "secondary.dark"
                                  : "grey.300",
                                borderRadius: 2,
                                cursor: isBooked ? "not-allowed" : "pointer",
                                backgroundColor:
                                  selectedSlot.some((obj) => obj._id === slot._id) ||
                                  cart.some(
                                    (obj) => obj._id === slot._id && obj.date === slot.date
                                  )
                                    ? "secondary.light"
                                    : "white",
                                transition: "background-color 0.3s",
                                textAlign: "center",
                                opacity: isBooked ? 0.5 : 1,
                              }}
                              onClick={() => !isBooked && handleSlotSelection(slot)}
                            >
                              <Typography variant="body1" component="p">
                                {slot.to} - {slot.from}
                              </Typography>
                              <Typography variant="body2" component="p">
                                Price: ${slot.price}
                              </Typography>
                            </Box>
                          </Grid>
                        );
                      })}
                    </Grid>

                    <Box mt={3} gap={5} display="flex" justifyContent="center">
                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        disabled={selectedSlot.length === 0 || !selectedDate}
                        onClick={handleAddToCart}
                      >
                        Add To Booking <IconShoppingCartFilled style={{ marginLeft: "8px" }} />
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <FormControl
                fullWidth
                sx={{ justifyContent: "center", alignItems: "center", width: "100%" }}
              >
                <Typography variant="h3" sx={{ ...theme.typography.customInput }}>
                  Slots
                </Typography>
                {cart.length === 0 ? (
                  <Box sx={{ textAlign: "center" }} maxWidth={"100%"}>
                    <IconShoppingCartCancel size={"small"} />
                  </Box>
                ) : (
                  <>
                    {Object.keys(groupedItems).map((name) => (
                      <Card key={name} sx={{ marginBottom: 2 }}>
                        <CardContent>
                          <Typography
                            variant="h4"
                            sx={{ marginBottom: 1 }}
                            textTransform={"capitalize"}
                          >
                            {name}
                          </Typography>
                          {Object.keys(groupedItems[name]).map((date) => (
                            <Box key={date} sx={{ marginLeft: 2, marginBottom: 2 }}>
                              <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
                                {date}
                              </Typography>
                              <List>
                                {groupedItems[name][date].slots.map((slot) => (
                                  <React.Fragment key={slot._id}>
                                    <ListItem
                                      secondaryAction={
                                        <IconButton
                                          edge="end"
                                          aria-label="delete"
                                          onClick={() => handleRemoveItem(slot._id)}
                                        >
                                          <DeleteIcon />
                                        </IconButton>
                                      }
                                    >
                                      <ListItemText
                                        primary={`${slot.to} -  ${slot.from} `}
                                        secondary={`Price: ${slot.price} PKR`}
                                      />
                                    </ListItem>
                                    <Divider />
                                  </React.Fragment>
                                ))}
                              </List>
                            </Box>
                          ))}
                        </CardContent>
                      </Card>
                    ))}

                    {/* Display total amount and payment details */}
                    <Box sx={{ marginTop: 4 }}>
                      <Typography variant="h6" textAlign="center">
                        Total Amount: ${totalAmount} PKR
                      </Typography>

                      {/* <Box sx={{ textAlign: "center", marginTop: 2 }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="large"
                          // onClick={handleConfirmPayment}
                        >
                          Send Booking
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="large"
                          sx={{ marginLeft: 2 }}
                          onClick={() => navigate("/customerField")}
                        >
                          Continue Booking
                        </Button>
                      </Box> */}
                    </Box>
                  </>
                )}
              </FormControl>
              <Grid textAlign={"center"} item xs={12}>
                <Button
                  disabled={cart.length === 0 ? true : false}
                  type="submit"
                  size="large"
                  variant="contained"
                  color="secondary"
                >
                  Create Booking
                </Button>
              </Grid>
            </Grid>
          </Box>
          <ConflictModal
            open={openConflictModal}
            conflicts={conflictData}
            handleClose={setOpenConlictModal}
            handleRemoveSlot={() => {
              setCart([]);
              setSelectedSlot([]);
              setOpenConlictModal(false);
            }}
            handleContinueToPayment={removeBookedSlotAndContinue}
          />
        </Form>
      )}
    </Formik>
  );
};

const groupCartItems = (cartItems) => {
  return cartItems.reduce((acc, item) => {
    const { name, date } = item;
    const formattedDate = new Date(date).toLocaleDateString();

    if (!acc[name]) {
      acc[name] = {};
    }
    if (!acc[name][formattedDate]) {
      acc[name][formattedDate] = { slots: [] };
    }
    acc[name][formattedDate].slots.push(item);

    return acc;
  }, {});
};

export default FastBooking;
