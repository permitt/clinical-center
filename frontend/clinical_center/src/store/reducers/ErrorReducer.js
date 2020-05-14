import { LOGIN_ERROR, REGISTER_ERROR, DELETE_ERROR, RESET_ERROR } from '../actions/ActionTypes';

const initialState = {
  loginError: false,
  registerError: false,
  deleteError: false,
  errorMsg: ''
};

let i = 0;
const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ERROR:

      return { ...state, loginError: action.payload };
    case REGISTER_ERROR:

      return { ...state, registerError: action.payload };
    case DELETE_ERROR:
      console.log(state)
      return { ...state, deleteError: true, errorMsg : action.payload};
    case RESET_ERROR:
      console.log('hre')
      return { ...initialState};
    default:
      return state;
  }
};

export default errorReducer;
