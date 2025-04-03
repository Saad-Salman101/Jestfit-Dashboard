import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

const LocationSelectionCard = ({ name, image, handleLocationClick, location }) => {
  return (
    <Card
      onClick={() => handleLocationClick(location)}
      sx={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: 200,
        borderRadius: 2,
        boxShadow: 4,
        overflow: "hidden",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 8,
        },
      }}
    >
      {/* Image Section */}
      <CardMedia
        component="img"
        image={image}
        alt={image.description || name}
        sx={{
          width: "50%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      {/* Content Section */}
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: 2,
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold", color: "#333" }}>
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default LocationSelectionCard;
