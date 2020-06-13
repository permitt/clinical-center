import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl'

import { searchHalls } from '../../store/actions/HallActions'
import { getTypes } from '../../store/actions/AppointmentTypeActions'

const formatDate = date =>  date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + 'T00:00'

function HallSearchBar(props) {
 const [selectedDate, setSelectedDate] = React.useState();
 const [name, setName] = React.useState()
 const [number, setNumber] = React.useState()
 const [selectedType, setSelectedType] = React.useState()


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const handleClick = () => {
      let query = {}
      if (name)
        query['name'] = name 
      if(number) 
        query['number'] = number

    if (selectedType) {
        const dateTime = selectedDate.split('T')
    try {
        query['date'] = dateTime[0]
        query['time'] = dateTime[1]
        query['duration'] = selectedType
    } catch (error) {
        console.log(error)
    }

    }
      props.searchHalls(query)
  }

  useEffect(() => {
    props.getTypes()
  }, [])

  useEffect(() => {
    let query = {}
    if (props.selectedApp) {
      query['date'] = props.selectedApp.date
      query['time'] = props.selectedApp.time.slice(0,-3)
      query['duration'] = props.selectedApp.duration
      props.searchHalls(query)
      
    }
  },[props.selectedApp])

return (
    <Grid container justify="center">
        <Paper elevation={3} style={{width: '60%'}} align="center">
        <Typography component="h1" variant="h5" style={{fontWeight:700}}>
            Search for available halls
        </Typography>
            <Grid
                container
                spacing={2}
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
                <Grid item xs={6}  style={{marginBottom:'20px'}}>
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
                <Grid item xs={6}>
               <FormControl variant="outlined" style={{minWidth: 120}} >
                <InputLabel id="demo-simple-select-outlined-label">Type of</InputLabel>
                  <Select
                    labelId="selecte-type"
                    id="demo-simple-select-outlined-type"
                    value={selectedType}
                    onChange={e => setSelectedType(e.target.value)}
                    label="Type of"
                  >
                    {props.types.map((type,index) => <MenuItem key={index} value={type.duration}>{type.typeName}</MenuItem> )}
                  </Select>
                </FormControl>
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
      types: state.type.all,
      selectedApp: state.appointment.selectedApp
    };
  };
  
  const mapDispatchToProps = { searchHalls, getTypes };
  
  export default withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(HallSearchBar)
  );