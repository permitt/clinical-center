import { call, put, select } from 'redux-saga/effects';
import { push, go } from 'connected-react-router'
import { doctorService } from '../../services/DoctorService';
import { setDoctors } from '../actions/DoctorActions';

export function* doctorsGet(action) {
  try {
    const { data } = yield call(() => doctorService.getDoctors())
    console.log('iz sage', data)
    yield put(setDoctors(data));
  } catch (error) {
    console.log({ error });
  }
}