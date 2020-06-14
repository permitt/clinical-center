import { call, put } from 'redux-saga/effects';
import { push, go } from 'connected-react-router';
import jwt_decode from 'jwt-decode'

import { authUser, loginError, registerError, setRole, setEmail, setChangedPass, setProfile } from '../actions/AuthActions';
import AuthService from '../../services/AuthService'
import { DASHBOARD, LOGIN, CHANGE_PASSWORD } from '../../routes'
import { PATIENT } from '../../utils/constants'


export function* userLogin({ payload }) {
  try {
    const response = yield call(AuthService.login, payload)
    const decoded = jwt_decode(response.access)
    yield put(setRole(decoded.role))
    yield put(setEmail(decoded.email));
    if (decoded.role === PATIENT) {
      yield put(setChangedPass(true))
    } else {
      yield put(setChangedPass(decoded.changedPass))
    }
    yield put(authUser(true))
  } catch (error) {
    yield put(loginError(true))
  }
}

export function* userRegister({ payload }) {
  try {
    yield call(AuthService.signup, payload)
    alert("Please check your email to confirm");
    yield put(push(LOGIN))
  } catch (error) {
    alert("Patient with that email already exists.");

    yield put(registerError(true))
  }
}


export function* userChangePass({ payload }) {
  try {
    const response = yield call(AuthService.changePass, payload)
    yield call(AuthService.destroySession)
    yield put(authUser(false))
    yield put(setChangedPass(true))
    window.location.href = LOGIN;
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

export function* profileGet() {
  try {
    const response = yield call(AuthService.getUserProfile)
    yield put(setProfile(response.profile))
  } catch (error) {
    yield put(registerError(true))
  }
}

export function* profileEdit({ payload }) {
  try {
    const response = yield call(AuthService.editProfile, payload)
    yield put(setProfile(response))
  } catch (error) {
    yield put(registerError(true))
  }
}
