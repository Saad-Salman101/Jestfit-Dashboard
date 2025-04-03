import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const BookingTooltip = ({ customer, paymentStatus }) => (
  <Box>
    <Typography variant="body2">Customer: {customer.name || "N/A"}</Typography>
    <Typography variant="body2">Email: {customer.email || "N/A"}</Typography>
    <Typography variant="body2">Payment Status: {paymentStatus}</Typography>
  </Box>
);

export default BookingTooltip;
