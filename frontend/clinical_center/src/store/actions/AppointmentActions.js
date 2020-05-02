import {
    GET_APPOINTMENT_TYPES,
    SET_APPOINTMENT_TYPES
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
