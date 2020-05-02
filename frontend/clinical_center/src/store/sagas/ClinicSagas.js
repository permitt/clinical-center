import { call, put, select } from 'redux-saga/effects';
import { push, go } from 'connected-react-router'
import { clinicService } from '../../services/ClinicService';
import { getClinics, setClinics } from '../actions/ClinicActions';


export function* clinicsGet(action) {
    try {
        const response = yield call(() => clinicService.getAll(action.orderBy))
        yield put(setClinics(response));
    } catch (error) {
        console.log({ error });
    }
}