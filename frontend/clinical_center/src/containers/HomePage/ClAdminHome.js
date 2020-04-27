import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import GroupIcon from '@material-ui/icons/Group';
import { makeStyles } from "@material-ui/core/styles";

import Sidebar from "../../components/Sidebar/Sidebar"
import Table from "../../components/Table/Table"
import styles from "../../assets/jss/material-dashboard-react/layouts/adminStyle.js";
import { getDoctors } from '../../store/actions/DoctorActions'

const useStyles = makeStyles(styles);




function ClAdminHome(props) {

  const classes = useStyles();
  const [renderTable, setRenderTable ] =  React.useState(false)

  const showDoctorList = () => {
    props.getDoctors()
    setRenderTable(true)
  }
  const sidebarOptions =  [ 
    {
      name: 'Doctors',
      onClick: showDoctorList,
      icon: GroupIcon
    },
    {
      name: 'Some other option',
      onClick: showDoctorList,
      icon: ''
    }
  ]
  return (
    <>
    <div className={classes.wrapper}>
      <Sidebar options={sidebarOptions} />
    <div className={classes.mainPanel}>
      <div className={classes.table}>
        {renderTable && <Table data={props.doctors}/> }
      </div>
    </div>
  </div>
  </>
  );
}

const mapStateToProps = state => {
  return {
    doctors: state.doctor.all
  };
};

const mapDispatchToProps = {
  getDoctors
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ClAdminHome)
);