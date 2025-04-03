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
  Avatar,
} from "@mui/material";
import axios from "axios";
import AnimateButton from "ui-component/extended/AnimateButton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IconEdit, IconEyeFilled } from "@tabler/icons-react";
import ImageModal from "components/viewImageModal";

function Booking() {
  const user = useSelector((state) => state.user.userDetail);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [imageUrl, setImageUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [totalPage, setTotalPage] = useState("");
  const [resultLimit, setResultLimit] = useState(10);
  const [totalResult, setTotalResult] = useState(0);
  const [changeOccured, setChangeoccured] = useState(false);

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filters, setFilters] = useState({
    paymentStatus: "",
    customerID: "",
    bookingStatus: "",
  });

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
      const response = await axios.get("/order", {
        params: {
          limit: resultLimit,
          page: currentPage,
          customerID: user.role === "admin" ? filters.customerID : user.id,
          paymentStatus: filters.paymentStatus,
          bookingStatus: filters.bookingStatus,
          sortBy: "createdAt:desc",
        },
        headers: {
          // Authorization: loggedInUser.token,
        },
      });
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

  const statusColors = {
    paid: "green",
    cancelled: "red",
    verifying: "orange",
    failed: "grey",
    processing: "blue",
    confirmed: "purple",
  };
  const bookingStatusColors = {
    processing: "blue",
    confirmed: "green",
    cancelled: "red",
    pending: "orange",
    completed: "purple",
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, resultLimit, changeOccured]);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Paper>
      <Box display="flex" justifyContent="flex-start" gap={5} p={2}>
        <TextField
          label="Search by payment status"
          name="paymentStatus"
          value={filters.paymentStatus}
          onChange={handleFilterChange}
        />
        {user.role === "admin" ? (
          <TextField
            label="Search by CustomerID"
            name="customerID"
            value={filters.customerID}
            onChange={handleFilterChange}
          />
        ) : null}

        <TextField
          label="Search by Booking status"
          name="bookingStatus"
          value={filters.bookingStatus}
          onChange={handleFilterChange}
        />
        <AnimateButton>
          <Button
            onClick={() => setChangeoccured(!changeOccured)}
            size="large"
            variant="contained"
            color="secondary"
          >
            Search
          </Button>
        </AnimateButton>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              {/* {user.role === "admin" ? <TableCell>Customer ID</TableCell> : null} */}
              <TableCell>Booking Type</TableCell>
              {user.role === "admin" ? <TableCell>Customer Name</TableCell> : null}
              <TableCell>Payment Status</TableCell>
              <TableCell>Booking Status</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Payment Proof</TableCell>
              {user.role === "admin" ? <TableCell>Options</TableCell> : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{row?.id}</TableCell>
                <TableCell>{row?.type}</TableCell>
                {/* {user.role === "admin" ? <TableCell>{row?.customerID?.id}</TableCell> : null} */}
                {user.role === "admin" ? (
                  <TableCell>
                    {typeof row?.customerID?.firstName === "string"
                      ? row?.customerID?.firstName + " " + row?.customerID?.lastName
                      : "N/A"}
                  </TableCell>
                ) : null}
                <TableCell
                  style={{
                    textTransform: "capitalize",
                    color: statusColors[row?.paymentStatus],
                  }}
                >
                  {row?.paymentStatus}
                </TableCell>
                <TableCell
                  style={{
                    textTransform: "capitalize",
                    color: bookingStatusColors[row?.bookingStatus],
                  }}
                >
                  {row?.bookingStatus}
                </TableCell>
                <TableCell>{row?.amount}</TableCell>
                <TableCell>
                  <Avatar
                    onClick={() => {
                      setImageUrl(row?.image);
                      setShowModal(true);
                    }}
                    src={row?.image}
                  />
                </TableCell>

                <TableCell>
                  <IconEyeFilled
                    onClick={() => navigate("/viewOrder", { state: { id: row?.id } })}
                  />
                  {user.role === "admin" ? (
                    <IconEdit
                      onClick={() => navigate("/updateOrder", { state: { data: row } })}
                    />
                  ) : null}
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
      <ImageModal imageUrl={imageUrl} open={showModal} handleClose={handleClose} />
    </Paper>
  );
}

export default Booking;
