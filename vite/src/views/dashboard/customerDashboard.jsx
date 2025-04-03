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

import { gridSpacing } from "store/constants/constant";

// assets
import StorefrontTwoToneIcon from "@mui/icons-material/StorefrontTwoTone";
import { useSelector } from "react-redux";
import axios from "axios";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const CustomerDashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const user = useSelector((state) => state.user.userDetail);
  console.log(user.role, "<=== user bkl");

  const fetchData = async () => {
    const result = await axios.get(`/booking/dashboard/${user.vendorID.id}`);
    console.log(result?.data?.result, "<=== wow wowo wow");
    setData(result?.data.result);
  };

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
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
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CustomerDashboard;
