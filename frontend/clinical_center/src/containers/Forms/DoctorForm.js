import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

import { withFormikField } from '../../utils/withFormikField'
import { formStyle, submitButton } from '../../assets/jss/material-dashboard-react/components/FormStyle';
import { registerDoctorSchema } from './validations'
import { addDoctor } from '../../store/actions/DoctorActions';

const FormikTextField = withFormikField(TextField);

class DoctorForm extends Component {

  submit = (values) => {
    console.log(this.props)
    this.props.addDoctor(values)
  };

  render() {
    return (
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          city: '',
          country: '',
          phoneNumber: '',
          password: '',
          password2: ''
        }}
        validationSchema={registerDoctorSchema}
        onSubmit={this.submit}
        style={formStyle}>
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                component={FormikTextField}
                type="text"
                name="firstName"
                variant="outlined"
                fullWidth
                label="First name"
              />
            </Grid>
            <Grid item xs={12}>
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
          {this.props.registerError && <Alert severity="error" style={{marginTop:'10px'}}>User with this email already exists</Alert>}
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
    );
  }
}

const mapStateToProps = state => {
  return {
    registerError: state.error.registerError
  };
};

const mapDispatchToProps = { addDoctor };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(DoctorForm)
);
