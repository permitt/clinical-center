import { GET_APPOINTMENT_CHECK, SET_CLINICS, SET_AVAILABLE_CLINICS, SET_ADMIN_CLINIC } from '../actions/ActionTypes';

const initialState = {
    all: [],
    available: [],
    adminClinic: null
};
const clinicReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_APPOINTMENT_CHECK:
            
            return { ...state, available: [] }
        case SET_CLINICS:

            return { ...state, all: action.payload }
        case SET_AVAILABLE_CLINICS:

            return { ...state, available: action.payload.length === 0 ? 'empty' : action.payload }
        case SET_ADMIN_CLINIC:

            return { ...state, adminClinic: action.payload }
        default:
            return state;
    }
};

export default clinicReducer;