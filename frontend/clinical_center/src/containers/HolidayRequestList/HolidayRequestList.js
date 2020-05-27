import React, { useEffect }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { gridStyle } from "../../assets/jss/material-dashboard-react/components/gridStyle.js";
import { resetError } from '../../store/actions/ErrorActions'
import HolidayRequest from './HolidayRequest.js';


const useStyles = makeStyles(gridStyle);
  
function HolidayRequestList(props) {
    const classes = useStyles();
    let { data } = props

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
            {data.map((request, index) => (
                <Grid item xs={6}>
                    <HolidayRequest request={request} index={index}/>
                </Grid>
            ))}
            {data.length === 0 && 
            <Typography variant="h4" component="h2">
                There's no new holiday requests
            </Typography>}
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