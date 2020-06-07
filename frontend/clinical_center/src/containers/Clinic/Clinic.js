import React from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { makeStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';

import { paper, avatar } from '../../assets/jss/material-dashboard-react/components/FormStyle';
import styles from "../../assets/jss/material-dashboard-react/layouts/homeStyle.js";
import { getAdminClinic, editAdminClinic } from '../../store/actions/ClinicActions';
import { withFormikField } from '../../utils/withFormikField'
import { formStyle, submitButton } from '../../assets/jss/material-dashboard-react/components/FormStyle';
import AvailableTermsTable from './AvailableTermsTable'

const useStyles = makeStyles(styles);
const FormikTextField = withFormikField(TextField);

export function Clinic(props) {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [success, setSucces] = React.useState(false);

   const name = props.clinic? props.clinic.name : '';
   const description = props.clinic? props.clinic.description: '';
   const address = props.clinic? props.clinic.address: '';

    React.useEffect(() => {
        props.getAdminClinic();
    }, []);

    React.useEffect(() => {
        if (props.profile) 
            setLoading(false)
    });

    const submit = values => {
        props.editAdminClinic(values);
        setSucces(true)
    };

    return (
    <>
    <Container component="main" >
    <Paper style={paper} elevation={3}>
    <Avatar style={avatar}>
        <LocalHospitalIcon />
    </Avatar>
    <Typography component="h1" variant="h5" style={{margin:10}}>
        Information about clinic {name}
    </Typography>
        <Grid container justify="center" >
        <Divider />
            {loading ?
                <CircularProgress />
                :
                <Formik
                    onSubmit={submit}
                    style={formStyle}
                    initialValues={{
                       name,
                       description,
                       address
                    }}>
                    <Form style={{textAlign:'center'}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field
                                    component={FormikTextField}
                                    type="text"
                                    name="name"
                                    variant="outlined"
                                    fullWidth
                                    label="Name"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    component={FormikTextField}
                                    type="text"
                                    name="Description"
                                    variant="outlined"
                                    rows={4}
                                    fullWidth
                                    label="Description"
                                    multiline
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    component={FormikTextField}
                                    type="text"
                                    name="address"
                                    variant="outlined"
                                    fullWidth
                                    label="Address"
                                    required
                                />
                            </Grid>
                            {success &&
                            <Grid item xs={12}>
                                <Alert severity="success">Clinic data successfully changed</Alert>
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
                            Change data
                        </Button>
                    </Form>
                </Formik>}
            </Grid>
        </Paper>
    </Container>
        <AvailableTermsTable />
    </>
    )
}

const mapStateToProps = state => {
    return {
         clinic: state.clinic.adminClinic 
    };
};

const mapDispatchToProps = {
    getAdminClinic,
    editAdminClinic
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Clinic)
);