import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { CircularProgress } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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

import { paper } from '../../assets/jss/material-dashboard-react/components/FormStyle';
import { searchDoctors } from '../../store/actions/DoctorActions'
import { getHalls, assignHall } from '../../store/actions/HallActions'

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

function EditAppointment(props) {
const classes = useStyles();
const [selectedDoctor, setSelectedDoctor] = React.useState(props.doctorEmail);
const [error, setError] = React.useState(false)
const [found, setFound] = React.useState(false)
const [clicked, setClicked] = React.useState({clicked: false, hall: {}})

useEffect(() => {
    props.getHalls()
},[])

useEffect(() => {
    console.log(props.doctors, 'doktoriiii')
    console.log(props.app)
    if (clicked) {
      const docAvailable = props.doctors.find(doc => {console.log(doc.email,props.app.doctor); return doc.email === props.app.doctor})
      setFound(false)
    }
}, [props.doctors])

useEffect(() => {
 if(found)
  props.assignHall({date: clicked.hall.available, hall: clicked.hall.id, app: props.app.id})
}, [found])

const checkDoctors = date => {
  console.log('check')
    const dateTime = date.split('  ')
    try {
        props.searchDoctors({date: dateTime[1], time: dateTime[0], type:props.app.typeOf})
    } catch (error) {
     
    }
}

const handleSelect = e => {
  const doctor = e.target.value
  props.assignHall({date: clicked.hall.available, hall: clicked.hall.id, app: props.app.id, doctor: doctor})
  setFound(true)
}

return (
    <Container component="main">
    <Alert severity="warning">
        <Typography className={classes.title} variant="h5" id="tableTitle" component="div">
            There are no available halls for appointment, please choose some of the first available dates for halls.
    </Typography>
  </Alert> 
    {
      !found && clicked.clicked && 
      <Alert severity="warning">
        <Typography className={classes.title} variant="h5" id="tableTitle" component="div">
            Doctor assigned to this appointment is not available at choosen date. Please choose another: 
        </Typography>
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Type of</InputLabel>
            <Select
                labelId="selecte-type"
                id="demo-simple-select-outlined-type"
                value={selectedDoctor}
                onChange={e => handleSelect(e)}
                label="Available doctors"
            >
                {props.doctors.map((doc,index) => <MenuItem key={index} value={doc.email}>{doc.firstName + ' ' + doc.lastName}</MenuItem> )}
            </Select>
            </FormControl>
    </Alert>
     }
     {
       clicked.clicked && found && <Alert severity="success">
       <Typography className={classes.title} variant="h5" id="tableTitle" component="div">
           Date of appointment changed. Hall successfully assigned to appointment!
   </Typography>
 </Alert> 
     }
    <TableContainer component={Paper} style={{margin:20}}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Hall name</TableCell>
            <TableCell align="left">First available date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.halls.map((hall, index) => (
            <TableRow 
                key={index} 
                hover
                onMouseEnter={() => {
                    document.body.style.cursor = "pointer";
                }}
                onMouseLeave={() => {
                    document.body.style.cursor = "default";
                }}
                onClick={() => {setClicked({clicked: true, hall: hall}); checkDoctors(hall.available)}}
            >
              <TableCell component="th" scope="row">
                {hall.name}
              </TableCell>
              <TableCell align="left">{hall.available}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
);
}

const mapStateToProps = state => {
  return {
    doctors: state.doctor.available,
    halls: state.hall.all
  };
};

const mapDispatchToProps = {
 getHalls, searchDoctors, assignHall
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditAppointment)
);