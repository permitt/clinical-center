import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { DASHBOARD, CHANGE_PASSWORD } from '../../routes'
import { PATIENT } from '../../utils/constants'

export function PublicRoute({
  component: Component,
  restricted,
  isAuthenticated,
  changedPass,
  role,
  ...rest
}) {

  return (
    <Route {...rest} 
        render={props => {
          if (role === PATIENT){

            return isAuthenticated  && restricted?  <Redirect to={DASHBOARD} />  : <Component {...props} />  
          }
          else {
            if (isAuthenticated  && restricted  && changedPass)

              return <Redirect to={DASHBOARD} /> 
            else if (isAuthenticated && !changedPass)

              return <Redirect to={CHANGE_PASSWORD}/>
            else  

              return <Component {...props} /> 
          }
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
      changedPass: state.authUser.changedPass || false,
      role: state.authUser ? state.authUser.role : null
    };
  };

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(PublicRoute);