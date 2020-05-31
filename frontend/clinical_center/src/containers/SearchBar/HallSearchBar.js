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

import { searchHalls } from '../../store/actions/HallActions'

const formatDate = date =>  date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + 'T00:00'

function HallSearchBar(props) {
 const [selectedDate, setSelectedDate] = React.useState(formatDate(new Date()));
 const [name, setName] = React.useState('')
 const [number, setNumber] = React.useState('')

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClick = () => {
      let query = {}
      if (name)
        query['name'] = name 
      if(number) 
        query['number'] = number

    const dateTime = selectedDate.split('T')
    try {
        query['date'] = dateTime[0]
        query['time'] = dateTime[1]
    } catch (error) {
        console.log(error)
    }
    
      console.log(query)
      props.searchHalls(query)
  }

return (
    <Grid container justify="center">
        <Paper elevation={3} style={{width: '60%'}} align="center">
        <Typography component="h1" variant="h5" style={{fontWeight:700}}>
            Search for available halls
        </Typography>
            <Grid
                container
                spacing={5}
                justify="center"
            >
                <Grid item xs={6} align='right' style={{marginTop:'20px'}}> 
                    <TextField 
                        id="outlined-basic"
                        label="Insert name" 
                        variant="outlined" 
                        onChange={e => setName(e.target.value)}
                        />
                </Grid>
                <Grid item xs={6} style={{marginTop:'20px'}}> 
                    <TextField 
                        id="outlined-basic"
                        label="Insert number" 
                        type="number"
                        variant="outlined" 
                        onChange={e => setNumber(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}  align="center"  style={{marginBottom:'20px'}}>
                <TextField
                    id="datetime-local"
                    label="Select date and time"
                    type="datetime-local"
                    defaultValue={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                </Grid>
                <Grid item align="center">
                <Button 
                    variant="contained" 
                    onClick={handleClick}
                    color="primary"  
                    justify="center" 
                    style={{marginBottom: '20px'}}
                >
                    Search
                </Button>
                </Grid>
            </Grid>
        </Paper>
    </Grid>
    )
}


const mapStateToProps = state => {
    return {
      
    };
  };
  
  const mapDispatchToProps = { searchHalls };
  
  export default withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(HallSearchBar)
  );