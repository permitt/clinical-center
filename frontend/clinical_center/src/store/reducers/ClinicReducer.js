import { SET_CLINICS } from '../actions/ActionTypes';

const initialState = {
    all: []
};
const clinicReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CLINICS:
            return { ...state, all: action.payload }
        default:
            return state;
    }
};

export default clinicReducer;