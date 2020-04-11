import { call, put } from 'redux-saga/effects';
import { push, go } from 'connected-react-router';

import { authUser, loginError, registerError, setRole } from '../actions/AuthActions';
import AuthService from '../../services/AuthService';
import { DASHBOARD, LOGIN } from '../../routes';
import { CLINIC_ADMIN } from '../../utils/constants';

export function* userLogin({ payload }) {
  try {
    const response = yield call(AuthService.login, payload);
    yield put(authUser(true));
    console.log(response)
    yield put(setRole(response.role))
    yield put(push(DASHBOARD));
  } catch (error) {    
    yield put(loginError(true));
  }
}

export function* userRegister({ payload }) {
  try {
    yield call(AuthService.signup, payload);
    yield put(push(LOGIN));
  } catch (error) {
    yield put(registerError(true));
  }
}
