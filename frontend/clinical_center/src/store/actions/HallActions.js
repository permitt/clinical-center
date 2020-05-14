import { 
    GET_HALLS,
    SET_HALLS,
    SEARCH_HALLS
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

  export const searchHalls = payload => {
    return {
      type: SEARCH_HALLS,
      payload
    }
  }