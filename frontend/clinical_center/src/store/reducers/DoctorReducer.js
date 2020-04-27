import { SET_DOCTORS, DELETE_DOCTOR } from '../actions/ActionTypes';

const initialState = {
  all: []
};
const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DOCTORS:

      return { ...state, all: action.payload }
    case DELETE_DOCTOR: 
      const changedArr  = state.all.filter(doctor => doctor.email !== action.payload);

      return {...state, all : changedArr}
    default:
      return state;
  }
};

export default doctorReducer;