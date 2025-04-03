import React from 'react'

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link, useNavigate } from 'react-router-dom';

import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../authentication/auth-forms/AuthLogin';
import Logo from 'ui-component/Logo';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Button } from '@mui/material';
function Option() {
  const navigate=useNavigate();
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));


  const handleCustomerClick=()=>{
    console.log("clicked")
    navigate("/register")
  }
  const handleVendorClick=()=>{
    console.log("clicked")
    navigate("/vendorRegistration")
  }
  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid minHeight={400} container spacing={2} alignItems="center" justifyContent="center">
                  {/* <Grid item sx={{ mb: 3 }}>
                    <Link to="#" aria-label="logo">
                      <Logo />
                    </Link>
                  </Grid> */}
                  <Grid  item xs={12}>
                    <Grid container direction={{ xs: 'column-reverse', md: 'row' }} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" >
                          <Typography color="secondary.main" gutterBottom variant={downMD ? 'h3' : 'h2'}>
                            Sign up as a ...
                          </Typography>
                          {/* <Typography variant="caption" fontSize="16px" textAlign={{ xs: 'center', md: 'inherit' }}>
                            Enter your credentials to continue
                          </Typography> */}
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid  alignItems={"center"} justifyContent={"center"} fullWidth container gap={5}  >
                    {/* <AuthLogin /> */}
                      <Button onClick={(e)=>(handleCustomerClick(e))}   fullWidth size="large"   variant="contained" color="secondary">
                        Customer
                    </Button>
                      <Button onClick={(e)=>(handleVendorClick(e))}   fullWidth size="large"  variant="contained" color="secondary">
                        Vendor
                    </Button>
                  </Grid>
                  
                  {/* <Grid item xs={12}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      <Typography component={Link} to="/option" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                        Don&apos;t have an account?
                      </Typography>
                    </Grid>
                  </Grid> */}
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid> */}
      </Grid>
    </AuthWrapper1>
  )
}

export default Option