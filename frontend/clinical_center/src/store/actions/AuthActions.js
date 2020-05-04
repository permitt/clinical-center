import { LOGIN, AUTH_USER, REGISTER, LOGIN_ERROR, REGISTER_ERROR, SET_ROLE, LOGOUT } from './ActionTypes';

export const logIn = logInData => {
  return {
    type: LOGIN,
    payload: logInData
  };
};

export const logOut = () => {
  return {
    type: LOGOUT
  };
};

export const register = registerData => {
  return {
    type: REGISTER,
    payload: registerData
  };
};

export const authUser = payload => {
  return {
    type: AUTH_USER,
    payload
  };
};

export const setRole = payload => {
  return {
    type: SET_ROLE,
    payload
  }
}

export const loginError = payload => {
  return {
    type: LOGIN_ERROR,
    payload
  };
};

export const registerError = payload => {
  return {
    type: REGISTER_ERROR,
    payload
  };
};
