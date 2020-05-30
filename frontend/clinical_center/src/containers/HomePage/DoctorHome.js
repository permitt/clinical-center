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

import PatientSearchBar from '../../containers/SearchBar/PatientSearchBar'
import styles from "../../assets/jss/material-dashboard-react/layouts/homeStyle.js";
import Sidebar from "../../components/Sidebar/Sidebar"
import PatientList from "../PatientList/PatientList"
import { getPatients } from '../../store/actions/PatientsActions'
import { EDIT_PROFILE } from '../../routes';
import PatientProfile from '../PatientProfile/PatientProfile'
import Examination from '../Examination/Examination'

const useStyles = makeStyles(styles);

function DoctorHome(props) {
  const classes = useStyles();
  const [state, setState ] =  React.useState({
    renderTable: false, 
    viewPatient: false, 
    email: null,
    startExamination: false
  })

  const showPatients = () => {
    setState({
      renderTable: true, 
      viewPatient: false, 
      email: null,
      startExamination: false
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
      startExamination: false
    })
  }

  
  const startExamination = () => {
    setState({...state,
      renderTable: false, 
      viewPatient: false, 
      startExamination: true
    })
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
      onClick: showPatients,
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
  getPatients
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DoctorHome)
);