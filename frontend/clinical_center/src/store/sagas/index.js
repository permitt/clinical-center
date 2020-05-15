import { all, takeLatest } from 'redux-saga/effects';
import { LOGIN, LOGOUT, REGISTER, 
  GET_DOCTORS, DELETE_DOCTOR, ADD_DOCTOR, 
  GET_CLINICS, 
  GET_APPOINTMENT_TYPES, GET_APPOINTMENT_CHECK, POST_APPOINTMENT,
  GET_HALLS, SEARCH_HALLS, DELETE_HALL, ADD_HALL, EDIT_HALL, 
  GET_PATIENTS,
  GET_TYPES, SEARCH_TYPES, DELETE_TYPE, ADD_TYPE, EDIT_TYPE, 
 } from '../actions/ActionTypes';
import { userLogin, userRegister, userLogout } from './AuthSagas';
import { doctorsGet, doctorDelete, doctorAdd } from './DoctorSagas';
import { clinicsGet } from './ClinicSagas';
import { appointmentTypesGet, appointmentChecking, appointmentPost } from './AppointmentSagas';
import { hallsGet, hallsSearch, hallDelete, hallAdd, hallEdit } from './HallSaga'
import { typesGet, typesSearch, typeDelete, typeAdd, typeEdit } from './AppointmentTypeSagas'
import { patientsGet } from './PatientSagas'

export default function* rootSaga() {
  yield all([
    takeLatest(LOGIN, userLogin),
    takeLatest(LOGOUT, userLogout),
    takeLatest(REGISTER, userRegister),
    takeLatest(GET_DOCTORS, doctorsGet),
    takeLatest(DELETE_DOCTOR, doctorDelete),
    takeLatest(ADD_DOCTOR, doctorAdd),
    takeLatest(GET_CLINICS, clinicsGet),
    takeLatest(GET_APPOINTMENT_TYPES, appointmentTypesGet),
    takeLatest(GET_APPOINTMENT_CHECK, appointmentChecking),
    takeLatest(POST_APPOINTMENT, appointmentPost),
    takeLatest(GET_HALLS, hallsGet),
    takeLatest(SEARCH_HALLS, hallsSearch),
    takeLatest(DELETE_HALL, hallDelete),
    takeLatest(ADD_HALL, hallAdd),
    takeLatest(EDIT_HALL, hallEdit),
    takeLatest(GET_PATIENTS, patientsGet),

    takeLatest(GET_TYPES, typesGet),
    takeLatest(SEARCH_TYPES, typesSearch),
    takeLatest(DELETE_TYPE, typeDelete),
    takeLatest(ADD_TYPE, typeAdd),
    takeLatest(EDIT_TYPE, typeEdit),
  ]);
}