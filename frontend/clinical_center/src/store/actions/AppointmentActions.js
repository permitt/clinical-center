import {
    GET_APPOINTMENT_TYPES,
    SET_APPOINTMENT_TYPES,
    GET_APPOINTMENT_CHECK
} from './ActionTypes';

export const getAppointmentTypes = () => {
    return {
        type: GET_APPOINTMENT_TYPES,
    };
};

export const setAppointmentTypes = payload => {
    return {
        type: SET_APPOINTMENT_TYPES,
        payload
    };
};

export const checkAppointmentAvailable = (payload) => {
    return {
        type: GET_APPOINTMENT_CHECK,
        payload
    };
}

