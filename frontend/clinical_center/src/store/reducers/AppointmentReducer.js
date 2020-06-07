import { SET_APPOINTMENT_TYPES, SET_APPOINTMENT_TERMS, SET_APPOINTMENTS } from '../actions/ActionTypes';

const initialState = {
    types: [],
    all: [],
};
const appointmetReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_APPOINTMENT_TYPES:
            return { ...state, types: action.payload }
        case SET_APPOINTMENT_TERMS:
            return { ...state, availableTerms: action.payload }
        case SET_APPOINTMENTS:
            return { ...state, all: action.payload }
        default:
            return state;
    }
};

export default appointmetReducer;