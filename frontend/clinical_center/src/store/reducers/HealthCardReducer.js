import { SET_HEALTH_CARD } from '../actions/ActionTypes';

const initialState = {
    current: ''
}

const healthCardReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_HEALTH_CARD:
            return { ...state, current: action.payload }
        default:
            return state;
    };
}

export default healthCardReducer;