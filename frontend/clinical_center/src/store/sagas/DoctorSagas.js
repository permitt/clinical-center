import { call, put, select } from 'redux-saga/effects';
import { push, go } from 'connected-react-router'
import { doctorService } from '../../services/DoctorService';
import { setDoctors } from '../actions/DoctorActions';

export function* doctorsGet(action) {
  try {
    const { data } = yield call(() => doctorService.getDoctors())
    yield put(setDoctors(data));
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