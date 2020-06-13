import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Container from '@material-ui/core/Container';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import HallList from '../AppointmentList/HallList'

import { toolBarstyle, tableStyle } from "../../assets/jss/material-dashboard-react/components/patientListStyle.js";
import { formatHours } from '../../utils/utils'
import { setSelectedApp } from '../../store/actions/AppointmentActions'
import { getAppointments } from '../../store/actions/AppointmentActions'

const headCells = [
  { id: 'date', numeric: false, label: 'Date' },
  { id: 'time', numeric: true,  label: 'Time' },
  { id: 'type', numeric: false, label: 'Type' },
  { id: 'duration', numeric: false, label: 'Duration' },
  { id: 'doctor', numeric: false, label: 'Doctor' },
  { id: 'price', numeric: false, label: 'Price' },
  { id: 'assign', numeric: false, label: 'Search hall' }
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy } = props;


  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
            padding='default'
            sortDirection={orderBy === headCell.id ? order : false}
          >
              {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles(toolBarstyle);

const EnhancedTableToolbar =  (props) => {
  const classes = useToolbarStyles();
  return (

    <Toolbar className={classes.root}>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Appointment requests
        </Typography>
    </Toolbar>
  );
}

const useStyles = makeStyles(tableStyle);

function AppointmentList(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [app, setApp] = React.useState(false)

  useEffect(() => {
    props.getAppointments();
  },[])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);
  console.log('duzinaaa', props.data)
  return (
    <>
      {props.data.length == 1 && props.data[0] === "empty" ? <Alert severity="info">
        <Typography className={classes.title} variant="h5" id="tableTitle" component="div">
            There are no new appointment requests.
       </Typography>
         </Alert> : !app && !(props.data.length == 1 && props.data[0] === "empty") ?
      <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar sort={props.sort}/>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
            />
            <TableBody>
              {props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={index}
                    >
                    <TableCell align="left">{row.date}</TableCell>
                    <TableCell  align="left">{row.time.slice(0,-3)}</TableCell>
                      <TableCell align="left">{row.type_name}</TableCell>
                      <TableCell align="left">{formatHours(row.duration)}</TableCell>
                      <TableCell align="left">{row.doctor_name}</TableCell>
                      <TableCell align="left">{row.price} $</TableCell>
                      <TableCell align="left">
                        <IconButton onClick={() => setApp(row)}>
                          <SearchIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      </div> : <HallList app={app}/>}
      </>
  );
}
const mapStateToProps = state => {
  return {
    data: state.appointment.all || []
  };
};


const mapDispatchToProps = {
  setSelectedApp, getAppointments
 };
 
 export default withRouter(
   connect(
     mapStateToProps,
     mapDispatchToProps
   )(AppointmentList)
 );