import { 
    GET_HALLS,
    SET_HALLS,
    SEARCH_HALLS,
    DELETE_HALL,
    ADD_HALL,
    EDIT_HALL,
    SET_HALL,
    SET_DELETED_HALL,
    SET_EDITED_HALL,
    ASSIGN_HALL
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

  export const deleteHall = payload => {

    return {
      type: DELETE_HALL,
      payload
    };
  };

  export const setDeletedHall = payload => {

    return {
      type: SET_DELETED_HALL,
      payload
    };
  };

  export const addHall = payload => {

    return {
      type: ADD_HALL,
      payload
    };
  };

  export const setHall = payload => {
    return {
      type: SET_HALL,
      payload
    };
  };

  export const editHall = payload => {

    return {
      type: EDIT_HALL,
      payload
    };
  };

  export const setEditedHall = payload => {

    return {
      type: SET_EDITED_HALL,
      payload
    };
  };

  export const assignHall = payload => {

    return {
      type: ASSIGN_HALL,
      payload
    };
  };



