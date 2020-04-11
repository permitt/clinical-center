import { AUTH_USER, SET_ROLE } from '../actions/ActionTypes';
import AuthService from '../../services/AuthService';

const initialState = {
  isAuth : AuthService.isAuthenticated(),
  role : AuthService.getUserRole()
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {...state, isAuth: action.payload }
    case SET_ROLE:
      return {...state, role : action.payload }
    default:
      return state;
  }
};

export default authReducer;