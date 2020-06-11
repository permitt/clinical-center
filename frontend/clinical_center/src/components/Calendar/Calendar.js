import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

function Calendar(props) {
  const { data } = props
  const [hallData, setHallData] = React.useState(props.dates[data.name] || [])
  const [hours, showHours] = React.useState({show: false, time: ''})


  const handleDayClick = (day, modifiers={}) => { 
    if (hours.show)
      showHours({show: false, time: ''})
    if (modifiers.selected) {
      const dateString = day.getFullYear() + '-' + ('0' + (day.getMonth()+1)).slice(-2) + '-' + ('0' + day.getDate()).slice(-2)
      const time = hallData.filter(day => day.date === dateString)
      showHours({show: true, time})
    }

  }
  return (
    <>
        <DayPicker
          initialMonth={new Date()}
          selectedDays={hallData.map(el => new Date(el.date))}
          onDayMouseEnter ={handleDayClick}
          onDayMouseLeave = {() => showHours(false)}
        />
           {hours.show &&  (
            <>
            <Paper elevation={3}  style={{maxWidth: '250px'}}>
           <Grid container spacing={2}>
            <Grid item xs={6} align="center">
              Time
            </Grid>
            <Grid item xs={6} align="center">
              Type 
            </Grid>
            </Grid>
            </Paper>
            {hours.time.map((el,index) => 
            <Paper elevation={3}  style={{maxWidth: '250px'}} key={index}>
             <Grid container spacing={2}>
              <Grid item xs={6} align="center">
                {el.time.slice(0, -3)}
              </Grid>
              <Grid item xs={6} align="center">
              {el.type.typeName? el.type.typeName : el.type}
            </Grid>
           </Grid>
           </Paper>
            )}
          </> 
         )
          }
    </>
  )
}

const mapStateToProps = state => {
  return {
    dates: state.hall.reservedDates
  };
};

const mapDispatchToProps = {
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Calendar)
);