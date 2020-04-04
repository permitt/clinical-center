import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { root, main, button } from '../styles/WelcomePageStyle'
import { LOGIN, REGISTER } from '../routes'
  

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
            Neki naslov
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
            Neki malo duzi podnaslov. Ovo u sustini mozemo i izbaciti. Ali bi bilo okej posle da ubacimo neku i sliku i da ovo bude kao pocetna stranica za klinicki centar.
        </Typography>
      </Container>
    </div>
  );
}

export default WelcomePage;