import { SET_APPOINTMENT_TYPES, SET_APPOINTMENT_TERMS, SET_APPOINTMENT, GET_APPOINTMENT_CHECK, SET_APPOINTMENTS, SET_SCHEDULED_APPOINTMENT, SET_AVAILABLE_APPOINTMENTS, DELETE_APPOINTMENT } from '../actions/ActionTypes';

const initialState = {
    types: [],
    all: [],
    scheduled: { show: false, succes: false, msg: '' },
    available: []
};
const appointmetReducer = (state = initialState, action) => {
    let changedArr;
    switch (action.type) {
        case SET_APPOINTMENT_TYPES:

            return { ...state, types: action.payload }
        case SET_APPOINTMENT_TERMS:

            return { ...state, availableTerms: action.payload }
        case SET_APPOINTMENTS:
            return { ...state, all: action.payload }
        case SET_SCHEDULED_APPOINTMENT:

            return { ...state, scheduled: action.payload }
        case SET_AVAILABLE_APPOINTMENTS:
            
            return {...state, available: action.payload }
        case DELETE_APPOINTMENT:
            changedArr  = state.all.filter(app => app.id !== action.payload);

            return {...state, all: changedArr}
        default:
            return state;
    }
};

export default appointmetReducer;