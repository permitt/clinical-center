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
    this.props.logIn(values);
  };

  render() {
    return (
        <Formik 
          initialValues={{
            username: '',
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
                name="username"
                variant="outlined"
                required
                fullWidth
                label="Username"
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
        {this.props.loginError && <Alert severity="error" style={{marginTop:'10px'}}>Username or password not valid!</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={submitButton}
          >
           Logi in
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