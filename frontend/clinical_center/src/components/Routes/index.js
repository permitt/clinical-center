import React from 'react'
import PrivateRoute from '../../containers/PrivateRoute'
import PublicRoute from '../../containers/PublicRoute'
import Login from '../../containers/auth/Login'
import Dashboard from '../../containers/Dashboard'
import WelcomePage from '../WelcomePage'
import { BrowserRouter, Switch } from 'react-router-dom'
import {
  WELCOME,
  LOGIN,
  DASHBOARD
} from '../../routes'

function Routes() {
  return (
    <BrowserRouter>
        <Switch>
          <PublicRoute restricted={true} component={WelcomePage} path={WELCOME} exact />
          <PublicRoute restricted={true} component={Login} path={LOGIN} exact />
          <PrivateRoute component={Dashboard} path={DASHBOARD} exact />
        </Switch>
      </BrowserRouter>
  );
}

export default Routes;