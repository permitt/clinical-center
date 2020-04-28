import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { paper, avatar } from '../../assets/jss/material-dashboard-react/components/FormStyle';

class FormContainer extends Component {

  render() {
    return (
      <Container component="main" maxWidth="xs">
         <Helmet>
          <title>{this.props.title}</title>
        </Helmet>
        <Paper style={paper} elevation={3}>
          <Avatar style={avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {this.props.title}
          </Typography>
          <Grid>
            <Divider />
            {this.props.form}
          </Grid>
        </Paper> 
      </Container>
    );
  }
}

export default withRouter(FormContainer);
