import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import GroupIcon from '@material-ui/icons/Group';
import { makeStyles } from "@material-ui/core/styles";

import Sidebar from "../../components/Sidebar/Sidebar"
import Table from "../../components/Table/Table"
import styles from "../../assets/jss/material-dashboard-react/layouts/homeStyle.js";
import { getDoctors, deleteDoctor } from '../../store/actions/DoctorActions'
import { DELETE } from '../../utils/constants'
import DoctorForm from '../Forms/DoctorForm'
import FormContainer from '../../components/FormContainer/FormContainer'

const useStyles = makeStyles(styles);

const columns = [
  { id: 'firstName', label: 'Name', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 80 },
  { id: 'city', label: 'City', minWidth: 80 },
  { id: 'country', label: 'Country', minWidth: 80 },
  { id: 'phoneNumber', label: 'Phone number', minWidth: 60 },
];


function ClAdminHome(props) {
  const classes = useStyles();
  const [renderTable, setRenderTable] = React.useState(false)

  const showDoctorList = () => {
    props.getDoctors()
    setRenderTable(true)
  }

  const action = (type, email) => {
    if (type === DELETE) {
      props.deleteDoctor(email)
    }

  }
  const sidebarOptions = [
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
            {renderTable && <Table
              role={'ADMIN'}
              data={props.doctors}
              columns={columns}
              action={action}
              title="Doctors in clinic"
              form={<FormContainer form={<DoctorForm />} title="Add new doctor" />}
            />}
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