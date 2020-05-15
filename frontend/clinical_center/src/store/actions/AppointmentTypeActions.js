import { 
    GET_TYPES,
    SET_TYPES,
    SEARCH_TYPES,
    DELETE_TYPE,
    ADD_TYPE,
    EDIT_TYPE,
    SET_TYPE,
    SET_DELETED_TYPE,
    SET_EDITED_TYPE
   } from './ActionTypes';
  
  export const getTypes = () => {
    return {
      type: GET_TYPES,
    };
  };
  
  export const setTypes = payload => {

    return {
      type: SET_TYPES,
      payload
    };
  };

  export const searchTypes = payload => {
    return {
      type: SEARCH_TYPES,
      payload
    }
  }

  export const deleteType = payload => {

    return {
      type: DELETE_TYPE,
      payload
    };
  };

  export const setDeletedType = payload => {

    return {
      type: SET_DELETED_TYPE,
      payload
    };
  };

  export const addType = payload => {

    return {
      type: ADD_TYPE,
      payload
    };
  };

  export const setType = payload => {
    return {
      type: SET_TYPE,
      payload
    };
  };

  export const editType = payload => {

    return {
      type: EDIT_TYPE,
      payload
    };
  };

  export const setEditedType = payload => {

    return {
      type: SET_EDITED_TYPE,
      payload
    };
  };


