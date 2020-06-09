import {
    GET_APPOINTMENT_TYPES,
    SET_APPOINTMENT_TYPES,
    GET_APPOINTMENT_CHECK,
    SET_APPOINTMENT_TERMS,
    POST_APPOINTMENT,
    GET_APPOINTMENTS,
    SET_APPOINTMENTS,
    SCHEDULE_APPOINTMENT,
    SET_SCHEDULED_APPOINTMENT,
    DELETE_APPOINTMENT,
    SET_AVAILABLE_APPOINTMENTS,
    GET_AVAILABLE_APPOINTMENTS,
    CREATE_APPOINTMENT_TERM,
    ADD_APPOINTMENT_TERM
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

export const postAppointment = payload => {
    return {
        type: POST_APPOINTMENT,
        payload
    }
}

export const getAppointments = () => {
    return {
        type: GET_APPOINTMENTS
    };
}

export const setAppointments = payload => {
    return {
        type: SET_APPOINTMENTS,
        payload
    }
}

export const checkAppointmentAvailable = (payload) => {
    return {
        type: GET_APPOINTMENT_CHECK,
        payload
    };
}

export const scheduleAppointment = payload => {
    return {
        type: SCHEDULE_APPOINTMENT,
        payload
    };
}

export const createAppointmentTerm = payload => {
    return {
        type: CREATE_APPOINTMENT_TERM,
        payload
    };
}


export const setScheduledAppointment = payload => {
    return {
        type: SET_SCHEDULED_APPOINTMENT,
        payload
    };
}

export const deleteAppointment = payload => {
    return {
        type: DELETE_APPOINTMENT,
        payload
    };
}


export const getAvailableAppointments = () => {
    return {
        type: GET_AVAILABLE_APPOINTMENTS
    };
}

export const setAvailableAppointments = payload => {
    return {
        type: SET_AVAILABLE_APPOINTMENTS,
        payload
    };
}

export const addAvailableAppointment = payload => {
    return {
        type: ADD_APPOINTMENT_TERM,
        payload
    };
}
