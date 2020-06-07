import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { withFormikField } from '../../utils/withFormikField'
import { formStyle, submitButton } from '../../assets/jss/material-dashboard-react/components/FormStyle';
import { changePassSchema } from './validations'
import { changePass } from '../../store/actions/AuthActions';

const FormikTextField = withFormikField(TextField);

class ChangePassForm extends Component {

  submit = (values) => {
    this.props.changePass(values);
  };


  render() {
    
    return (
      <Formik
        initialValues={{
          password: '',
          password2: ''
        }}
        validationSchema={changePassSchema}
        onSubmit={this.submit}
        style={formStyle}>
        <Form>
          <Grid container spacing={2}>
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
            Change password
        </Button>
        </Form>
      </Formik>
    );
  }
}

const mapStateToProps = state => {
  return {
    // registerError: state.error.registerError
  };
};

const mapDispatchToProps = { changePass };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ChangePassForm)
);
