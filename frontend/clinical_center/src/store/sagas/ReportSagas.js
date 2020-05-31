import { call, put } from 'redux-saga/effects';
import { reportService } from '../../services/ReportsService';
import { setClinicReports, setIncome } from '../actions/ReportActions';

export function* clinicReportsGet(action) {
  try {
    console.log(action)
    const response = yield call(() => reportService.getClinicReports(action.payload))
    yield put(setClinicReports(response));
  } catch (error) {
    console.log({ error });
  }
}

export function* incomeGet(action) {
  try {
    const resp = yield call(() => reportService.getIncome(action.payload));
    yield put(setIncome(resp));
  } catch (error) {
    console.log({ error });
  }
}