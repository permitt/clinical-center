import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
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
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl'
import Alert from '@material-ui/lab/Alert';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { paper } from '../../assets/jss/material-dashboard-react/components/FormStyle';
import { getPatient, getPatients } from '../../store/actions/PatientsActions'
import { scheduleAppointment } from '../../store/actions/AppointmentActions'
import { convertTime, formatDate } from '../../utils/utils'
import { getTypes } from '../../store/actions/AppointmentTypeActions'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
const { patient, choosen, email } = props
const classes = useStyles();
const [selectedDate, setSelectedDate] = React.useState(new Date());
const [selectedTime, setSelectedTime] = React.useState(new Date());
const [selectedType, setSelectedType] = React.useState('appointment');
const [selectedDoctor, setSelectedDoctor] = React.useState(props.doctorEmail);
const [duration, setDuration] = React.useState()
const [error, setError] = React.useState(props.scheduled.show)
const [choosenPatient, setChoosenPatient] = React.useState('')
const [selectedAppType, setSelectedAppType] = React.useState('')

const handleChangeAppType = (event) => {
  setSelectedAppType(event.target.value);
};

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
    let values = {
      date: formatDate(selectedDate), 
      time: convertTime(selectedTime.toLocaleTimeString()), 
      type : selectedType,
      doctor: selectedDoctor,
      typeApp: selectedAppType
    }
    values['patient'] = choosen ? email : choosenPatient
    if(duration)
      values['duration'] = duration
    props.scheduleAppointment(values)
}

const handleChangePatient = (event) => {
  setChoosenPatient(event.target.value)
};


useEffect(() => {
 setError(false)
},[props.patient])

useEffect(() => {
  setError(props.scheduled.show)
 },[props.scheduled])


useEffect(() => {
    props.getPatient(email)
    props.getTypes()
},[])

useEffect(() => {
  if(!props.choosen)
    props.getPatients()
},[props.choosen])

return (
    <Container component="main">
    <Paper style={paper} elevation={3}>
        <Avatar style={ {backgroundColor: '#7394D7'}} className={classes.large}>
            <LocalHospitalIcon />
        </Avatar>
        {!choosen? (
          <Grid 
          container
          direction="row"
          justify="center"
          alignItems="center" 
          spacing={3}
          style={{margin:10}}
          >
          <Grid item xs={6} align="right">
          <Typography component="h1" variant="h4">
            Patient: 
          </Typography>
        </Grid>
        <Grid item xs={6}>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Patient</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={choosenPatient}
            onChange={handleChangePatient}
            label=""
          >
            {props.patients.map((patient,index) => <MenuItem key={index} value={patient.email}>{patient.firstName} {patient.lastName}</MenuItem> )}
          </Select>
        </FormControl>
          </Grid>
          </Grid>
        ): (
          <Typography component="h1" variant="h4">
            Patient: {patient.firstName + ' ' + patient.lastName}
          </Typography>
        )}
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
          <Grid item xs={3}>
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
          {selectedType === 'appointment' ?
                <Grid item xs={6}>
                 <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Type of</InputLabel>
                    <Select
                      labelId="selecte-type"
                      id="demo-simple-select-outlined-type"
                      value={selectedAppType}
                      onChange={handleChangeAppType}
                      label="Type of"
                    >
                      {props.types.map((type,index) => <MenuItem key={index} value={type.id}>{type.typeName}</MenuItem> )}
                    </Select>
                  </FormControl>
                </Grid>
             : <Grid item xs={6}> 
             <TextField 
                 id="outlined-basic"
                 label="Insert duration [min]" 
                 type="number"
                 variant="outlined" 
                 required
                 onChange={e => setDuration(e.target.value)}
                 />
          </Grid> }
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
        {error && (
          <Grid item xs={12}>
            <Alert severity={props.scheduled.success? "success": "error"} style={{marginTop:'10px'}}>{props.scheduled.msg}</Alert>
          </Grid>
        )
        }
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
    patient: state.patient.current,
    patients: state.patient.all,
    doctors: state.doctor.all,
    doctorEmail: state.authUser.email,
    scheduled: state.appointment.scheduled,
    types: state.type.all
  };
};

const mapDispatchToProps = {
 getPatient, scheduleAppointment, getPatients, getTypes
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Examination)
);