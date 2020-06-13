import { SET_APPOINTMENT_TYPES, SET_SELECTED_APP, SET_APPOINTMENT_TERMS, SET_APPOINTMENT, GET_APPOINTMENT_CHECK, SET_APPOINTMENTS, SET_SCHEDULED_APPOINTMENT, SET_AVAILABLE_APPOINTMENTS, DELETE_APPOINTMENT, SET_ADDED_APPOINTMENT_TERM } from '../actions/ActionTypes';

const initialState = {
    types: [],
    all: [],
    scheduled: { show: false, succes: false, msg: '' },
    available: [],
    availableTerms: [],
    selected: null
};
const appointmetReducer = (state = initialState, action) => {
    let changedArr;
    switch (action.type) {
        case SET_APPOINTMENT_TYPES:

            return { ...state, types: action.payload }
        case SET_APPOINTMENT_TERMS:

            return { ...state, availableTerms: action.payload }
        case SET_APPOINTMENTS:
            return { ...state, all: action.payload.length > 0 ? action.payload : ['empty'] }
        case SET_SCHEDULED_APPOINTMENT:

            return { ...state, scheduled: action.payload }
        case SET_AVAILABLE_APPOINTMENTS:
            console.log('u akciji', action)
            return { ...state, available: action.payload }

        case SET_ADDED_APPOINTMENT_TERM:
            changedArr = state.available.slice()
            changedArr.push(action.payload)

            return { ...state, available: changedArr }
        case DELETE_APPOINTMENT:
    
            changedArr = state.available.filter(app => app.id !== action.payload );

            return { ...state, available: changedArr }
        case SET_SELECTED_APP:
        
            return { ...state, selected: action.payload }
        default:
            return state;
    }
};

export default appointmetReducer;