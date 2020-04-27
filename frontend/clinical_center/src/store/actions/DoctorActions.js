import { 
    GET_DOCTORS, 
    SET_DOCTORS, 
    DELETE_DOCTOR, 
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

  export const deleteDoctor = payload => {
    return {
      type: DELETE_DOCTOR,
      payload
    };
  };