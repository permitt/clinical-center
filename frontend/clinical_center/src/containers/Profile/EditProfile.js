import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import { makeStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';

import { paper, avatar } from '../../assets/jss/material-dashboard-react/components/FormStyle';
import Sidebar from "../../components/Sidebar/Sidebar";
import { DASHBOARD, EDIT_PROFILE } from '../../routes';
import styles from "../../assets/jss/material-dashboard-react/layouts/homeStyle.js";
import { getProfile, editProfile } from '../../store/actions/AuthActions';
import { withFormikField } from '../../utils/withFormikField'
import { formStyle, submitButton } from '../../assets/jss/material-dashboard-react/components/FormStyle';
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


function EditProfile(props) {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(true);
    const [success, setSucces] = React.useState(false);

    React.useEffect(() => {
        props.getProfile();
    }, []);

    React.useEffect(() => {
        if (props.profile) 
            setLoading(false)
    });

    const sidebarOptions = [
        {
            name: 'Dashboard',
            onClick: () => props.history.push(DASHBOARD),
            icon: DashboardIcon
        },
        {
            name: 'Profile',
            onClick: () => props.history.push(EDIT_PROFILE),
            icon: Person
        }
    ]

    const submit = values => {
        props.editProfile(values);
        setSucces(true)
    };

    return (
        <div className={classes.wrapper} >
            <Sidebar options={sidebarOptions} />
                <div className={classes.mainPanel}>
                <Container component="main" maxWidth="xs">
                <Paper style={paper} elevation={3}>
                <Avatar style={avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" style={{margin:10}}>
                    Change your personal data
                </Typography>
                    <Grid container justify="center" >
                    <Divider />
                        {loading ?
                            <CircularProgress />
                            :
                            <Formik
                                validationSchema={editPatientSchema}
                                onSubmit={submit}
                                style={formStyle}
                                initialValues={{
                                    firstName: props.profile.firstName || '',
                                    lastName: props.profile.lastName || '',
                                    email: props.profile.email || '',
                                    address: props.profile.address || '',
                                    city: props.profile.city || '',
                                    country: props.profile.country || '',
                                    phoneNumber: props.profile.phoneNumber || '',
                                    password: props.profile.password,
                                    password2: ''
                                }}>
                                <Form style={{textAlign:'center'}}>
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
                                        <Grid item xs>
                                            <Field
                                                component={FormikTextField}
                                                type="text"
                                                name="address"
                                                variant="outlined"
                                                fullWidth
                                                label="Address"
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
                                        {success &&
                                        <Grid item xs={12}>
                                            <Alert severity="success">Profile data successfully changed</Alert>
                                        </Grid>
                                        }
                                    </Grid>
                                    <Button
                                        type="submit"   
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        style={submitButton}
                                    >
                                        Save changes
                                    </Button>
                                </Form>
                            </Formik>}
                        </Grid>
                    </Paper>
                </Container>
            </div>
        </div >
    );
}


const mapStateToProps = state => {
    return {
         profile: state.authUser.profile,
    };
};

const mapDispatchToProps = {
   getProfile,
    editProfile
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditProfile)
);