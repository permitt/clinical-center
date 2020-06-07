import {
    GET_CLINICS,
    SET_CLINICS,
    SET_AVAILABLE_CLINICS,
    SET_ADMIN_CLINIC,
    GET_ADMIN_CLINIC,
    EDIT_ADMIN_CLINIC
} from './ActionTypes';

export const getClinics = (orderBy) => {
    return {
        type: GET_CLINICS,
        orderBy
    };
};

export const setClinics = payload => {
    return {
        type: SET_CLINICS,
        payload
    };
};

export const setAvailableClinics = payload => {
    return {
        type: SET_AVAILABLE_CLINICS,
        payload
    }
}

export const setAdminClinic = payload => {
    return {
        type: SET_ADMIN_CLINIC,
        payload
    };
};

export const getAdminClinic = () => {
    return {
        type: GET_ADMIN_CLINIC
    };
};

export const editAdminClinic = payload => {
    return {
        type: EDIT_ADMIN_CLINIC,
        payload
    };
};