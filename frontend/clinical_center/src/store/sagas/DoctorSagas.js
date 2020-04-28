import { call, put, select } from 'redux-saga/effects';
import { push, go } from 'connected-react-router'
import { doctorService } from '../../services/DoctorService';
import { setDoctors, setDoctor } from '../actions/DoctorActions';
import { registerError } from '../actions/AuthActions';
import { DASHBOARD } from '../../routes';

export function* doctorsGet(action) {
  try {
    const response = yield call(() => doctorService.getDoctors())
    yield put(setDoctors(response));
  } catch (error) {
    console.log({ error });
  }
}

export function* doctorDelete(action) {
  try {
    const email = action.payload
    const { data } = yield call(() => doctorService.deleteDoctor(email))
  } catch (error) {
    console.log({ error });
  }
}

export function* doctorAdd(action) {
  try {
    const response = yield call(() => doctorService.addDoctor(action.payload))
    yield put(setDoctor(action.payload))
  } catch (error) {
    console.log(error)
    yield put(registerError(true))
  }
}