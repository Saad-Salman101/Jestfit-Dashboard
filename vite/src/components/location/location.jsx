import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  Box,
  Button,
} from "@mui/material";
import axios from "axios";
import AnimateButton from "ui-component/extended/AnimateButton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IconEdit } from "@tabler/icons-react";

function Location() {
  const user = useSelector((state) => state.user.userDetail);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState("");
  const [resultLimit, setResultLimit] = useState(10);
  const [totalResult, setTotalResult] = useState(0);
  const [changeOccured, setChangeoccured] = useState(false);

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filters, setFilters] = useState({ name: "", email: "", role: "" });

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("location", {
        params: {
          limit: resultLimit,
          page: currentPage,
          vendorID: user.role === "vendor" ? user.vendorID.id : "",
          // email: email === "" ? null : email,
          // contactNumber: contactNumber === "" ? null : contactNumber,
        },
        headers: {
          // Authorization: loggedInUser.token,
        },
      });
      console.log(response.data.result, "<====");
      setData(response.data.result.results);
      setCurrentPage(response.data.result.page);
      setResultLimit(response.data.result.limit);
      setTotalPage(response.data.result.totalPages);
      setTotalResult(response.data.result.totalResults);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setResultLimit(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, resultLimit, changeOccured]);

  return (
    <Paper>
      <Box
        onClick={() => {
          console.log(user);
        }}
        display="flex"
        justifyContent="flex-start"
        gap={5}
        p={2}
      >
        <TextField
          label="Search by Name"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
        />
        <TextField
          label="Search by Email"
          name="email"
          value={filters.email}
          onChange={handleFilterChange}
        />
        <TextField
          label="Search by Role"
          name="role"
          value={filters.role}
          onChange={handleFilterChange}
        />
        <AnimateButton>
          <Button sx={{ height: "50px" }} size="large" variant="contained" color="secondary">
            Search
          </Button>
        </AnimateButton>
        {user.role === "vendor" || user.role === "admin" ? (
          <AnimateButton>
            <Button
              onClick={() => navigate("/createLocation")}
              sx={{ height: "50px" }}
              size="large"
              variant="contained"
              color="secondary"
            >
              Add Venue
            </Button>
          </AnimateButton>
        ) : null}
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Opening Time</TableCell>
              <TableCell>Closing Time</TableCell>
              <TableCell>Owned By</TableCell>
              <TableCell>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row.index}>
                <TableCell>{row?.name}</TableCell>
                <TableCell>{row?.description}</TableCell>
                <TableCell>{row?.addressLineOne}</TableCell>
                <TableCell>{row?.city}</TableCell>
                <TableCell>{row?.openingTime}</TableCell>
                <TableCell>{row?.closingTime}</TableCell>
                <TableCell>{row?.vendorID?.companyName}</TableCell>
                <TableCell>
                  <IconEdit
                    onClick={() =>
                      navigate(`/updateLocation?locationID=${row?.id}`, {
                        state: { id: row?.id },
                      })
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalResult}
        defaultpage={1}
        page={currentPage - 1}
        onPageChange={handleChangePage}
        rowsPerPage={resultLimit}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default Location;
