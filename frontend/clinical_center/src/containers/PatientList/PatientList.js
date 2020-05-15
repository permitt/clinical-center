import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FilterListIcon from '@material-ui/icons/FilterList';

import { toolBarstyle, tableStyle } from "../../assets/jss/material-dashboard-react/components/patientListStyle.js";

const headCells = [
  { id: 'name', numeric: false, label: 'Name' },
  { id: 'policyNumber', numeric: true,  label: 'Policy number' },
  { id: 'city', numeric: false, label: 'City' },
  { id: 'email', numeric: false, label: 'Email' },
  { id: 'personalID', numeric: true, label: 'Personal id' },
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
  const [state, setState] = React.useState({
    firstName: true,
    personalID: false,
    city: false
  });

  console.log('RENDERUJE SE')
  const handleChange = (event) => {
    let newState = {...state}
    const name = event.target.name
    const value = event.target.checked
    for (let [key, value] of Object.entries(newState)) {
        if (name !== key)
            newState[key] = false
        else
            newState[key] = event.target.checked
    }
    setState(newState);
    if (value)
        props.sort(name)
  };

  return (

    <Toolbar className={classes.root}>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            All patients in clinic
        </Typography>
        <div style={{flex : '1 1 100%'}}>
        <Typography  variant="h6" id="tableTitle" display="inline" style={{padding: '10px'}}>
            Sort by
        </Typography>
        <FormControlLabel
        control={
            <Checkbox
            checked={state.firstName}
            onChange={handleChange}
            name="firstName"
            color="primary"
            />
        }
        label="Name"
        />
        <FormControlLabel
        control={
            <Checkbox
            checked={state.personalID}
            onChange={handleChange}
            name="personalID"
            color="primary"
            />
        }
        label="Personal ID"
        />
        <FormControlLabel
        control={
            <Checkbox
            checked={state.city}
            onChange={handleChange}
            name="city"
            color="primary"
            />
        }
        label="City"
        />
        </div>
    <Tooltip title="Filter list">
        <IconButton aria-label="filter list">
        <FilterListIcon />
        </IconButton>
    </Tooltip>
    </Toolbar>
  );
}

const useStyles = makeStyles(tableStyle);

export default function PatientList(props) {
  const { data } = props
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
                      onClick={() => console.log('kliknuto')}
                      tabIndex={-1}
                      key={row.email}
                    >
                      <TableCell  id={labelId} scope="row" align="left">
                        {row.firstName + ' ' + row.lastName}
                      </TableCell>
                      <TableCell align="left">{row.policyNumber}</TableCell>
                      <TableCell align="left">{row.city}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.personalID}</TableCell>
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