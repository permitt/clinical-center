import { LOGIN_ERROR, REGISTER_ERROR, DELETE_ERROR, RESET_ERROR, EDIT_ERROR, ADD_ERROR } from '../actions/ActionTypes';

const initialState = {
  loginError: false,
  registerError: false,
  deleteError: false,
  editError: false,
  addError: false,
  errorMsg: ''
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ERROR:

      return { ...state, loginError: action.payload };
    case REGISTER_ERROR:

      return { ...state, registerError: action.payload };
    case DELETE_ERROR:
  
      return { ...state, deleteError: true, errorMsg : action.payload};
    case EDIT_ERROR:

      return { ...state, editError: true, errorMsg : action.payload};
    case ADD_ERROR:

      return { ...state, addError: true, errorMsg : action.payload};
    case RESET_ERROR:
 
      return { ...initialState};
    default:
      return state;
  }
};

export default errorReducer;
