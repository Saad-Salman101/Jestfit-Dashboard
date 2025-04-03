import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Box,
  Button,
  useMediaQuery,
  Avatar,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { cleanCart, updateCart } from "store/reducers/cartReducer";
import { IconShoppingCartCancel } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropzoneArea from "components/uploadImage";
import { toast } from "react-toastify";
import ConflictModal from "./conflict.modal";
import { setRedirectToCart } from "store/reducers/userReducer";

const Cart = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userDetail);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [orderDetail, setOrderDetail] = useState(true);
  const [image, setImage] = useState([]);
  const [conflictData, setConflictData] = useState([]);
  const downMD = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [openConflictModal, setOpenConlictModal] = useState(false);
  const [disableVerification, setDisableVerification] = useState(false);
  const [paymentButton, setPaymentButton] = useState(false);
  const handleRemoveItem = (_id) => {
    const updatedItems = cartItems.data.filter((item) => item._id !== _id);
    dispatch(updateCart(updatedItems));
  };
  const [isCartVerified, setIsCartVerified] = useState(false);
  useEffect(() => {}, [cartItems.data]);

  const groupedItems = useMemo(() => groupCartItems(cartItems.data), [cartItems.data]);

  const totalAmount = useMemo(() => {
    return cartItems.data.reduce((acc, item) => acc + item.price, 0);
  }, [cartItems.data]);

  const fetchData = async () => {
    try {
      const response = await axios.get("paymentDetail");
      setPaymentDetails(response.data.result.results);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCartVerification = async () => {
    if (user.role === null) {
      dispatch(setRedirectToCart());
      navigate("/register");
      return;
    }
    setDisableVerification(true);
    console.log(cartItems.data, "<=== cart items");
    let payload = {
      cart: cartItems.data,
      type: "web",
    };
    try {
      const response = await axios.post("/order", payload);
      if (response.status === 201) {
        console.log(response.data.result, "<==== saman");
        setIsCartVerified(true);
        setOrderDetail(response.data.result.order);
      }
      console.log(response.data, "<== res");
      console.log(response.cart, "<== res");
    } catch (e) {
      console.log(e, "<=======");
      if (e.response.status === 400) {
        //show modal ,=>
        setOpenConlictModal(true);

        //show slots
        setConflictData(e?.response?.data?.data?.conflicts);
        //remove slot =>
      }
    }
  };

  const removeBookedSlotAndContinue = () => {
    // // Extract slotID and date from each conflicting booking
    const conflictKeys = conflictData.map(({ bookingData }) => ({
      slotID: bookingData.slotID,
      date: new Date(bookingData.date).toISOString(), // Normalize date format
    }));
    console.log(conflictKeys, "<=== conflicts");
    const filteredCart = cartItems?.data.filter((cartItem) => {
      console.log(cartItem._id, "<=== cartitem");
      return !conflictKeys.some(
        (conflict) =>
          cartItem._id === conflict.slotID &&
          new Date(cartItem.date).toISOString() === conflict.date
      );
    });
    console.log(filteredCart, "<====wow");
    // return filteredCart;

    // for (let index = 0; index < conflictKeys.length; index++) {
    //   const element = conflictKeys[index].slotID;
    //   console.log("i ran",index,element)
    //   handleRemoveItem(element);
    // }
    // setOpenConlictModal(false);
  };

  const handleConfirmPayment = async () => {
    setPaymentButton(true);
    try {
      console.log();
      //   const cartData = JSON.stringify(cartItems.data);
      const formData = new FormData();
      console.log(orderDetail, "=== order detial");
      formData.append("orderID", orderDetail.id);
      formData.append("images", image[0]);
      const response = await axios.post("/order/confirmPayment", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      if (response.status === 200) {
        toast.success("Your Booking has been placed");
        dispatch(cleanCart());
        navigate("/booking");
        setImage([]);
        // You can navigate or do additional actions here
      }
    } catch (error) {
      console.log(error);
      toast.error("Oops something went wrong");
      toast.error(error?.response?.data?.data?.message);
    }
    setDisableVerification(false);
    setPaymentButton(false);
  };

  return (
    <Grid
      direction={{ l: "row", xl: "row", sm: "column" }} // Change direction based on screen size
      spacing={4}
      sx={{ width: "100%", gap: 5 }}
    >
      <Box
        sx={{
          padding: 4,
          maxWidth: 400,
          margin: "0 auto",
          boxShadow: 8,
        }}
      >
        <Typography
          onClick={() => {
            // console.log(cartItems, "<==== items raw");
            // console.log(groupedItems, "<==== items raw");
            // console.log(image, "<====");
            console.log(user, "<=== user");
          }}
          color="secondary.main"
          variant={downMD ? "h3" : "h2"}
          sx={{ marginBottom: 2 }}
        >
          Your Bookings
        </Typography>

        {cartItems.data.length === 0 ? (
          <Box sx={{ textAlign: "center", padding: 4 }}>
            <IconShoppingCartCancel size={"small"} />
          </Box>
        ) : (
          <>
            {Object.keys(groupedItems).map((name) => (
              <Card key={name} sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Typography
                    variant="h4"
                    sx={{ marginBottom: 4 }}
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
                                primary={`From: ${slot.to} Till: ${slot.from}`}
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
            <Grid
              container
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={4}
            >
              <Typography variant="h6" textAlign="center">
                Total Amount: {totalAmount} PKR
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  p: 4,
                  textAlign: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ mb: 4 }}
                  size="large"
                  onClick={() => handleCartVerification()}
                  disabled={disableVerification}
                >
                  Continue To Payment
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => navigate("/customerField")}
                >
                  Continue Booking
                </Button>
              </Box>
            </Grid>

            {/* Display total amount and payment details */}
          </>
        )}

        <ConflictModal
          open={openConflictModal}
          conflicts={conflictData}
          handleClose={setOpenConlictModal}
          handleRemoveSlot={() => {
            dispatch(updateCart([]));
            setOpenConlictModal(false);
          }}
          handleContinueToPayment={removeBookedSlotAndContinue}
        />
      </Box>
      {isCartVerified === false ? null : (
        <Box sx={{ mt: 4, padding: 4, maxWidth: 400, margin: "0 auto", boxShadow: 8 }}>
          {/* <Typography variant="h6" textAlign="center">
                Total Amount: {totalAmount} PKR
              </Typography> */}
          <Card sx={{ marginTop: 2 }}>
            <CardContent>
              <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Payment Details
              </Typography>
              <Typography variant="body" sx={{ marginBottom: 2 }}>
                <Typography sx={{ color: "red" }}>
                  Attention: you have 10 minutes to upload proof of payment or else your order
                  will be cancelled and your booked slot will be available for booking again
                  for everyone.
                </Typography>
                Kindly send money to the below mentioned accounts and upload the image as a
                proof payment:
              </Typography>
              <List>
                {paymentDetails.map((detail) => (
                  <React.Fragment key={detail.id}>
                    <ListItem>
                      {/* Add an Avatar or Image for the payment method */}
                      <Avatar
                        src={detail.image}
                        alt={detail.gatewayName}
                        sx={{ marginRight: 2 }}
                      />
                      <ListItemText
                        primary={`${detail.gatewayName} - ${detail.name}`}
                        secondary={`Account# ${detail.accountNumber}`}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
              <DropzoneArea setFieldValue={setImage} values={image} isUseState={true} />
            </CardContent>
          </Card>
          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleConfirmPayment}
              disabled={paymentButton}
            >
              Send Payment
            </Button>
          </Box>
        </Box>
      )}
    </Grid>
  );
};

// Helper function to group items by name and date
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

export default Cart;
