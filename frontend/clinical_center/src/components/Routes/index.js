import React from 'react'
import { BrowserRouter, Switch, Redirect } from 'react-router-dom'

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
  DASHBOARD
} from '../../routes'

function Routes() {
  return (
    <BrowserRouter>
        <Switch>
          <PublicRoute restricted={true} component={WelcomePage} path={WELCOME} exact />
          <PublicRoute restricted={true} component={Login} path={LOGIN} exact />
          <PrivateRoute component={Dashboard} path={DASHBOARD} />
          <PublicRoute restricted={true} component={Register} path={REGISTER} exact />
        </Switch>
      </BrowserRouter>
  );
}

export default Routes;