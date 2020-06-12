import { SET_OPERATIONS } from '../actions/ActionTypes';

const initialState = {
    all: []
};

const operationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_OPERATIONS:
            return { ...state, all: action.payload.length === 0 ? ['empty'] : action.payload };
        default:
            return state;
    }
};

export default operationReducer;