import { useEffect, useState } from "react";

// material-ui
import Grid from "@mui/material/Grid";

// project imports
import EarningCard from "./EarningCard";
import PopularCard from "./PopularCard";
import TotalOrderLineChartCard from "./TotalOrderLineChartCard";
import TotalIncomeDarkCard from "./TotalIncomeDarkCard";
import TotalIncomeLightCard from "./TotalIncomeLightCard";
import TotalGrowthBarChart from "./TotalGrowthBarChart";
import defaultBg from "../../assets/images/default-bg.jpg";

import { gridSpacing } from "store/constants/constant";

// assets
import StorefrontTwoToneIcon from "@mui/icons-material/StorefrontTwoTone";
import { useSelector } from "react-redux";
import axios from "axios";
import { Card, CardContent, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Slider from "react-slick";
import ImageWithFallback from "components/ImageLoadout";
import LocationSelectionCard from "./LocationSelectionCard";
import FieldScheduleGrid from "./FieldScheduleGrid";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const VendorDashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const user = useSelector((state) => state.user.userDetail);
  console.log(user.role, "<=== user bkl");

  const fetchData = async () => {
    const result = await axios.get(`/booking/dashboard/${user.vendorID.id}`);
    setData(result?.data.result.statistics);
    setLocations(result?.data?.result?.getBookings);
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, []);

  return (
    <Grid sx={{ justifyContent: "center" }} container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard data={data} isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard data={data} isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeDarkCard data={data} isLoading={isLoading} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeLightCard
                  {...{
                    isLoading: isLoading,
                    total: data?.overall?.cancelledOrders,
                    label: "Total Cancelled Bookings",
                    icon: <StorefrontTwoToneIcon fontSize="inherit" />,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* WOW */}

      <Grid
        xs={12}
        onClick={() => {}}
        container
        sx={{ gap: 5, mt: 4, width: "80%", justifyContent: "center" }}
      >
        {/* Slider for locations */}
        {locations.map((location, index) => (
          <LocationSelectionCard
            location={location}
            handleLocationClick={handleLocationClick}
            key={location?.location?.name}
            name={location.location.name}
            image={location.location.images[0].uri}
          />
        ))}
      </Grid>
      {/* Schedule View */}
      {selectedLocation && <FieldScheduleGrid selectedLocation={selectedLocation} />}
    </Grid>
  );
};

export default VendorDashboard;
