import {
    GET_APPOINTMENT_TYPES,
    SET_APPOINTMENT_TYPES,
    GET_APPOINTMENT_CHECK,
    SET_APPOINTMENT_TERMS
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
export const setAppointmentTerms = payload => {
    return {
        type: SET_APPOINTMENT_TERMS,
        payload
    }
}
export const checkAppointmentAvailable = (payload) => {
    return {
        type: GET_APPOINTMENT_CHECK,
        payload
    };
}

