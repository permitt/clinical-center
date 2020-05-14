import { DELETE_ERROR, RESET_ERROR } from './ActionTypes';
   
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