import { call, put, select } from 'redux-saga/effects';
import { push, go } from 'connected-react-router'
import { appointmentService } from '../../services/AppointmentService';
import { setAppointmentTypes, setAppointmentTerms } from '../actions/AppointmentActions';
import { setDoctors } from '../actions/DoctorActions';
import { setAvailableClinics } from '../actions/ClinicActions';
import { DASHBOARD } from '../../routes';

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
        console.log("APP CHECKING : ", resp);
        yield put(setDoctors(resp.doctors));
        yield put(setAvailableClinics(resp.clinics));
        yield put(setAppointmentTerms(resp.availableTerms));
    } catch (err) {
        console.log(err);
    }
}

export function* appointmentPost(action) {
    try {
        const resp = yield call(() => appointmentService.postAppointment(action.payload));
        yield put(push(DASHBOARD));
        console.log("APP POSTING : ", resp);
    } catch (err) {

    }
}

export function* appointmentSchedule(action) {
    try {
        const resp = yield call(() => appointmentService.scheduleAppointment(action.payload));
        console.log("APP SCHEDULE : ", resp);
    } catch (err) {
        console.log(err);
    }
}