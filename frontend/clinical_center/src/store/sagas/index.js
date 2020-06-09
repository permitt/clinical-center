import { all, takeLatest } from 'redux-saga/effects';
import {
  LOGIN, LOGOUT, REGISTER, CHANGEPASS,
  GET_DOCTORS, DELETE_DOCTOR, ADD_DOCTOR,
  GET_CLINICS, EDIT_ADMIN_CLINIC,
  GET_APPOINTMENT_TYPES, GET_APPOINTMENT_CHECK, POST_APPOINTMENT, GET_APPOINTMENTS,
  GET_HALLS, SEARCH_HALLS, DELETE_HALL, ADD_HALL, EDIT_HALL,
  GET_PATIENTS, GET_PATIENT, PUT_PATIENT, SEARCH_PATIENTS,
  GET_TYPES, SEARCH_TYPES, DELETE_TYPE, ADD_TYPE, EDIT_TYPE,

  GET_REQUESTS, RESOLVE_REQUEST, GET_PROFILE, EDIT_PROFILE, SCHEDULE_APPOINTMENT, DELETE_APPOINTMENT, CREATE_REQUEST,
  GET_CLINIC_REPORTS, GET_INCOME, GET_ADMIN_CLINIC, GET_AVAILABLE_APPOINTMENTS, SEARCH_DOCTORS, ADD_APPOINTMENT_TERM,
  GET_DOCTOR_RATINGS, GET_CLINIC_RATINGS, POST_CLINIC_RATING, POST_DOCTOR_RATING, PUT_DOCTOR_RATING, PUT_CLINIC_RATING,
  GET_OPERATIONS,
  GET_HEALTH_CARD

} from '../actions/ActionTypes';
import { userLogin, userRegister, userLogout, userChangePass, profileGet, profileEdit } from './AuthSagas';
import { doctorsGet, doctorDelete, doctorAdd, doctorSearch } from './DoctorSagas';
import { clinicsGet, adminClinicGet, adminClinicEdit } from './ClinicSagas';
import { appointmentTypesGet, appointmentChecking, appointmentPost, appointmentsGet, appointmentSchedule, availableAppointmentsGet, appointmentDelete, availableAppointmentCreate } from './AppointmentSagas';
import { hallsGet, hallsSearch, hallDelete, hallAdd, hallEdit } from './HallSaga'
import { typesGet, typesSearch, typeDelete, typeAdd, typeEdit } from './AppointmentTypeSagas'
import { patientsGet, patientGet, patientPut, patientsSearch } from './PatientSagas'
import { requestResolve, requestsGet, requestCreate } from './HolidayRequestSagas'
import { clinicReportsGet, incomeGet } from './ReportSagas'
import { clinicRatingsGet, doctorRatingsGet, putClinicRating, putDoctorRating, postClinicRating, postDoctorRating } from './RatingSagas'
import { operationsGet } from './OperationSagas';
import { healthCardGet } from './HealthCardSagas';

export default function* rootSaga() {
  yield all([
    takeLatest(LOGIN, userLogin),
    takeLatest(LOGOUT, userLogout),
    takeLatest(REGISTER, userRegister),
    takeLatest(CHANGEPASS, userChangePass),
    takeLatest(GET_PROFILE, profileGet),
    takeLatest(EDIT_PROFILE, profileEdit),

    takeLatest(GET_DOCTORS, doctorsGet),
    takeLatest(DELETE_DOCTOR, doctorDelete),
    takeLatest(ADD_DOCTOR, doctorAdd),
    takeLatest(SEARCH_DOCTORS, doctorSearch),

    takeLatest(GET_CLINICS, clinicsGet),
    takeLatest(GET_ADMIN_CLINIC, adminClinicGet),
    takeLatest(EDIT_ADMIN_CLINIC, adminClinicEdit),
    takeLatest(GET_APPOINTMENTS, appointmentsGet),
    takeLatest(GET_APPOINTMENT_TYPES, appointmentTypesGet),
    takeLatest(GET_APPOINTMENT_CHECK, appointmentChecking),
    takeLatest(POST_APPOINTMENT, appointmentPost),
    takeLatest(SCHEDULE_APPOINTMENT, appointmentSchedule),
    takeLatest(GET_AVAILABLE_APPOINTMENTS, availableAppointmentsGet),
    takeLatest(DELETE_APPOINTMENT, appointmentDelete),
    takeLatest(ADD_APPOINTMENT_TERM, availableAppointmentCreate),

    takeLatest(GET_HALLS, hallsGet),
    takeLatest(SEARCH_HALLS, hallsSearch),
    takeLatest(DELETE_HALL, hallDelete),
    takeLatest(ADD_HALL, hallAdd),
    takeLatest(EDIT_HALL, hallEdit),

    takeLatest(GET_PATIENTS, patientsGet),
    takeLatest(GET_PATIENT, patientGet),
    takeLatest(PUT_PATIENT, patientPut),
    takeLatest(SEARCH_PATIENTS, patientsSearch),

    takeLatest(GET_TYPES, typesGet),
    takeLatest(SEARCH_TYPES, typesSearch),
    takeLatest(DELETE_TYPE, typeDelete),
    takeLatest(ADD_TYPE, typeAdd),
    takeLatest(EDIT_TYPE, typeEdit),

    takeLatest(GET_REQUESTS, requestsGet),
    takeLatest(RESOLVE_REQUEST, requestResolve),
    takeLatest(CREATE_REQUEST, requestCreate),

    takeLatest(GET_CLINIC_REPORTS, clinicReportsGet),
    takeLatest(GET_INCOME, incomeGet),


    takeLatest(GET_DOCTOR_RATINGS, doctorRatingsGet),
    takeLatest(GET_CLINIC_RATINGS, clinicRatingsGet),
    takeLatest(POST_DOCTOR_RATING, postDoctorRating),
    takeLatest(POST_CLINIC_RATING, postClinicRating),
    takeLatest(PUT_DOCTOR_RATING, putDoctorRating),
    takeLatest(PUT_CLINIC_RATING, putClinicRating),

    takeLatest(GET_OPERATIONS, operationsGet),
    takeLatest(GET_HEALTH_CARD, healthCardGet),

  ]);
}