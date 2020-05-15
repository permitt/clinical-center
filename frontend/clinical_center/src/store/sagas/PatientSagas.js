import { call, put } from 'redux-saga/effects';
import { patientService } from '../../services/PatientService';
import { setPatients } from '../actions/PatientsActions';

export function* patientsGet(action) {
  try {
    console.log(action)
    const response = yield call(() => patientService.getPatients(action.payload))
    yield put(setPatients(response));
  } catch (error) {
    console.log({ error });
  }
}
