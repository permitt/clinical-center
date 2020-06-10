import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert';

import { logIn } from '../../store/actions/AuthActions'
import { loginSchema } from './validations'
import { formStyle, submitButton } from '../../assets/jss/material-dashboard-react/components/FormStyle';
import { withFormikField } from '../../utils/withFormikField'

const FormikTextField = withFormikField(TextField);

class LoginForm extends Component {

  submit = (values) => {

    this.props.logIn({ username: values.email, password: values.password });
  };

  render() {
    return (
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={loginSchema}
        onSubmit={this.submit}
        style={formStyle}>
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                component={FormikTextField}
                type="text"
                name="email"
                variant="outlined"
                required
                fullWidth
                label="Email"
              />
            </Grid>
            <Grid item xs={12}>
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
          </Grid>
          {this.props.loginError && <Alert severity="error" style={{ marginTop: '10px' }}>Email or password not valid!</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={submitButton}
          >
            Login
        </Button>
        </Form>
      </Formik>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginError: state.error.loginError
  };
};

const mapDispatchToProps = {
  logIn
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginForm)
);