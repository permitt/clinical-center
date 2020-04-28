import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './AuthReducer';
import errorReducer from './ErrorReducer';
import doctorReducer from './DoctorReducer';
import clinicReducer from './ClinicReducer';

export default history =>
  combineReducers({
    authUser: authReducer,
    error: errorReducer,
    doctor: doctorReducer,
    clinic: clinicReducer,
    router: connectRouter(history)
  });