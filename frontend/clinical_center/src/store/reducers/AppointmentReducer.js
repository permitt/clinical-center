import { SET_APPOINTMENT_TYPES } from '../actions/ActionTypes';

const initialState = {
    types: []
};
const appointmetReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_APPOINTMENT_TYPES:
            return { ...state, types: action.payload }
        default:
            return state;
    }
};

export default appointmetReducer;