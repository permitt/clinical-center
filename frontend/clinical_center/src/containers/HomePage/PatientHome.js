import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { push } from 'connected-react-router';
import { USER_PROFILE } from '../../routes';
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
import { getOperations } from '../../store/actions/OperationActions';
import { getAppointmentTypes, checkAppointmentAvailable, getAppointments, postAppointment } from '../../store/actions/AppointmentActions';
import { getDoctorRatings, getClinicRatings, postDoctorRating, postClinicRating, putDoctorRating, putClinicRating } from '../../store/actions/RatingActions';
import { getHealthCard } from '../../store/actions/HealthCardActions';

import { Typography } from '@material-ui/core';

import CardList from '../../components/CardList/CardList';
import PatientHistoryCardList from '../../components/CardList/PatientHistoryCardList';
import PatientHealthCardList from '../../components/CardList/PatientHealthCardList';

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
    const [chosenClinic, setChosenClinic] = React.useState(null);
    const [orderBy, setOrderBy] = React.useState('name');
    const [appointmentDate, setAppointmentDate] = React.useState(new Date());
    const [appointmentTime, setAppointmentTime] = React.useState("")
    const [appointmentType, setAppointmentType] = React.useState('');
    const [renderAppointmentClinics, setRenderAppointmentClinics] = React.useState(false);
    const [renderAppointmentDoctors, setRenderAppointmentDoctors] = React.useState(false);
    const [renderMedicalHistory, setRenderMedicalHistory] = React.useState(false);
    const [renderHealthCard, setRenderHealthCard] = React.useState(false);
    const orderByOptions = ['name', 'address', 'city', 'country'];

    const showClinicalCenters = () => {
        props.getClinics(orderBy);
        setRenderClinicsTable(true);
        setRenderAppointmentClinics(false);
        setRenderAppointmentDoctors(false);
        setRenderMedicalHistory(false);
        setRenderHealthCard(false);

    }
    const showHealthCard = () => {
        props.getHealthCard();
        setRenderClinicsTable(false);
        setRenderAppointmentClinics(false);
        setRenderAppointmentDoctors(false);
        setRenderMedicalHistory(false);
        setRenderHealthCard(true);
    }
    const showMedicalHistory = () => {
        props.getAppointments();
        props.getOperations();
        props.getDoctorRatings();
        props.getClinicRatings();
        setRenderClinicsTable(false);
        setRenderAppointmentClinics(false);
        setRenderAppointmentDoctors(false);
        setRenderHealthCard(false);
        setRenderMedicalHistory(true);
    };
    const handleCheckClick = (e) => {

        if (appointmentType === "") {
            alert("Must select type!");
            return;
        }

        const date = appointmentDate.toISOString().split('T')[0];
        props.checkAppointmentAvailable({ appointmentDate: date, appointmentType });
        setRenderClinicsTable(false);
        setRenderAppointmentDoctors(false);
        setAppointmentTime('');
        setRenderAppointmentClinics(true);
    }

    const handleClinicClick = (id) => {
        setChosenClinic(id);
        setRenderClinicsTable(false);
        setRenderAppointmentDoctors(true);
        setRenderHealthCard(false);
        setRenderAppointmentClinics(false);
        setRenderMedicalHistory(false);

    }

    const handleReserveClick = id => {
        if (appointmentTime === "") {
            alert("VRIJEME");
            return;
        }
        const appTypeID = props.appointmentTypes.filter(type => type.typeName === appointmentType)[0].id;
        const data = {
            date: appointmentDate.toISOString().split('T')[0],
            time: appointmentTime,
            clinic: chosenClinic,
            typeOf: appTypeID,
            doctor: id,
            patient: props.email,
        }

        props.postAppointment(data);
        alert("Reserved an appointment!")
    }

    const prepareDoctorData = () => {

        return props.doctors.filter(doc => doc.employedAt === chosenClinic).map(doctor => {
            const selector = (<Select displayEmpty value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} >
                <MenuItem disabled value=""> Select Appointment Time </MenuItem>
                {props.appointmentTerms.filter(at => at.doctor === doctor.email)[0].time.map(timeExact => (
                    <MenuItem value={timeExact}>{timeExact}</MenuItem>
                ))}
            </Select >);

            return {
                title: doctor.firstName + ' ' + doctor.lastName,
                id: doctor.email,
                subHeading: '',
                rating: doctor.rating,
                description: '',
                detail: selector,
                button: 'RESERVE',
            }
        });
    }

    const prepareHistoryData = () => {
        if (props.appointments === 'empty' && props.operations === 'empty')
            return false;

        let data = [];



        props.appointments.map(app => ({
            type: 'appointment',
            ...app
        })).forEach(el => {
            let foundDR = false;
            let foundCL = false;

            props.doctorRatings.forEach(dr => {
                if (dr.doctor === el.doctor) {
                    el.doctorRating = dr;
                    foundDR = true;
                }

            });

            props.clinicRatings.forEach(cl => {
                if (cl.clinic === el.clinic) {
                    el.clinicRating = cl;
                    foundCL = true;
                }

            });

            if (!foundDR)
                el.doctorRating = { "id": "-1", "rating": 0 };
            if (!foundCL)
                el.clinicRating = { "id": "-1", "rating": 0 };

            data.push(el);
        });
        console.log("MOJE OPP OP OP ", props.operations);
        props.operations.map(op => ({
            type: 'operation',
            ...op
        })).forEach(el => {




            let foundCL = false;
            el.doctorRatings = {};

            el.doctors.forEach(doc => {
                let foundDR = false;

                props.doctorRatings.forEach(dr => {
                    if (dr.doctor === doc) {
                        el.doctorRatings[dr.doctor] = dr;
                        foundDR = true;
                    }

                });

                if (!foundDR)
                    el.doctorRatings[doc] = { "id": "-1", "rating": 0 };

            });

            props.clinicRatings.forEach(cl => {
                if (cl.clinic === el.clinic) {
                    el.clinicRating = cl;
                    foundCL = true;
                }

            });

            if (!foundCL)
                el.clinicRating = { "id": "-1", "rating": 0 };

            data.push(el);
        });

        return data;
    }

    const leaveRating = (arg) => {
        if (arg.ratingId == "-1") {
            if (arg.type === "doctorRating")
                props.postDoctorRating({ "doctor": arg.id, "patient": props.email, rating: arg.rating });
            else
                props.postClinicRating({ "clinic": arg.id, "patient": props.email, rating: arg.rating });
        } else {
            if (arg.type === "doctorRating")
                props.putDoctorRating({ id: arg.ratingId, "patient": props.email, rating: arg.rating, doctor: arg.id });
            else
                props.putClinicRating({ id: arg.ratingId, "patient": props.email, rating: arg.rating, clinic: arg.id });
        }
    }



    React.useEffect(() => { props.getAppointmentTypes() }, []);

    React.useEffect(() => {
        props.getClinics(orderBy);
    }, [orderBy])


    const sidebarOptions = [
        {
            name: 'All Clinics',
            onClick: showClinicalCenters,
            icon: LocalHospital
        },
        {
            name: 'Health Card',
            onClick: showHealthCard,
            icon: Favorite
        },
        {
            name: 'Medical History',
            onClick: showMedicalHistory,
            icon: Healing
        },
        {
            name: 'Profile',
            onClick: () => props.history.push(USER_PROFILE),
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
                                        {[...new Set(props.appointmentTypes.map(v => v.typeName))].map(type => (
                                            <MenuItem value={type}>{type}</MenuItem>
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
                            <CardList sortOptions={['haha']} data={prepareClinicsData(props.availableClinics)} action={(clinic) => { handleClinicClick(clinic); }} />
                        }
                        {renderAppointmentDoctors &&
                            <CardList sortOptions={['haha']} data={prepareDoctorData()} action={(doctor) => handleReserveClick(doctor)} />
                        }

                        {renderMedicalHistory &&
                            <PatientHistoryCardList sortOptions={['haha']} data={prepareHistoryData()} rate={(payload) => leaveRating({ ...payload })} clinicRatings={props.clinicRatings} doctorRatings={props.doctorRatings} />
                        }

                        {renderHealthCard &&
                            <PatientHealthCardList data={props.healthCard} />
                        }
                    </div>

                </div>
            </div>
        </>
    );
}

const prepareClinicsData = (data) => {
    if (data === 'empty')
        return false;

    return data.map(unit => (
        {
            title: unit.name,
            id: unit.id,
            subHeading: unit.address + ', ' + unit.city + ', ' + unit.country,
            rating: unit.rating,
            description: unit.description,
            detail: 'Appointment price: ' + unit.appointmentPrice + '.00$',
            button: 'SEE DOCTORS',
        }
    ));
}

const mapStateToProps = state => {
    return {
        clinics: state.clinic.all,
        availableClinics: state.clinic.available,
        appointments: state.appointment.all,
        operations: state.operation.all,
        appointmentTypes: state.appointment.types,
        appointmentTerms: state.appointment.availableTerms,
        doctors: state.doctor.all,
        email: state.authUser.email,
        doctorRatings: state.rating.doctorRatings,
        clinicRatings: state.rating.clinicRatings,
        healthCard: state.healthCard.current
    };
};

const mapDispatchToProps = {
    getClinics,
    getAppointmentTypes,
    checkAppointmentAvailable,
    postAppointment,
    getAppointments,
    getOperations,
    getClinicRatings,
    getDoctorRatings,
    postClinicRating,
    postDoctorRating,
    putClinicRating,
    putDoctorRating,
    getHealthCard,

};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(PatientHome)
);