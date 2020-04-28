import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import { Link as RouterLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { register } from '../../store/actions/AuthActions';
import { paper, avatar } from '../../assets/jss/material-dashboard-react/components/FormStyle';
import RegisterForm from './RegisterForm'
import { LOGIN } from '../../routes';

class Register extends Component {

  render() {
    return (
      <Container component="main" maxWidth="xs">
         <Helmet>
          <title>Register</title>
        </Helmet>
        <Paper style={paper} elevation={3}>
          <Avatar style={avatar}>
            <LockOutlinedIcon />
          </Avatar>
         <Typography component="h1" variant="h5">
            Register
          </Typography>
              <Grid>
                <Divider />
                <RegisterForm onSubmit={register}/> 
              </Grid>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link component={RouterLink} to={LOGIN} variant="body2">
                    Already have an account? Login
                  </Link>
                </Grid>
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
  register
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Register)
);
