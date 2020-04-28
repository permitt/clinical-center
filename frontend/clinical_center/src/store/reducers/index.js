import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './AuthReducer';
import errorReducer from './ErrorReducer';
import doctorReducer from './DoctorReducer';
import clinicalCenterReducer from './ClinicalCenterReducer';

export default history =>
  combineReducers({
    authUser: authReducer,
    error: errorReducer,
    doctor: doctorReducer,
    clinicalCenter: clinicalCenterReducer,
    router: connectRouter(history)
  });