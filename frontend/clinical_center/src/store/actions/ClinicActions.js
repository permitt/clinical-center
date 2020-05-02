import {
    GET_CLINICS,
    SET_CLINICS
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
