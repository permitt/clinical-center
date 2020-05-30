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
import TextField from '@material-ui/core/TextField';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import SaveIcon from '@material-ui/icons/Save';
import DateFnsUtils from '@date-io/date-fns';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { paper } from '../../assets/jss/material-dashboard-react/components/FormStyle';
import { getPatient } from '../../store/actions/PatientsActions'
import { scheduleAppointment } from '../../store/actions/AppointmentActions'
import { convertTime, formatDate } from '../../utils/utils'

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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
  }));

function Examination(props) {
const { email, patient } = props
const classes = useStyles();
const [selectedDate, setSelectedDate] = React.useState(new Date());
const [selectedTime, setSelectedTime] = React.useState(new Date());
const [selectedType, setSelectedType] = React.useState('appointment');

const handleChange = (event) => {
    setSelectedType(event.target.value);
};

const handleDateChange = (date) => {
  setSelectedDate(date);
};
const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

const schedule = () => {
    let values = {date: formatDate(selectedDate), time: convertTime(selectedTime.toLocaleTimeString()), type : selectedType}
    values['patient'] = email
    console.log(values)
    props.scheduleAppointment(values)
}


useEffect(() => {
    props.getPatient(email)
},[])
return (
    <Container component="main">
    <Paper style={paper} elevation={3}>
        <Avatar style={ {backgroundColor: '#7394D7'}} className={classes.large}>
            <LocalHospitalIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
            Examined patient: {patient.firstName + ' ' + patient.lastName}
        </Typography>
        <Grid 
        container
        direction="row"
        justify="center"
        alignItems="center" 
        spacing={3}
        style={{margin:10}}
        >
          <Grid item xs={12} >
            <Typography  variant="h6" component="h2">
                Insert information about examination
            </Typography>
            <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    defaultValue=""
                    variant="outlined"
                    fullWidth
                />
          </Grid>
          <Grid item xs={3}>
            <Typography component="h6" variant="h6">
              Schedule next:
            </Typography>
          </Grid>
          <Grid item xs={9}>
          <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={selectedType}
          onChange={handleChange}
          label="Type"
        >
          <MenuItem value={'appointment'}>Appointment</MenuItem>
          <MenuItem value={'operation'}>Operation</MenuItem>
        </Select>
      </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Typography component="h6" variant="h6">
                Date:
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                />
            </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={3}>
            <Typography component="h6" variant="h6">
                Time:
            </Typography>
        </Grid>
        <Grid item xs={9}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time picker"
                value={selectedTime}
                onChange={handleTimeChange}
                KeyboardButtonProps={{
                    'aria-label': 'change time',
                }}
                />
            </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" color="primary"  size="large" startIcon={<SaveIcon />} onClick={schedule}>
            Save
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
 getPatient, scheduleAppointment
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Examination)
);
