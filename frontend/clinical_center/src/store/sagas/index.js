import { all, takeLatest } from 'redux-saga/effects';
import { LOGIN, REGISTER, GET_DOCTORS, DELETE_DOCTOR, ADD_DOCTOR, GET_CLINICS, GET_APPOINTMENT_TYPES } from '../actions/ActionTypes';
import { userLogin, userRegister } from './AuthSagas';
import { doctorsGet, doctorDelete, doctorAdd } from './DoctorSagas';
import { clinicsGet } from './ClinicSagas';
import { appointmentTypesGet } from './AppointmentSagas';

export default function* rootSaga() {
  yield all([
    takeLatest(LOGIN, userLogin),
    takeLatest(REGISTER, userRegister),
    takeLatest(GET_DOCTORS, doctorsGet),
    takeLatest(DELETE_DOCTOR, doctorDelete),
    takeLatest(ADD_DOCTOR, doctorAdd),
    takeLatest(GET_CLINICS, clinicsGet),
    takeLatest(GET_APPOINTMENT_TYPES, appointmentTypesGet)
  ]);
}