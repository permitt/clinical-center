import 'date-fns';
import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Rating from '@material-ui/lab/Rating';


import { getClinicReports, getIncome } from '../../store/actions/ReportActions'
import { paper } from '../../assets/jss/material-dashboard-react/components/FormStyle';
import Graph from './Graph'
import IncomeBar from './IncomeBar'

function ReportsPage(props) {
 
  const { clinic, daily, monthly, weekly, doctors } = props.reports

 

  useEffect(() => {
    props.getClinicReports()
  }, [props.income])


  console.log(props.reports)

  return (
    <div>
    <IncomeBar getIncome={props.getIncome} income={props.income}></IncomeBar>
    {clinic && <>
    <Paper style={paper}>
      <Typography component="h6" variant="h4">
          Clinic {clinic.name}
      </Typography>
      <Typography component="h6" variant="h6">
        Average rating: {clinic.rating}
          <Rating name="read-only" style={{margin:10}} value={parseFloat(clinic.rating)} readOnly />
        </Typography>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Doctor</TableCell>
              <TableCell align="left">Average rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doctor, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {doctor.firstName + ' ' + doctor.lastName}
                </TableCell>
                <TableCell align="left">{doctor.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </Paper>
      <Grid container direction="row"spacing={7}>
      <Typography component="h6" variant="h6" style={{fontWeight:700}}>
        Statistic data for 2020
        </Typography>
        <Grid item xs={12} >
          <Graph index={0} data={props.reports.daily} property="day"/>
        </Grid>
        <Grid item xs={12} >
          <Graph index={1} data={props.reports.weekly} property="week"/>
        </Grid>
        <Grid item xs={12} >
          <Graph index={2} data={props.reports.monthly} property="month"/>
        </Grid>
      </Grid>   
    </>
  } 
    </div>
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