import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import LocalHospital from '@material-ui/icons/LocalHospital';
import Favorite from '@material-ui/icons/Favorite';
import Healing from '@material-ui/icons/Healing';
import Person from '@material-ui/icons/Person';
import { makeStyles } from "@material-ui/core/styles";

import Sidebar from "../../components/Sidebar/Sidebar";
import Modal from '@material-ui/core/Modal';
import Table from "../../components/Table/Table"
import InputLabel from '@material-ui/core/InputLabel';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import styles from "../../assets/jss/material-dashboard-react/layouts/homeStyle.js";
import { getClinics } from '../../store/actions/ClinicActions';
import { getAppointmentTypes, checkAppointmentAvailable } from '../../store/actions/AppointmentActions';
import { Typography } from '@material-ui/core';

import CardList from '../../components/CardList/CardList';

const useStyles = makeStyles(styles);

const columns = [
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'address', label: 'Address', minWidth: 80 },
    { id: 'city', label: 'City', minWidth: 80 },
    { id: 'country', label: 'Country', minWidth: 80 },
    { id: 'rating', label: 'Rating', minWidth: 80 },
    { id: 'description', label: 'Description', minWidth: 90 },
];


function PatientHome(props) {
    const classes = useStyles();
    const [renderClinicsTable, setRenderClinicsTable] = React.useState(false);
    const [orderBy, setOrderBy] = React.useState('name');
    const [appointmentDate, setAppointmentDate] = React.useState(new Date());
    const [appointmentType, setAppointmentType] = React.useState('');
    const [renderAppointmentClinics, setRenderAppointmentClinics] = React.useState(false);
    const [renderAppointmentDoctors, setRenderAppointmentDoctors] = React.useState(false);
    const orderByOptions = ['name', 'address', 'city', 'country'];

    const showClinicalCenters = () => {
        props.getClinics(orderBy);
        setRenderClinicsTable(true);
        setRenderAppointmentClinics(false);
        setRenderAppointmentDoctors(false);
    }

    const handleCheckClick = (e) => {
        if (appointmentType === "") {
            alert("NE MOZE PRAZNO");
            return;
        }
        const date = appointmentDate.toISOString().split('T')[0];
        props.checkAppointmentAvailable({ appointmentDate: date, appointmentType });
        setRenderClinicsTable(false);
        setRenderAppointmentClinics(true);


    }

    React.useEffect(() => { props.getAppointmentTypes() }, []);

    React.useEffect(() => {
        props.getClinics(orderBy);
        console.log("MOJE KLINIKEE BRE : ", props.clinics);
    }, [orderBy])


    const sidebarOptions = [
        {
            name: 'All Clinics',
            onClick: showClinicalCenters,
            icon: LocalHospital
        },
        {
            name: 'Health Card',
            onClick: showClinicalCenters,
            icon: Favorite
        },
        {
            name: 'Medical History',
            onClick: showClinicalCenters,
            icon: Healing
        },
        {
            name: 'Profile',
            onClick: showClinicalCenters,
            icon: Person
        }
    ]
    return (
        <>

            <div className={classes.wrapper}>
                <Sidebar options={sidebarOptions} />
                <div className={classes.mainPanel}>
                    <div>
                        <Grid item xs={12}>
                            <Grid container justify="center" >
                                <Grid item>
                                    <Typography variant='h5'>Want to book an appointment? Select a date and type</Typography>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                        <DatePicker
                                            minDate={new Date()}
                                            label="Appointment Date"
                                            value={appointmentDate}
                                            onChange={(date) => setAppointmentDate(date)}
                                            animateYearScrolling
                                        />
                                    </MuiPickersUtilsProvider>

                                    <Select
                                        style={{ margin: '16px 10px' }}
                                        label="Appointment Date"
                                        displayEmpty
                                        id="appointment-type"
                                        value={appointmentType}
                                        onChange={(e) => setAppointmentType(e.target.value)}
                                    >
                                        <MenuItem disabled value="">
                                            Select Appointment Type
                                        </MenuItem>
                                        {props.appointmentTypes.map(type => (
                                            <MenuItem value={type.typeName}>{type.typeName}</MenuItem>
                                        ))}


                                    </Select>
                                    <Button variant="contained" onClick={handleCheckClick} color="primary">CHECK</Button>
                                </Grid>
                                <Grid item>


                                </Grid>
                            </Grid>
                        </Grid>


                    </div>
                    <div className={classes.table}>

                        {renderClinicsTable && <Table
                            data={props.clinics}
                            columns={columns}
                            action={() => { }}
                            sortOptions={orderByOptions}
                            changeSortBy={val => setOrderBy(val)}
                            title="Clinics" />
                        }
                        {renderAppointmentClinics &&
                            <CardList sortOptions={['haha']} data={prepareClinicsData(props.clinics)} action={() => { setRenderAppointmentDoctors(true); setRenderAppointmentClinics(false); }} />
                        }
                        {renderAppointmentDoctors &&
                            <CardList sortOptions={['haha']} data={prepareDoctorData(props.doctors)} />
                        }
                    </div>

                </div>
            </div>
        </>
    );
}

const prepareClinicsData = (data) => {
    return data.map(unit => (
        {
            title: unit.name,
            subHeading: unit.address + ', ' + unit.city + ', ' + unit.country,
            rating: unit.rating,
            description: unit.description,
            detail: 'Appointment price: ' + unit.appointmentPrice + '.00$',
            button: 'SEE DOCTORS',
        }
    ));
}

const prepareDoctorData = (data) => {
    return data.map(unit => (
        {
            title: unit.firstName + ' ' + unit.lastName,
            subHeading: '',
            rating: 4,
            description: '',
            detail: <Select type='text'></Select>,
            button: 'RESERVE',
        }
    ));
}

const mapStateToProps = state => {
    return {
        clinics: state.clinic.all,
        appointmentTypes: state.appointment.types,
        doctors: state.doctor.all,

    };
};

const mapDispatchToProps = {
    getClinics,
    getAppointmentTypes,
    checkAppointmentAvailable,

};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(PatientHome)
);