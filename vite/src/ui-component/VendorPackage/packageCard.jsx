import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { userRegistration } from 'store/actions/userActions';
import { useNavigate } from 'react-router-dom';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';



function PackageCard({ pkg }) {
    const user = useSelector((state)=>state?.user)
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const handleSelect=async(id)=>{
        console.log(user)
        console.log(id)
         const res= await  dispatch(userRegistration({...user.registration,vendorPackageID:id}))
          console.log(res,"<==== wow rrrr" )
          if(res.payload===true){
            navigate("/");
          }
    }

    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={`https://via.placeholder.com/150?text=${pkg.name}`}
          alt={pkg?.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h2" component="div" textAlign={"center"}>
            {pkg?.name}
          </Typography>
          <Typography variant="h6" textAlign={"center"} color="text.secondary">
            {pkg?.description}
          </Typography>
          <Typography gutterBottom variant="h1" color="text.primary" mt={10} textAlign={"center"}>
            {pkg?.price} PKR
          </Typography>
        </CardContent>
        <Grid container justifyContent={"center"}>
        <CardActions >
          <Button variant="contained" onClick={(e)=>handleSelect(pkg?.id)} color="secondary" size="small">Select Package</Button>
        </CardActions>
        </Grid>
      </Card>
    );
  }

  export default PackageCard