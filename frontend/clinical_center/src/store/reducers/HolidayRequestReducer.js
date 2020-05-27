import { SET_REQUESTS, REMOVE_REQUEST } from '../actions/ActionTypes';

const initialState = {
  all: []
};
const requestReducer = (state = initialState, action) => {

  
  switch (action.type) {
    case SET_REQUESTS:
      
      return { ...state, all: action.payload }
      case REMOVE_REQUEST: 
        const changedArr  = state.all.filter(hall => hall.id !== action.payload);

        return {...state, all: changedArr}
    default:
      return state;
  }
};

export default requestReducer;