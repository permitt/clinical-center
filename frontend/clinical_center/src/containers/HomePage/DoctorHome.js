import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import PeopleIcon from '@material-ui/icons/People';
import TodayIcon from '@material-ui/icons/Today';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import WorkOffIcon from '@material-ui/icons/WorkOff';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PersonIcon from '@material-ui/icons/Person';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import PatientSearchBar from '../../containers/SearchBar/PatientSearchBar'
import styles from "../../assets/jss/material-dashboard-react/layouts/homeStyle.js";
import Sidebar from "../../components/Sidebar/Sidebar"
import PatientList from "../PatientList/PatientList"
import { getPatients } from '../../store/actions/PatientsActions'
import { EDIT_PROFILE } from '../../routes';
import PatientProfile from '../PatientProfile/PatientProfile'
import Examination from '../Examination/Examination'
import { formatDate } from '../../utils/utils'
import { createRequest } from '../../store/actions/HolidayRequestActions'

const useStyles = makeStyles(styles);

function DoctorHome(props) {
  const classes = useStyles();
  const [state, setState ] =  React.useState({
    renderTable: false, 
    viewPatient: false, 
    email: null,
    startExamination: false,
    holiday: false
  })
  const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const showPatients = () => {
    setState({
      renderTable: true, 
      viewPatient: false, 
      email: null,
      startExamination: false,
      holiday: false
    })
    props.getPatients()
  }
  
  const sortPatients = sortBy => {
    props.getPatients({'sort': sortBy})
  }

  const showPatient = email => {
    console.log(email)
    setState({
      renderTable: false, 
      viewPatient: true, 
      email: email,
      startExamination: false,
      holiday: false
    })
  }

  
  const startExamination = () => {
    setState({...state,
      renderTable: false, 
      viewPatient: false, 
      startExamination: true,
      holiday: false
    })
  }

  const createHolidayRequest = () => {
    setState({...state,
      renderTable: false, 
      viewPatient: false, 
      startExamination: false,
      holiday: true
    })
  }

  const handleClose = () => {
    setState({...state, holiday:false})
  }

  const validateDates = () => {
    if (selectedStartDate > selectedEndDate) {
      alert('Start date must be before end date.')
      return false;
    }
    const now = new Date()
    if (selectedStartDate < now) {
      alert('Start date must be after today.')
      return false;
    }
    if (selectedEndDate < now) {
      alert('End date must be after today.')
      return false;
    }
    return true;
  }

  const createRequest = () => {
    if (!validateDates())
      return
    const values = {startDate: formatDate(selectedStartDate), endDate: formatDate(selectedEndDate)}
    props.createRequest(values)
    handleClose()
  }

  const sidebarOptions =  [ 
    {
      name: 'All patients',
      onClick: showPatients,
      icon: PeopleIcon
    },
    {
      name: 'Start examination',
      onClick: startExamination,
      icon: LocalHospitalIcon
    },
    {
      name: 'Work calendar',
      onClick: showPatients,
      icon: TodayIcon
    },
    {
      name: 'Holidays ',
      onClick: createHolidayRequest,
      icon: WorkOffIcon
    },
    {
      name: 'Schedule appointment ',
      onClick: showPatients,
      icon: ScheduleIcon
    },
    {
      name: 'Profile',
      onClick: () => props.history.push(EDIT_PROFILE),
      icon: PersonIcon
    }
  ]
  return (
    <div className={classes.wrapper}>
      <Sidebar options={sidebarOptions} />
    <div className={classes.mainPanel}> 
      <div style={{margin:30}}>  
        {state.renderTable && <PatientSearchBar/>}
      </div>
      {state.renderTable && <PatientList data={props.patients} sort={sortPatients} viewPatient={showPatient}/>}
      {state.viewPatient && <PatientProfile email={state.email} startExamination={startExamination}/>}
      {state.startExamination && <Examination email={state.email}/>}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={state.holiday}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
    >
        <Fade in={state.holiday}>
        <div className={classes.paper}>
        <h2 id="transition-modal-title">Create holiday request</h2>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Start date"
                    value={selectedStartDate}
                    onChange={handleStartDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="End date"
                    value={selectedEndDate}
                    onChange={handleEndDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
                <Grid item xs={12} align="center" >
                <Button 
                    variant="contained" 
                    onClick={createRequest}
                    color="primary" 
                    justify="center"  
                    style={{margin:10}}
                >
                    Send request
                </Button>
                </Grid>
                </MuiPickersUtilsProvider>
          </div>
        </Fade>
    </Modal>
    </div>
  </div>
  );
}

const mapStateToProps = state => {
  return {
    patients: state.patient.all
  };
};

const mapDispatchToProps = {
  getPatients, createRequest
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DoctorHome)
);