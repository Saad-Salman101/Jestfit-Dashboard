import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ConflictModal = ({
  open,
  conflicts,
  handleClose,
  handleRemoveSlot,
  handleEmptyCart,
  handleContinueToPayment,
}) => (
  <Modal open={open} onClose={handleClose}>
    <Box
      sx={{
        width: "400px",
        bgcolor: "background.paper",
        borderRadius: 2,
        p: 3,
        mx: "auto",
        mt: "15%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Someone Just booked these slots, continue to payment to skip these slots and pay for
        other bookings or abandon cart ?
      </Typography>
      <List dense>
        {conflicts?.map((conflict, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={conflict.bookingData.name}
              secondary={`Date: ${new Date(conflict.bookingData.date).toLocaleDateString()} | Time: ${conflict.bookingData.from} - ${conflict.bookingData.to}`}
            />
            {/* <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="remove"
                onClick={() => handleRemoveSlot(index)}
              >
                <CloseIcon />
              </IconButton>
            </ListItemSecondaryAction> */}
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="outlined" color="error" onClick={handleRemoveSlot}>
          Abandon Cart
        </Button>
        {/* <Button variant="contained" color="primary" onClick={handleContinueToPayment}>
          Continue to Payment
        </Button> */}
      </Box>
    </Box>
  </Modal>
);

export default ConflictModal;
