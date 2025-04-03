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
import VendorDashboard from "./vendorDashboard";
import CustomerDashboard from "./customerDashboard";
import AdminDashboard from "./adminDashboard";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  // const [isLoading, setLoading] = useState(true);
  // const [data, setData] = useState({});
  const user = useSelector((state) => state.user.userDetail);
  // console.log(user.role, "<=== user bkl");

  // const fetchData = async () => {
  //   const result = await axios.get(`/booking/dashboard/${user.vendorID.id}`);
  //   console.log(result?.data?.result, "<=== wow wowo wow");
  //   setData(result?.data.result);
  // };

  // useEffect(() => {
  //   // fetchData();
  //   setLoading(false);
  // }, []);

  return (
    <>
      {user.role === "vendor" ? <VendorDashboard /> : null}
      {user.role === "customer" ? <CustomerDashboard /> : null}
      {user.role === "admin" ? <AdminDashboard /> : null}
    </>
  );
};

export default Dashboard;
