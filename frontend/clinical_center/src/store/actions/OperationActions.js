import { GET_OPERATIONS, SET_OPERATIONS } from './ActionTypes';

export const getOperations = action => {
    return {
        type: GET_OPERATIONS
    }
}

export const setOperations = payload => {
    return {
        type: SET_OPERATIONS,
        payload
    }
}