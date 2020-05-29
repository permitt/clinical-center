import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { LOGIN, CHANGE_PASSWORD } from '../../routes'

export function PrivateRoute({
  component: Component,
  isAuthenticated,
  changedPass,
  ...rest
}) {
  console.log('changed',changedPass)
  console.log('isAuth',isAuthenticated)
  return (
    <Route {...rest} 
        render={props => isAuthenticated && changedPass? <Component {...props} /> 
        : isAuthenticated? <Redirect to={CHANGE_PASSWORD}/> :<Redirect to={LOGIN} />}
    />
  );
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
    return {
      isAuthenticated: state.authUser.isAuth,
      changedPass: state.authUser.changedPass
    };
  };

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(PrivateRoute);