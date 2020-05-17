import { call, put } from 'redux-saga/effects';
import { doctorService } from '../../services/DoctorService';
import { setDoctors, setDoctor, setDeletedDoctor } from '../actions/DoctorActions';
import { deleteError, addError } from '../actions/ErrorActions';

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
    yield put(addError(true))
  }
}