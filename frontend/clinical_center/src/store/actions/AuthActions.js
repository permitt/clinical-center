import { LOGIN, AUTH_USER, REGISTER,
   LOGIN_ERROR, REGISTER_ERROR, SET_ROLE,
    LOGOUT, SET_USER_EMAIL, CHANGEPASS, 
    SET_CHANGEDPASS, SET_PROFILE, GET_PROFILE, EDIT_PROFILE } from './ActionTypes';

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

export const setChangedPass = payload => {
  return {
    type: SET_CHANGEDPASS,
    payload
  };
};

export const changePass = data => {
  return {
    type: CHANGEPASS,
    payload: data
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

export const setEmail = payload => {
  return {
    type: SET_USER_EMAIL,
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

export const setProfile = payload => {
  return {
    type: SET_PROFILE,
    payload
  };
};


export const getProfile = () => {
  return {
    type: GET_PROFILE
  };
};

export const editProfile = payload => {
  return {
    type: EDIT_PROFILE,
    payload
  };
};