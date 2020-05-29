import { AUTH_USER, SET_ROLE, SET_USER_EMAIL } from '../actions/ActionTypes';
import AuthService from '../../services/AuthService';

const initialState = {
  isAuth: AuthService.isAuthenticated(),
  role: AuthService.getUserRole(),
  email: AuthService.getUserEmail(),
  // changedPass : AuthService.isPassChanged()
  changedPass: true
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, isAuth: action.payload }
    case SET_ROLE:
      return { ...state, role: action.payload }
    case SET_USER_EMAIL:
      return { ...state, email: action.payload }
    default:
      return state;
  }
};

export default authReducer;