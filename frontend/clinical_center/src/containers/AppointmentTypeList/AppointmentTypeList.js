import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


import styles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";
import toolbarStyles from "../../assets/jss/material-dashboard-react/components/tableToolbarStyle"
import AppointmentTypeForm from "../Forms/AppointmentTypeForm"
import FormContainer from "../../components/FormContainer/FormContainer"

const useStyles = makeStyles(styles);
const useToolbarStyles = makeStyles(toolbarStyles)


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function AppointmentTypeList() {
  const classes = useStyles();
  const toolBarclasses = useToolbarStyles();
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState()
  const [searchInput, setSearchInput] = React.useState('')

  const handleChange = event => {
    setSearchInput(event.target.value)
    //props.search(event.target.value)
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = row => {
    setSelected(row)
    setOpen(true)
  }

  return (
  <>
    <Toolbar className={classes.highlight}>
      <Typography className={toolBarclasses.title} variant="h6" id="tableTitle" component="div">
          Appointment types
      </Typography>
      <TextField
        id="standard-search"
        type="search"
        value={searchInput || ""}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }} />
      <IconButton aria-label="filter list" onClick={handleOpen}>
        <AddBoxIcon />
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        <FormContainer form={<AppointmentTypeForm selected={selected}/>} title="Add new appointment type"/>
        </Fade>
      </Modal>
    </Toolbar >
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Duration</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Delete</TableCell>
            <TableCell align="left">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="left">{row.calories}</TableCell>
              <TableCell align="left" >{row.fat}</TableCell>
              <TableCell align="left" >{row.fat}</TableCell>
              <TableCell align="left" width={20}>
                <IconButton aria-label="filter list" onClick={() => console.log('da')}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
              <TableCell align="left" width={20} >
                <IconButton aria-label="filter list" onClick={() => handleEdit(row)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}