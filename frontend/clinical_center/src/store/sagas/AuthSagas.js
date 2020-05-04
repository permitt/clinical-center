import { call, put } from 'redux-saga/effects';
import { push, go } from 'connected-react-router';

import { authUser, loginError, registerError, setRole } from '../actions/AuthActions';
import AuthService from '../../services/AuthService'
import { DASHBOARD, LOGIN } from '../../routes'
import jwt_decode from 'jwt-decode'

export function* userLogin({ payload }) {
  try {
    const response = yield call(AuthService.login, payload)
    yield put(authUser(true))
    const decoded = jwt_decode(response.access)
    yield put(setRole(decoded.role))
    yield put(push(DASHBOARD))
  } catch (error) {
    yield put(loginError(true))
  }
}

export function* userRegister({ payload }) {
  try {
    yield call(AuthService.signup, payload)
    yield put(push(LOGIN))
  } catch (error) {
    yield put(registerError(true))
  }
}

export function* userLogout() {
  try {
    const response = yield call(AuthService.logout)
    yield put(authUser(false))
    yield put(push(LOGIN))
  } catch (error) {
    yield put(loginError(true))
  }
}
