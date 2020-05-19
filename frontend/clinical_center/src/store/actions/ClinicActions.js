import {
    GET_CLINICS,
    SET_CLINICS,
    SET_AVAILABLE_CLINICS
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
