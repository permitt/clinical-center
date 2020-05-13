import { SET_HALLS, SET_DATES } from '../actions/ActionTypes';

const initialState = {
  all: [],
  reservedDates: []
};
const hallReducer = (state = initialState, action) => {
  let changedArr;
  
  switch (action.type) {
    case SET_HALLS:

      return { ...state, all: action.payload }
    case SET_DATES:
      console.log(action.payload)
      return { ...state, reservedDates: action.payload }
    default:
      return state;
  }
};

export default hallReducer;