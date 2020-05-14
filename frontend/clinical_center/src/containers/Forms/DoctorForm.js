import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider,KeyboardTimePicker } from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import { withFormikField } from '../../utils/withFormikField'
import { formStyle, submitButton } from '../../assets/jss/material-dashboard-react/components/FormStyle';
import { addDoctor } from '../../store/actions/DoctorActions';
import { registerDoctorSchema } from './validations'

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

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


function DoctorForm (props) {
  const [startTime, setStartTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());
  const [days, setDays] = React.useState([]);

  const handleDayChange = event => {
    setDays(event.target.value);
  };

  const handleStartTimeChange = time => {
    setStartTime(time);
  };

  const handleEndTimeChange = time => {
    setEndTime(time);
  };

  const submit = (values) => {
    const from = startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    const to = endTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    days.forEach((day, index) => values.schedule.push({day: index, from, to}))
    props.addDoctor(values)
  };
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
        password2: '',
        schedule: []
      }}
      validationSchema={registerDoctorSchema}
      onSubmit={submit}
      style={formStyle}>
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Field
              component={FormikTextField}
              type="text"
              name="firstName"
              variant="outlined"
              fullWidth
              label="First name"
            />
          </Grid>
          <Grid item xs={6}>
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
          <Grid item xs={4}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              margin="normal"
              id="startTime"
              label="Start time"
              value={startTime}
              onChange={handleStartTimeChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
          />
          </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={4}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              margin="normal"
              id="endTime"
              label="End time"
              value={endTime}
              onChange={handleEndTimeChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
          />
          </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={4}>
            <FormControl style={{width: '100%'}}>
              <InputLabel id="demo-mutiple-checkbox-label">Tag</InputLabel>
              <Select
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                multiple
                value={days}
                onChange={handleDayChange}
                input={<Input />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {weekDays.map((weekDay) => (
                  <MenuItem key={weekDay} value={weekDay}>
                    <Checkbox checked={days.indexOf(weekDay) > -1} />
                    <ListItemText primary={weekDay} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>  
          </Grid>
        </Grid>
        { props.registerError && <Alert severity="error" style={{marginTop:'10px'}}>User with this email already exists</Alert>}
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

const mapDispatchToProps = { addDoctor };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(DoctorForm)
);
