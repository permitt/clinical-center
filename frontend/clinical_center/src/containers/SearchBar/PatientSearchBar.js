import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import { searchPatients } from '../../store/actions/PatientsActions'

function PatientSearchBar(props) {
 const [state, setState] = React.useState({
     firstName: '',
     lastName: '',
     policyNumber: '',
     city: '',
     country: ''
 })

  const handleClick = () => {
    let query = {...state}
    for (let attribute in query) { 
    if (!query[attribute]) 
        delete query[attribute]; 
    }
    props.searchPatients(query)
  }

return (
    <Grid container justify="center" >
        <Paper elevation={3} style={{width: '60%'}} >
            <Grid container spacing={2} style={{margin:10}} justify="flex-start" alignItems='center'>
                <Grid item xs={3}> 
                    <TextField 
                        id="outlined-basic"
                        label="Insert first name" 
                        variant="outlined" 
                        onChange={e => setState({...state, firstName: e.target.value})}
                        />
                </Grid>
                <Grid item xs={3}> 
                    <TextField 
                        id="outlined-basic"
                        label="Insert last name" 
                        variant="outlined" 
                        onChange={e => setState({...state, lastName: e.target.value})}
                        />
                </Grid>
                <Grid item xs={6} > 
                    <TextField 
                        id="outlined-basic"
                        label="Insert policy number" 
                        type="number"
                        variant="outlined" 
                        fullwidth="true"
                        onChange={e => setState({...state, policyNumber: e.target.value})}
                    />
                </Grid>
                <Grid item xs={3} align='center'> 
                    <Typography  variant="h6" component="h6">
                        Filter by :
                    </Typography>
                </Grid>
                <Grid item xs={3} > 
                    <TextField 
                        id="outlined-basic"
                        label="City" 
                        variant="outlined" 
                        align="left"
                        onChange={e => setState({...state, city: e.target.value})}
                    />
                </Grid>
                <Grid item xs={3} > 
                    <TextField 
                        id="outlined-basic"
                        label="Country" 
                        variant="outlined" 
                        onChange={e => setState({...state, country: e.target.value})}
                    />
                </Grid>
                <Grid item align="center">
                <Button 
                    variant="contained" 
                    onClick={handleClick}
                    color="primary"  
                    justify="center"
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
  
  const mapDispatchToProps = { searchPatients };
  
  export default withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(PatientSearchBar)
  );