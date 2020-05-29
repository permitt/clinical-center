import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { DASHBOARD } from '../../routes'

export function PublicRoute({
  component: Component,
  restricted,
  isAuthenticated,
  changedPass,
  ...rest
}) {
  return (
    <Route {...rest} 
        render={props => isAuthenticated  && restricted? <Redirect to={DASHBOARD} /> : <Component {...props} />  }
    />
  );
}

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
    return {
      isAuthenticated: state.authUser.isAuth,
      changedPass: state.authUser.changedPass
    };
  };

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(PublicRoute);