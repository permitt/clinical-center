import { call, put, select } from 'redux-saga/effects';
import { push, go } from 'connected-react-router'
import { appointmentService } from '../../services/AppointmentService';
import { setAppointmentTypes, setAppointmentTerms } from '../actions/AppointmentActions';
import { setDoctors } from '../actions/DoctorActions';
import { setClinics } from '../actions/ClinicActions';

export function* appointmentTypesGet(action) {
    try {
        const response = yield call(() => appointmentService.getAppointmentTypes())
        yield put(setAppointmentTypes(response));
    } catch (error) {
        console.log({ error });
    }
}

export function* appointmentChecking(action) {
    try {
        const resp = yield call(() => appointmentService.getAppointmentCheck(action.payload));
        yield put(setDoctors(resp.doctors));
        yield put(setClinics(resp.clinics));
        yield put(setAppointmentTerms(resp.availableTerms));
    } catch (err) {
        console.log(err);
    }
}

export function* appointmentPost(action) {
    try {
        const resp = yield call(() => appointmentService.postAppointment(action.payload));
        console.log(resp);
    } catch (err) {

    }
}