import React, { useState, useEffect } from 'react';
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
import { addType, editType } from '../../store/actions/AppointmentTypeActions';
import { addTypeSchema } from './validations'
import { formatHours } from '../../utils/utils'

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
  const [state, setState] = React.useState(
    {name: selected ? selected.typeName :'', 
    duration: selected ? formatHours(selected.duration): '',
    price: selected ? selected.price : '' })

  const submit = values => {
    if (selected) {
      values['id'] = selected.id
      props.editType(values)
    } else {
      props.addType(values)
    }
  };

  return (
    <Formik
      initialValues={{
        typeName: state.name,
        duration: state.duration,
        price: state.price
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
              name="typeName"
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
            { props.error && <Alert severity="error" style={{marginTop:'10px'}}>{props.errorMsg}</Alert>}
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
    error: state.error.editError || state.error.addError,
    errorMsg: state.error.errorMsg
  };
};

const mapDispatchToProps = { addType, editType };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AppointmentTypeForm)
);
