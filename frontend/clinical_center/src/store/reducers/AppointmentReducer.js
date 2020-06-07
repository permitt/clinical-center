import { SET_APPOINTMENT_TYPES, SET_APPOINTMENT_TERMS, SET_APPOINTMENT, GET_APPOINTMENT_CHECK, SET_APPOINTMENT_TERMS, SET_SCHEDULED_APPOINTMENT } from '../actions/ActionTypes';

const initialState = {
    types: [],
    all: [],
    scheduled: { show: false, succes: false, msg: '' }
};
const appointmetReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_APPOINTMENT_TYPES:

            return { ...state, types: action.payload }
        case SET_APPOINTMENT_TERMS:

            return { ...state, availableTerms: action.payload }
        case SET_APPOINTMENTS:
            return { ...state, all: action.payload }
        case SET_SCHEDULED_APPOINTMENT:

            return { ...state, scheduled: action.payload }
        default:
            return state;
    }
};

export default appointmetReducer;