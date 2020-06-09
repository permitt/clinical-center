import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
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
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';

import { toolBarstyle, tableStyle } from "../../assets/jss/material-dashboard-react/components/patientListStyle.js";
import AvailableTermsForm from './AvailableTermsForm'

const headCells = [
  { id: 'date', numeric: false, label: 'Date' },
  { id: 'time', numeric: true,  label: 'Time' },
  { id: 'type', numeric: false, label: 'Type' },
  { id: 'duration', numeric: false, label: 'Duration' },
  { id: 'hall', numeric: false, label: 'Operating hall' },
  { id: 'doctor', numeric: false, label: 'Doctor' },
  { id: 'price', numeric: false, label: 'Price' },
  { id: 'delete', numeric: false, label: 'Delete' }
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
  const [open, setOpen] = React.useState(false);

  return (

    <Toolbar className={classes.root}>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Available appointment terms
        </Typography>
        <IconButton aria-label="filter list" onClick={() => setOpen(true)}>
          <AddBoxIcon />
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
         <AvailableTermsForm />
        </Fade>
      </Modal>
    </Toolbar>
  );
}

const useStyles = makeStyles(tableStyle);

export default function AvailableTermsTable(props) {
  const data = [{date:'1', time:'1', hall:1,doctor:1,price:1, duration:1}]
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
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
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.date}
                    >
                    <TableCell align="left">{row.date}</TableCell>
                    <TableCell  align="left">{row.time}</TableCell>
                      <TableCell align="left">{row.type}</TableCell>
                      <TableCell align="left">{row.duration}</TableCell>
                      <TableCell align="left">{row.hall}</TableCell>
                      <TableCell align="left">{row.doctor}</TableCell>
                      <TableCell align="left">{row.price}</TableCell>
                      <TableCell align="left"><IconButton><DeleteIcon /></IconButton></TableCell>
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
      </Paper>
    </div>
  );
}