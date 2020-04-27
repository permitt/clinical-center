import { 
    GET_DOCTORS, 
    SET_DOCTORS, 
    ADD_DOCTOR, 
    SET_DOCTOR, 
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