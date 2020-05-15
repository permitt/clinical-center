import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import GroupIcon from '@material-ui/icons/Group';
import { makeStyles } from "@material-ui/core/styles";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import DeleteIcon from '@material-ui/icons/Delete';
import ListAltIcon from '@material-ui/icons/ListAlt';

import HallSearchBar from '../../containers/SearchBar/HallSearchBar'
import Sidebar from "../../components/Sidebar/Sidebar"
import Table from "../../components/Table/Table"
import styles from "../../assets/jss/material-dashboard-react/layouts/homeStyle.js";
import { getDoctors, deleteDoctor } from '../../store/actions/DoctorActions'
import { resetError } from '../../store/actions/ErrorActions'
import { getHalls, deleteHall } from '../../store/actions/HallActions'
import { getTypes, deleteType } from '../../store/actions/AppointmentTypeActions'
import DoctorForm from '../Forms/DoctorForm'
import HallForm from '../Forms/HallForm'
import FormContainer from '../../components/FormContainer/FormContainer'
import Calendar from '../../components/Calendar/Calendar'
import ErrorDialog from './ErrorDialog'
import AppointmentTypeList from '../AppointmentTypeList/AppointmentTypeList'


const useStyles = makeStyles(styles);

const DOCTOR_TABLE = 'DOCTOR_TABLE'
const HALL_TABLE = 'HALL_TABLE'

function ClAdminHome(props) {
  const classes = useStyles();
  const [modal, setModal] = React.useState({open: false, data: {}});
  const [table, setTable] = React.useState({render: false, type: ''})
  const [ renderTypeTable, setRenderTypeTable] = React.useState(false)
  const [tableData, setTableData] = React.useState({ data: [], title:'', columns:[], form:null})
  const [errorDialogOpen, setErrorDialogOpen] = React.useState(props.error)

  useEffect(()=> {
    setErrorDialogOpen(props.error)
  },[props.error])

  const handleOpen = (data) => {
    setModal({open: true, data});
  };

  const handleClose = () => {
    setModal({open: false, data: {}});
  };

  const showAppTypes = () => {
    setTable({render: false, type: ''})
    setRenderTypeTable(true)
    props.getTypes()
  }
  
  const doctorColumns = [
    { id: 'firstName', label: 'Name', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 80 },
    { id: 'city', label: 'City', minWidth: 80 },
    { id: 'country', label: 'Country', minWidth: 80 },
    { id: 'phoneNumber', label: 'Phone number', minWidth: 60 },
    { id: 'action', label: 'Delete', minWidth: 20, icon: DeleteIcon, action: props.deleteDoctor}
  ];

  const hallColumns = [
    { id: 'name', label: 'Name', minWidth: 60 },
    { id: 'number', label: 'Number', minWidth: 30 },
    { id: 'available', label: 'First available date', minWidth: 30 },
    { id: 'action', label: 'Reserved dates', minWidth: 30, align: 'center', icon: 'Calendar', action: (data) => handleOpen(data) },
    { id: 'action', label: 'Delete', minWidth: 20, align: 'center', icon: DeleteIcon , action: props.deleteHall}
  ];
  
  const showList = type => {
    switch(type) {
      case DOCTOR_TABLE: {
        props.getDoctors()
        setTable({render: true, type: type})
        setRenderTypeTable(false)
        break;
      }
      case HALL_TABLE: {
        props.getHalls()
        setRenderTypeTable(false)
        setTable({render: true, type: type})
      }
    }
  }
  
  useEffect(()=> {
    switch(table.type) {
      case DOCTOR_TABLE:{
        setTableData({ 
          data: props.doctors, 
          columns: doctorColumns, 
          title: "Doctors in clinic", 
          id: 'email',
          allowEdit: false,
          form: <FormContainer form={<DoctorForm />} title="Add new doctor" />}
        ) }
        break;
      case HALL_TABLE:{
        setTableData({ 
          data: props.halls, 
          columns: hallColumns, 
          title: "Operating rooms in clinic", 
          id: 'id',
          allowEdit: true,
          form: <FormContainer form={<HallForm />} title="Add new operationg room" />}
        ) }
        break;
    }
  },[props.halls, props.doctors])


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
    },
    {
      name: 'Appointment types',
      onClick: showAppTypes,
      icon: ListAltIcon
    }
  ]

  return (
    <>
      <div className={classes.wrapper}>
        <Sidebar options={sidebarOptions} />
        <div className={classes.mainPanel}>
        <ErrorDialog 
          open={errorDialogOpen} 
          msg={props.msg} 
          handleClose={() => {
            setErrorDialogOpen(false)
            props.resetError()}
            }
        />
          <div >
           {table.type === HALL_TABLE && <HallSearchBar />}
          </div>
          <div className={classes.table}>
            {table.render && <Table
              data={tableData.data}
              columns={tableData.columns}
              title={tableData.title}
              sortOptions={[]}  
              changeSortBy={() => {}}  
              form={tableData.form}
              id={tableData.id}
              edit={tableData.allowEdit}
            />}
            {renderTypeTable && <AppointmentTypeList data={props.types} delete={props.deleteType}/>}
          </div>
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={modal.open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
        <Fade in={modal.open}>
          <div className={classes.paper}>
            <Calendar data={modal.data}/>
          </div>
        </Fade>
      </Modal>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    doctors: state.doctor.all,
    halls: state.hall.all,
    error: state.error.deleteError,
    msg: state.error.errorMsg,
    types: state.type.all
  };
};

const mapDispatchToProps = {
  getDoctors,
  deleteDoctor,
  getHalls,
  deleteHall,
  resetError,
  getTypes,
  deleteType
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ClAdminHome)
);