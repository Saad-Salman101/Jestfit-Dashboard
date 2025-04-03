import { Card, CardContent, Typography, Box, Button } from "@mui/material";

import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router-dom";
import defaultBg from "../assets/images/default-bg.jpg";
import ImageWithFallback from "./ImageLoadout";
import { useSelector } from "react-redux";

const LocationCard = ({ pitch }) => {
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
        {pitch?.images?.length !== 0 ? (
          pitch?.images?.map((image) => (
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
      <CardContent style={{ overflow: "-moz-hidden-scrollable" }}>
        <Typography textAlign={"center"} gutterBottom variant="h3" component="div">
          {pitch?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" overflow={"auto"}>
          {pitch?.description}
        </Typography>
        <Box mt={2}>
          <Typography variant="h4" color="text.primary">
            {pitch?.block}
          </Typography>
          <a href={pitch.locationUrl}>
            <Typography variant="body2" color="text.primary">
              {pitch?.addressLineOne}
            </Typography>
          </a>
        </Box>
        {/* <Box mt={2}>
          <Typography variant="body1" color="text.primary">
            Timings : {pitch.openingTime} - {pitch.closingTime}
          </Typography>
        </Box> */}
        <Box mt={2}>
          <Typography variant="body1" color="text.primary">
            By:
          </Typography>
          <Typography>{pitch.vendorID.companyName}</Typography>
          {/* <Grid container spacing={1} mt={1}>
              {pitch?.slots.map((slot) => (
                <Grid item key={slot._id}>
                  <Chip label={slot.to} variant="outlined" />
                </Grid>
              ))}
            </Grid> */}
        </Box>
        <Box mt={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              user.role != null
                ? navigate(`/customerField?locationID=${pitch.id}`, {
                    state: { id: pitch.id },
                  })
                : navigate(`/fieldDirectly?locationID=${pitch.id}`, {
                    state: { id: pitch.id },
                  })
            }
          >
            Check it out
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LocationCard;
