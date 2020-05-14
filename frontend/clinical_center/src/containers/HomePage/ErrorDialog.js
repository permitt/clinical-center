import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ErrorDialog(props) {

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Action denied</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="outlined" onClick={props.handleClose}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}