import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'

import PrivateRoute from '../../containers/PrivateRoute'
import PublicRoute from '../../containers/PublicRoute'
import Login from '../../containers/auth/Login'
import Dashboard from '../../containers/Dashboard'
import Register from '../../containers/auth/Register'
import WelcomePage from '../WelcomePage'
import ChangePass from '../../containers/auth/ChangePass'
import { PATIENT } from '../../utils/constants'

import {
  WELCOME,
  LOGIN,
  REGISTER,
  DASHBOARD,
  USER_PROFILE,
  CHANGE_PASSWORD,
  EDIT_PROFILE
} from '../../routes'
import Profile from '../../containers/Profile';
import EditProfile from '../../containers/Profile/EditProfile'
import { changePass } from '../../store/actions/AuthActions'

function Routes(props) {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute restricted={true} component={WelcomePage} path={WELCOME} exact />
        <PublicRoute restricted={true} component={Login} path={LOGIN} exact />
        <Route path={CHANGE_PASSWORD} render={() => 
         props.role === PATIENT || props.changedPass ? <Redirect to={DASHBOARD} /> :<ChangePass />
        }
        />
        <PrivateRoute component={Dashboard} path={DASHBOARD} />
        <PublicRoute restricted={true} component={Register} path={REGISTER} exact />
        <PrivateRoute component={Profile} path={USER_PROFILE} />
        <PrivateRoute component={EditProfile} path={EDIT_PROFILE} />
      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
    return {
      changedPass: state.authUser.changedPass || false,
      role: state.authUser ? state.authUser.role : null
    };
  };

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Routes);