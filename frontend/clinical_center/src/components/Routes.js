import React from 'react';
//import PrivateRoute from '../containers/PrivateRoute';
import PublicRoute from '../containers/PublicRoute';
// import Login from '../containers/auth/Login';
// import Register from '../containers/auth/Register';
import WelcomePage from './WelcomePage'
import { BrowserRouter, Switch } from 'react-router-dom';
import {
  WELCOME,
  LOGIN,
  REGISTER
} from '../routes';

 export default function Routes() {
  return (
    <BrowserRouter>
        <Switch>
          <PublicRoute restricted={false} component={WelcomePage} path={WELCOME} exact />
         
        </Switch>
      </BrowserRouter>
  );
}