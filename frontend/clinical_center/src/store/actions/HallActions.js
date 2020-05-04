import { 
    GET_HALLS,
    SET_HALLS
   } from './ActionTypes';
  
  export const getHalls = () => {
    return {
      type: GET_HALLS,
    };
  };
  
  export const setHalls = payload => {
    return {
      type: SET_HALLS,
      payload
    };
  };