import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField, Box, Button } from '@mui/material';
import axios from 'axios';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function SportType() {
  const user=useSelector((state)=>state.user.userDetail)
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
      const response = await axios.get("/sportType", {
        params: {
          limit: resultLimit,
          page: currentPage,
          // email: email === "" ? null : email,
          // contactNumber: contactNumber === "" ? null : contactNumber,
        },
        headers: {
          // Authorization: loggedInUser.token,
        },
      });
      console.log(response.data.result,"<====");
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
    <Paper >
    <Box display="flex" justifyContent="flex-start" gap={5} p={2}>
      <TextField
        label="Search by Name"
        name="name"
        value={filters.name}
        onChange={handleFilterChange}
      />
       <AnimateButton>
          <Button   size="large" variant="contained"  color="secondary">
            Search
          </Button>
        </AnimateButton>
        {user.role==="vendor" || user.role==="admin"?  <AnimateButton>
          <Button onClick={()=>navigate("/CreateSportType")}   size="large" variant="contained"  color="secondary">
            Add Sports Type
          </Button>
        </AnimateButton>:null}
       
    </Box>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,index) => (
            <TableRow key={row.index}>
              <TableCell>{row?.name}</TableCell>
              <TableCell>{row?.description}</TableCell>
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

export default SportType