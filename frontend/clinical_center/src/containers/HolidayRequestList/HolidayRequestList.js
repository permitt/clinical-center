import React, { useEffect }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Alert from '@material-ui/lab/Alert';

import { gridStyle } from "../../assets/jss/material-dashboard-react/components/gridStyle.js";
import { resetError } from '../../store/actions/ErrorActions'
import { resolveRequest } from '../../store/actions/HolidayRequestActions'
import HolidayRequest from './HolidayRequest.js';
import style from '../../assets/jss/material-dashboard-react/components/requestCardStyle';


const useStyles = makeStyles(gridStyle);
const modalStyles = makeStyles(style)  

function HolidayRequestList(props) {
    const classes = useStyles();
    const modalClasses = modalStyles()
    const [open, setOpen] = React.useState(props.resolved)

    useEffect(()=> {
      setOpen(props.resolved)
    },[props.resolved])

    const handleClose =  () => setOpen(false)
    let { data } = props
    const [state, setState] = React.useState({loading: true, empty: false})
    
    useEffect(()=> {
       setState({
         loading: data? false: true, 
         empty: data ? data.length === 0 : false
        })
    }, [props.data])

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
            {data && data.map((request, index) => (
                <Grid item xs={6} key={index}>
                    <HolidayRequest request={request} index={index} resolve={props.resolveRequest}/>
                </Grid>
            ))}
            {state.empty && 
              <Typography variant="h4" component="h2">
                  There's no new holiday requests
              </Typography>}
            {state.loading && <CircularProgress />}
        </Grid>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={modalClasses.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={modalClasses.paper} >
          <Alert severity="success">Holiday request successfully resolved</Alert>
          </div>
        </Fade>
      </Modal>
      </div>
    );
  }


const mapStateToProps = state => {
  return {
    resolved: state.request.resolved
  };
};

const mapDispatchToProps = {
  resetError,
  resolveRequest
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HolidayRequestList)
);