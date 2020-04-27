import { SET_DOCTORS } from '../actions/ActionTypes';

const initialState = {
  all: []
};
const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DOCTORS:
      console.log(action.payload)
      return { ...state, all: action.payload }
    default:
      return state;
  }
};

export default doctorReducer;