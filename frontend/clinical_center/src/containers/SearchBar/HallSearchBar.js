import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { Typography } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';

export default function HallSearchBar(props) {

 const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

return (
    <Grid container justify="center">
        <Paper elevation={3} style={{width: '60%'}} >
            <Grid
                container
                spacing={5}
                justify="center"
            >
                <Grid item xs={6}   align="right" style={{marginTop:'20px'}}> 
                    <TextField id="outlined-basic" label="Insert name or number" variant="outlined" />
                </Grid>
                <Grid item xs={6}  align="left"  style={{marginTop:'20px'}}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd-MM-yyyy"
                            id="date-picker-inline"
                            label="Choose date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                            'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item  align="center">
                <Button variant="contained" color="primary"  justify="center" style={{marginBottom: '20px'}}>
                    Search
                </Button>
                </Grid>
            </Grid>
        </Paper>
    </Grid>
    )
}