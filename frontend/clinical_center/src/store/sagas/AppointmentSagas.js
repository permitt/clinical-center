import { call, put, select } from 'redux-saga/effects';
import { push, go } from 'connected-react-router'
import { appointmentService } from '../../services/AppointmentService';
import { setAppointmentTypes } from '../actions/AppointmentActions';


export function* appointmentTypesGet(action) {
    try {
        const response = yield call(() => appointmentService.getAppointmentTypes())
        yield put(setAppointmentTypes(response));
    } catch (error) {
        console.log({ error });
    }
}