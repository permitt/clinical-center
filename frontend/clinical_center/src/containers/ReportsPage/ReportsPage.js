import 'date-fns';
import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { getClinicReports, getIncome } from '../../store/actions/ReportActions'
import { formatDate } from '../../utils/utils'

function ReportsPage(props) {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  useEffect(() => {
    props.getClinicReports()
  },[])

  const handleClick = () => {
      props.getIncome({
          start : formatDate(startDate), 
          end: formatDate(endDate)
        })
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Start date"
          value={startDate}
          onChange={handleStartDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
         <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="End date"
          value={endDate}
          onChange={handleEndDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
         <Button variant="contained" onClick={handleClick}>Get income</Button>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

const mapStateToProps = state => {
    return {
         income: state.report.income,
         reports: state.report.clinicReports
    };
};

const mapDispatchToProps = {
    getClinicReports, getIncome
};
  
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ReportsPage)
);