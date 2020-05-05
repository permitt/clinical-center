import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { root, main, button } from '../../assets/jss/material-dashboard-react/components/WelcomePageStyle'
import { LOGIN, REGISTER } from '../../routes'
  
function WelcomePage() {

  return (
    <div style={root}>
      <Helmet>
        <title>Welcome</title>
      </Helmet>
      <Grid container justify="flex-end">
        <Button
          component={RouterLink}
          to={LOGIN}
          variant="outlined"
          color="primary"
          style={button}
        >
            Login
        </Button>
        <Button
          component={RouterLink}
          to={REGISTER}
          variant="contained"
          color="primary"
          style={button}
        >
          Register
        </Button>
      </Grid>
      <Container component="main" style={main} maxWidth="md">
        <Typography variant="h2" component="h1" gutterBottom>
            Clinical centers 
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
        A clinic (or outpatient clinic or ambulatory care clinic) is a healthcare facility that is primarily focused on the care of outpatients. Clinics can be privately operated or publicly managed and funded. They typically cover the primary healthcare needs of populations in local communities, in contrast to larger hospitals which offer specialised treatments and admit inpatients for overnight stays.
        </Typography>
      </Container>
    </div>
  );
}

export default WelcomePage;