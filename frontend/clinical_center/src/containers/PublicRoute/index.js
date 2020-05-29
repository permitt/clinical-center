import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { DASHBOARD, CHANGE_PASSWORD } from '../../routes'

export function PublicRoute({
  component: Component,
  restricted,
  isAuthenticated,
  changedPass,
  ...rest
}) {

  return (
    <Route {...rest} 
        render={props => {
          if (isAuthenticated  && restricted && changedPass)
           return <Redirect to={DASHBOARD} /> 
          if (isAuthenticated && !changedPass )
            return <Redirect to={CHANGE_PASSWORD}/>
          
          return <Component {...props} />  
        }}
    />
  );
}

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
    return {
      isAuthenticated: state.authUser.isAuth,
      changedPass: state.authUser.changedPass || false
    };
  };

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(PublicRoute);