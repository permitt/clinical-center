import { call, put, select } from 'redux-saga/effects';
import { push, go } from 'connected-react-router'
import { clinicalCenterService } from '../../services/ClinicalCenterService';
import { getAll, setClinicalCenters } from '../actions/ClinicalCenterActions';
import { registerError } from '../actions/AuthActions';
import { DASHBOARD } from '../../routes';

export function* getClinicalCenters(action) {
    try {
        const response = yield call(() => clinicalCenterService.getAll())
        yield put(setClinicalCenters(response));
    } catch (error) {
        console.log({ error });
    }
}