import { call, put, select } from 'redux-saga/effects';
import { push, go } from 'connected-react-router'
import { clinicService } from '../../services/ClinicService';
import { setAdminClinic, setClinics } from '../actions/ClinicActions';


export function* clinicsGet(action) {
    try {
        const response = yield call(() => clinicService.getAll(action.orderBy))
        yield put(setClinics(response));
    } catch (error) {
        console.log({ error });
    }
}


export function* adminClinicGet(action) {
    try {
        const { data } = yield call(() => clinicService.getAdminClinic())
        yield put(setAdminClinic(data.clinic));
    } catch (error) {
        console.log({ error });
    }
}


export function* adminClinicEdit(action) {
    try {
        const response = yield call(() => clinicService.editAdminClinic(action.payload))
        yield put(setAdminClinic(response.data));
    } catch (error) {
        console.log({ error });
    }
}