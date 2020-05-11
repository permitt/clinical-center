import { SET_APPOINTMENT_TYPES, GET_APPOINTMENT_CHECK, SET_APPOINTMENT_TERMS } from '../actions/ActionTypes';

const initialState = {
    types: []
};
const appointmetReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_APPOINTMENT_TYPES:
            return { ...state, types: action.payload }
        case SET_APPOINTMENT_TERMS:
            return { ...state, availableTerms: action.payload }
        default:
            return state;
    }
};

export default appointmetReducer;