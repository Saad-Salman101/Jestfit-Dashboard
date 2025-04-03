import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField, Box, Button } from '@mui/material';

import axios from 'axios';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { IconEdit, IconEyeFilled} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';


function Vendor() {
  const navigate=useNavigate();
  const user=useSelector((state)=>state.user.userDetail)
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState("");
  const [resultLimit, setResultLimit] = useState(10);
  const [totalResult, setTotalResult] = useState(0);
  const [changeOccured, setChangeoccured] = useState(false);

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filters, setFilters] = useState({ name: '', email: '', role: '' });

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
      const response = await axios.get("user", {
        params: {
          limit: resultLimit,
          page: currentPage,
          role:"vendor"
          // email: email === "" ? null : email,
          // contactNumber: contactNumber === "" ? null : contactNumber,
        },
        headers: {
          // Authorization: loggedInUser.token,
        },
      });
      console.log(response.data.result,"<====");
      setData(response?.data?.result.results);
      setCurrentPage(response?.data?.result.page);
      setResultLimit(response?.data?.result.limit);
      setTotalPage(response?.data?.result.totalPages);
      setTotalResult(response?.data?.result.totalResults);
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


    const statusColors = {
    active: 'green',
    inactive: 'red',
    pending: 'orange',
    suspeneded: 'grey',
  };
  return (
    <Paper>
    <Box display="flex" justifyContent="flex-start" gap={5} p={2}>
      <TextField
        label="Search by Name"
        name="Company Name"
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
          <Button   size="large" variant="contained"  color="secondary">
            Search
          </Button>
        </AnimateButton>
    </Box>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {/* <TableCell>Name</TableCell> */}
            <TableCell>Company Name</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Slogan</TableCell>
            <TableCell>Selected Package</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,index) => (
            <TableRow key={row.index}>
              {/* <TableCell>{row.name}</TableCell> */}
              <TableCell>{row.vendorID?.companyName}</TableCell>
              <TableCell>{row.firstName+" "+row.lastName}</TableCell>
              <TableCell>{row?.email}</TableCell>
              <TableCell>{row?.vendorID?.companyPhoneNumber}</TableCell>
              <TableCell>{row?.vendorID.slogan}</TableCell>
              <TableCell>{row?.vendorID.vendorPackageID !==null ? row.vendorID?.vendorPackageID?.name:"none" }</TableCell>
              <TableCell>{row?.vendorID.status}</TableCell>
              <TableCell style={{textTransform:"capitalize",color:statusColors[row?.vendorID?.status]}}>{row?.vendorID?.status}</TableCell>
              <TableCell >
              {/* <IconEyeFilled onClick={()=>(navigate("/viewOrder",{state:{id:row?.id}}))} /> */}
              {user.role==="admin"?<IconEdit onClick={()=>(navigate("/updateVendor",{state:{data:row}}))}/> :null}
              {/* {row?.vendorID.status==="inactive"?<IconToggleLeftFilled/>:<IconToggleRightFilled/>} */}
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
  )
}

export default Vendor