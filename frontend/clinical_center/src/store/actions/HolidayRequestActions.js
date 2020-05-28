import { 
    GET_REQUESTS,
    SET_REQUESTS,
    REMOVE_REQUEST,
    RESOLVE_REQUEST,
    REQUEST_RESOLVED
   } from './ActionTypes';
  
  export const getRequests = () => {
    return {
      type: GET_REQUESTS,
    };
  };
  
  export const setRequests = payload => {
    return {
      type: SET_REQUESTS,
      payload
    };
  };

  export const removeRequest = payload => {

    return {
      type: REMOVE_REQUEST,
      payload
    };
  };

  export const resolveRequest = payload => {

    return {
      type: RESOLVE_REQUEST,
      payload
    };
  };