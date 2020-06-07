import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

import { withFormikField } from '../../utils/withFormikField'
import { formStyle, submitButton } from '../../assets/jss/material-dashboard-react/components/FormStyle';
import { addHall, editHall } from '../../store/actions/HallActions';
import { addHallSchema } from './validations'

const FormikTextField = withFormikField(TextField);
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



function HallForm (props) {
  const { selected } = props
  const name = selected ? selected.name : ''
  const number = selected ? selected.number : ''
  const submit = values => {
    if (selected) {
      values['id'] = selected.id
      props.editHall(values)
    } else
      props.addHall(values)
  };
  return (
    <Formik
      initialValues={{
        name: name,
        number: number
      }}
      validationSchema={addHallSchema}
      onSubmit={submit}
      style={formStyle}>
      <Form  style={{marginTop:'20px'}}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Field
              component={FormikTextField}
              type="text"
              name="name"
              variant="outlined"
              fullWidth
              label="Name"
            />
          </Grid>
          <Grid item xs={6}>
            <Field
              component={FormikTextField}
              type="text"
              name="number"
              variant="outlined"
              fullWidth
              label="Number"
            />
          </Grid>
        </Grid>
        { props.error && <Alert severity="error" style={{marginTop:'10px'}}>{props.errorMsg? props.errorMsg: "Can't perform action"}</Alert>}
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

const mapStateToProps = state => {
  return {
    error: state.error.addError || state.error.editError,
    errorMsg: state.error.errorMsg
  };
};

const mapDispatchToProps = { addHall, editHall };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HallForm)
);
