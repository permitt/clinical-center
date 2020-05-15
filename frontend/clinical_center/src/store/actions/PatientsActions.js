import { 
    GET_PATIENTS,
    SET_PATIENTS
   } from './ActionTypes';
  
  export const getPatients = payload => {
    return {
      type: GET_PATIENTS,
      payload
    };
  };
  
  export const setPatients = payload => {
    return {
      type: SET_PATIENTS,
      payload
    };
  };