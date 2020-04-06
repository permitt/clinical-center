import { call, put } from 'redux-saga/effects';
import { push, go } from 'connected-react-router';

import { authUser, loginError, registerError, setRole } from '../actions/AuthActions';
import AuthService from '../../services/AuthService';
import { DASHBOARD, LOGIN } from '../../routes';
import { CLINIC_ADMIN } from '../../utils/constants';

export function* userLogin({ payload }) {
  try {
    const { data } = yield call(AuthService.login, payload);
    yield put(authUser(true));
   // yield put(setRole(data.user.role))
    yield put(setRole(CLINIC_ADMIN))
    yield put(push(DASHBOARD));
  } catch (error) {
    console.log('here')
    //dva reda ispod
    yield put(authUser(true));
    yield put(setRole(CLINIC_ADMIN))
    yield put(push(DASHBOARD));
    
  //  yield put(loginError(true));
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
