import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { withFormikField } from '../../utils/withFormikField'
import { formStyle, submitButton } from '../../styles/FormStyle'
import { registerSchema } from './validations'
import { register } from '../../store/actions/AuthActions';

const FormikTextField = withFormikField(TextField);

class RegisterForm extends Component {

  submit = (values) => {

    this.props.register(values);
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
          policyNumber: '',
          phoneNumber: '',
          password: '',
          password2: ''
        }}
        validationSchema={registerSchema}
        onSubmit={this.submit}
        style={formStyle}>
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                component={FormikTextField}
                type="text"
                name="name"
                variant="outlined"
                required
                fullWidth
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={FormikTextField}
                type="text"
                name="lastname"
                variant="outlined"
                required
                fullWidth
                label="Lastname"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={FormikTextField}
                type="email"
                name="email"
                variant="outlined"
                required
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
                required
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
                required
                fullWidth
                label="City"
                autoFocus
              />
            </Grid>
            <Grid item xs>
              <Field
                component={FormikTextField}
                type="text"
                name="country"
                variant="outlined"
                required
                fullWidth
                label="Country"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={FormikTextField}
                type="text"
                name="policyNumber"
                variant="outlined"
                required
                fullWidth
                label="Policy Number"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={FormikTextField}
                type="text"
                name="phoneNumber"
                variant="outlined"
                required
                fullWidth
                label="Phone Number"
                autoFocus
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                component={FormikTextField}
                type="password"
                name="password"
                variant="outlined"
                required
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
                required
                fullWidth
                label="Confirm password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={submitButton}
          >
            Register
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

export default withRouter(
  connect(
    mapStateToProps,
    { register }
  )(RegisterForm)
);
