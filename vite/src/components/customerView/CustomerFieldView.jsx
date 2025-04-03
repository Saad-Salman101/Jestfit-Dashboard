import React, { useEffect, useState } from "react";
import {
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  OutlinedInput,
} from "@mui/material";

import FieldCard from "components/fieldCard";
import axios from "axios";
import areas from "data/data";
import { useLocation, useSearchParams } from "react-router-dom";
import { useTheme } from "@emotion/react";

function CustomerFieldView() {
  const [changeOccured, setChangeoccured] = useState(true);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { id } = location.state || {};
  const [name, setName] = useState("");
  const [block, setBlock] = useState("");
  const [search3, setSearch3] = useState("");
  const [cart, setCart] = useState([]);
  const [pitches, setPitches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState("");
  const [resultLimit, setResultLimit] = useState(10);
  const [totalResult, setTotalResult] = useState(0);
  const theme = useTheme();

  const fetchData = async () => {
    const fields = await axios.get("/field", {
      params: {
        locationID: searchParams.get("locationID"),
        limit: 10,
        page: currentPage,
      },
    });
    setPitches(fields.data.result.results);
    setCurrentPage(fields.data.result.page);
    setResultLimit(fields.data.result.limit);
    setTotalPage(fields.data.result.totalPages);
    setTotalResult(fields.data.result.totalResults);
  };

  useEffect(() => {
    fetchData();
  }, [changeOccured]);

  const handleAddToCart = (pitch) => {
    setCart([...cart, pitch]);
  };

  const handlePageChange = (e, v) => {
    setCurrentPage(v);
    setChangeoccured(!changeOccured);
  };
  return (
    <Box sx={{ flexGrow: 1, padding: 2, backgroundColor: theme.palette.background.default }}>
      {/* <Grid
        m={1}
        container
        rowSpacing={5}
        columnSpacing={5}
        gap={5}
        justifyContent="start"
        alignItems="start"
      >
        <FormControl sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="name">Email Address </InputLabel>
          <OutlinedInput
            id="name"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ ...theme.typography.customSelect, minWidth: "200px" }}>
          <InputLabel id="tags-label">Block</InputLabel>
          <Select
            labelId="vendor-ID"
            id="VendorID"
            label="Block"
            value={block}
            onChange={(e) => setBlock(e.target.value)}
            // renderValue={(selected) => selected.join(', ')}
          >
            {areas.map((item, i) => (
              <MenuItem key={i} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button sx={{ margin: 2 }} variant={"contained"} color={"secondary"} size="large">
          Search
        </Button>
      </Grid> */}
      <Typography m={2} variant="h4">
        Select Your Field
      </Typography>

      <Grid
        container
        spacing={1}
        alignContent={"space-around"}
        justifyContent="flex-start"
        rowGap={2}
        columnGap={5}
      >
        {pitches.map((pitch) => (
          <Grid item key={pitch.id} xs={8} sm={5} md={4} lg={3} xl={2}>
            <FieldCard pitch={pitch} onAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
      <Grid mt={4} container justifyContent={"center"} alignContent={"center"}>
        <Pagination
          color="secondary"
          variant="outlined"
          count={parseInt(totalPage)}
          currentPage={currentPage}
          onChange={handlePageChange}
        />
      </Grid>
    </Box>
  );
}

export default CustomerFieldView;
