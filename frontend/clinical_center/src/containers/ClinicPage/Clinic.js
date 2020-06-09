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
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { paper, avatar } from '../../assets/jss/material-dashboard-react/components/FormStyle';
import styles from "../../assets/jss/material-dashboard-react/layouts/homeStyle.js";
import { getAdminClinic, editAdminClinic } from '../../store/actions/ClinicActions';
import { withFormikField } from '../../utils/withFormikField'
import { formStyle, submitButton } from '../../assets/jss/material-dashboard-react/components/FormStyle';
import AvailableTermsTable from './AvailableTermsTable'
import MapContainer from './Map'

const useStyles = makeStyles(styles);
const FormikTextField = withFormikField(TextField);

export function Clinic(props) {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(true);
    const [success, setSucces] = React.useState(false);
    const [showTable, setShowTable] = React.useState(false);

    let name = props.clinic? props.clinic.name : '';
    let description = props.clinic? props.clinic.description: '';
    let address = props.clinic? props.clinic.address: ''
    let city = props.clinic? props.clinic.city: ''
    let country = props.clinic? props.clinic.country: ''
    let rating = props.clinic? props.clinic.rating : 0;  

    React.useEffect(() => {
        props.getAdminClinic();
    }, []);

    React.useEffect(() => {
        if (props.clinic) {
            setLoading(false)
        }     
    });

    const submit = values => {
        values['id'] = props.clinic.id
        props.editAdminClinic(values);
        setSucces(true)
    };

    return (
    <>
        <Button
            type="submit"   
            size="large"
            variant="outlined"
            color="primary"
            style={{position: 'absolute', top:10, right:10}}
            startIcon={showTable? <ArrowBackIcon />: <AddIcon />}
            onClick={() => setShowTable(!showTable)}
        >
            {showTable? 'Back': 'Add available terms'}
        </Button>
       {!showTable? <Container>
            <Paper style={paper} elevation={3} >
                <Avatar style={avatar}>
                    <LocalHospitalIcon />
                </Avatar>
            <Typography component="h1" variant="h5" style={{margin:10}}>
                Clinic {name}
            </Typography>
            <Rating name="read-only" value={parseFloat(rating)} readOnly />
            {loading ? <CircularProgress /> :
                <Grid container >
                    <Divider />
                    <Formik
                        onSubmit={submit}
                        style={formStyle}
                        initialValues={{
                            name : name,
                            description: description,
                            address: address,
                            city: city,
                            country: country
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
                                        name="description"
                                        variant="outlined"
                                        rows={4}
                                        fullWidth
                                        label="Description"
                                        multiline
                                    />
                                </Grid>
                                <Grid item xs={4}>
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
                                <Grid item xs={4}>
                                    <Field
                                        component={FormikTextField}
                                        type="text"
                                        name="city"
                                        variant="outlined"
                                        fullWidth
                                        label="City"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Field
                                        component={FormikTextField}
                                        type="text"
                                        name="country"
                                        variant="outlined"
                                        fullWidth
                                        label="Country"
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
                </Formik>
            </Grid>}
        </Paper>
        {!loading && <MapContainer street={props.clinic.address} city={props.clinic.city} country={props.clinic.country}/>}
    </Container>
    :     <AvailableTermsTable />}
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