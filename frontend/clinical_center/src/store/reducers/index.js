import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './AuthReducer';
import errorReducer from './ErrorReducer';

export default history =>
  combineReducers({
    authUser: authReducer,
    error: errorReducer,
    router: connectRouter(history)
  });