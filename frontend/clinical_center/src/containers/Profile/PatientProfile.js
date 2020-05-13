import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { push } from 'connected-react-router';
import { USER_PROFILE, DASHBOARD } from '../../routes';
import LocalHospital from '@material-ui/icons/LocalHospital';
import Favorite from '@material-ui/icons/Favorite';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import { makeStyles } from "@material-ui/core/styles";

import Sidebar from "../../components/Sidebar/Sidebar";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import styles from "../../assets/jss/material-dashboard-react/layouts/homeStyle.js";
import { getClinics } from '../../store/actions/ClinicActions';
import { getAppointmentTypes, checkAppointmentAvailable, setAppointmentTerms, postAppointment } from '../../store/actions/AppointmentActions';
import { Typography } from '@material-ui/core';

import { withFormikField } from '../../utils/withFormikField'
import Alert from '@material-ui/lab/Alert';
import { Formik, Form, Field } from 'formik';
import { formStyle, submitButton } from '../../assets/jss/material-dashboard-react/components/FormStyle';
import TextField from '@material-ui/core/TextField';
import { editPatientSchema } from '../Forms/validations';

const useStyles = makeStyles(styles);


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 100,
        },
    },
};

const FormikTextField = withFormikField(TextField);


function PatientProfile(props) {
    const classes = useStyles();
    const [firstName, setFirstName] = React.useState('AAAA');
    const [lastName, setLastName] = React.useState('Petrovi');
    const [email, setEmail] = React.useState('ASdas');
    const [password, setPassword] = React.useState('ASdsads');
    const [address, setAddress] = React.useState('');
    const [city, setCity] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [policyNumber, setPolicyNumber] = React.useState('');


    React.useEffect(() => {

    }, []);



    const sidebarOptions = [
        {
            name: 'Dashboard',
            onClick: () => props.history.push(DASHBOARD),
            icon: DashboardIcon
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


                        <Grid container justify="center" >

                            <Grid item xs={8}>

                                <Formik
                                    initialValues={{
                                        firstName: firstName,
                                        lastName: lastName,
                                        email: email,
                                        address: address,
                                        city: city,
                                        country: country,
                                        phoneNumber: phoneNumber,
                                        password: '',
                                        password2: '',

                                    }}
                                    validationSchema={editPatientSchema}
                                    onSubmit={<p></p>}
                                    style={formStyle}>
                                    <Form>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Field
                                                    component={FormikTextField}
                                                    type="text"
                                                    name="firstName"
                                                    variant="outlined"
                                                    fullWidth
                                                    label="First name"
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Field
                                                    component={FormikTextField}
                                                    type="text"
                                                    name="lastName"
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Last name"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    component={FormikTextField}
                                                    type="email"
                                                    name="email"
                                                    variant="outlined"
                                                    fullWidth
                                                    disabled
                                                    label="Email address"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    component={FormikTextField}
                                                    type="text"
                                                    name="policyNumber"
                                                    variant="outlined"
                                                    fullWidth
                                                    disabled
                                                    label="Policy Number"
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <Field
                                                    component={FormikTextField}
                                                    type="text"
                                                    name="address"
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Address"
                                                    autoFocus
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <Field
                                                    component={FormikTextField}
                                                    type="text"
                                                    name="city"
                                                    variant="outlined"
                                                    fullWidth
                                                    label="City"
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <Field
                                                    component={FormikTextField}
                                                    type="text"
                                                    name="country"
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Country"
                                                    autoFocus
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    component={FormikTextField}
                                                    type="text"
                                                    name="phoneNumber"
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Phone Number"
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Field
                                                    component={FormikTextField}
                                                    type="password"
                                                    name="password"
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Password"
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Field
                                                    component={FormikTextField}
                                                    type="password"
                                                    name="password2"
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Confirm password"
                                                />
                                            </Grid>

                                        </Grid>
                                        {props.registerError && <Alert severity="error" style={{ marginTop: '10px' }}>User with this email already exists</Alert>}
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            style={submitButton}
                                        >
                                            Save
      </Button>
                                    </Form>
                                </Formik>

                            </Grid>
                        </Grid>

                    </div>


                </div>
            </div>
        </>
    );
}


const mapStateToProps = state => {
    return {

        email: state.authUser.email,

    };
};

const mapDispatchToProps = {

};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(PatientProfile)
);