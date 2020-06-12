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

const formatDate = date => date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + 'T00:00'

function ClinicDoctorSearchBar(props) {
    const [clinicLocation, setClinicLocation] = React.useState('');
    const [clinicRatingMin, setClinicRatingMin] = React.useState(-1);
    const [clinicRatingMax, setClinicRatingMax] = React.useState(-1);
    const [doctorName, setDoctorName] = React.useState('');
    const [doctorLastName, setDoctorLastName] = React.useState('');
    const [doctorRatingMin, setDoctorRatingMin] = React.useState(-1);
    const [doctorRatingMax, setDoctorRatingMax] = React.useState(-1);

    const handleDateChange = (date) => {

    };

    const handleClick = () => {
        // let query = {}
        // if (name)
        //     query['name'] = name
        // if (number)
        //     query['number'] = number

        // if (selectedType) {
        //     const dateTime = selectedDate.split('T')
        //     try {
        //         query['date'] = dateTime[0]
        //         query['time'] = dateTime[1]
        //         query['duration'] = selectedType
        //     } catch (error) {
        //         console.log(error)
        //     }

        // }
        // console.log(query)
        // props.searchHalls(query)
    }

    useEffect(() => {
        // props.getTypes()
    }, [])

    return (
        <Grid container justify="center">
            <Paper elevation={1} style={{ width: '80%' }} align="center">
                <Typography component="h1" variant="h5" style={{ fontWeight: 700 }}>
                    Additional filters
        </Typography>
                <Grid
                    container
                    spacing={1}
                    justify="center"
                >
                    <Grid item xs={6} align='center' style={{ marginTop: '20px', marginLeft: -5 }}>
                        <TextField
                            id="outlined-basic"
                            label="Clinic location"
                            variant="outlined"
                            onChange={e => props.setParams({ ...props.paramState, clinicLocation: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={3} style={{ marginTop: '20px', marginLeft: -7 }}>
                        <TextField
                            id="outlined-basic"
                            label="Clinic Min rating"
                            type="number"
                            variant="outlined"
                            onChange={e => props.setParams({ ...props.paramState, clinicMinRating: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={3} style={{ marginTop: '20px', marginLeft: -3 }}>
                        <TextField
                            id="outlined-basic"
                            label="Clinic Max rating"
                            type="number"
                            variant="outlined"
                            onChange={e => props.setParams({ ...props.paramState, clinicMaxRating: e.target.value })}
                        />
                    </Grid>


                    <Grid item xs={6} align='center' style={{ marginTop: '20px' }}>
                        <TextField
                            id="outlined-basic"
                            label="Doctor's name"
                            variant="outlined"
                            onChange={e => props.setParams({ ...props.paramState, doctorName: e.target.value })}
                        />
                    </Grid>

                    <Grid item xs={6} align='center' style={{ marginTop: '20px' }}>
                        <TextField
                            id="outlined-basic"
                            label="Doctor's last name"
                            variant="outlined"
                            onChange={e => props.setParams({ ...props.paramState, doctorLastName: e.target.value })}
                        />
                    </Grid>

                    <Grid item xs={3} style={{ marginTop: '20px', marginLeft: -7 }}>
                        <TextField
                            id="outlined-basic"
                            label="Doctor Min rating"
                            type="number"
                            variant="outlined"
                            onChange={e => props.setParams({ ...props.paramState, doctorMinRating: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={3} style={{ marginTop: '20px', marginLeft: -3 }}>
                        <TextField
                            id="outlined-basic"
                            label="Doctor Max rating"
                            type="number"
                            variant="outlined"
                            onChange={e => props.setParams({ ...props.paramState, doctorMaxRating: e.target.value })}
                        />
                    </Grid>



                </Grid>
            </Paper>
        </Grid>
    )
}


const mapStateToProps = state => {
    return {
        types: state.type.all
    };
};

const mapDispatchToProps = { searchHalls, getTypes };

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(ClinicDoctorSearchBar)
);