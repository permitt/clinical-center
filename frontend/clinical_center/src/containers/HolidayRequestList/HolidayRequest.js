import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import style from '../../assets/jss/material-dashboard-react/components/requestCardStyle';

const useStyles = makeStyles(style)

export default function HolidayRequest(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const { request, index } = props
  const [open, setOpen] = React.useState(false)
  const [text, setText] = React.useState('')

  const handleClose =  () => setOpen(false)

  const approve = () => {
    console.log('rekverst',request)
    props.resolve({id: request.id, decision: true})
  }

  const reject = () => {
    props.resolve({id: request.id, decision: false, text: text})
  }
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Holiday request number {index + 1}
        </Typography>
        <Typography variant="h4" component="h2">
          {request.nameDoc || request.nameNurse}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {request.email}
        </Typography>
        <Typography variant="h6" component="p">
            {bull}Start date: {request.startDate}
            <br/>
            {bull}End date: {request.endDate}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" variant="contained" color="primary" onClick={approve}>Approve</Button>
        <Button size="medium" variant="contained" color="secondary" onClick={() => setOpen(true)}>Reject</Button>
      </CardActions>
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
          <div className={classes.paper} >
            <Typography  variant="h6" component="h2">
              Insert reason for rejecting holiday request
            </Typography>
            <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                defaultValue=""
                variant="outlined"
                autoFocus
                fullWidth
                onChange={e => setText(e.target.value)}
            />
            <Button 
              className={classes.button} 
              size="medium" 
              color="primary" 
              variant="contained"
              onClick={reject}
              >
                Done
              </Button>
          </div>
        </Fade>
      </Modal>
    </Card>
    
  );
}