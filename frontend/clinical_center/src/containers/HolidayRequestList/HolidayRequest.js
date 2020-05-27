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

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
      marginTop: 10
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: 'center'
  },
}));

export default function HolidayRequest(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const { request, index } = props
  const [open, setOpen] = React.useState(false)

  const handleClose =  () => setOpen(false)

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Holiday request number {index + 1}
        </Typography>
        <Typography variant="h4" component="h2">
          {request.employee}
        </Typography>
        <Typography variant="h6" component="p">
            {bull}Start date: {request.startDate}
            <br/>
            {bull}End date: {request.endDate}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="big" variant="contained" color="primary">Approve</Button>
        <Button size="big" variant="contained" color="secondary" onClick={() => setOpen(true)}>Reject</Button>
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
            />
            <Button className={classes.button} size="big" color="primary" variant="contained">Done</Button>
          </div>
        </Fade>
      </Modal>
    </Card>
    
  );
}