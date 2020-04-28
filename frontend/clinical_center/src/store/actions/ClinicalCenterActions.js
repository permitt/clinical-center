import {
    GET_CLINICAL_CENTERS,
    SET_CLINICAL_CENTERS
} from './ActionTypes';

export const getClinicalCenters = () => {
    return {
        type: GET_CLINICAL_CENTERS,
    };
};

export const setClinicalCenters = payload => {
    return {
        type: SET_CLINICAL_CENTERS,
        payload
    };
};
