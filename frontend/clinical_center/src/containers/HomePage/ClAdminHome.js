import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import GroupIcon from '@material-ui/icons/Group';
import { makeStyles } from "@material-ui/core/styles";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

import Sidebar from "../../components/Sidebar/Sidebar"
import Table from "../../components/Table/Table"
import styles from "../../assets/jss/material-dashboard-react/layouts/homeStyle.js";
import { getDoctors, deleteDoctor } from '../../store/actions/DoctorActions'
import { getHalls } from '../../store/actions/HallActions'
import DoctorForm from '../Forms/DoctorForm'
import FormContainer from '../../components/FormContainer/FormContainer'


const useStyles = makeStyles(styles);

const DOCTOR_TABLE = 'DOCTOR_TABLE'
const HALL_TABLE = 'HALL_TABLE'

function ClAdminHome(props) {
  const classes = useStyles();
  const [table, setTable] = React.useState({render: false, type: ''})
  const [tableData, setTableData] = React.useState({ data: [], title:'', columns:[], form:null})

  const doctorColumns = [
    { id: 'firstName', label: 'Name', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 80 },
    { id: 'city', label: 'City', minWidth: 80 },
    { id: 'country', label: 'Country', minWidth: 80 },
    { id: 'phoneNumber', label: 'Phone number', minWidth: 60 },
    { id: 'action', label: 'Delete', minWidth: 20, icon: 'delete', action: props.deleteDoctor}
  ];

  const hallColumns = [
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'number', label: 'Email', minWidth: 80 },
    { id: 'action', label: 'Delete', minWidth: 20, icon: 'delete', action: ()=> console.log('fa')}
  ];
  
  const showList = type => {
    console.log('ovde')
    switch(type) {
      case DOCTOR_TABLE: {
        props.getDoctors()
        setTable({render: true, type: type})
        break;
      }
      case HALL_TABLE: {
        props.getHalls()
        setTable({render: true, type: type})
      }
    }
  }
  

  useEffect(()=> {
    console.log('ovdee')
    console.log(props)
    switch(table.type) {
      case DOCTOR_TABLE:{
        console.log('ovde postavljam ')
        setTableData({ 
          data: props.doctors, 
          columns: doctorColumns, 
          title: "Doctors in clinic", 
          form: <FormContainer form={<DoctorForm />} title="Add new doctor" />}
        ) 
        break;}
      case HALL_TABLE:{
        setTableData({ 
          data: props.halls, 
          columns: hallColumns, 
          title: "Operating rooms in clinic", 
          form: <FormContainer form={<DoctorForm />} title="Add new operationg room" />}
        ) }
    }
  },[props])

  const sidebarOptions = [
    {
      name: 'Doctors',
      onClick: () => showList(DOCTOR_TABLE),
      icon: GroupIcon
    },
    {
      name: 'Operating halls',
      onClick: () => showList(HALL_TABLE),
      icon: MeetingRoomIcon
    }
  ]

  console.log('INFO O TABELI',table)
  console.log('TABLE DATA',tableData)
  return (
    <>
      <div className={classes.wrapper}>
        <Sidebar options={sidebarOptions} />
        <div className={classes.mainPanel}>
          <div className={classes.table}>
            {table.render && <Table
              data={tableData.data}
              columns={tableData.columns}
              title={tableData.title}
              sortOptions={[]}  
              changeSortBy={() => {}}  
              form={tableData.form}
            />}
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    doctors: state.doctor.all,
    halls: state.hall.all
  };
};

const mapDispatchToProps = {
  getDoctors,
  deleteDoctor,
  getHalls
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ClAdminHome)
);