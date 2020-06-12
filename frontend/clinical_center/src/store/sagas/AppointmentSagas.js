import { call, put, select } from 'redux-saga/effects';
import { push, go } from 'connected-react-router'
import { appointmentService } from '../../services/AppointmentService';
import { setAppointmentTypes, setAppointmentTerms, setAppointments, setScheduledAppointment, setAvailableAppointments, setAddedAvailableAppointment } from '../actions/AppointmentActions';
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


export function* appointmentsGet(action) {
    try {
        const response = yield call(() => appointmentService.getAppointments());
        console.log(response);
        yield put(setAppointments(response));
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

export function* appointmentPut(action) {
    try {
        const resp = yield call(() => appointmentService.putAppointment(action.payload));
        console.log("APP PUT : ", resp);
    } catch (err) {

    }
}

export function* appointmentSchedule(action) {
    try {
        const resp = yield call(() => appointmentService.scheduleAppointment(action.payload));
        const msg = resp.data ? resp.data.msg : 'Successfully scheduled'
        yield put(setScheduledAppointment({ show: true, success: true, msg }))
    } catch (error) {
        const msg = error.response ? error.response.data.msg : 'Can not schedule'
        yield put(setScheduledAppointment({ show: true, success: false, msg }))
    }
}

export function* appointmentDelete(action) {
    try {
        const resp = yield call(() => appointmentService.deleteAppointment(action.payload));
    } catch (error) {
        console.log(error)
    }
}

export function* availableAppointmentsGet(action) {
    try {
        const resp = yield call(() => appointmentService.getAvailableAppointments(action.payload));
        yield put(setAvailableAppointments(resp));
        if (action.payload.clinicId !== undefined)
            yield put(setAppointments(resp));

    } catch (error) {
        console.log(error)
    }
}

export function* availableAppointmentCreate(action) {
    try {
        const resp = yield call(() => appointmentService.createAvailableAppointment(action.payload));
        console.log(resp)
        yield put(setAddedAvailableAppointment(resp.app))
    } catch (error) {
        console.log(error)
    }
}