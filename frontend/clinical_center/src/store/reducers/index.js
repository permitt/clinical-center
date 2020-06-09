import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './AuthReducer';
import errorReducer from './ErrorReducer';
import doctorReducer from './DoctorReducer';
import clinicReducer from './ClinicReducer';
import appointmetReducer from './AppointmentReducer';
import hallReducer from './HallReducer'
import patientReducer from './PatientReducer'
import typeReducer from './AppointmentTypeReducer'
import requestReducer from './HolidayRequestReducer';
import reportReducer from './ReportReducer'
import ratingReducer from './RatingReducer';

export default history =>
  combineReducers({
    authUser: authReducer,
    error: errorReducer,
    hall: hallReducer,
    doctor: doctorReducer,
    clinic: clinicReducer,
    appointment: appointmetReducer,
    patient: patientReducer,
    type: typeReducer,
    router: connectRouter(history),
    request: requestReducer,
    report: reportReducer,
    rating: ratingReducer
  });