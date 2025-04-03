import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Grid,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ImageModal from "components/viewImageModal";

const OrderDetails = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const [data, setData] = useState({});
  const getValue = (value, fallback = "N/A") => (value ? value : fallback);
  const [imageUrl, setImageUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const formatDate = (date) => {
    return date
      ? new Intl.DateTimeFormat("en-GB", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date(date))
      : "N/A";
  };

  const fetchData = async () => {
    const fields = await axios.get("/order/" + id);
    setData(fields.data.result);
    console.log(fields.data.result);
  };

  const groupBookingsByLocationAndDate = (bookings) => {
    const groupedBookings = {};

    bookings.forEach((booking) => {
      const locationName = booking.locationID.name;
      const date = new Date(booking.date).toLocaleDateString();

      if (!groupedBookings[locationName]) {
        groupedBookings[locationName] = {};
      }

      if (!groupedBookings[locationName][date]) {
        groupedBookings[locationName][date] = [];
      }

      groupedBookings[locationName][date].push(booking);
    });

    return groupedBookings;
  };
  const groupedBookings = data.bookings ? groupBookingsByLocationAndDate(data.bookings) : {};

  const handleClose = () => {
    setShowModal(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={4}>
        {/* First Card: Booking Details */}
        <Grid item xs={12} md={6}>
          <Card sx={{ marginBottom: 4 }}>
            <CardContent>
              {/* Booking Details */}
              <Typography variant="h2" gutterBottom>
                Booking Details
              </Typography>
              <Typography variant="body1">
                <strong>Payment Status:</strong> {getValue(data?.order?.paymentStatus)}
              </Typography>
              <Typography variant="body1">
                <strong>Booking Status:</strong> {getValue(data?.order?.bookingStatus)}
              </Typography>
              <Typography variant="body1">
                <strong>Amount:</strong> {getValue(data?.order?.amount)} PKR
              </Typography>
              <Typography variant="body1">
                <strong>Booking Date:</strong> {formatDate(data?.order?.createdAt)}
              </Typography>
              <Divider sx={{ marginY: 2 }} />

              {/* Customer Information */}
              <Typography variant="h3" gutterBottom>
                Customer Information
              </Typography>
              <Typography variant="body1">
                <strong>Name:</strong>{" "}
                {typeof data?.order?.customerID?.firstName === "string"
                  ? getValue(
                      data?.order?.customerID?.firstName +
                        " " +
                        data?.order?.customerID?.lastName
                    )
                  : getValue(data?.order?.customerName)}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {getValue(data?.order?.customerID?.email)}
              </Typography>
              <Typography variant="body1">
                <strong>Phone Number:</strong> {getValue(data?.order?.customerID?.phoneNumber)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Second Card: Image or Text */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "280px",
            }}
          >
            {data?.order?.image !== "N/A" ? (
              <Box
                onClick={() => {
                  if (data?.order?.image) {
                    setImageUrl(data?.order?.image);
                    setShowModal(true);
                  }
                }}
                component="img"
                src={data?.order?.image}
                alt="Booking Image"
                sx={{ width: "80%", height: "90%", borderRadius: 2, cursor: "pointer" }}
              />
            ) : (
              <Typography variant="h3" color="text.secondary">
                Fast Booking
              </Typography>
            )}
          </Card>
        </Grid>
      </Grid>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Bookings
          </Typography>
          {Object.keys(groupedBookings).map((locationName) => (
            <Box key={locationName} sx={{ marginBottom: 4 }}>
              <Typography variant="h6" gutterBottom>
                Location: {locationName}
              </Typography>
              {Object.keys(groupedBookings[locationName]).map((date) => (
                <Box key={date} sx={{ marginBottom: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Date: {date}
                  </Typography>
                  <List>
                    {groupedBookings[locationName][date].map((booking, index) => (
                      <React.Fragment key={booking.id}>
                        {index > 0 && <Divider />}
                        <ListItem alignItems="flex-start">
                          <Avatar
                            src={`${booking.fieldID.images[0]?.uri}`}
                            alt={booking.locationID.name}
                            variant="rounded"
                            sx={{ width: 56, height: 56, marginRight: 2 }}
                          />
                          <ListItemText
                            primary={`Field: ${booking.fieldID.name}`}
                            secondary={
                              <>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {`From: ${booking.from} To: ${booking.to}`}
                                </Typography>
                                <br />
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {`Price: ${booking.price} PKR`}
                                </Typography>
                              </>
                            }
                          />
                        </ListItem>
                      </React.Fragment>
                    ))}
                  </List>
                </Box>
              ))}
            </Box>
          ))}
        </CardContent>
      </Card>
      <ImageModal imageUrl={imageUrl} open={showModal} handleClose={handleClose} />
    </Box>
  );
};

export default OrderDetails;
