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

import styles from "../../assets/jss/material-dashboard-react/layouts/homeStyle.js";
import Sidebar from "../../components/Sidebar/Sidebar"
import PatientList from "../PatientList/PatientList"
import { getPatients } from '../../store/actions/PatientsActions'

const useStyles = makeStyles(styles);

function DoctorHome(props) {
  const classes = useStyles();
  const [renderTable, setRenderTable ] =  React.useState(false)

  const showPatients = () => {
    setRenderTable(true)
    props.getPatients()
  }
  
  const sortPatients = (sortBy) => {
    props.getPatients({'sort': sortBy})
  }

  const sidebarOptions =  [ 
    {
      name: 'All patients',
      onClick: showPatients,
      icon: PeopleIcon
    },
    {
      name: 'Start examination',
      onClick: showPatients,
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
      onClick: showPatients,
      icon: PersonIcon
    }
  ]
  return (
    <div className={classes.wrapper}>
      <Sidebar options={sidebarOptions} />
    <div className={classes.mainPanel}> 
      {renderTable && <PatientList data={props.patients} sort={sortPatients}/>}
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