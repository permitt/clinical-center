import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { LOGIN } from '../../routes'

export function PrivateRoute({
  component: Component,
  isAuthenticated,
  ...rest
}) {

  return (
    <Route {...rest} 
        render={props => isAuthenticated ? <Component {...props} /> : <Redirect to={LOGIN} />}
    />
  );
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
    return {
      isAuthenticated: state.authUser.isAuth
    };
  };

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(PrivateRoute);