import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  ImageList,
  ImageListItem,
  useTheme,
  useMediaQuery,
  TextField,
  Avatar,
  Badge,
  ButtonBase,
  AppBar,
  Toolbar,
} from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import { IconCreditCardPay, IconShoppingCartFilled } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "store/reducers/cartReducer";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { getRoomData, joinRoom, leaveRoom } from "store/reducers/socketReducer";
import Header from "layout/MainLayout/Header";
import { setMenu } from "store/reducers/newCustomizationReducer";

function CustomerBooking() {
  const [bookings, setBookings] = useState([]);
  const theme = useTheme();
  const location = useLocation();
  const { id } = location.state || {};
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.userDetail);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedSlot, setSelectedSlot] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [field, setFieldData] = useState();
  const [changeOccured, setChangeOccured] = useState(true);
  const navigate = useNavigate();
  const leftDrawerOpened = useSelector((state) => state.newCustomization.opened);

  const fetchData = async () => {
    const field = await axios.get(`/field/${id}`);
    const jsDate = selectedDate.toDate();
    jsDate.setHours(0, 0, 0, 0);
    jsDate.setHours(jsDate.getHours() + 5); // Adjust for timezone if needed
    const bookingsResponse = await axios.get("/booking", {
      params: {
        date: jsDate,
        limit: 100,
        fieldID: field.data.result.id,
      },
    });
    setBookings(bookingsResponse.data.result.results);
    setFieldData(field?.data?.result);
    console.log(field.data.result.vendorID, "<=== wow");
  };

  const createExpirytTime = () => {
    let currentTime = new Date();
    return new Date(currentTime.getTime() + 10 * 60000);
  };

  const handleSlotSelection = (slot) => {
    if (selectedSlot.some((obj) => obj._id === slot._id)) {
      setSelectedSlot(selectedSlot.filter((obj) => obj._id !== slot._id));
    } else {
      setSelectedSlot([
        ...selectedSlot,
        {
          vendorID: field.vendorID,
          customerID: user.id,
          locationID: field.locationID,
          fieldID: field.id,
          name: field.name,
          date: selectedDate.startOf("day").toDate(),
          expiryTime: createExpirytTime(),
          ...slot,
        },
      ]);
    }
  };

  const handleAddToCart = () => {
    let newCart = [...cart.data];

    selectedSlot.forEach((newSlot) => {
      const slotExists = cart.data.some(
        (oldSlot) => oldSlot._id === newSlot._id && oldSlot.date === newSlot.date
      );
      if (!slotExists) {
        newCart.push(newSlot); // Only add newSlot if it's not already in the cart
      }
    });
    dispatch(updateCart(newCart));
    toast.success(`Successfully Added ${selectedSlot.length} slots to cart`);
  };

  useEffect(() => {
    fetchData();
    dispatch(joinRoom({ roomID: id, userID: user.id }));

    return () => {
      dispatch(leaveRoom());
    };
  }, [changeOccured]);

  const handleSendMessage = () => {
    // Dispatch the sendMessage action to emit the event
    dispatch(getRoomData({ roomId: id }));
  };
  const handleLeftDrawerToggle = () => {
    dispatch(setMenu({ opened: !leftDrawerOpened }));
    // dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };
  return (
    <Grid maxWidth="100%" container flexDirection={"column"}>
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftDrawerOpened ? theme.transitions.create("width") : "none",
        }}
      >
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>
      <Grid width={"100%"} item xs={12}>
        <Card>
          <CardContent>
            <Typography
              variant="h1"
              component="h2"
              gutterBottom
              textAlign={"center"}
            >
              {field?.name}
            </Typography>
            {/* <Typography m={4} variant="body2" color="textSecondary" gutterBottom>
              {field?.description}
            </Typography> */}

            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                minDate={moment()}
                label="Select Booking Date"
                value={selectedDate}
                onChange={(newValue) => {
                  setSelectedSlot([]);
                  setSelectedDate(newValue);
                  setChangeOccured(!changeOccured);
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>

            <Typography
              onClick={() => handleSendMessage()}
              variant="h3"
              mt={4}
              mb={4}
              component="h3"
              gutterBottom
            >
              Available Slots:
            </Typography>
            <Grid container spacing={2}>
              {field?.slots.map((slot) => {
                const isBooked = bookings.some((booking) => booking.slotID === slot._id);
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
                        cursor: isBooked || !slot.isEnabled ? "not-allowed" : "pointer",
                        backgroundColor: selectedSlot.some((obj) => obj._id === slot._id)
                          ? "secondary.light"
                          : "white",
                        transition: "background-color 0.3s",
                        textAlign: "center",
                        opacity: isBooked || !slot.isEnabled ? 0.5 : 1,
                      }}
                      onClick={() => slot.isEnabled && !isBooked && handleSlotSelection(slot)}
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
                Add To Cart <IconShoppingCartFilled style={{ marginLeft: "8px" }} />
              </Button>
              <Button
                onClick={() => {
                  handleAddToCart();
                  if (user.role === null) {
                    navigate("/cartDirectly");
                  } else {
                    navigate("/cart");
                  }
                }}
                variant="contained"
                color="secondary"
                size="large"
                disabled={selectedSlot.length === 0 || !selectedDate}
              >
                Pay Now <IconCreditCardPay style={{ marginLeft: "8px" }} />
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Images Section with ImageList */}
      <Grid
        width="100%"
        container
        justifyContent="start"
        alignContent="start"
        sx={{ overflowY: "auto", maxHeight: 450 }}
      >
        <ImageList
          sx={{
            width: "100%",
            height: "auto",
            overflowY: "auto",
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
          cols={1} // Set cols to 1 since flex-wrap is handling responsiveness
          variant="standard" // 'standard' for equal-sized images
        >
          {field?.images?.length === 0 ? (
            <></>
          ) : (
            field?.images.map((image) => (
              <ImageListItem
                key={image._id}
                sx={{
                  width: isMobile ? "100px" : "150px",
                  height: isMobile ? "100px" : "150px",
                  flex: "0 0 auto", // Prevent stretching
                }}
              >
                <img
                  src={image.uri}
                  alt="Ground"
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "8px",
                    objectFit: "cover", // Maintain aspect ratio
                  }}
                />
              </ImageListItem>
            ))
          )}
        </ImageList>
      </Grid>
    </Grid>
  );
}

export default CustomerBooking;
