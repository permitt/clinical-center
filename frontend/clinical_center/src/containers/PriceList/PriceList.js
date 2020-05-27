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
import { deleteType } from '../../store/actions/AppointmentTypeActions'
import { resetError } from '../../store/actions/ErrorActions'

const useStyles = makeStyles(styles);
const useToolbarStyles = makeStyles(toolbarStyles)

function PriceList(props) {
  const  { data } = props
  console.log(data)
  const classes = useStyles();
  const toolBarclasses = useToolbarStyles();
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null)
  const [searchInput, setSearchInput] = React.useState('')

  const handleChange = event => {
    setSearchInput(event.target.value)
    //props.search(event.target.value)
  }

  const handleOpen = () => {
    setSelected(null)
    setOpen(true);
  };

  const handleClose = () => {
    props.resetError()
    setOpen(false);
  };

  const handleEdit = row => {
    setSelected(row)
    setOpen(true)
  }

  useEffect(() => {
    setOpen(false)
    
  }, [props])

  const formatHours = mins => {
    const hours = Math.floor(mins / 60);  
    const minutes = mins % 60;
    return ('0' + hours).slice(-2) + ":" + ('0' + minutes).slice(-2);  
  }

  return (
  <div className={classes.root}>
    <div className={classes.container}>
    <Toolbar className={classes.highlight}>
      <Typography className={toolBarclasses.title} variant="h6" id="tableTitle" component="div">
          Price list
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
        <FormContainer 
          form={<AppointmentTypeForm selected={selected}/>} 
          title={selected ? "Edid appointment type":"Add new appointment type"}/>
        </Fade>
      </Modal>
    </Toolbar >
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Appointment type name</TableCell>
            <TableCell align="left">Duration (hours)</TableCell>
            <TableCell align="left">Price ($)</TableCell>
            <TableCell align="left">Delete</TableCell>
            <TableCell align="left">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="left">{row.typeName}</TableCell>
              <TableCell align="left" >{formatHours(row.duration)}</TableCell>
              <TableCell align="left" >{row.price}</TableCell>
              <TableCell align="left" width={20}>
                <IconButton aria-label="filter list" onClick={() => props.delete(row.id)}>
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
    </div>
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
  )(PriceList)
);