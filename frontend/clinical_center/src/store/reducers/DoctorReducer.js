import { SET_DOCTORS, SET_DOCTOR, SET_DELETED_DOCTOR } from '../actions/ActionTypes';

const initialState = {
  all: []
};
const doctorReducer = (state = initialState, action) => {
  let changedArr;
  switch (action.type) {
    case SET_DOCTORS:

      return { ...state, all: action.payload }
    case SET_DELETED_DOCTOR: 
      changedArr  = state.all.filter(doctor => doctor.email !== action.payload);

      return {...state, all: changedArr}
    case SET_DOCTOR:
      changedArr  = state.all.slice()
      changedArr.push(action.payload)

      return {...state, all: changedArr }
    default:
      return state;
  }
};

export default doctorReducer;