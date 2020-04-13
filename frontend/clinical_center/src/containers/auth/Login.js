import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { logIn } from '../../store/actions/AuthActions';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LoginForm from './LoginForm';
import { paper, avatar } from '../../styles/FormStyle';
import Link from '@material-ui/core/Link';
import { REGISTER } from '../../routes';


class Login extends Component {

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <Helmet>
          <title>Login</title>
        </Helmet>
        <Paper style={paper} elevation={3}>
          <Avatar style={avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Grid>
            <Divider />
            <LoginForm onSubmit={logIn} />
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} to={REGISTER} variant="body2">
                Don't have an account? Register
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
    loginError: state.error.loginError
  };
};

const mapDispatchToProps = {
  logIn
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
