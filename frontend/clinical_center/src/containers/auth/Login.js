import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
                <LoginForm onSubmit={logIn}/>
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
