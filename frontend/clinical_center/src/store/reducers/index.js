import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './AuthReducer';
import errorReducer from './ErrorReducer';
import doctorReducer from './DoctorReducer';
import clinicReducer from './ClinicReducer';
import appointmetReducer from './AppointmentReducer';

export default history =>
  combineReducers({
    authUser: authReducer,
    error: errorReducer,
    doctor: doctorReducer,
    clinic: clinicReducer,
    appointment: appointmetReducer,
    router: connectRouter(history)
  });