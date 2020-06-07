import { GET_APPOINTMENT_CHECK, SET_CLINICS, SET_AVAILABLE_CLINICS } from '../actions/ActionTypes';

const initialState = {
    all: [],
    available: [],
};
const clinicReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_APPOINTMENT_CHECK:
            return { ...state, available: [] }
        case SET_CLINICS:
            return { ...state, all: action.payload }
        case SET_AVAILABLE_CLINICS:
            return { ...state, available: action.payload.length === 0 ? 'empty' : action.payload }
        default:
            return state;
    }
};

export default clinicReducer;