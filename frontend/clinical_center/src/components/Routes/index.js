import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'

import PrivateRoute from '../../containers/PrivateRoute'
import PublicRoute from '../../containers/PublicRoute'
import Login from '../../containers/auth/Login'
import Dashboard from '../../containers/Dashboard'
import Register from '../../containers/auth/Register'
import WelcomePage from '../WelcomePage'

import {
  WELCOME,
  LOGIN,
  REGISTER,
  DASHBOARD,
  USER_PROFILE
} from '../../routes'
import Profile from '../../containers/Profile';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute restricted={true} component={WelcomePage} path={WELCOME} exact />
        <PublicRoute restricted={true} component={Login} path={LOGIN} exact />
        <PrivateRoute component={Dashboard} path={DASHBOARD} />
        <PublicRoute restricted={true} component={Register} path={REGISTER} exact />
        <PrivateRoute component={Profile} path={USER_PROFILE} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;