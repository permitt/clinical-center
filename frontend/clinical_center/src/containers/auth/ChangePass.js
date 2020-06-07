import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { paper, avatar } from '../../assets/jss/material-dashboard-react/components/FormStyle';
import ChangePassForm from './ChangePassForm'

class ChangePass extends Component {

  render() {
    return (
      <Container component="main" maxWidth="xs">
         <Helmet>
          <title>Change password</title>
        </Helmet>
        <Paper style={paper} elevation={3}>
          <Avatar style={avatar}>
            <LockOutlinedIcon />
          </Avatar>
         <Typography component="h1" variant="h5">
            Insert new password
          </Typography>
          <Typography component="p" variant="body2" style={{margin:15}}>
            You need to change your password before entering this site. Password should contain at least 6 characters.
          </Typography> 
              <Grid>
                <Divider />
                <ChangePassForm /> 
              </Grid>
        </Paper> 
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    registerError: state.error.registerError
  };
};

const mapDispatchToProps = {
  //changePass
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChangePass)
);
