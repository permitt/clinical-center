import { SET_REQUESTS, REMOVE_REQUEST, REQUEST_RESOLVED } from '../actions/ActionTypes';

const initialState = {
  all: null,
  resolved: false
};
const requestReducer = (state = initialState, action) => {

  
  switch (action.type) {
    case SET_REQUESTS:
      
      return { ...state, all: action.payload , resolved: false}
      case REMOVE_REQUEST: 
        const changedArr  = state.all.filter(request => request.id !== action.payload);
        console.log('here')
        console.log(changedArr)
        return {...state, all: changedArr, resolved: true}
    default:
      return state;
  }
};

export default requestReducer;