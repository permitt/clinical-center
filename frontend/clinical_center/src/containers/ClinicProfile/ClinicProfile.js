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
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import GroupIcon from '@material-ui/icons/Group';
import { paper } from '../../assets/jss/material-dashboard-react/components/FormStyle';

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

function ClinicProfile(props) {
    const { email, patient } = props
    const classes = useStyles();


    return (
        <Container component="main">
            <Paper style={paper} elevation={3}>
                <Avatar style={{ backgroundColor: '#7394D7' }} className={classes.large}>
                    <LocalHospitalIcon />
                </Avatar>
                <Typography component="h1" variant="h4">
                    {props.data.name}
                </Typography>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={3}
                    style={{ margin: 10 }}
                >
                    <Grid item xs={6} >
                        <Typography component="h6" variant="h6" >
                            Description:
            </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography component="h6" variant="h6">
                            {props.data.description}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography component="h6" variant="h6">
                            Address:
            </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography component="h6" variant="h6">
                            {props.data.address}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography component="h6" variant="h6">
                            City:
              </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography component="h6" variant="h6">
                            {props.data.city}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography component="h6" variant="h6">
                            Country:
              </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography component="h6" variant="h6">
                            {props.data.country}
                        </Typography>
                    </Grid>

                    <Grid item xs={3}>
                        <Button variant="contained" color="primary" size="large" startIcon={<GroupIcon />}>
                            See doctors
      </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<LocalHospitalIcon />}
                            onClick={() => { props.seeAppointments(props.data.id) }}
                        >
                            See available appointments
      </Button>
                    </Grid>
                </Grid>

            </Paper>
        </Container>
    );
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = {

};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ClinicProfile)
);
