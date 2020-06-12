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
import Button from '@material-ui/core/Button';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import Calendar from '../../components/Calendar/Calendar'
import styles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";
import homeStyle from "../../assets/jss/material-dashboard-react/layouts/homeStyle.js";
import { toolBarstyle, tableStyle } from "../../assets/jss/material-dashboard-react/components/patientListStyle.js";
import { getAvailableAppointments, deleteAppointment } from '../../store/actions/AppointmentActions'
import { formatHours } from '../../utils/utils'
import { assignHall } from '../../store/actions/HallActions'


function EnhancedTableHead(props) {
  const { classes, order, orderBy } = props;


  return (
    <TableHead>
      <TableRow>
        {props.cells.map((headCell) => (
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
            Available halls for choosen appointment
        </Typography>
    </Toolbar>
  );
}

const useStyles = makeStyles(styles);
const useHomeStyle = makeStyles(homeStyle);

function HallList(props) {
  const classes = useStyles();
  const homeClasses = useHomeStyle();
  const data = props.halls
  const [modal, setModal] = React.useState({open: false, data: {}});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
  console.log("OVO SE RENDERUJE OPET ", data)

  const headCells = [
    { id: 'name', label: 'Name', minWidth: 60 },
    { id: 'number', label: 'Number', minWidth: 30 },
    { id: 'available', label: 'First available date', minWidth: 30 },
    { id: 'action', label: 'Reserved dates', minWidth: 30, align: 'center' },
    { id: 'action2', label: 'Assign hall', minWidth: 30, align: 'center' },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpen = (data) => {
    setModal({open: true, data});
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);

  return (
      <Paper className={classes.root} >
        <EnhancedTableToolbar sort={props.sort}/>
        <TableContainer className={classes.container}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
            style={{ maxHeight: 540}}
          >
            <EnhancedTableHead
              classes={classes}
              cells={headCells}
            />
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  console.log('red', row)
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={index}
                    >
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell  align="left">{row.number}</TableCell>
                    <TableCell align="left">{row.available}</TableCell>
                    <TableCell align="left"> 
                        <Button variant="contained" onClick={() => handleOpen(row)}>
                              Calendar
                        </Button>
                    </TableCell>
                      <TableCell align="left">
                        <IconButton onClick={() => props.assignHall({hall:row.id, app: props.app.id})}>
                          <AddIcon />
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
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
         <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={homeClasses.modal}
          open={modal.open}
          onClose={() =>   setModal({open: false, data: {}})}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
        <Fade in={modal.open}>
          <div className={homeClasses.paper}>
            <Calendar data={modal.data}/>
          </div>
        </Fade>
      </Modal>
      </Paper>
  );
}
const mapStateToProps = state => {
  return {
    halls: state.hall.all
  };
};


const mapDispatchToProps = {
    assignHall
 };
 
 export default withRouter(
   connect(
     mapStateToProps,
     mapDispatchToProps
   )(HallList)
 );