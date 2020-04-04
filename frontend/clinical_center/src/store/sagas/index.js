import { all, takeLatest } from 'redux-saga/effects';
import { LOGIN, REGISTER } from '../actions/ActionTypes';
import { userLogin, userRegister } from './AuthSagas';

export default function* rootSaga() {
  yield all([
    takeLatest(LOGIN, userLogin),
    takeLatest(REGISTER, userRegister)
  ]);
}