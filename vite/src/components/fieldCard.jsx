import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Button,
  Chip,
} from "@mui/material";

import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router-dom";
import defaultBg from "../assets/images/default-bg.jpg";
import ImageWithFallback from "./ImageLoadout";
import { useSelector } from "react-redux";

const LocationCard = ({ pitch, onAddToCart }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userDetail);

  return (
    <Card
      sx={{
        minHeight: 600,
        maxWidth: 250,
        margin: "auto",
        minWidth: 250,
        borderRadius: "16px",
        boxShadow: 8,
      }}
    >
      <Carousel>
        {pitch.images.length !== 0 ? (
          pitch.images.map((image) => (
            // <img
            //   fallbackSrc={defaultBg}
            //   key={image._id}
            //   src={image.uri}
            //   alt={pitch.name}
            //   style={{ width: "100%", height: "240px", objectFit: "cover" }}
            // />
            <ImageWithFallback
              fallbackSrc={defaultBg}
              key={image._id}
              src={image.uri}
              alt={pitch.name}
              style={{
                width: "100%",
                maxHeight: "240px",
                height: "240px",
                objectFit: "cover",
              }}
            />
          ))
        ) : (
          <img
            src={defaultBg}
            alt="default img"
            style={{ width: "100%", maxHeight: "240px", height: "240px", objectFit: "cover" }}
          ></img>
        )}
      </Carousel>
      <CardContent>
        <Typography textAlign={"center"} gutterBottom variant="h3" component="div">
          {pitch?.name}
        </Typography>

        <Typography variant="h5" color="text.secondary">
          {pitch?.price} PKR
        </Typography>
        <Box mt={2}>
          <Typography variant="h4" color="text.primary">
            {pitch?.sportTypeID?.name}
          </Typography>
        </Box>
        <Box mt={2}></Box>
        <Box
          gap={1}
          sx={{
            maxHeight: "100px", // Set the maximum height for the tags container
            overflowY: "auto", // Enable vertical scrolling
            display: "flex", // Use flexbox to align items in a row
            whiteSpace: "nowrap", // Prevent tags from wrapping to a new line
          }}
        >
          {pitch?.slots?.map((slot) => (
            <Grid item key={slot._id}>
              <Chip label={slot.to} variant="outlined" />
            </Grid>
          ))}
        </Box>
        <Box mt={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              user.role !== null
                ? navigate(`/customerBooking`, { state: { id: pitch.id } })
                : navigate(`/customerBookingDirectly`, { state: { id: pitch.id } })
            }
          >
            Book Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LocationCard;
