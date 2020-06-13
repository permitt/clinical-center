import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Avatar from '@material-ui/core/Avatar';
import FilledInput from '@material-ui/core/FilledInput';
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
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl'
import Alert from '@material-ui/lab/Alert';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { paper } from '../../assets/jss/material-dashboard-react/components/FormStyle';
import { getTypes } from '../../store/actions/AppointmentTypeActions'
import { addAvailableAppointment } from '../../store/actions/AppointmentActions'
import { searchHalls } from '../../store/actions/HallActions'
import { searchDoctors } from '../../store/actions/DoctorActions'

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

function AvailableTermsForm(props) {
const classes = useStyles();
const [selectedDate, setSelectedDate] = React.useState();
const [error, setError] = React.useState()
const [selectedAppType, setSelectedAppType] = React.useState()
const [data,setData] = React.useState({price: '', duration:''})
const [selectedHall, setSelectedHall] = React.useState()
const [selectedDoctor, setSelectedDoctor] = React.useState()


const handleDateChange = (date) => {
  setSelectedDate(date);
}

const handleDoctorChange = e => {
  setSelectedDoctor(e.target.value)
}

useEffect(() => {
  if (!selectedDate || !selectedAppType)
    return;
  const dateTime = selectedDate.split('T')
  let query = {}
  try {
      query['date'] = dateTime[0]
      query['time'] = dateTime[1]
  } catch (error) {
      console.log(error)
  }
  
    query['type'] = selectedAppType
    props.searchDoctors(query)

    query['duration'] = data.duration
    props.searchHalls(query)
}, [selectedAppType, selectedDate])

const handleHallChange = e => {
  setSelectedHall(e.target.value)
}

const handleChangeAppType = (event) => {
    const index = event.target.value
    const type = props.types.find(el => el.id === index)
    setData({price: type.price, duration:type.duration})
    setSelectedAppType(event.target.value);
};



const save = () => {
 
  if (!selectedDate || !selectedDoctor || !selectedHall || !selectedAppType){
    alert("Please select all fields")
    return;
  }
  const dateTime = selectedDate.split('T')
  let values = {
    date: dateTime[0], 
    time: dateTime[1], 
    doctor: selectedDoctor,
    type: selectedAppType,
    hall: selectedHall,
  }

  props.addAvailableAppointment(values)
}

useEffect(() => {
  props.getTypes()
},[])

return (
    <Container component="main" maxWidth="md">
    <Paper style={paper} elevation={3}>
        <Avatar style={ {backgroundColor: '#7394D7'}} className={classes.large}>
            <LocalHospitalIcon />
        </Avatar>
        <Grid 
        container
        direction="row"
        justify="center"
        alignItems="center" 
        spacing={1}
        >
          <Grid item xs={6}>
            <Typography component="h6" variant="h6">
                Select date and time:
            </Typography>
          </Grid>
          <Grid item xs={6}  align="center"  style={{marginBottom:'20px'}}>
                <TextField
                    id="datetime-local"
                    label="Select date and time"
                    type="datetime-local"
                    defaultValue={selectedDate}
                    onChange={e => handleDateChange(e.target.value)}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                </Grid>
        <Grid item xs={3}>
            <Typography component="h6" variant="h6">
                Select type:
            </Typography>
          </Grid>
        <Grid item xs={3}>
            <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="aademo-simple-select-outlined-label">Type of</InputLabel>
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
        <Grid item xs={3}>
            <TextField id="outlined-basic" label="Duration" value={data.duration} disabled variant="outlined" />
        </Grid>
        <Grid item xs={3}>
            <TextField id="outlined-basic" label="Price" value={data.price} disabled variant="outlined" InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }} />
        </Grid>
        {selectedAppType && selectedDate && (<>
        <Grid item xs={3}>
            <Typography component="h6" variant="h6">
                Available doctors: 
            </Typography>
        </Grid>
        <Grid item xs={9}>
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Doctors</InputLabel>
            <Select
                labelId="selecte-type"
                id="demo-simple-select-outlined-type"
                value={selectedDoctor}
                onChange={handleDoctorChange}
                label="Type of"
            >
                {props.doctors.map((doc,index) => <MenuItem key={index} value={doc.email}>{doc.firstName + ' ' + doc.lastName}</MenuItem> )}
            </Select>
            </FormControl>
        </Grid>
        <Grid item xs={3}>
            <Typography component="h6" variant="h6">
                Available halls: 
            </Typography>
          </Grid>
          <Grid item xs={9}>
          <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="ademo-simple-select-outlined-label">Halls</InputLabel>
              <Select
                  labelId="selecte-type"
                  id="demo-simple-select-outlined-type"
                  value={selectedHall}
                  onChange={handleHallChange}
                  label="Type of"
              >
                  {props.halls.map((hall,index) => <MenuItem key={index} value={hall.id}>{hall.name}</MenuItem> )}
              </Select>
              </FormControl>
          </Grid>
          </>)
        }

        {error && (
          <Grid item xs={12}>
            <Alert severity={props.scheduled.success? "success": "error"} style={{marginTop:'10px'}}>{props.scheduled.msg}</Alert>
          </Grid>
        )
        }
        <Grid item xs={3}>
          <Button variant="contained" color="primary"  size="large" startIcon={<SaveIcon />} onClick={save}>
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
    halls: state.hall.all,
    doctors: state.doctor.available,
    types: state.type.all
  };
};

const mapDispatchToProps = {
  searchDoctors, searchHalls, getTypes, addAvailableAppointment
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AvailableTermsForm)
);