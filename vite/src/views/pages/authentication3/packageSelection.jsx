import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';


import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../authentication/auth-forms/AuthLogin';
import Logo from 'ui-component/Logo';
import PackageList from 'ui-component/VendorPackage/packageList';
import axios from 'axios';
import { useSelector } from 'react-redux';

function PackageSelection() {
    const user= useSelector((state)=>state.user)
    const [packages,setPackages]=useState([])
    const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const fetchPackages=async()=>{
        try{ 
            const res= await axios.get("/vendorPackage")
            console.log(res.data.result.results,"<==== ress")
            setPackages(res?.data?.result?.results);
        }
            catch(e){
                console.log(e,"<=== ee")
            }

    }
    
    useEffect(()=>{
        fetchPackages();
    },[])
  return (
    <AuthWrapper1 onClick={()=>{console.log(user)}}>
        <Grid container justifyContent="center" alignItems="center">
            <Grid justifyContent={"center"} alignItems={"center"} alignContent={"center"}>
                <Typography variant='h1' >Select Package</Typography>
            </Grid>
            <Grid xs={12} container direction="row" alignContent={"center"} alignItems={"center"} justifyContent={"center"} sx={{ minHeight: '100vh' }}>
                <PackageList packages={packages}/>
            </Grid>
        </Grid>
  </AuthWrapper1>
  )
}

export default PackageSelection