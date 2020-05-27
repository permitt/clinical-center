import React, { useEffect }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';




import { gridStyle } from "../../assets/jss/material-dashboard-react/components/gridStyle.js";
import toolbarStyles from "../../assets/jss/material-dashboard-react/components/tableToolbarStyle"
import AppointmentTypeForm from "../Forms/AppointmentTypeForm"
import FormContainer from "../../components/FormContainer/FormContainer"
import { deleteType } from '../../store/actions/AppointmentTypeActions'
import { resetError } from '../../store/actions/ErrorActions'
import HolidayRequest from './HolidayRequest.js';


const useStyles = makeStyles(gridStyle);
  
function HolidayRequestList(props) {
    const classes = useStyles();
    let { data } = props
    data  = [ {'doctor': 'pera','startDate': 'datum', 'endDate': 'datum', 'approved': true},
    {'doctor': 'pera','startDate': '02-10-2020', 'endDate': 'datum', 'approved': false}
,{'doctor': 'pera','startDate': 'datum', 'endDate': 'datum', 'approved': false}]
    console.log(data)
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
            {data.map((request, index) => (
                <Grid item xs={6}>
                    <HolidayRequest request={request} index={index}/>
                </Grid>
            ))}
        </Grid>
      </div>
    );
  }


const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = {
  resetError,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HolidayRequestList)
);