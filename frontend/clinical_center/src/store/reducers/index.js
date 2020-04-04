import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './AuthReducer';

export default history =>
  combineReducers({
    authUser: authReducer,
    router: connectRouter(history)
  });