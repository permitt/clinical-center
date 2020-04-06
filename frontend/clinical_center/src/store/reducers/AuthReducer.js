import { AUTH_USER, SET_ROLE } from '../actions/ActionTypes';
import AuthService from '../../services/AuthService';
import { CLINIC_ADMIN } from '../../utils/constants';

const initialState = {
  isAuth : AuthService.isAuthenticated(),
  role : null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {...state, isAuth: action.payload }
    case SET_ROLE:
      console.log('akcija', action)
      console.log('prethodno stanje', state)
      return {...state, role : action.payload }
    default:
      return state;
  }
};

export default authReducer;