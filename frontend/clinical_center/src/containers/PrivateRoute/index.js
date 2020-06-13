import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { PATIENT } from '../../utils/constants'
import { LOGIN, CHANGE_PASSWORD } from '../../routes'

export function PrivateRoute({
  component: Component,
  isAuthenticated,
  changedPass,
  role,
  ...rest
}) {

  return (
    <Route {...rest} 
        render={props => {
          if (role === PATIENT){
            
            return isAuthenticated ?  <Component {...props} /> : <Redirect to={LOGIN} />
          }
          else {
            if (isAuthenticated && changedPass)

              return  <Component {...props} /> 
            else if (isAuthenticated && !changedPass)

              return <Redirect to={CHANGE_PASSWORD} />
              else 
                return <Redirect to={LOGIN} />
          }
        }}
    />
  );
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
    return {
      isAuthenticated: state.authUser.isAuth,
      changedPass: state.authUser.changedPass || false,
      role: state.authUser ? state.authUser.role : null
    };
  };

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(PrivateRoute);