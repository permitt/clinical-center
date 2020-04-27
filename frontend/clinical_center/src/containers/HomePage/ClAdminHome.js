import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import GroupIcon from '@material-ui/icons/Group';
import { makeStyles } from "@material-ui/core/styles";

import Sidebar from "../../components/Sidebar/Sidebar"
import Table from "../../components/Table/Table"
import styles from "../../assets/jss/material-dashboard-react/layouts/adminStyle.js";
import { getDoctors, deleteDoctor } from '../../store/actions/DoctorActions'
import { DELETE } from '../../utils/constants'

const useStyles = makeStyles(styles);

const columns = [
  { id: 'firstName', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'city', label: 'City', minWidth: 100 },
  { id: 'country', label: 'Country', minWidth: 100 },
  { id: 'phoneNumber', label: 'Phone number', minWidth: 100 },
];


function ClAdminHome(props) {

  const classes = useStyles();
  const [renderTable, setRenderTable ] =  React.useState(false)

  const showDoctorList = () => {
    props.getDoctors()
    setRenderTable(true)
  }

  const action = (type, email) => {
    if (type === DELETE) {
      console.log(email)
      props.deleteDoctor(email)
    }
    
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
        {renderTable && <Table data={props.doctors} columns={columns} action={action}/> }
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
  getDoctors,
  deleteDoctor
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ClAdminHome)
);