import React from "react";
import { Button,  Grid } from "@mui/material";
import landingPageBG from "../../assets/images/landingpage-bg.jpg";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/images/JESTFIT.png";
import CustomerLocationView from "components/customerView/CustomerLocationView";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Grid
        sx={{
          backgroundImage: `url(${landingPageBG})`,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <img src={logoImage} alt="new" style={{ width: "300px" }}></img>
        {/* <Typography textTransform={"capitalize"} color={"white"} variant="h1">
        Jestfit
      </Typography> */}
        <Button onClick={() => navigate("/login")} variant="contained" color="secondary">
          Start Your Journey Now
        </Button>
      </Grid>
      <CustomerLocationView />
      {/* <LocationCarousel itemsToShow={5} /> */}
    </>
  );
};

export default LandingPage;
