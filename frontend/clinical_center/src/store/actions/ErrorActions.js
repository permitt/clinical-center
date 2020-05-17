import { DELETE_ERROR, RESET_ERROR, EDIT_ERROR, ADD_ERROR } from './ActionTypes';
   
export const resetError = () => {

    return {
      type: RESET_ERROR,
    };
  };

  export const deleteError = payload => {
      
    return {
      type: DELETE_ERROR,
      payload
    };
  };

  export const editError = payload => {
      
    return {
      type: EDIT_ERROR,
      payload
    };
  };

  export const addError = payload => {
      
    return {
      type: ADD_ERROR,
      payload
    };
  };