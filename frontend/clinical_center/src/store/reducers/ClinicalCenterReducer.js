import { SET_CLINICAL_CENTERS } from '../actions/ActionTypes';

const initialState = {
    all: []
};
const clinicalCenterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CLINICAL_CENTERS:
            return { ...state, all: action.payload }
        default:
            return state;
    }
};

export default clinicalCenterReducer;