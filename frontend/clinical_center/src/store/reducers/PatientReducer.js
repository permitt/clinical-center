import { SET_PATIENTS } from '../actions/ActionTypes';

const initialState = {
  all: []
};
const patientReducer = (state = initialState, action) => {
  let changedArr;
  switch (action.type) {
    case SET_PATIENTS:

      return { ...state, all: action.payload }
    default:
      return state;
  }
};

export default patientReducer;