import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PackageCard from './packageCard';


function PackageList({packages}) {
    return (
      <Box sx={{ }}>
        <Grid container spacing={8}>
          {packages.map((pkg) => (
            <Grid item xs={12} sm={6} md={4} key={pkg.id}>
              <PackageCard pkg={pkg} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  export default PackageList