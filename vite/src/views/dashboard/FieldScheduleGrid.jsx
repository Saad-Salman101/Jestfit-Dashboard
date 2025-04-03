import { Grid, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import BookingTooltip from "./BookingToolTip";
import React from "react";

const FieldScheduleGrid = ({ selectedLocation }) => {
  // Generate 30-minute time slots
  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hours = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    const period = hours < 12 ? "AM" : "PM";
    const formattedHour = hours % 12 || 12;
    console.log(formattedHour, "<====h");
    console.log(`${formattedHour}:${minutes} ${period}`);
    return formattedHour < 10
      ? `${"0" + formattedHour}:${minutes} ${period}`
      : `${formattedHour}:${minutes} ${period}`;
  });

  return (
    <Box sx={{ width: "95%", margin: "auto", marginTop: 4 }}>
      <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 2 }}>
        Selected Location: {selectedLocation.location.name}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `100px repeat(${selectedLocation.location.fields.length}, 1fr)`,
          gridAutoRows: "30px",
          border: "1px solid #e0e0e0",
        }}
      >
        {/* Header Row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f5f5f5",
            borderRight: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="subtitle1">Time Slots</Typography>
        </Box>
        {selectedLocation.location.fields.map((field) => (
          <Box
            key={field._id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f5f5f5",
              borderRight: "1px solid #e0e0e0",
            }}
          >
            <Typography variant="subtitle1">{field.name}</Typography>
          </Box>
        ))}

        {/* Time Slots and Fields */}
        {timeSlots.map((slot, index) => (
          <React.Fragment key={slot}>
            {/* Time Slot Label */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderBottom: "1px solid #e0e0e0",
                borderRight: "1px solid #e0e0e0",
                backgroundColor: "#fafafa",
              }}
            >
              <Typography variant="text">{slot}</Typography>
            </Box>

            {/* Field Booking Slots */}
            {selectedLocation.location.fields.map((field) => {
              console.log(slot, "<=== bookings");
              const booking = field.bookings.find((b) => b.to === slot);
              return (
                <Box
                  key={`${field._id}-${slot}`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: "1px solid #e0e0e0",
                    borderRight: "1px solid #e0e0e0",
                    backgroundColor: booking ? "#90caf9" : "#ffffff",
                    cursor: booking ? "pointer" : "default",
                    position: "relative", // For tooltip
                  }}
                >
                  {booking ? (
                    <Tooltip
                      sx={{ color: "white" }}
                      title={
                        <div>
                          <Typography variant="body2">
                            Customer: {booking.orderDetails.customerDetails?.name || "N/A"}
                          </Typography>
                          <Typography variant="body2">
                            Email: {booking.orderDetails.customerDetails?.email || "N/A"}
                          </Typography>
                          <Typography variant="body2">
                            Payment Status: {booking.orderDetails.paymentStatus}
                          </Typography>
                        </div>
                      }
                    >
                      <Typography variant="body2">Booked</Typography>
                    </Tooltip>
                  ) : (
                    <Typography variant="body2">-</Typography>
                  )}
                </Box>
              );
            })}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default FieldScheduleGrid;
