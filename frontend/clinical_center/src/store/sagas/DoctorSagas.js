import { call, put } from 'redux-saga/effects';
import { doctorService } from '../../services/DoctorService';
import { setDoctors, setDoctor, setDeletedDoctor } from '../actions/DoctorActions';
import { registerError } from '../actions/AuthActions';
import { deleteError } from '../actions/ErrorActions';

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
    yield put(setDeletedDoctor(email))
  } catch ({response}) {
    yield put(deleteError(response.data.msg))
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