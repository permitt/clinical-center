import {
    GET_CLINICS,
    SET_CLINICS
} from './ActionTypes';

export const getClinics = () => {
    return {
        type: GET_CLINICS,
    };
};

export const setClinics = payload => {
    return {
        type: SET_CLINICS,
        payload
    };
};
