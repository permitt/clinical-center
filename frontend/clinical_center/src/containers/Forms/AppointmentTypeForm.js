import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import NumberFormat from 'react-number-format';
import MaskedInput from 'react-text-mask';

import { withFormikField } from '../../utils/withFormikField'
import { formStyle, submitButton } from '../../assets/jss/material-dashboard-react/components/FormStyle';
import { addHall, editHall } from '../../store/actions/HallActions';
import { addTypeSchema } from './validations'

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

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/,' ',':',' ', /\d/, /\d/, ' ', 'h']}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}



function AppointmentTypeForm(props) {
  const { selected } = props
  console.log(selected)
  const name = selected ? selected.name : ''
  const duration = selected ? selected.duration : ''
  const price = selected ? selected.price : ''

  const submit = values => {
    console.log(values)
    // if (selected) {
    //   values['id'] = selected.id
    //   props.editHall(values)
    // } else
    //   props.addHall(values)
  };
  return (
    <Formik
      initialValues={{
        name: name,
        duration: duration,
        price: price
      }}
      validationSchema={addTypeSchema}
      onSubmit={submit}
      style={formStyle}>
      <Form  style={{marginTop:'20px'}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
              name="duration"
              variant="outlined"
              fullWidth
              label="Duration"
              InputProps={{
                inputComponent: TextMaskCustom
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Field
              component={FormikTextField}
              type="text"
              name="price"
              variant="outlined"
              fullWidth
              label="Price"
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
            />
          </Grid>
        </Grid>
        { props.registerError && <Alert severity="error" style={{marginTop:'10px'}}>Operating room with this name already exists</Alert>}
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
    registerError: state.error.registerError
  };
};

const mapDispatchToProps = { addHall, editHall };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AppointmentTypeForm)
);
