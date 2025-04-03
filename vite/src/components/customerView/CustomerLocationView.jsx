import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Typography,
  OutlinedInput,
} from "@mui/material";

import LocationCard from "components/locationCard";
import axios from "axios";
import areas from "data/data";
import { useTheme } from "@emotion/react";

function CustomerLocationView() {
  const [changeOccured, setChangeoccured] = useState(true);
  const [name, setName] = useState("");
  const [block, setBlock] = useState("");
  const [cart, setCart] = useState([]);
  const [pitches, setPitches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [resultLimit, setResultLimit] = useState(10);
  const [totalResult, setTotalResult] = useState(0);
  const theme = useTheme();

  const fetchData = async () => {
    const fields = await axios.get("/location", {
      params: {
        limit: 10,
        page: currentPage,
        name,
        block,
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
      <Grid
        m={1}
        container
        rowSpacing={2}
        columnSpacing={2}
        gap={5}
        justifyContent="start"
        alignItems="start"
      >
        <FormControl sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="name">Name </InputLabel>
          <OutlinedInput
            id="name"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ ...theme.typography.customSelect, width: "200px" }}>
          <InputLabel id="tags-label">Block</InputLabel>
          <Select
            labelId="vendor-ID"
            id="VendorID"
            label="Block"
            value={block}
            onChange={(e) => setBlock(e.target.value)}
            // renderValue={(selected) => selected.join(', ')}
          >
            <MenuItem key="null" value="">
              none
            </MenuItem>
            {areas.map((item, i) => (
              <MenuItem key={i} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          sx={{ mt: 2 }}
          variant={"contained"}
          onClick={() => setChangeoccured(!changeOccured)}
          color={"secondary"}
          size="large"
        >
          Search
        </Button>
      </Grid>
      <Typography m={2} variant="h4">
        Select Your Venue
      </Typography>
      <Grid
        container
        spacing={1}
        alignContent={"space-evenly"}
        justifyContent="flex-start"
        rowGap={2}
        columnGap={5}
      >
        {pitches.map((pitch) => (
          <Grid item key={pitch.id} xs={8} sm={5} md={4} lg={3} xl={2}>
            <LocationCard pitch={pitch} onAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
      <Grid mt={4} container justifyContent={"center"} alignContent={"center"}>
        <Pagination
          color="secondary"
          variant="outlined"
          count={parseInt(totalPage)}
          currentpage={parseInt(currentPage)}
          onChange={handlePageChange}
        />
      </Grid>
    </Box>
  );
}

export default CustomerLocationView;
