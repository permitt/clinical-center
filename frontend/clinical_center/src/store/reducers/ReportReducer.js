import { SET_CLINIC_REPORTS, SET_INCOME } from '../actions/ActionTypes';

const initialState = {
  clinicReports: '',
  income: 0
};
const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CLINIC_REPORTS:
      return { ...state, clinicReports: action.payload }
    case SET_INCOME:
      return { ...state, income: action.payload }
    default:
      return state;
  }
};

export default reportReducer;