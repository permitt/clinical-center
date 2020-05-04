import { SET_HALLS } from '../actions/ActionTypes';

const initialState = {
  all: []
};
const hallReducer = (state = initialState, action) => {
  let changedArr;
  switch (action.type) {
    case SET_HALLS:

      return { ...state, all: action.payload }
    default:
      return state;
  }
};

export default hallReducer;