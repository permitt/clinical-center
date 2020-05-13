import { 
    GET_HALLS,
    SET_HALLS,
    SET_DATES
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

  export const setDates = payload => {
    return {
      type: SET_DATES,
      payload
    };
  };