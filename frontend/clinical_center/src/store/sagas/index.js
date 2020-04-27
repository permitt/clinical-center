import { all, takeLatest } from 'redux-saga/effects';
import { LOGIN, REGISTER, GET_DOCTORS, DELETE_DOCTOR } from '../actions/ActionTypes';
import { userLogin, userRegister } from './AuthSagas';
import { doctorsGet, doctorDelete } from './DoctorSagas';

export default function* rootSaga() {
  yield all([
    takeLatest(LOGIN, userLogin),
    takeLatest(REGISTER, userRegister),
    takeLatest(GET_DOCTORS, doctorsGet),
    takeLatest(DELETE_DOCTOR, doctorDelete),
  ]);
}