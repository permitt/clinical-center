import {
    GET_DOCTOR_RATINGS,
    GET_CLINIC_RATINGS,
    SET_DOCTOR_RATINGS,
    SET_CLINIC_RATINGS,
    POST_CLINIC_RATING,
    POST_DOCTOR_RATING,
    PUT_CLINIC_RATING,
    PUT_DOCTOR_RATING,
    SET_CLINIC_RATING,
    SET_DOCTOR_RATING,
} from './ActionTypes';

export const getDoctorRatings = () => {
    return {
        type: GET_DOCTOR_RATINGS,
    };
};

export const getClinicRatings = () => {
    return {
        type: GET_CLINIC_RATINGS,
    };
};

export const setDoctorRatings = payload => {
    return {
        type: SET_DOCTOR_RATINGS,
        payload
    };
};

export const setClinicRatings = (payload) => {
    return {
        type: SET_CLINIC_RATINGS,
        payload
    };
};

export const postDoctorRating = payload => {
    return {
        type: POST_DOCTOR_RATING,
        payload
    }
};

export const postClinicRating = payload => {
    return {
        type: POST_CLINIC_RATING,
        payload
    }
};

export const putDoctorRating = payload => {
    return {
        type: PUT_DOCTOR_RATING,
        payload
    }
};

export const putClinicRating = payload => {
    return {
        type: PUT_CLINIC_RATING,
        payload
    }
};

export const setClinicRating = payload => {
    return {
        type: SET_CLINIC_RATING,
        payload
    }
};


export const setDoctorRating = payload => {
    return {
        type: SET_DOCTOR_RATING,
        payload
    }
};