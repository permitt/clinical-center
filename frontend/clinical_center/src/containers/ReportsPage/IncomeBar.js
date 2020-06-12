import React from 'react'
import { formatDate } from '../../utils/utils'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  import DateFnsUtils from '@date-io/date-fns'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


export default function IncomeBar(props) {
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());

    const handleStartDateChange = (date) => {
        setStartDate(date);
      };
    
      const handleEndDateChange = (date) => {
        setEndDate(date);
      };

    const handleClick = () => {
        props.getIncome({
            start : formatDate(startDate), 
            end: formatDate(endDate)
          })
    }

    
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <Grid item xs={12} align="center">
          <TextField id="outlined-basic" variant="outlined" value={`${props.income} $`}></TextField>
        </Grid>
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
    )
}