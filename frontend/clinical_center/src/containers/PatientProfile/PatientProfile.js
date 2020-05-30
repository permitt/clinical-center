import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import Favorite from '@material-ui/icons/Favorite';

import { paper } from '../../assets/jss/material-dashboard-react/components/FormStyle';
import { getPatient } from '../../store/actions/PatientsActions'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));

function PatientProfile(props) {
const { email, patient } = props
const classes = useStyles();

useEffect(() => {
    props.getPatient(email)
},[])
return (
    <Container component="main">
    <Paper style={paper} elevation={3}>
        <Avatar style={ {backgroundColor: '#7394D7'}} className={classes.large}>
            <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
            {patient.firstName + ' ' + patient.lastName}
        </Typography>
        <Grid 
        container
        direction="row"
        justify="center"
        alignItems="center" 
        spacing={3}
        style={{margin:10}}
        >
          <Grid item xs={6} >
            <Typography component="h6" variant="h6" >
              Email:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="h6" variant="h6">
              {patient.email}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="h6" variant="h6">
              Policy number: 
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="h6" variant="h6">
              {patient.policyNumber}
              </Typography>
          </Grid>
          <Grid item xs={6}>
          <Typography component="h6" variant="h6">
              City:
              </Typography>
          </Grid>
          <Grid item xs={6}>
          <Typography component="h6" variant="h6">
                  {patient.city}
              </Typography>
          </Grid>
          <Grid item xs={6}>
          <Typography component="h6" variant="h6">
                  Country:
              </Typography>
          </Grid>
          <Grid item xs={6}>
          <Typography component="h6" variant="h6">
                  {patient.country}
              </Typography>
          </Grid>
          <Grid item xs={6}>
          <Typography component="h6" variant="h6">
                  Address:
              </Typography>
          </Grid>
          <Grid item xs={6}>
          <Typography component="h6" variant="h6">
                  {patient.address}
              </Typography>
          </Grid>
          <Grid item xs={6}>
          <Typography component="h6" variant="h6">
              Phone number:
              </Typography>
          </Grid>
          <Grid item xs={6}>
          <Typography component="h6" variant="h6">
                  {patient.phoneNumber}
              </Typography>
          </Grid>
          <Grid item xs={3}>
          <Button variant="contained" color="primary"  size="large" startIcon={<Favorite />}>
        See health card
      </Button>
          </Grid>
          <Grid item xs={3}>
          <Button variant="contained" color="primary"  size="large" startIcon={<LocalHospitalIcon />}>
          Start examination
      </Button>
          </Grid>
      </Grid>
      
    </Paper> 
    </Container>
);
}

const mapStateToProps = state => {
  return {
    patient: state.patient.current
  };
};

const mapDispatchToProps = {
 getPatient
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PatientProfile)
);
