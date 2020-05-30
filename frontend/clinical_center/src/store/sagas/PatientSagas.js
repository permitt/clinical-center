import { call, put } from 'redux-saga/effects';
import { patientService } from '../../services/PatientService';
import { setPatients, setPatient, putPatient } from '../actions/PatientsActions';

export function* patientsGet(action) {
  try {
    console.log(action)
    const response = yield call(() => patientService.getPatients(action.payload))
    yield put(setPatients(response));
  } catch (error) {
    console.log({ error });
  }
}

export function* patientGet(action) {
  try {
    const resp = yield call(() => patientService.getPatient(action.payload));
    yield put(setPatient(resp));
  } catch (error) {
    console.log({ error });
  }
}


export function* patientPut(action) {
  try {
    const resp = yield call(() => patientService.putPatient(action.payload));
    yield put(setPatient(resp));
    alert("CHANGED PATIENT");
  } catch (error) {
    console.log(error);
  }
}

export function* patientsSearch(action) {
  try {
    console.log(action)
    const response = yield call(() => patientService.searchPatients(action.payload))
    yield put(setPatients(response));
  } catch (error) {
    console.log({ error });
  }
}