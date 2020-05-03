import { 
    GET_DOCTORS, 
    SET_DOCTORS, 
    DELETE_DOCTOR, 
    SET_DOCTOR,
    ADD_DOCTOR
   } from './ActionTypes';
  
  export const getDoctors = () => {
    return {
      type: GET_DOCTORS,
    };
  };
  
  export const setDoctors = payload => {
    return {
      type: SET_DOCTORS,
      payload
    };
  };

  export const setDoctor = payload => {
    return {
      type: SET_DOCTOR,
      payload
    };
  };

  export const deleteDoctor = payload => {

    return {
      type: DELETE_DOCTOR,
      payload
    };
  };

  export const addDoctor = payload => {

    return {
      type: ADD_DOCTOR,
      payload
    };
  };