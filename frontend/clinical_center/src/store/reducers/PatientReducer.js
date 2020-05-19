import { SET_PATIENTS, SET_PATIENT } from '../actions/ActionTypes';

const initialState = {
  all: [],
  current: ''
};
const patientReducer = (state = initialState, action) => {
  let changedArr;
  switch (action.type) {
    case SET_PATIENTS:
      return { ...state, all: action.payload }
    case SET_PATIENT:
      return { ...state, current: action.payload }
    default:
      return state;
  }
};

export default patientReducer;